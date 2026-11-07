import '@adguard/api-mv3/content-script';
(() => {
  if(globalThis.__dcUniversal)return;
  let settings=DzenClean.normalize(),selectors=[],scheduled=false,restored=new Set(),records=new Map(),next=0;
  const ids=new WeakMap();
  const shadow=el=>{try{return chrome.dom?.openOrClosedShadowRoot?.(el) || el.shadowRoot;}catch{return el.shadowRoot;}};
  const enabled=()=>settings.enabled && settings.cosmetic && !DzenClean.disabled(location.hostname,settings);
  function pathFor(el) {
    const root=el.getRootNode(),parts=[];
    for(let n=el;n?.nodeType===1;n=n.parentElement){
      if(n.id && /^[\w-]{1,120}$/.test(n.id) && root.querySelectorAll('#'+CSS.escape(n.id)).length===1){parts.unshift('#'+CSS.escape(n.id));break;}
      const list=n.parentElement ? [...n.parentElement.children].filter(x=>x.localName===n.localName) : [n];
      parts.unshift(n.localName+(list.length>1?`:nth-of-type(${list.indexOf(n)+1})`:''));
      if(parts.length>20)throw new Error('Выберите исключение в дополнительных настройках или выключите защиту на сайте.');
    }return parts.join(' > ');
  }
  function applyRestored() {
    for(const el of restored)el.removeAttribute('data-dc-restore');restored.clear();
    for(const ex of settings.exceptions){
      if(ex.hostname!==location.hostname || ex.path!==location.pathname)continue;
      try{let root=document;for(const host of ex.hosts){root=shadow(root.querySelector(host));if(!root)break;}if(!root)continue;
        for(const el of root.querySelectorAll(ex.selector)){el.setAttribute('data-dc-restore','');restored.add(el);}
      }catch{}
    }
  }
  function scan() {
    scheduled=false;records.clear();if(!enabled())return;
    applyRestored();
    const found=new Set();
    for(const selector of selectors){try{for(const el of document.querySelectorAll(selector)){
      if(found.size>=200)break;
      if(el.matches('html,body,main,h1,video,audio,input,textarea,form,[contenteditable="true"]') || el.closest('[data-dc-restore]') || el.querySelector('[data-dc-restore]'))continue;
      if(getComputedStyle(el).display==='none' || getComputedStyle(el).visibility==='hidden')found.add(el);
    }}catch{}}
    for(const el of found){if([...found].some(parent=>parent!==el && parent.contains(el)))continue;
      if(!ids.has(el))ids.set(el,'u'+(++next));records.set(ids.get(el),el);}
  }
  function schedule(){if(!scheduled && settings.exceptions.length){scheduled=true;setTimeout(()=>{scheduled=false;applyRestored();},150);}}
  async function refresh(){
    try{const r=await chrome.runtime.sendMessage({type:'cosmetic-selectors'});if(r?.ok && r.selectors?.length)selectors=r.selectors;}catch{}
    applyRestored();
  }
  const observer=new MutationObserver(changes=>{
    if(changes.some(x=>x.type==='childList' || x.attributeName!=='data-dc-restore'))schedule();
  });
  observer.observe(document,{subtree:true,childList:true,attributes:true,attributeFilter:['class','id','style']});
  globalThis.__dcUniversal={snapshot:(details=false)=>{
    scan();return {kind:'web',enabled:enabled(),profile:'standard',hidden:records.size,clicks:0,closed:0,
      ...(details?{blocks:[...records].map(([id,el])=>({id,tag:el.localName,reason:'engine:css',mode:'collapse',owner:'universal'}))}:{})};
  }};
  chrome.runtime.onMessage.addListener((message,sender,respond)=>{
    if(sender.id!==chrome.runtime.id)return;
    if(message.type==='dc-css-updated'){void refresh();return;}
    if(message.type==='restore-universal'){
      scan();const el=records.get(message.id);if(!el){respond({ok:false,error:'Блок изменился. Обновите список.'});return;}
      try{const hosts=[];for(let r=el.getRootNode();r.host;r=r.host.getRootNode())hosts.unshift(pathFor(r.host));
        const exception={id:crypto.randomUUID(),hostname:location.hostname,path:location.pathname,hosts,selector:pathFor(el)};
        chrome.runtime.sendMessage({type:'add-exception',exception}).then(r=>{if(r?.ok){el.setAttribute('data-dc-restore','');restored.add(el);}respond(r);},()=>respond({ok:false,error:'Не удалось сохранить исключение'}));
      }catch(e){respond({ok:false,error:e.message});}return true;
    }
  });
  chrome.storage.onChanged.addListener((changes,area)=>{if(area==='local' && changes.settings){settings=DzenClean.normalize(changes.settings.newValue);applyRestored();void refresh();}});
  chrome.storage.local.get('settings').then(data=>{settings=DzenClean.normalize(data.settings);applyRestored();return refresh();}).catch(()=>{});
})();
