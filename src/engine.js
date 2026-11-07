import {AdguardApi,MESSAGE_HANDLER_NAME} from '@adguard/api-mv3';
import {localScriptRules} from '../engine-filters/local_script_rules.js';
export {MESSAGE_HANDLER_NAME};
export async function migrateLegacyRules() {
  const saved=await chrome.storage.local.get(['settings','engineMigrated03']);
  if(saved.engineMigrated03 || !saved.settings || saved.settings.schema===3)return;
  // One-time handover of the exact rule ranges owned by 0.1/0.2.
  const dynamic=(await chrome.declarativeNetRequest.getDynamicRules()).filter(r=>r.id===9001 || r.id>=10000 && r.id<39000);
  if(dynamic.length)await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:dynamic.map(r=>r.id)});
  const session=(await chrome.declarativeNetRequest.getSessionRules()).filter(r=>r.priority===40000 && r.action.type==='allow' && r.condition.tabIds?.length===1 && r.id===50000+r.condition.tabIds[0]);
  if(session.length)await chrome.declarativeNetRequest.updateSessionRules({removeRuleIds:session.map(r=>r.id)});
  await chrome.alarms.clear('dc02-filter-update');
  await chrome.storage.local.set({engineMigrated03:true});
}
export async function createEngine() {
  const api=await AdguardApi.create({localScriptRulesJs:localScriptRules});
  // API 3.0.0 hard-codes destructive cookie ageing in its default config.
  // Disable all stealth actions and reject partially applied configurations.
  const original=api.createTsWebExtensionConfiguration.bind(api);
  api.createTsWebExtensionConfiguration=async()=>{
    const config=await original();config.settings.stealthModeEnabled=false;config.settings.collectStats=false;
    config.settings.stealth.selfDestructFirstPartyCookies=false;config.settings.stealth.selfDestructThirdPartyCookies=false;
    config.settings.stealth.blockWebRTC=false;config.settings.debugScriptlets=false;return config;
  };
  for(const method of ['start','configure']) {
    const native=api.tswebextension[method].bind(api.tswebextension);
    api.tswebextension[method]=async config=>{
      const result=await native(config);
      if(result.staticFiltersStatus?.errors?.length || result.dynamicRules?.errors?.length || result.dynamicRules?.limitations?.length)throw new Error('Движок не смог применить полный комплект правил');
      return result;
    };
  }
  return api;
}
