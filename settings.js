/* Schema 3: global protection; experimental settings belong to Dzen only. */
globalThis.DzenClean = {
  defaults: Object.freeze({enabled:true,cosmetic:true,network:true,autoUpdate:true,profile:'standard',skipVideo:true,heuristics:true,
    modules:{findSsrAd:false,initAdvManager:false,rtb:false,vast:false,cookies:false},exceptions:[],disabledSites:[],
    dzen:{profile:'standard',skipVideo:true,heuristics:true,modules:{findSsrAd:false,initAdvManager:false,rtb:false,vast:false,cookies:false}}}),
  isDzen(host) { return host === 'dzen.ru' || host.endsWith('.dzen.ru'); },
  hostname(value) {try{const u=new URL('https://'+value);return u.hostname===value.toLowerCase() && !u.username && !u.password && !u.port && u.pathname==='/' ? u.hostname : null;}catch{return null;}},
  disabled(host,settings) {return settings.disabledSites.some(x=>host===x || host.endsWith('.'+x));},
  forDzen(value,host) {const s=this.normalize(value);return {...s,...s.dzen,enabled:s.enabled && !this.disabled(host,s),exceptions:s.exceptions};},
  protectedPage(url) {
    try { const u = new URL(url); return /^(sso|passport|auth)\./i.test(u.hostname) || /^\/(profile|editor|studio|auth|login)(\/|$)/i.test(u.pathname); }
    catch { return true; }
  },
  pageKind(path) {
    if (/^\/(video|embed|shorts|thematics\/video)(\/|$)/.test(path)) return 'video';
    if (/^\/(a|b|media)(\/|$)/.test(path)) return 'article';
    if (/^\/news(\/|$)/.test(path)) return 'news';
    return 'feed';
  },
  exception(value) {
    if (!value || typeof value.selector !== 'string' || !value.selector || value.selector.length > 1500 ||
        /[{};\u0000-\u001f]/.test(value.selector) || typeof value.path !== 'string' ||
        value.path.length > 1000 || !value.path.startsWith('/') || /[?#]/.test(value.path) ||
        !Array.isArray(value.hosts) || value.hosts.length > 8 ||
        value.hosts.some(x => typeof x !== 'string' || x.length > 1500 || /[{};\u0000-\u001f]/.test(x))) return null;
    return {id: typeof value.id === 'string' && /^[a-z0-9-]{1,80}$/i.test(value.id) ? value.id : crypto.randomUUID(),
      selector: value.selector, path: value.path, hosts: [...value.hosts],
      hostname: typeof value.hostname === 'string' && this.hostname(value.hostname) ? value.hostname : 'dzen.ru'};
  },
  normalize(value) {
    const result={...this.defaults,schema:3,modules:{...this.defaults.modules},exceptions:[],disabledSites:[],dzen:{...this.defaults.dzen,modules:{...this.defaults.modules}}};
    for(const key of ['enabled','cosmetic','network','autoUpdate'])if(typeof value?.[key]==='boolean')result[key]=value[key];
    const legacy=value?.schema!==3,dzen=legacy ? value : value?.dzen;
    result.dzen.profile=dzen?.profile==='experimental'?'experimental':'standard';
    for(const key of ['skipVideo','heuristics'])if(typeof dzen?.[key]==='boolean')result.dzen[key]=dzen[key];
    for(const key of Object.keys(result.modules))if(typeof dzen?.modules?.[key]==='boolean')result.dzen.modules[key]=dzen.modules[key];
    result.skipVideo=result.dzen.skipVideo;result.heuristics=result.dzen.heuristics;result.modules={...result.dzen.modules};
    if(Array.isArray(value?.disabledSites))result.disabledSites=[...new Set(value.disabledSites.filter(x=>typeof x==='string' && this.hostname(x)))].slice(0,300);
    if (Array.isArray(value?.exceptions)) result.exceptions = value.exceptions.slice(0, 100).map(x => this.exception(x)).filter(Boolean);
    return result;
  }
};
