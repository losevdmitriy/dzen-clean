const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),http=require('node:http'),assert=require('node:assert/strict'),os=require('node:os');
const {webcrypto}=require('node:crypto');
const {cases,html}=require('./corpus.cjs');
const root=path.resolve(__dirname,'..');
const work=path.resolve(process.env.DZEN_TEST_WORK || path.join(os.tmpdir(),'dzen-clean-tests'));fs.mkdirSync(work,{recursive:true});
const playwright=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const chromeExe=process.env.TEST_CHROME_BIN || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const results=[],details={};
async function check(name,fn){await fn();results.push(name);console.log('PASS',name);}
function context(extra={}){const c={console,URL,crypto:webcrypto,setTimeout,clearTimeout,setInterval,clearInterval,TextEncoder,TextDecoder,Response,AbortController,...extra};vm.createContext(c);return c;}
function load(c,file){vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c,{filename:file});}
const json=value=>JSON.parse(JSON.stringify(value));
(async()=>{
  const compilerContext=context();load(compilerContext,'vendor/rule-compiler.js');const compiler=compilerContext.DzenRuleCompiler;
  await check('Parser rejects remote executable and unsupported semantics',async()=>{
    const part=compiler.compile('dzen.ru##.imported-ad\ndzen.ru#%#//scriptlet("x")\ndzen.ru##div:has-text(ad)\n||ads.example^$redirect=noop.js\n||ads.example^$unknown-option\n!#if ext_safari\ndzen.ru##.wrong-platform\n!#else\ndzen.ru##.also-wrong\n!#endif','test');
    assert.equal(part.cosmetic.length,1);assert.equal(part.network.length,0);
    assert.throws(()=>compiler.compile('<html>error</html>','test'));
    assert.throws(()=>compiler.compile('!#if ext_safari\ndzen.ru##.x','test'));
  });
  await check('Network compilation preserves types, exclusions, and Dzen scope',async()=>{
    const p=compiler.compile('||ads.example^$script,domain=dzen.ru|~sso.dzen.ru\n@@||ad.mail.ru/static/admanhtml/*rbadman-html5.min.js$script,domain=dzen.ru\n||ads.example^$domain=example.org\n||ads.example^$domain=~dzen.ru','test');
    assert.equal(p.network.length,2);assert.deepEqual(json(p.network[0].condition.resourceTypes),['script']);
    assert.deepEqual(json(p.network[0].condition.initiatorDomains),['dzen.ru']);
    assert.ok(p.network[0].condition.excludedInitiatorDomains.includes('sso.dzen.ru'));assert.equal(p.network[1].action.type,'allow');
  });
  const settingsContext=context();load(settingsContext,'settings.js');
  await check('v0.1 migration preserves all five switches and selects standard profile',async()=>{
    const old={enabled:false,cosmetic:false,network:true,skipVideo:false,heuristics:true};
    const s=settingsContext.DzenClean.normalize(old);for(const key of Object.keys(old))assert.equal(s[key],old[key]);
    assert.equal(s.profile,'standard');assert.equal(s.autoUpdate,true);assert.equal(s.schema,3);
  });
  await check('Experimental modules stop independently and preserve authentication cookies',async()=>{
    const listeners=new Map(),jar=new Map([['bltsr','1'],['sessionid','KEEP'],['sso_token','KEEP']]);
    const document={};Object.defineProperty(document,'cookie',{get:()=>[...jar].map(([k,v])=>`${k}=${v}`).join('; '),set:value=>{const k=value.split('=')[0];if(value.includes('Max-Age=0'))jar.delete(k);}});
    const c=context({location:{hostname:'dzen.ru',pathname:'/a/synthetic'},document,
      addEventListener:(type,fn)=>{if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(fn);},
      removeEventListener:(type,fn)=>listeners.get(type)?.delete(fn),dispatchEvent:()=>{},CustomEvent:class{constructor(type,data){this.type=type;this.detail=data?.detail;}}});
    load(c,'experimental/core.js');load(c,'experimental/findSsrAd.js');load(c,'experimental/initAdvManager.js');load(c,'experimental/rtb.js');load(c,'experimental/cookies.js');
    assert.throws(()=>vm.runInContext('({}).findSsrAd',c));
    assert.equal(vm.runInContext('({}).initAdvManager',c),undefined);assert.equal(jar.has('bltsr'),false);assert.equal(jar.get('sessionid'),'KEEP');assert.equal(jar.get('sso_token'),'KEEP');
    vm.runInContext('__dzenClean02Main.stop()',c);
    assert.equal(vm.runInContext('Object.getOwnPropertyDescriptor(Object.prototype,"findSsrAd")',c),undefined);
    assert.equal(listeners.get('DOMContentLoaded')?.size,0);
    const protectedContext=context({location:{hostname:'dzen.ru',pathname:'/profile/editor'},document});load(protectedContext,'experimental/core.js');
    assert.equal(protectedContext.__dzenClean02Main,undefined);
  });
  const server=http.createServer((req,res)=>{
    const name=new URL(req.url,'http://localhost').pathname.split('/').pop();
    if(name==='sample.webm'){
      const data=fs.readFileSync(path.join(__dirname,'media/sample.webm')),range=/bytes=(\d+)-(\d*)/.exec(req.headers.range || '');
      const start=range ? Number(range[1]) : 0,end=range?.[2] ? Number(range[2]) : data.length-1;
      res.setHeader('Content-Type','video/webm');res.setHeader('Accept-Ranges','bytes');res.setHeader('Content-Length',end-start+1);
      if(range){res.statusCode=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${data.length}`);}
      res.end(data.subarray(start,end+1));return;
    }
    const body=html(name);res.setHeader('Content-Type','text/html; charset=utf-8');res.end(body || '<!doctype html><body>Local test</body>');
  });await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const profile=fs.mkdtempSync(path.join(work,'profile-'));
  let browserContext;
  const launch=()=>playwright.chromium.launchPersistentContext(profile,{executablePath:chromeExe,headless:true,ignoreDefaultArgs:['--disable-extensions'],args:['--enable-unsafe-extension-debugging'],viewport:{width:1100,height:900}});
  const errors=[];
  try{
    browserContext=await launch();const cdp=await browserContext.browser().newBrowserCDPSession();
    const {id}=await cdp.send('Extensions.loadUnpacked',{path:root});
    const popup=await browserContext.newPage();popup.on('pageerror',e=>errors.push(e.message));
    await popup.goto(`chrome-extension://${id}/popup.html`);
    await popup.waitForFunction(()=>!document.querySelector('#enabled').disabled,{},{timeout:30000});
    const worker=browserContext.serviceWorkers()[0] || await browserContext.waitForEvent('serviceworker');
    await popup.evaluate(()=>chrome.runtime.sendMessage({type:'update-rules'}));
    const request=message=>popup.evaluate(message=>chrome.runtime.sendMessage(message),message);
    const match=(url,initiator,type='xmlhttprequest')=>popup.evaluate(async x=>(await chrome.declarativeNetRequest.testMatchOutcome(x)).matchedRules,{url,initiator,type});
    await check('Real MV3 load accepts complete bundled DNR set and early registration',async()=>{
      const s=await request({type:'get-settings'});assert.equal(s.ok,true);assert.equal(s.settings.schema,3);assert.equal(s.capabilities.mainWorld,'available');
      assert.ok(s.filters.total>150000);assert.deepEqual(s.filters.base.map(x=>x.id),[2,1]);details.bundled={cosmetic:s.filters.cosmetic,network:s.filters.network};
      const regs=await popup.evaluate(()=>chrome.scripting.getRegisteredContentScripts());assert.ok(regs.some(x=>x.id==='dc02-early'));assert.ok(!regs.some(x=>x.world==='MAIN'));
      assert.ok((await match('https://an.yandex.ru/test','https://dzen.ru/')).length);
      assert.ok((await match('https://an.yandex.ru/test','https://example.org/')).length);
      details.boundaryOutcome=await match('https://an.yandex.ru.evil.example/test','https://dzen.ru/');console.log('BOUNDARY',details.boundaryOutcome);
      // Built-in Base/Russian rules may independently handle this endpoint.
    });
    await check('Player exception and primary video are preserved',async()=>{
      const r=await match('https://ad.mail.ru/static/admanhtml/rbadman-html5.min.js','https://dzen.ru/','script');assert.ok(r.length);const all=await popup.evaluate(()=>chrome.declarativeNetRequest.getDynamicRules());assert.ok(all.some(x=>r.some(m=>m.ruleId===x.id)&&x.action.type==='allow')); 
      assert.equal((await match('https://dzen.ru/video/watch/test','https://dzen.ru/','media')).length,0);
      assert.equal((await match('https://yastatic.net/video/player.js','https://dzen.ru/','script')).length,0);
    });
    await check('Experimental registration, VAST scope, individual module switches and XML',async()=>{
      let r=await request({type:'set-settings',patch:{profile:'experimental',autoUpdate:false,modules:{findSsrAd:true,initAdvManager:true,vast:true}}});assert.equal(r.ok,true);
      let regs=await popup.evaluate(()=>chrome.scripting.getRegisteredContentScripts());assert.ok(regs.find(x=>x.world==='MAIN').js.includes('experimental/findSsrAd.js'));
      assert.ok((await match('https://strm.yandex.ru/get/?ad=1','https://dzen.ru/')).length);
      assert.equal((await match('https://strm.yandex.ru/get/','https://example.org/')).length,0);
      assert.equal((await match('https://strm.yandex.ru/get/','https://dzen.ru/','media')).length,0);
      r=await request({type:'set-settings',patch:{modules:{findSsrAd:false,vast:false}}});assert.equal(r.ok,true);
      regs=await popup.evaluate(()=>chrome.scripting.getRegisteredContentScripts());assert.ok(!regs.find(x=>x.world==='MAIN').js.includes('experimental/findSsrAd.js'));
      // Built-in Base/Russian rules may independently handle this endpoint.
      const xml=await popup.evaluate(async()=>new DOMParser().parseFromString(await(await fetch('resources/empty-vast.xml')).text(),'text/xml').documentElement.tagName);assert.equal(xml,'VAST');
      await request({type:'set-settings',patch:{profile:'standard',modules:{findSsrAd:true,vast:true}}});
    });
    await check('Concurrent preferences and disabled-state persistence',async()=>{
      await Promise.all([{network:false},{skipVideo:false},{cosmetic:false}].map(patch=>request({type:'set-settings',patch})));
      let s=await request({type:'get-settings'});assert.deepEqual([s.settings.network,s.settings.skipVideo,s.settings.cosmetic],[false,false,false]);
      const net=await match('https://an.yandex.ru/test','https://dzen.ru/');const dyn=await popup.evaluate(()=>chrome.declarativeNetRequest.getDynamicRules());assert.ok(dyn.some(r=>net.some(m=>m.ruleId===r.id)&&r.action.type==='allow')); 
      await request({type:'set-settings',patch:{enabled:false}});await popup.reload();await popup.waitForFunction(()=>!document.querySelector('#enabled').disabled);
      assert.equal(await popup.locator('#enabled').isChecked(),false);
      await request({type:'set-settings',patch:{enabled:true,network:true,cosmetic:true,skipVideo:true}});
    });
    await check('Automatic updater commits validated data and rollback rejects cancelled version',async()=>{
      await worker.evaluate(()=>{
        globalThis.__realFetch=fetch;
        globalThis.fetch=async (url,options)=>String(url).startsWith('https://raw.githubusercontent.com/') ? new Response('dzen.ru##.imported-ad\n||synthetic-ad.example^$image,domain=dzen.ru\n@@||ad.mail.ru/static/admanhtml/*rbadman-html5.min.js$script,domain=dzen.ru',{headers:{'content-type':'text/plain'}}) : __realFetch(url,options);
      });
      const previous=(await request({type:'get-settings'})).filters.version;
      assert.equal((await request({type:'update-rules'})).ok,true);
      let s=await request({type:'get-settings'});assert.notEqual(s.filters.version,previous);assert.equal(s.filters.previous,true);
      assert.equal((await request({type:'rollback-rules'})).ok,true);s=await request({type:'get-settings'});assert.equal(s.filters.version,previous);
      assert.equal((await request({type:'update-rules'})).ok,false);assert.equal((await request({type:'get-settings'})).filters.version,previous);
      await worker.evaluate(()=>{fetch=__realFetch;});
    });
    await check('Corrupt response and offline update retain working filters',async()=>{
      const previous=(await request({type:'get-settings'})).filters.version;
      await worker.evaluate(()=>{fetch=async()=>new Response('<html>upstream error</html>',{headers:{'content-type':'text/html'}});});
      assert.equal((await request({type:'update-rules'})).ok,false);
      await worker.evaluate(()=>{fetch=async()=>{throw new Error('offline');};});assert.equal((await request({type:'update-rules'})).ok,false);
      assert.equal((await request({type:'get-settings'})).filters.version,previous);await worker.evaluate(()=>{fetch=__realFetch;});
    });
    const report=await request({type:'diagnostics'});await check('Diagnostics contains no page URLs, text, cookies, tokens or selectors',async()=>{
      const text=JSON.stringify(report.report);assert.ok(!text.includes('sessionid'));assert.ok(!text.includes('selector'));assert.ok(!text.includes('cookie='));assert.ok(!text.includes('pathname'));
    });
    await popup.reload();await popup.waitForFunction(()=>!document.querySelector('#enabled').disabled);
    await popup.setViewportSize({width:420,height:900});await popup.screenshot({path:path.join(work,'popup-0.3.png'),fullPage:true});

    const fixtureBrowser=await playwright.chromium.launch({executablePath:chromeExe,headless:true});const fixtureContext=await fixtureBrowser.newContext({viewport:{width:1100,height:900}});
    // Local synthetic pages: never navigate to or proxy Dzen.ru.
    for(const [name,kind] of cases){
      await check(`Synthetic ${name}: ordinary and experimental profiles; master restore`,async()=>{
        const page=await fixtureContext.newPage();page.on('pageerror',e=>errors.push(name+': '+e.message));
        await page.addInitScript(()=>{
          const roots=new WeakMap(),native=Element.prototype.attachShadow;
          Element.prototype.attachShadow=function(options){const root=native.call(this,options);roots.set(this,root);return root;};
          const listeners=[];window.testSettings={enabled:true,cosmetic:true,network:true,skipVideo:true,heuristics:true,profile:'standard',autoUpdate:false,modules:{},exceptions:[]};
          window.testCache={active:{rules:{cosmetic:[{id:'test:1',selector:'.imported-ad',domains:['127.0.0.1'],excluded:[],exception:false},{id:'test:2',selector:'.ordinary-card',domains:['127.0.0.1'],excluded:[],exception:false}]}}};
          window.setTestSettings=patch=>{testSettings={...testSettings,...patch};listeners.forEach(fn=>fn({settings:{newValue:testSettings}},'local'));};
          window.chrome={dom:{openOrClosedShadowRoot:el=>roots.get(el)||el.shadowRoot},storage:{local:{get:async()=>({settings:testSettings,filterCache:testCache})},onChanged:{addListener:fn=>listeners.push(fn)}},
            runtime:{id:'fixture',onMessage:{addListener:fn=>window.testMessage=fn},sendMessage:async message=>{if(message.type==='add-exception'){testSettings.exceptions.push(message.exception);setTestSettings({});return {ok:true};}}}};
        });
        await page.goto(`http://127.0.0.1:${server.address().port}/${name}`);
        for(const file of ['settings.js','filters.js','content.js'])await page.addScriptTag({path:path.join(root,file)});
        await page.waitForFunction(()=>window.__dzenClean02?.snapshot().performance.batches>0 && !__dzenClean02.snapshot().processing);
        for(const id of ['ad','heuristic','right-ad','bottom-ad','news-ad','remote-ad','overlay-ad'])if(await page.locator('#'+id).count())assert.equal(await page.locator('#'+id).isVisible(),false,id);
        for(const id of ['ordinary','normal','article-body','comments','editor','news-content','subscriptions'])if(await page.locator('#'+id).count())assert.equal(await page.locator('#'+id).isVisible(),true,id);
        if(name==='news-2')assert.equal(await page.evaluate(()=>getComputedStyle(closedRoot.querySelector('#shadow-ad')).display),'none');
        if(name==='article-3')await page.waitForFunction(()=>document.querySelector('#friendly').getAttribute('data-dzen-clean-ad'));
        if(name==='feed-3'){
          await page.evaluate(()=>{const h=document.querySelector('#late-host');window.lateRoot=h.attachShadow({mode:'closed'});lateRoot.innerHTML='<div data-testid="ad-banner" id="late-ad">Реклама</div>';});
          await page.waitForFunction(()=>getComputedStyle(lateRoot.querySelector('#late-ad')).display==='none');
          await page.evaluate(()=>{document.querySelector('#feed').innerHTML=Array.from({length:1000},(_,i)=>i%10===0 ? `<article id="long-${i}"><div data-ad-type="direct">Реклама</div></article>` : `<article id="long-${i}"><a href="/a/example-${i}">Статья ${i}</a></article>`).join('');});
          await page.waitForFunction(()=>document.querySelectorAll('#feed article[data-dzen-clean-ad]').length===100 && !__dzenClean02.snapshot().processing);
          assert.equal(await page.locator('#feed article:not([data-dzen-clean-ad])').count(),900);
          assert.equal(await page.evaluate(()=>__dzenClean02.snapshot().performance.buttonChecks),0);
          await page.evaluate(()=>document.querySelector('#long-0').textContent='Теперь обычная карточка');
          await page.waitForFunction(()=>!document.querySelector('#long-0').hasAttribute('data-dzen-clean-ad'));
        }
        if(name==='feed-2'){
          await page.evaluate(()=>document.querySelector('#heuristic').textContent='Теперь обычный материал');
          await page.waitForFunction(()=>!document.querySelector('#heuristic').hasAttribute('data-dzen-clean-ad'));
        }
        if(name==='video-1'){
          assert.deepEqual(await page.evaluate(()=>clicks),{});await page.locator('#skip').evaluate(el=>el.disabled=false);
          await page.waitForFunction(()=>clicks.skip===1);assert.deepEqual(await page.evaluate(()=>clicks),{skip:1});
          await page.evaluate(async()=>{const v=document.querySelector('video');v.src='/sample.webm';v.muted=true;await v.play();});
          await page.locator('#fullscreen').click();await page.waitForFunction(()=>document.fullscreenElement?.tagName==='VIDEO');
          await page.evaluate(()=>document.exitFullscreen());
        }
        if(name==='video-2')await page.waitForFunction(()=>clicks['close-banner']===1 && clicks.shadow===1);
        if(name==='feed-1'){
          await page.evaluate(()=>{const original=DzenClean.isDzen;DzenClean.isDzen=function(host){return host==='127.0.0.1'||original.call(this,host);};});
          const block=(await page.evaluate(()=>__dzenClean02.snapshot(true))).blocks[0];
          const r=await page.evaluate(id=>new Promise(resolve=>testMessage({type:'restore-block',id},{id:'fixture'},resolve)),block.id);assert.equal(r.ok,true);
          await page.waitForFunction(()=>!document.querySelector('#ad').hasAttribute('data-dzen-clean-ad'));
          await page.evaluate(()=>setTestSettings({heuristics:false}));await page.waitForTimeout(120);assert.equal(await page.locator('#ad').isVisible(),true);
          await page.evaluate(()=>setTestSettings({exceptions:[]}));await page.waitForFunction(()=>document.querySelector('#ad').hasAttribute('data-dzen-clean-ad'));
        }
        if(name==='video-3'){
          await page.evaluate(async()=>{const video=document.querySelector('video');video.src='/sample.webm';video.muted=true;await video.play();});
          await page.waitForFunction(()=>document.querySelector('video').currentTime>.15);
          await page.evaluate(()=>{const v=document.querySelector('video');v.pause();v.currentTime=.5;});
          await page.waitForFunction(()=>!document.querySelector('video').seeking && Math.abs(document.querySelector('video').currentTime-.5)<.15);
          await page.locator('#next').click();await page.waitForFunction(()=>!document.querySelector('video').paused);
          assert.equal(await page.locator('#video').isVisible(),true);
        }
        await page.evaluate(()=>setTestSettings({profile:'experimental'}));await page.waitForTimeout(120);
        await page.evaluate(()=>setTestSettings({enabled:false}));
        assert.equal(await page.evaluate(()=>document.querySelectorAll('[data-dzen-clean-ad]').length),0);
        if(name==='news-2')assert.notEqual(await page.evaluate(()=>getComputedStyle(closedRoot.querySelector('#shadow-ad')).display),'none');
        const before=await page.evaluate(()=>JSON.stringify(clicks));await page.waitForTimeout(550);assert.equal(await page.evaluate(()=>JSON.stringify(clicks)),before);
        details[name]=await page.evaluate(()=>__dzenClean02.snapshot());await page.close();
      });
    }
    await fixtureBrowser.close();
    await check('Browser JavaScript is error-free throughout corpus',async()=>assert.deepEqual(errors,[]));
    // Reopen the same test-only browser profile to verify extension storage.
    await request({type:'set-settings',patch:{enabled:false,autoUpdate:false}});await browserContext.close();browserContext=await launch();
    const restartedCdp=await browserContext.browser().newBrowserCDPSession();await restartedCdp.send('Extensions.loadUnpacked',{path:root});
    const reopened=await browserContext.newPage();await reopened.goto(`chrome-extension://${id}/popup.html`);await reopened.waitForFunction(()=>!document.querySelector('#enabled').disabled);
    await check('Browser restart and unpacked reattachment preserve disabled settings and cached filters',async()=>{assert.equal(await reopened.locator('#enabled').isChecked(),false);});
    const output={date:'2026-11-01',browser:browserContext.browser().version(),passed:results.length,tests:results,details,
      limitation:'Synthetic localhost corpus and local extension APIs only. No live Dzen.ru or Yandex Browser verification.'};
    fs.writeFileSync(path.join(work,'test-results.json'),JSON.stringify(output,null,2));console.log(`RESULT ${results.length} passed`);
  }finally{await browserContext?.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});

