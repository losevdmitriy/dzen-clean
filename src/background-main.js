import {createEngine,migrateLegacyRules,MESSAGE_HANDLER_NAME} from './engine.js';
import {installCssHooks,selectorsFor} from './css-hooks.js';
import '../settings.js';
import * as Compiler from './rule-compiler.js';
import '../updater.js';
globalThis.DzenRuleCompiler=Compiler;
installCssHooks();
const ALARM='dc03-filter-update',DZ_MATCH=['https://*.dzen.ru/*'];
const excludeMatches=chrome.runtime.getManifest().content_scripts.find(x=>x.js.includes('content.js')).exclude_matches;
let queue=Promise.resolve(),initializing,updating,engine,started=false,lastConfiguration;
let capabilities={mainWorld:'not-checked',engine:'starting',error:null};
const serial=task=>{const p=queue.then(task);queue=p.catch(()=>{});return p;};
async function read(){const data=await chrome.storage.local.get(['settings','filterCache','filterStatus']);return {...data,settings:DzenClean.normalize(data.settings)};}
function rulesFor(s,bundle){
  const data=[...(bundle?.rules?.cosmetic || []),...(bundle?.rules?.network || [])].map(r=>r.text).filter(Boolean);
  const rules=[...new Set(data)];
  if(!s.network)rules.push('@@*$script,image,stylesheet,font,media,xmlhttprequest,subdocument,ping,websocket,other,important');
  if(!s.cosmetic)rules.push('@@*$elemhide');
  rules.push('@@||ad.mail.ru/static/admanhtml/*rbadman-html5.min.js$script,domain=dzen.ru');
  for(const page of ['profile/','editor/','studio/','auth/','login/'])rules.push(`@@||dzen.ru/${page}$document`);
  for(const host of ['sso.dzen.ru','passport.dzen.ru','auth.dzen.ru'])rules.push(`@@||${host}^$document`);
  if(s.enabled && s.dzen.profile==='experimental' && s.dzen.modules.vast && !DzenClean.disabled('dzen.ru',s))rules.push('||strm.yandex.ru/get/$xmlhttprequest,redirect=noopvast-3.0,domain=dzen.ru,important');
  return rules;
}
async function configureEngine(s,bundle){
  const config={filters:[1,2],filteringEnabled:s.enabled,assetsPath:'engine-filters',allowlist:s.disabledSites,rules:rulesFor(s,bundle)};
  try{if(!started){await engine.start(config);started=true;}else await engine.configure(config);lastConfiguration=config;capabilities.engine='ready';capabilities.error=null;}
  catch(error){capabilities.engine='error';capabilities.error='Не удалось применить правила. Рабочий комплект сохранён.';throw error;}
}
async function scripts(s){
  const view=DzenClean.forDzen(s,'dzen.ru'),wanted=[];
  const excluded=[...excludeMatches,...s.disabledSites.filter(x=>DzenClean.isDzen(x)).map(x=>`https://*.${x}/*`)];
  if(view.enabled && view.cosmetic)wanted.push({id:'dc02-early',matches:DZ_MATCH,excludeMatches:excluded,js:['early.js'],css:['early.css'],runAt:'document_start',allFrames:true,persistAcrossSessions:true});
  const selected=['findSsrAd','initAdvManager','rtb','cookies'].filter(x=>view.modules[x]);
  if(view.enabled && view.profile==='experimental' && selected.length)wanted.push({id:'dc02-experimental',matches:DZ_MATCH,excludeMatches:excluded,js:['experimental/core.js',...selected.map(x=>`experimental/${x}.js`)],world:'MAIN',runAt:'document_start',allFrames:true,persistAcrossSessions:true});
  try{const current=(await chrome.scripting.getRegisteredContentScripts()).filter(x=>x.id.startsWith('dc02-'));
    const stale=current.filter(x=>!wanted.some(y=>y.id===x.id)).map(x=>x.id);if(stale.length)await chrome.scripting.unregisterContentScripts({ids:stale});
    const update=wanted.filter(x=>current.some(y=>y.id===x.id)),add=wanted.filter(x=>!current.some(y=>y.id===x.id));
    if(update.length)await chrome.scripting.updateContentScripts(update);if(add.length)await chrome.scripting.registerContentScripts(add);
    capabilities.mainWorld='available';
  }catch{await chrome.scripting.unregisterContentScripts({ids:['dc02-experimental']}).catch(()=>{});capabilities.mainWorld='unavailable';}
}
async function stopMain(){await Promise.all((await chrome.tabs.query({url:DZ_MATCH})).filter(t=>t.id!=null).map(t=>chrome.scripting.executeScript({target:{tabId:t.id,allFrames:true},world:'MAIN',func:()=>globalThis.__dzenClean02Main?.stop()}).catch(()=>{})));}
async function apply(s,bundle){await configureEngine(s,bundle);await scripts(s);
  if(s.autoUpdate)await chrome.alarms.create(ALARM,{periodInMinutes:360});else await chrome.alarms.clear(ALARM);
  await chrome.action.setBadgeText({text:s.enabled?'':'OFF'});await chrome.action.setBadgeBackgroundColor({color:'#19745c'});
}
async function initialize(){return initializing ??= serial(async()=>{
  const data=await read();if(data.filterCache?.active?.schema!==3)data.filterCache={active:await(await fetch(chrome.runtime.getURL('data/bundled-rules.json'))).json(),previous:null,rejected:[]};
  await migrateLegacyRules();engine=await createEngine();await apply(data.settings,data.filterCache.active);
  await chrome.storage.local.set({settings:data.settings,filterCache:data.filterCache});
});}
async function update(force=false){await initialize();if(updating)return updating;
  return updating=(async()=>{const before=await read();if(!force && (!before.settings.autoUpdate || Date.now()-(before.filterStatus?.checkedAt || 0)<21600000))return {ok:true,changed:false};
    await chrome.storage.local.set({filterStatus:{...before.filterStatus,state:'updating'}});
    try{const candidate=await DzenUpdater.candidate();return await serial(async()=>{
      const current=await read(),cache=current.filterCache;
      if(cache.rejected?.includes(candidate.version))throw new Error('Эта версия отменена после отката');
      if(candidate.version!==cache.active.version){
        try{await configureEngine(current.settings,candidate);await chrome.storage.local.set({filterCache:{active:candidate,previous:cache.active,rejected:cache.rejected || []}});}
        catch(e){await configureEngine(current.settings,cache.active);throw e;}
      }
      await chrome.storage.local.set({filterStatus:{state:'ready',checkedAt:Date.now(),error:null}});return {ok:true};
    });}catch{await chrome.storage.local.set({filterStatus:{state:'error',checkedAt:Date.now(),error:'Обновление не принято. Рабочие правила сохранены.'}});return {ok:false,error:'Обновление не принято. Рабочие правила сохранены.'};}
  })().finally(()=>updating=null);
}
async function rollback(){return serial(async()=>{const d=await read(),c=d.filterCache;if(!c.previous)throw new Error('Предыдущего комплекта пока нет');
  try{await configureEngine(d.settings,c.previous);await chrome.storage.local.set({filterCache:{active:c.previous,previous:c.active,rejected:[...new Set([...(c.rejected || []),c.active.version])].slice(-8)},filterStatus:{state:'ready',checkedAt:Date.now(),error:null}});}
  catch(e){await configureEngine(d.settings,c.active);throw e;}return {ok:true};});}
async function tabData(id,details=false){
  if(!Number.isInteger(id))return {supported:false,access:false,frames:[]};
  const tab=await chrome.tabs.get(id);let url;try{url=new URL(tab.url);}catch{return {supported:false,access:false,frames:[]};}
  if(!['http:','https:'].includes(url.protocol))return {supported:false,access:false,frames:[]};
  let frames=[];try{const r=await chrome.scripting.executeScript({target:{tabId:id,allFrames:true},world:'ISOLATED',args:[details],func:details=>{
    const a=globalThis.__dzenClean02?.snapshot(details),b=globalThis.__dcUniversal?.snapshot(details);return {adapter:a || null,universal:b || null};
  }});frames=r.map(x=>{const a=x.result?.adapter,b=x.result?.universal;return {frameId:x.frameId,kind:a?.kind || 'web',hidden:(a?.hidden || 0)+(b?.hidden || 0),clicks:a?.clicks || 0,closed:a?.closed || 0,
      ...(details?{blocks:[...(a?.blocks || []).map(v=>({...v,owner:'dzen'})),...(b?.blocks || [])]}:{}),performance:a?.performance || null,capabilities:a?.capabilities || null,modules:a?.modules || null};});}
  catch{return {supported:true,access:false,hostname:url.hostname,frames:[]};}
  const {settings}=await read();return {supported:true,access:true,hostname:url.hostname,siteEnabled:settings.enabled && !DzenClean.disabled(url.hostname,settings),frames};
}
async function info(tabId){const d=await read();let count=0;try{count=engine.getRulesCount();}catch{}
  return {ok:true,settings:d.settings,capabilities,tab:await tabData(tabId),filters:{version:d.filterCache.active.version,previous:!!d.filterCache.previous,
    cosmetic:d.filterCache.active.rules.cosmetic.length,network:d.filterCache.active.rules.network.length,total:count,base:[{id:2,name:'AdGuard Base'},{id:1,name:'AdGuard Russian'}],status:d.filterStatus || {state:'ready'}}};}
async function startup(){try{await initialize();if((await read()).settings.autoUpdate)await update(true);}catch{capabilities.engine='error';capabilities.error='Движок не запущен. Откройте диагностику или обновите расширение.';}}
chrome.runtime.onInstalled.addListener(()=>{void startup();});chrome.runtime.onStartup.addListener(()=>{void startup();});
chrome.alarms.onAlarm.addListener(a=>{if(a.name===ALARM)void update();});
chrome.runtime.onMessage.addListener((message,sender,respond)=>{
  if(sender.id!==chrome.runtime.id)return;
  const popup=sender.url===chrome.runtime.getURL('popup.html');
  const content=!!sender.tab && /^https?:\/\//.test(sender.url || '');
  if(message?.handlerName===MESSAGE_HANDLER_NAME){
    if(!content)return;
    if(message.type==='getCookieRules'){respond({isAppStarted:true,cookieRules:[]});return;}
    initialize().then(()=>engine.getMessageHandler()(message,sender)).then(respond,()=>respond({isAppStarted:false}));return true;
  }
  if(!popup && !(content && ['add-exception','cosmetic-selectors'].includes(message?.type)))return;
  (async()=>{
    await initialize();
    if(message.type==='get-settings')return info(message.tabId);
    if(message.type==='cosmetic-selectors')return {ok:true,selectors:selectorsFor(sender.tab.id,sender.frameId || 0)};
    if(message.type==='tab-state')return {ok:true,...await tabData(message.tabId,true)};
    if(message.type==='update-rules')return update(true);
    if(message.type==='rollback-rules')return rollback();
    if(message.type==='diagnostics'){const d=await info();const tab=await tabData(message.tabId,false);return {ok:true,report:{version:chrome.runtime.getManifest().version,browser:navigator.userAgent,capabilities:d.capabilities,
      settings:{enabled:d.settings.enabled,cosmetic:d.settings.cosmetic,network:d.settings.network,autoUpdate:d.settings.autoUpdate,dzen:d.settings.dzen,exceptions:d.settings.exceptions.length,disabledSites:d.settings.disabledSites.length},filters:d.filters,access:tab.access,frames:tab.frames}};}
    if(message.type==='set-settings' || message.type==='toggle-site')return serial(async()=>{
      const before=await read();let patch=message.patch || {};
      if(message.type==='toggle-site'){
        const tab=await chrome.tabs.get(message.tabId),host=new URL(tab.url).hostname;if(!/^https?:/.test(tab.url))throw new Error('Эта страница не поддерживается');
        patch={disabledSites:DzenClean.disabled(host,before.settings)?before.settings.disabledSites.filter(x=>host!==x && !host.endsWith('.'+x)):[...before.settings.disabledSites,host]};
      }
      const dz={...before.settings.dzen,...patch.dzen,modules:{...before.settings.dzen.modules,...patch.dzen?.modules,...patch.modules}};
      if(patch.profile)dz.profile=patch.profile;for(const k of ['skipVideo','heuristics'])if(typeof patch[k]==='boolean')dz[k]=patch[k];
      const next=DzenClean.normalize({...before.settings,...patch,dzen:dz,schema:3});
      try{await apply(next,before.filterCache.active);await chrome.storage.local.set({settings:next});}
      catch(e){await apply(before.settings,before.filterCache.active);throw e;}
      if(JSON.stringify(next.dzen)!==JSON.stringify(before.settings.dzen) || !next.enabled || JSON.stringify(next.disabledSites)!==JSON.stringify(before.settings.disabledSites))await stopMain();
      return info(message.tabId);
    });
    if(message.type==='add-exception' || message.type==='remove-exception')return serial(async()=>{
      const d=await read();if(message.type==='add-exception'){
        const ex=DzenClean.exception(message.exception);if(!ex)throw new Error('Некорректное исключение');
        if(content){const u=new URL(sender.url);if(ex.hostname!==u.hostname || ex.path!==u.pathname)throw new Error('Исключение не относится к странице');}
        if(d.settings.exceptions.length>=100)throw new Error('Лимит 100 исключений');d.settings.exceptions.push(ex);
      }else d.settings.exceptions=d.settings.exceptions.filter(x=>x.id!==message.id);
      await chrome.storage.local.set({settings:d.settings});return {ok:true};
    });
    throw new Error('Неизвестная команда');
  })().then(respond,e=>respond({ok:false,error:e.message}));return true;
});
