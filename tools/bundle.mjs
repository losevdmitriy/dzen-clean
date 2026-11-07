import {createRequire} from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const dependencyRoot = process.env.DZEN_TOOLING ? path.resolve(process.env.DZEN_TOOLING) : root;
const esbuild = require(path.join(dependencyRoot, 'node_modules/esbuild'));
fs.mkdirSync(path.join(root, 'vendor'), {recursive: true});
const result = await esbuild.build({entryPoints:[path.join(root,'src/rule-compiler.js')], bundle:true, metafile:true,
  outfile:path.join(root,'vendor/rule-compiler.js'), format:'iife', globalName:'DzenRuleCompiler',
  platform:'browser', target:'chrome120', minify:true, legalComments:'external', nodePaths:[path.join(dependencyRoot,'node_modules')]});
console.log('Bundled local AGTree parser and restricted compiler');
const cssBridge={name:'pinned-reversible-css',setup(build){
  build.onLoad({filter:/tswebextension[\\/]dist[\\/]index\.mv3\.js$/},async ({path:filename})=>{
    let source=fs.readFileSync(filename,'utf8');
    for(const name of ['insertCSS']) {
      const needle=`await chrome.scripting.${name}(`;
      if(source.split(needle).length!==2)throw new Error('Pinned CSS bridge changed: '+name);
      source=source.replace(needle,`await globalThis.__dc${name[0].toUpperCase()+name.slice(1)}(`);
    }
    return {contents:source,loader:'js'};
  });
}};
const bundles=[result];
for(const [entry,outfile] of [['background-main','background'],['general-content','general']]){
  bundles.push(await esbuild.build({entryPoints:[path.join(root,`src/${entry}.js`)],outfile:path.join(root,`${outfile}.js`),bundle:true,metafile:true,format:'iife',platform:'browser',target:'chrome121',minify:true,legalComments:'external',define:{'process.env.NODE_ENV':'"production"'},nodePaths:[path.join(dependencyRoot,'node_modules')],plugins:[cssBridge]}));
}
const ctx={};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root,'settings.js'),'utf8'),ctx);
vm.runInContext(fs.readFileSync(path.join(root,'filters.js'),'utf8'),ctx);
const guard=ctx.DzenClean.protectedContent;
const area=ctx.DzenClean.protectedArea.split(',').map(s=>`${s.trim()},${s.trim()} *`).join(',');
const selectors=ctx.DzenClean.slots.map(s=>`:root[data-dzen-clean-early="on"] :is(${s}):not(${guard}):not(:has(${guard})):not(${area})`);
fs.writeFileSync(path.join(root,'early.css'),selectors.join(',\n')+'{display:none!important}\n');
const dependencies=new Map();
for(const input of bundles.flatMap(x=>Object.keys(x.metafile.inputs))) {
  if(!input.includes('node_modules'))continue;
  let folder=path.dirname(path.resolve(input));
  while(folder!==path.dirname(folder)){
    if(fs.existsSync(path.join(folder,'package.json')) && JSON.parse(fs.readFileSync(path.join(folder,'package.json'),'utf8')).name)break;
    folder=path.dirname(folder);
  }
  if(!fs.existsSync(path.join(folder,'package.json')))continue;
  const p=JSON.parse(fs.readFileSync(path.join(folder,'package.json'),'utf8'));
  // Include the unbundled published JavaScript sources used in this build.
  const sourceRoot=path.join(root,'third-party',p.name.replaceAll('/','-')+'-'+p.version);
  const sourceFile=path.join(sourceRoot,path.relative(folder,path.resolve(input)));
  fs.mkdirSync(path.dirname(sourceFile),{recursive:true});fs.copyFileSync(path.resolve(input),sourceFile);
  for(const name of fs.readdirSync(folder).filter(x=>/^(license|copying|readme)(\.|$)/i.test(x) || x==='package.json')){
    if(fs.statSync(path.join(folder,name)).isFile())fs.copyFileSync(path.join(folder,name),path.join(sourceRoot,name));
  }
  const file=fs.readdirSync(folder).find(x=>/^(license|copying)(\.|$)/i.test(x));
  dependencies.set(p.name,`${p.name}@${p.version} (${p.license || 'see upstream'})\n${file ? fs.readFileSync(path.join(folder,file),'utf8') : p.repository?.url || p.homepage || ''}`);
}
fs.mkdirSync(path.join(root,'licenses'),{recursive:true});
fs.writeFileSync(path.join(root,'licenses/dependencies.txt'),[...dependencies.values()].join('\n\n------------------\n\n'));
