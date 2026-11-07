import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'vendor/rule-compiler.js'),'utf8'),ctx);
const compiler=ctx.DzenRuleCompiler;
const parts=await Promise.all(compiler.sources.filter(x=>!['ru-servers','ag-popups'].includes(x.id)).map(async source=>{
  const response=await fetch(source.url);if(!response.ok)throw new Error(source.id+' '+response.status);
  const text=await response.text(),part=compiler.compile(text,source.id,{scope:'global'}),hash=createHash('sha256').update(text).digest('hex');
  fs.mkdirSync(path.join(root,'data/source-files'),{recursive:true});
  fs.writeFileSync(path.join(root,'data/source-files',source.id+'.txt'),text);
  return {source,part,hash};
}));
const rules=compiler.merge(parts.map(x=>x.part));
const version=createHash('sha256').update(parts.map(x=>`${x.source.id}:${x.hash}`).join('|')).digest('hex').slice(0,16);
fs.mkdirSync(path.join(root,'data'),{recursive:true});
fs.writeFileSync(path.join(root,'data/bundled-rules.json'),JSON.stringify({schema:3,version:'03-'+version.slice(0,13),fetchedAt:Date.now(),rules,
  sources:parts.map(x=>({id:x.source.id,hash:x.hash,license:x.source.license,stats:x.part.stats}))},null,2));
console.log(JSON.stringify({version,cosmetic:rules.cosmetic.length,network:rules.network.length,sources:parts.map(x=>({id:x.source.id,...x.part.stats}))},null,2));

