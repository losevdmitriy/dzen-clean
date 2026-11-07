/* Pinned engine bridge: add a reversible opt-out marker to native hiding CSS.
   The engine still owns injection and all DNR rules. No page text is read here. */
export const frameSelectors=new Map();
const key=(tab,frame)=>`${tab}:${frame}`;
async function prepare(params) {
  if(params.origin!=='USER' || !params.css || !params.target?.frameIds?.length)return params;
  try {
    const results=await chrome.scripting.executeScript({target:{tabId:params.target.tabId,frameIds:params.target.frameIds},world:'ISOLATED',args:[params.css],func:css=>{
      const sheet=new CSSStyleSheet();sheet.replaceSync(css);const selectors=[];
      const walk=rules=>[...rules].map(rule=>{
        if(rule.type===CSSRule.STYLE_RULE && (rule.style.display==='none' || rule.style.visibility==='hidden') && !rule.selectorText.includes('::')) {
          const original=rule.selectorText;
          const selector=`:is(${original}):not([data-dc-restore]):not([data-dc-restore] *):not(:has([data-dc-restore]))`;
          try{document.querySelector(selector);selectors.push(original);return selector+'{'+rule.style.cssText+'}';}catch{return rule.cssText;}
        }
        if(rule.cssRules && rule.conditionText)return (rule.type===CSSRule.SUPPORTS_RULE?'@supports ':'@media ')+rule.conditionText+'{'+walk(rule.cssRules)+'}';
        return rule.cssText;
      }).join('\n');
      return {css:walk(sheet.cssRules),selectors:selectors.slice(0,4000)};
    }});
    const result=results[0]?.result;
    if(!result)return params;
    for(const item of results) {
      const k=key(params.target.tabId,item.frameId),entry=frameSelectors.get(k) || {sets:new Map()};
      entry.sets.set(params.css,item.result.selectors);frameSelectors.set(k,entry);
    }
    return {...params,css:result.css};
  }catch{return params;}
}
export function installCssHooks() {
  globalThis.__dcInsertCSS=async params=>{
    const prepared=await prepare(params);await chrome.scripting.insertCSS(prepared);
    for(const frameId of params.target?.frameIds || [])void chrome.tabs.sendMessage(params.target.tabId,{type:'dc-css-updated'},{frameId}).catch(()=>{});
  };
  globalThis.__dcRemoveCSS=async params=>chrome.scripting.removeCSS(await prepare(params));
  chrome.tabs.onRemoved.addListener(tab=>{for(const k of frameSelectors.keys())if(k.startsWith(tab+':'))frameSelectors.delete(k);});
  chrome.webNavigation.onBeforeNavigate.addListener(({tabId,frameId})=>{
    if(frameId===0){for(const k of frameSelectors.keys())if(k.startsWith(tabId+':'))frameSelectors.delete(k);}
    else frameSelectors.delete(key(tabId,frameId));
  });
}
export function selectorsFor(tab,frame) {return [...new Set([...(frameSelectors.get(key(tab,frame))?.sets.values() || [])].flat())].slice(0,4000);}
