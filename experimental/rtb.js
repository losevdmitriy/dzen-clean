(() => {
  const api=globalThis.__dzenClean02Main;if(!api)return;
  const apply=()=>{if(/^\/(a|b|media|video|embed|shorts)(\/|$)/.test(location.pathname))api.property('rtb');else api.stopModule('rtb');};
  apply();addEventListener('dzen-clean-route',apply);
  api.restore('rtb-route',()=>removeEventListener('dzen-clean-route',apply));
})();
