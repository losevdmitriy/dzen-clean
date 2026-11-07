(() => {
  const $=id=>document.getElementById(id),booleanKeys=['enabled','cosmetic','network','autoUpdate','skipVideo','heuristics'];
  const fields=booleanKeys.map($),modules=[...document.querySelectorAll('[data-module]')];
  let state,tab,busy=false,refreshSequence=0;
  const send=async message=>{const r=await chrome.runtime.sendMessage({...message,tabId:tab?.id});if(!r?.ok)throw new Error(r?.error || 'Нет ответа от расширения');return r;};
  const show=(text,error=false)=>{$('status').textContent=text;$('status').classList.toggle('error',error);};
  function render(){
    if(!state)return;const s=state.settings,t=state.tab;
    for(const f of fields){if(!busy)f.checked=['skipVideo','heuristics'].includes(f.id)?s.dzen[f.id]:s[f.id];f.disabled=busy;}
    if(!busy)$('profile').value=s.dzen.profile;$('profile').disabled=busy;
    for(const f of modules){if(!busy)f.checked=s.dzen.modules[f.dataset.module];f.disabled=busy || s.dzen.profile!=='experimental';}
    $('experimental').hidden=s.dzen.profile!=='experimental';$('main-capability').textContent=state.capabilities.mainWorld==='unavailable'?'Браузер не зарегистрировал ранние модули. Общие фильтры и обычная обработка Дзена сохранены.':'';
    $('protection').textContent=state.capabilities.engine!=='ready'?'Защита ограничена':!s.enabled?'Защита выключена':t.supported && !t.access?'Нет доступа к странице':t.supported && !t.siteEnabled?'На этом сайте выключена':!s.network || !s.cosmetic?'Защита ограничена':'Защита включена';
    $('site').textContent=t.hostname || 'На служебных страницах защита недоступна';
    $('toggle-site').textContent=t.siteEnabled?'Выключить на этом сайте':'Включить на этом сайте';
    $('toggle-site').disabled=busy || !s.enabled || !t.supported || !t.access || state.capabilities.engine!=='ready';
    for(const id of ['list-blocks','add-exception'])$(id).disabled=busy || !t.supported || !t.access;
    $('reload').disabled=busy || !t.supported;
    $('restore').disabled=busy || !$('blocks').value;
    const f=state.filters;$('filters').textContent=`AdGuard Base + Russian · ${f.total.toLocaleString('ru')} правил. Исправления: ${f.version}.`+(f.status.error?' '+f.status.error:'');
    $('update').disabled=busy || f.status.state==='updating';$('rollback').disabled=busy || !f.previous;
    $('stats').textContent=`Скрыто элементов: ${t.frames.reduce((sum,f)=>sum+f.hidden,0)}. Счётчик не измеряет всю заблокированную рекламу.`;
    $('disabled-sites').textContent=s.disabledSites.length?'Защита выключена: '+s.disabledSites.join(', '):'Защита разрешена на всех сайтах.';
    $('exceptions').replaceChildren();
    for(const ex of s.exceptions){const row=document.createElement('div');row.className='exception';const label=document.createElement('code');label.textContent=ex.hostname+': '+ex.selector;const b=document.createElement('button');b.textContent='Убрать';b.disabled=busy;b.addEventListener('click',()=>action(async()=>{await send({type:'remove-exception',id:ex.id});show('Исключение удалено.');}));row.append(label,b);$('exceptions').append(row);}
  }
  async function refresh(){const sequence=++refreshSequence,next=await send({type:'get-settings'});if(sequence===refreshSequence){state=next;render();}}
  async function action(task){if(busy)return;++refreshSequence;busy=true;render();try{await task();await refresh();}catch(e){show(e.message,true);}finally{busy=false;render();}}
  // Capture the user's value before action() renders/disables the form.
  const save=patch=>action(async()=>{await send({type:'set-settings',patch});show('Сохранено. Обновите вкладку для полного применения.');});
  fields.forEach(f=>f.addEventListener('change',()=>save({[f.id]:f.checked})));
  modules.forEach(f=>f.addEventListener('change',()=>save({dzen:{modules:{[f.dataset.module]:f.checked}}})));
  $('profile').addEventListener('change',()=>save({dzen:{profile:$('profile').value}}));
  $('toggle-site').addEventListener('click',()=>action(async()=>{await send({type:'toggle-site'});await chrome.tabs.reload(tab.id);show('Настройка сайта сохранена. Страница обновлена.');}));
  $('list-blocks').addEventListener('click',()=>action(async()=>{const r=await send({type:'tab-state'});$('restore-panel').hidden=false;$('blocks').replaceChildren();for(const frame of r.frames)for(const b of frame.blocks || []){const opt=document.createElement('option');opt.value=JSON.stringify({frameId:frame.frameId,id:b.id,owner:b.owner});opt.textContent=`${b.tag}: ${b.owner==='universal'?'визуальный фильтр':'правило Дзена'} (${b.id})`;$('blocks').append(opt);}show($('blocks').options.length?'Выберите элемент и нажмите «Вернуть элемент».':'Доступных для восстановления элементов нет. Можно выключить защиту на сайте.');}));
  $('blocks').addEventListener('change',render);
  $('restore').addEventListener('click',()=>action(async()=>{const target=JSON.parse($('blocks').value);const r=await chrome.tabs.sendMessage(tab.id,{type:target.owner==='universal'?'restore-universal':'restore-block',id:target.id},{frameId:target.frameId});if(!r?.ok)throw new Error(r?.error || 'Элемент изменился. Обновите список.');$('blocks').replaceChildren();$('restore-panel').hidden=true;show('Элемент возвращён. Исключение сохранено для этой страницы.');}));
  $('add-exception').addEventListener('click',()=>action(async()=>{const selector=$('selector').value.trim();if(!selector)throw new Error('Введите CSS-селектор');const [r]=await chrome.scripting.executeScript({target:{tabId:tab.id},args:[selector],func:selector=>{try{document.querySelector(selector);return {hostname:location.hostname,path:location.pathname};}catch{return null;}}});if(!r?.result)throw new Error('Некорректный селектор');await send({type:'add-exception',exception:{...r.result,selector,hosts:[]}});$('selector').value='';show('Исключение сохранено.');}));
  $('update').addEventListener('click',()=>action(async()=>{show('Проверяем исправления…');await send({type:'update-rules'});show('Исправления проверены.');}));
  $('rollback').addEventListener('click',()=>action(async()=>{await send({type:'rollback-rules'});show('Возвращён предыдущий комплект исправлений.');}));
  $('reload').addEventListener('click',()=>action(async()=>{await chrome.tabs.reload(tab.id);show('Страница обновлена.');}));
  $('diagnostics').addEventListener('click',()=>action(async()=>{const r=await send({type:'diagnostics'});const url=URL.createObjectURL(new Blob([JSON.stringify(r.report,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='dzen-clean-diagnostics.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);show('Диагностика сохранена локально.');}));
  chrome.storage.onChanged.addListener(changes=>{if(changes.settings || changes.filterStatus || changes.filterCache)void refresh().catch(()=>{});});
  (async()=>{try{[tab]=await chrome.tabs.query({active:true,currentWindow:true});await refresh();show(state.capabilities.error || (state.tab.supported && !state.tab.access?'Ограниченный режим: нет доступа для визуальной фильтрации. Проверьте разрешения расширения.':'Настройки применяются автоматически.'),!!state.capabilities.error);}catch(e){show(e.message,true);}})();
})();
