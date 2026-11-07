(() => {
  if (globalThis.__dzenClean02Main) return;
  if (!/(^|\.)dzen\.ru$/.test(location.hostname) || /^(sso|passport|auth)\./.test(location.hostname) || /^\/(profile|editor|studio|auth|login)(\/|$)/.test(location.pathname)) return;
  const restorers = new Map(), states = {};
  const report = (name,state) => {states[name]=state; dispatchEvent(new CustomEvent('dzen-clean-module',{detail:{name,state}}));};
  globalThis.__dzenClean02Main = {
    report, states,
    property(name, abortRead = false) {
      if(restorers.has(name))return;
      const target = Object.prototype, original = Object.getOwnPropertyDescriptor(target,name);
      if (original && !original.configurable) {report(name,'incompatible'); return;}
      const token = 'dc02-' + Math.random().toString(36).slice(2);
      const onError = event => {if (typeof event.message === 'string' && event.message.includes(token)) event.preventDefault();};
      const getter = () => {if (abortRead) throw new ReferenceError(token); return undefined;};
      const setter = () => {};
      Object.defineProperty(target,name,{configurable:true,enumerable:original?.enumerable || false,get:getter,set:setter});
      if (abortRead) addEventListener('error',onError);
      restorers.set(name,() => {
        // Do not overwrite a later patch installed by the site or another extension.
        if (Object.getOwnPropertyDescriptor(target,name)?.get === getter) {
          if (original) Object.defineProperty(target,name,original); else delete target[name];
        }
        removeEventListener('error',onError); report(name,'stopped');
      });
      report(name,'active');
    },
    restore(name,fn) {restorers.set(name,fn);},
    stopModule(name) {const fn=restorers.get(name);if(fn){fn();restorers.delete(name);}},
    stop() {for (const restore of restorers.values()) {try{restore();}catch{}} restorers.clear();}
  };
  addEventListener('dzen-clean-route',() => {
    if (/^\/(profile|editor|studio|auth|login)(\/|$)/.test(location.pathname)) globalThis.__dzenClean02Main.stop();
  });
})();
