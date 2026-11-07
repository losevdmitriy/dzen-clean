import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const tooling=path.resolve(process.env.DZEN_TOOLING || root);
const apiFolder=path.dirname(fs.realpathSync(path.join(tooling,'node_modules/@adguard/api-mv3/package.json')));
const tsFolder=fs.realpathSync(path.resolve(apiFolder,'../tswebextension'));
const dnr=fs.realpathSync(path.join(tooling,'node_modules/@adguard/dnr-rulesets'));
const assets=path.join(dnr,'dist/filters/chromium-mv3');
const dest=path.join(root,'engine-filters');fs.mkdirSync(dest,{recursive:true});
const checksums={},compatibility=[];
for(const id of [1,2]) {
  const folder=path.join(dest,'declarative',`ruleset_${id}`);fs.mkdirSync(folder,{recursive:true});
  const name=`ruleset_${id}.json`;
  // Pinned dnr-rulesets 5 uses the legacy metadata envelope. API 3 /
  // converter 2 requires chunked metadata. Preserve rule IDs and source maps.
  const input=JSON.parse(fs.readFileSync(path.join(assets,'declarative',`ruleset_${id}`,name),'utf8'));
  const metadata=input.find(r=>r.metadata).metadata;
  // Header-matching conditions require Chromium 128. Omit whole rules;
  // stripping the condition would broaden a block on Chromium 121.
  const incompatible=input.filter(r=>!r.metadata && (r.condition.responseHeaders || r.condition.excludedResponseHeaders));
  const ordinary=input.filter(r=>!r.metadata && !incompatible.includes(r));
  compatibility.push({filterId:id,omittedRuleIds:incompatible.map(r=>r.id),reason:'responseHeaders conditions require Chromium 128'});
  metadata.metadata.safeRulesCount-=incompatible.filter(r=>r.action.type==='block' || r.action.type==='allow' || r.action.type==='allowAllRequests' || r.action.type==='upgradeScheme').length;
  fs.mkdirSync(path.join(root,'data/source-files'),{recursive:true});
  fs.writeFileSync(path.join(root,'data/source-files',`adguard-filter-${id}.txt`),metadata.filterContent);
  const used=new Set(ordinary.map(r=>r.id)),text=JSON.stringify(metadata),chunks=[];let nextId=1;
  for(let offset=0;offset<text.length;offset+=10000){while(used.has(nextId))nextId++;chunks.push({id:nextId++,action:{type:'block'},condition:{urlFilter:'dummy.rule.adguard.com',resourceTypes:['xmlhttprequest']},metadata:{chunk:text.slice(offset,offset+10000)}});}
  const output=JSON.stringify([...chunks,...ordinary]);fs.writeFileSync(path.join(folder,name),output);
  checksums[`ruleset_${id}`]=createHash('md5').update(output).digest('hex');
}
fs.writeFileSync(path.join(dest,'compatibility-121.json'),JSON.stringify(compatibility,null,2));
const {MetadataRuleset}=await import(pathToFileURL(path.join(tooling,'node_modules/@adguard/dnr-converter/dist/index.js')).href);
const oldMetadata=JSON.parse(fs.readFileSync(path.join(assets,'declarative/ruleset_0/ruleset_0.json'),'utf8'))[0].metadata;
oldMetadata.additionalProperties.metadata.filters=oldMetadata.additionalProperties.metadata.filters.filter(f=>[1,2].includes(f.filterId));
fs.mkdirSync(path.join(dest,'declarative/ruleset_0'),{recursive:true});
fs.writeFileSync(path.join(dest,'declarative/ruleset_0/ruleset_0.json'),new MetadataRuleset(checksums,oldMetadata.additionalProperties).serialize());
for(const name of ['filters_i18n.json','local_script_rules.js','local_script_rules.json'])fs.copyFileSync(path.join(assets,name),path.join(dest,name));
const {copyWar}=await import(pathToFileURL(path.join(tsFolder,'dist/cli.js')).href);
await copyWar(path.join(root,'web-accessible-resources'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.json'),'utf8'));
manifest.declarative_net_request={rule_resources:[0,1,2].map(id=>({id:`ruleset_${id}`,enabled:false,path:`engine-filters/declarative/ruleset_${id}/ruleset_${id}.json`}))};
fs.writeFileSync(path.join(root,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
fs.mkdirSync(path.join(root,'licenses'),{recursive:true});
for(const [name,folder] of [['api-mv3',apiFolder],['tswebextension',tsFolder],['dnr-rulesets',dnr]])fs.copyFileSync(path.join(folder,'LICENSE'),path.join(root,'licenses',name+'-LICENSE.txt'));
console.log('Copied pinned Base (2), Russian (1), metadata (0), packaged script rules and redirect resources');
