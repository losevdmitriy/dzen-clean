import {RuleParser} from '@adguard/agtree/parser';
export const sources = Object.freeze([
  {id: 'ru-css', url: 'https://raw.githubusercontent.com/easylist/ruadlist/master/css-fixes-experimental.txt', license: 'RU AdList / see THIRD_PARTY.md'},
  {id: 'ru-servers', url: 'https://raw.githubusercontent.com/easylist/ruadlist/master/advblock/adservers.txt', license: 'RU AdList / see THIRD_PARTY.md'},
  {id: 'ru-exceptions', url: 'https://raw.githubusercontent.com/easylist/ruadlist/master/advblock/whitelist.txt', license: 'RU AdList / see THIRD_PARTY.md'},
  {id: 'ag-russian', url: 'https://raw.githubusercontent.com/AdguardTeam/AdguardFilters/master/CyrillicFilters/RussianFilter/sections/antiadblock.txt', license: 'GPL-3.0'},
  {id: 'ag-popups', url: 'https://raw.githubusercontent.com/AdguardTeam/AdguardFilters/master/AnnoyancesFilter/Popups/sections/antiadblock.txt', license: 'GPL-3.0'}
]);
const isDzen = h => h === 'dzen.ru' || h.endsWith('.dzen.ru');
const resources = {script:'script', image:'image', stylesheet:'stylesheet', font:'font', media:'media', xmlhttprequest:'xmlhttprequest', xhr:'xmlhttprequest', subdocument:'sub_frame', ping:'ping', websocket:'websocket', other:'other'};
const defaultResources = [...new Set(Object.values(resources))];
function nativeSelector(selector) {
  const stack=[];let quote='',escaped=false,stripped='';
  for(const char of selector) {
    if(escaped){escaped=false;continue;}if(char==='\\'){escaped=true;continue;}
    if(quote){if(char===quote)quote='';continue;}
    if(char==='"' || char==="'"){quote=char;continue;}
    stripped+=char;
    if(char==='(' || char==='[')stack.push(char);
    if(char===')' && stack.pop()!=='(' || char===']' && stack.pop()!=='[')return false;
  }
  if(quote || escaped || stack.length || /::|,\s*$|^\s*,/.test(stripped))return false;
  const pseudos=new Set('not is where has empty root first-child last-child only-child nth-child nth-last-child first-of-type last-of-type only-of-type nth-of-type nth-last-of-type scope lang dir checked disabled enabled any-link link visited hover active focus focus-within focus-visible read-only read-write placeholder-shown required optional valid invalid default indeterminate target fullscreen'.split(' '));
  return [...stripped.matchAll(/:([a-z-]+)/gi)].every(match=>pseudos.has(match[1].toLowerCase()));
}
function domains(items,global=false) {
  const include = [], exclude = [];
  for (const item of items) {
    const name = typeof item === 'string' ? item.replace(/^~/, '') : item.value;
    const negated = typeof item === 'string' ? item.startsWith('~') : item.exception;
    if (!/^[a-z0-9.-]+$/i.test(name)) return null;
    (negated ? exclude : include).push(name.toLowerCase());
  }
  if (!global && exclude.includes('dzen.ru')) return null;
  const included = global ? include : include.filter(isDzen);
  if (include.length && !included.length) return null;
  return {include: included.length ? included : global ? [] : ['dzen.ru'], exclude: global ? exclude : exclude.filter(isDzen)};
}
function network(ast, origin,global=false) {
  const pattern = ast.pattern.value;
  if (!/^\|\|[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\^|\/)/i.test(pattern) || pattern.length > 1000) return null;
  if(global && !(ast.modifiers?.children || []).some(m=>['domain','from'].includes(m.name.value) && m.value?.value))return null;
  const condition = {urlFilter: pattern, initiatorDomains: ['dzen.ru'], excludedInitiatorDomains: ['sso.dzen.ru', 'passport.dzen.ru', 'auth.dzen.ru'], resourceTypes: [...defaultResources]};
  let important = false;
  const includedTypes = [], excludedTypes = [];
  for (const mod of ast.modifiers?.children || []) {
    const name = mod.name.value.toLowerCase();
    if (resources[name]) {(mod.exception ? excludedTypes : includedTypes).push(resources[name]); continue;}
    if (mod.exception) return null;
    if (name === 'domain' || name === 'from') {
      const scope = domains((mod.value?.value || '').split('|'),global);
      if (!scope || global && !scope.include.length) return null;
      condition.initiatorDomains = scope.include;
      condition.excludedInitiatorDomains = [...new Set([...condition.excludedInitiatorDomains, ...scope.exclude])];
    } else if (name === 'third-party' || name === '3p') condition.domainType = 'thirdParty';
    else if (name === 'first-party' || name === '1p') condition.domainType = 'firstParty';
    else if (name === 'match-case') condition.isUrlFilterCaseSensitive = true;
    else if (name === 'important') important = true;
    else return null;
  }
  condition.resourceTypes = (includedTypes.length ? [...new Set(includedTypes)] : defaultResources).filter(x => !excludedTypes.includes(x));
  if (!condition.resourceTypes.length) return null;
  return {priority: important ? (ast.exception ? 400 : 300) : (ast.exception ? 200 : 100), action: {type: ast.exception ? 'allow' : 'block'}, condition, origin,...(global ? {text:ast.raws.text} : {})};
}
export function compile(text, sourceId,options={}) {
  const global=options.scope==='global';
  if (typeof text !== 'string' || text.length > 3 * 1024 * 1024 || /<\s*(!doctype|html|script)\b/i.test(text.slice(0, 500))) throw new Error('Invalid filter response');
  const cosmetic = [], net = [], stats = {lines: 0, cosmetic: 0, network: 0, unsupported: 0, invalid: 0};
  let depth = 0;
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = raw.trim(); stats.lines++;
    // Skip all conditional branches: never apply another product's rules.
    if (/^!#if\b/.test(line)) {depth++; continue;}
    if (/^!#endif\b/.test(line)) {if (!depth) throw new Error('Unbalanced filter conditional'); depth--; continue;}
    if (depth || !line || line.startsWith('!') || line.startsWith('[')) continue;
    if (line.length > 2000) {stats.unsupported++; continue;}
    if (!global && line.includes('#') && !line.includes('dzen.ru')) continue;
    let ast;
    try {ast = RuleParser.parse(line);} catch {stats.invalid++; continue;}
    const origin = {source: sourceId, line: index + 1};
    if (ast.type === 'ElementHidingRule' && ['##', '#@#'].includes(ast.separator.value)) {
      const scope = domains(ast.domains.children,global), selector = ast.body.selectorList.value;
      if (!scope || !ast.domains.children.some(x => !x.exception && (global || isDzen(x.value))) || selector.length > 700 ||
          /[{};\u0000-\u001f]|:(?:style|remove|contains|has-text|matches-|xpath|watch-attr)|:-(?:abp|ext)-/i.test(selector) ||
          /\b(?:html|body|main|header|nav|footer)\s*$/i.test(selector)) {stats.unsupported++; continue;}
      if(!nativeSelector(selector)){stats.invalid++;continue;}
      cosmetic.push({id: `${sourceId}:${index + 1}`, selector, domains: scope.include, excluded: scope.exclude, exception: ast.exception, origin,...(global ? {text:ast.raws.text} : {})}); stats.cosmetic++;
    } else if (ast.type === 'NetworkRule') {
      const rule = network(ast, origin,global); if (rule) {net.push(rule); stats.network++;} else stats.unsupported++;
    } else if (ast.category !== 'Comment' && ast.category !== 'Empty') stats.unsupported++;
  }
  if (depth) throw new Error('Unbalanced filter conditional');
  if (stats.invalid > Math.max(20, stats.lines * 0.1)) throw new Error('Too many malformed rules');
  return {cosmetic, network: net, stats};
}
export function merge(parts) {
  const css = new Map(), net = new Map();
  for (const part of parts) {
    for (const rule of part.cosmetic) css.set(JSON.stringify([rule.selector,rule.domains,rule.excluded,rule.exception]), rule);
    for (const rule of part.network) net.set(JSON.stringify([rule.priority,rule.action,rule.condition]), rule);
  }
  const cosmetic = [...css.values()], network = [...net.values()];
  if (cosmetic.length > 9000 || network.length > 12000) throw new Error('Filter set exceeds local limits');
  return {cosmetic, network};
}
