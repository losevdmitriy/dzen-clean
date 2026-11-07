(() => {
  const api = globalThis.__dzenClean02Main;
  if (!api) return;
  // Fixed advertising-cookie allowlist. No dynamically supplied cookie names.
  const allowed = new Set(['blcrm','bltsr','zmFQeXtI','JPIqApiY','computer','KIykI']);
  const clean = () => {
    const present = document.cookie.split(';').map(x => x.split('=')[0].trim()).filter(x => allowed.has(x));
    for (const name of present) for (const domain of ['', '; domain=dzen.ru', '; domain=.dzen.ru']) document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    api.report('cookies','active');
  };
  clean(); addEventListener('DOMContentLoaded',clean,{once:true});
  api.restore('cookies',() => {removeEventListener('DOMContentLoaded',clean);api.report('cookies','stopped');});
})();
