import { getPublicSuffix, parse, getHostname } from 'tldts';
import { ADG_SCRIPTLET_MASK, RuleCategory, NetworkRuleType, RawRuleConverter, NetworkRuleParser as NetworkRuleParser$1, REMOVE_PROPERTY, NATIVE_CSS_PSEUDO_CLASSES, QuoteUtils, QuoteType, PIPE_MODIFIER_SEPARATOR, CosmeticRuleType, RegExpUtils, DomainUtils, CosmeticRuleSeparatorUtils, COMMA_DOMAIN_LIST_SEPARATOR, RuleParser as RuleParser$1, RuleGenerator as RuleGenerator$1 } from '@adguard/agtree';
import { DomainListParser, defaultParserOptions, NetworkRuleParser, RuleParser, CosmeticRuleParser } from '@adguard/agtree/parser';
import { S as SimpleRegex, W as WILDCARD, i as isString, u as unescapeChar, l as logger, f as fastHash, a as SEPARATOR, s as splitByDelimiterWithEscapeCharacter, h as hasSpaces, E as EMPTY_STRING, b as stringArraysEquals, c as stringArraysHaveIntersection, d as findNextLineBreakIndex, L as LF, C as CR, e as findNextNonWhitespace, g as findPrevNonWhitespace, j as hasWhitespace, k as SPACE, O as OPEN_SQUARE, T as TAB, m as CLOSE_SQUARE, n as ESCAPE, o as findNextWhitespace, p as COMMA } from './simple-regex-CtLln85E.js';
export { t as fastHash31, x as findNextUnescapedIndex, r as hasUnquotedSubstring, v as indexOfAny, z as isAlpha, A as isAlphaNumeric, y as isNumber, w as replaceAll, q as startsAtIndexWith } from './simple-regex-CtLln85E.js';
import { getErrorMessage as getErrorMessage$1 } from '@adguard/logger';
import { RequestType } from './request-type.js';
import { RuleGenerator, CosmeticRuleBodyGenerator } from '@adguard/agtree/generator';
import { contains } from 'cidr-tools';
import isCidr from 'is-cidr';
import isIp from 'is-ip';
import { isRedirectResourceCompatibleWithAdg, isValidScriptletName } from '@adguard/scriptlets/validators';
import { OPTIONS_DELIMITER, MASK_ALLOWLIST, NOT_MARK, NETWORK_RULE_OPTIONS } from './network-rule-options.js';
import { LRUCache } from 'lru-cache';
import * as z from 'zod';
import { ZodError, z as z$1 } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { scriptlets } from '@adguard/scriptlets';
import { tokenizeExtended, TokenType, decodeIdent } from '@adguard/css-tokenizer';
import { AdblockSyntax } from '@adguard/agtree/utils';

var version = "6.0.4";

const TSURLFILTER_VERSION = version;
/**
 * Compatibility types are used to configure engine for better support of different libraries
 * For example:
 *  extension doesn't support $app modifier. So if we set in configuration CompatibilityTypes.Extension,
 *  engine would ignore rules with $app modifier.
 */
var CompatibilityTypes;
(function (CompatibilityTypes) {
    CompatibilityTypes[CompatibilityTypes["Extension"] = 1] = "Extension";
    CompatibilityTypes[CompatibilityTypes["CoreLibs"] = 2] = "CoreLibs";
    CompatibilityTypes[CompatibilityTypes["Dns"] = 4] = "Dns";
})(CompatibilityTypes || (CompatibilityTypes = {}));
/**
 * Application configuration class.
 */
class Configuration {
    /**
     * Default configuration.
     */
    defaultConfig = {
        engine: null,
        version: null,
        verbose: false,
        compatibility: null,
    };
    /**
     * {'extension'|'corelibs'} engine application type.
     */
    engine = null;
    /**
     * {string} version.
     */
    version = null;
    /**
     * {boolean} verbose flag.
     */
    verbose = false;
    /**
     * Compatibility flag.
     */
    compatibility = CompatibilityTypes.Extension;
    /**
     * Configuration constructor.
     *
     * @param inputConfig Input configuration.
     */
    constructor(inputConfig) {
        const config = { ...this.defaultConfig, ...inputConfig };
        this.engine = config.engine;
        this.version = config.version;
        this.verbose = config.verbose;
        this.compatibility = config.compatibility;
    }
}
// eslint-disable-next-line import/no-mutable-exports
let config = new Configuration();
/**
 * Checks config is compatible with input level.
 *
 * @param compatibilityLevel Compatibility level to check against.
 *
 * @returns True if compatible, otherwise false.
 */
function isCompatibleWith(compatibilityLevel) {
    if (config.compatibility === null) {
        return false;
    }
    return (config.compatibility & compatibilityLevel) === compatibilityLevel;
}
const setConfiguration = (outerConfig) => {
    config = new Configuration(outerConfig);
};

/**
 * Chunk size for async rules loading.
 * It means that we load 5000 rules at a time, then take a small pause to give UI thread some time.
 */
const CHUNK_SIZE = 5000;

/**
 * CosmeticOption is the enumeration of various content script options.
 * Depending on the set of enabled flags the content script will contain different set of settings.
 */
var CosmeticOption;
(function (CosmeticOption) {
    /**
     * If generic elemhide and CSS rules are enabled.
     * Could be disabled by a $generichide rule and $elemhide rule.
     */
    CosmeticOption[CosmeticOption["CosmeticOptionGenericCSS"] = 2] = "CosmeticOptionGenericCSS";
    /**
     * If specific elemhide and CSS rules are enabled.
     * Could be disabled by a $specifichide rule and $elemhide rule.
     */
    CosmeticOption[CosmeticOption["CosmeticOptionSpecificCSS"] = 4] = "CosmeticOptionSpecificCSS";
    /**
     * If JS rules and scriptlets are enabled.
     * Could be disabled by a $jsinject rule.
     */
    CosmeticOption[CosmeticOption["CosmeticOptionJS"] = 8] = "CosmeticOptionJS";
    /**
     * If HTML filtering rules are enabled.
     * Could be disabled by a $content rule.
     */
    CosmeticOption[CosmeticOption["CosmeticOptionHtml"] = 16] = "CosmeticOptionHtml";
    /**
     * TODO: Add support for these flags.
     *
     * They are useful when content script is injected into an iframe.
     * In this case we can check what flags were applied to the top-level frame.
     */
    CosmeticOption[CosmeticOption["CosmeticOptionSourceGenericCSS"] = 32] = "CosmeticOptionSourceGenericCSS";
    CosmeticOption[CosmeticOption["CosmeticOptionSourceCSS"] = 64] = "CosmeticOptionSourceCSS";
    CosmeticOption[CosmeticOption["CosmeticOptionSourceJS"] = 128] = "CosmeticOptionSourceJS";
    /**
     * Everything is enabled.
     */
    CosmeticOption[CosmeticOption["CosmeticOptionAll"] = 30] = "CosmeticOptionAll";
    /**
     * Everything is disabled.
     */
    CosmeticOption[CosmeticOption["CosmeticOptionNone"] = 0] = "CosmeticOptionNone";
})(CosmeticOption || (CosmeticOption = {}));

/**
 * Pipe separator.
 */
const PIPE_SEPARATOR$1 = '|';
/**
 * This is a helper class that is used specifically to work
 * with domains restrictions.
 *
 * There are two options how you can add a domain restriction:
 * - `$domain` modifier;
 * - domains list for the cosmetic rules.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#domain-modifier}
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#cosmetic-rules}
 *
 * The only difference between them is that in one case we use `|` as a separator,
 * and in the other case - `,`.
 *
 * @example
 * `||example.org^$domain=example.com|~sub.example.com` -- network rule
 * `example.com,~sub.example.com##banner` -- cosmetic rule
 */
class DomainModifier {
    /**
     * List of permitted domains or null.
     */
    permittedDomains;
    /**
     * List of restricted domains or null.
     */
    restrictedDomains;
    /**
     * Processes domain list node, which means extracting permitted and restricted
     * domains from it.
     *
     * @param domainListNode Domain list node to process.
     *
     * @returns Processed domain list (permitted and restricted domains) ({@link ProcessedDomainList}).
     */
    static processDomainList(domainListNode) {
        const result = {
            permittedDomains: [],
            restrictedDomains: [],
        };
        const { children: domains } = domainListNode;
        for (const { exception, value: domain } of domains) {
            const domainLowerCased = domain.toLowerCase();
            if (!SimpleRegex.isRegexPattern(domain) && domain.includes(WILDCARD) && !domain.endsWith(WILDCARD)) {
                throw new SyntaxError(`Wildcards are only supported for top-level domains: "${domain}"`);
            }
            if (exception) {
                result.restrictedDomains.push(domainLowerCased);
            }
            else {
                result.permittedDomains.push(domainLowerCased);
            }
        }
        return result;
    }
    /**
     * Parses the `domains` string and initializes the object.
     *
     * @param domains Domain list string or AGTree DomainList node.
     * @param separator Separator — `,` or `|`.
     *
     * @throws An error if the domains string is empty or invalid.
     */
    constructor(domains, separator) {
        let processed;
        if (isString(domains)) {
            const node = DomainListParser.parse(domains.trim(), { ...defaultParserOptions, isLocIncluded: false }, 0, separator);
            if (node.children.length === 0) {
                throw new SyntaxError('At least one domain must be specified');
            }
            processed = DomainModifier.processDomainList(node);
        }
        else {
            // domain list node stores the separator
            if (separator !== domains.separator) {
                throw new SyntaxError('Separator mismatch');
            }
            processed = DomainModifier.processDomainList(domains);
        }
        // Unescape separator character in domains
        processed.permittedDomains = processed.permittedDomains.map((domain) => unescapeChar(domain, separator));
        processed.restrictedDomains = processed.restrictedDomains.map((domain) => unescapeChar(domain, separator));
        this.restrictedDomains = processed.restrictedDomains.length > 0 ? processed.restrictedDomains : null;
        this.permittedDomains = processed.permittedDomains.length > 0 ? processed.permittedDomains : null;
    }
    /**
     * Checks if the filtering rule is allowed on this domain.
     *
     * @param domain Domain to check.
     *
     * @returns True if the filtering rule is allowed on this domain.
     */
    matchDomain(domain) {
        if (this.hasRestrictedDomains()) {
            if (DomainModifier.isDomainOrSubdomainOfAny(domain, this.restrictedDomains)) {
                // Domain or host is restricted
                // i.e. $domain=~example.org
                return false;
            }
        }
        if (this.hasPermittedDomains()) {
            if (!DomainModifier.isDomainOrSubdomainOfAny(domain, this.permittedDomains)) {
                // Domain is not among permitted
                // i.e. $domain=example.org and we're checking example.com
                return false;
            }
        }
        return true;
    }
    /**
     * Checks if rule has permitted domains.
     *
     * @returns True if the rule has permitted domains.
     */
    hasPermittedDomains() {
        return !!this.permittedDomains && this.permittedDomains.length > 0;
    }
    /**
     * Checks if rule has restricted domains.
     *
     * @returns True if the rule has restricted domains.
     */
    hasRestrictedDomains() {
        return !!this.restrictedDomains && this.restrictedDomains.length > 0;
    }
    /**
     * Gets list of permitted domains.
     *
     * @returns List of permitted domains or null if none.
     */
    getPermittedDomains() {
        return this.permittedDomains;
    }
    /**
     * Gets list of restricted domains.
     *
     * @returns List of restricted domains or null if none.
     */
    getRestrictedDomains() {
        return this.restrictedDomains;
    }
    /**
     * Checks if `domain` is the same or a subdomain
     * of any of `domains`.
     *
     * @param domain Domain to check.
     * @param domains Domains list to check against.
     *
     * @returns True if `domain` is the same or a subdomain of any of `domains`.
     */
    static isDomainOrSubdomainOfAny(domain, domains) {
        for (let i = 0; i < domains.length; i += 1) {
            const d = domains[i];
            if (DomainModifier.isWildcardDomain(d)) {
                if (DomainModifier.matchAsWildcard(d, domain)) {
                    return true;
                }
            }
            if (domain === d || (domain.endsWith(d) && domain.endsWith(`.${d}`))) {
                return true;
            }
            if (SimpleRegex.isRegexPattern(d)) {
                try {
                    /**
                     * Regular expressions are cached internally by the browser
                     * (for instance, they're stored in the CompilationCache in V8/Chromium),
                     * so calling the constructor here should not be a problem.
                     *
                     * TODO: use SimpleRegex.patternFromString(d) after it is refactored to not add 'g' flag.
                     */
                    const domainPattern = new RegExp(d.slice(1, -1));
                    if (domainPattern.test(domain)) {
                        return true;
                    }
                }
                catch {
                    logger.error(`[tsurl.DomainModifier.isDomainOrSubdomainOfAny]: invalid regular expression as domain pattern: "${d}"`);
                }
                continue;
            }
        }
        return false;
    }
    /**
     * Checks if domain ends with wildcard.
     *
     * @param domain Domain string to check.
     *
     * @returns True if domain ends with wildcard.
     */
    static isWildcardDomain(domain) {
        // e.g. `*##.foo` or `.*##.foo`
        return domain.endsWith('*');
    }
    /**
     * Checks if domain string does not ends with wildcard and is not regex pattern.
     *
     * @param domain Domain string to check.
     *
     * @returns True if given domain is a wildcard or regexp pattern.
     */
    static isWildcardOrRegexDomain(domain) {
        return DomainModifier.isWildcardDomain(domain) || SimpleRegex.isRegexPattern(domain);
    }
    /**
     * Checks if wildcard matches domain.
     *
     * @param wildcard The wildcard pattern to match against the domain.
     * @param domainNameToCheck The domain name to check against the wildcard pattern.
     *
     * @returns True if wildcard matches domain.
     */
    static matchAsWildcard(wildcard, domainNameToCheck) {
        const wildcardedDomainToCheck = DomainModifier.genTldWildcard(domainNameToCheck);
        if (wildcardedDomainToCheck) {
            return wildcardedDomainToCheck === wildcard
                || (wildcardedDomainToCheck.endsWith(wildcard) && wildcardedDomainToCheck.endsWith(`.${wildcard}`));
        }
        return false;
    }
    /**
     * Generates from domain tld wildcard.
     *
     * @param domainName The domain name to generate the TLD wildcard for.
     *
     * @returns String is empty if tld for provided domain name doesn't exists.
     *
     * @example
     * `google.com` -> `google.*`
     * `youtube.co.uk` -> `youtube.*`
     */
    static genTldWildcard(domainName) {
        // To match eTld like "com.ru" we use allowPrivateDomains wildcard
        // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2650
        const tld = getPublicSuffix(domainName, { allowPrivateDomains: true });
        if (tld) {
            // lastIndexOf() is needed not to match the domain, e.g. 'www.chrono24.ch'.
            // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2312.
            return `${domainName.slice(0, domainName.lastIndexOf(`.${tld}`))}.*`;
        }
        return '';
    }
}

/**
 * CosmeticLookupTable lets quickly lookup cosmetic rules for the specified hostname.
 * It is primarily used by the {@link CosmeticEngine}.
 */
class CosmeticLookupTable {
    /**
     * Map with rules indices grouped by the permitted domains names.
     */
    byHostname;
    /**
     * List of domain-specific rules that are not organized into any index structure.
     * These rules are sequentially scanned one by one.
     * For performance reasons, we store only rule indexes here, and retrieve the rules from the storage
     * on the first match.
     */
    seqScanRuleIndexes;
    /**
     * Collection of generic rules.
     * Generic rules essentially works on all websites, unless a specific exception rule is defined for them.
     */
    genericRules;
    /**
     * Map with allowlist rules indices. Key is the rule content.
     * Values are rule indexes.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#element-hiding-rules-exceptions}
     */
    allowlist;
    /**
     * Storage for the filtering rules.
     */
    ruleStorage;
    /**
     * Creates a new instance.
     *
     * @param storage Rules storage. We store "rule indexes" in the lookup table which
     * can be used to retrieve the full rules from the storage.
     */
    constructor(storage) {
        this.byHostname = new Map();
        this.seqScanRuleIndexes = [];
        this.genericRules = [];
        this.allowlist = new Map();
        this.ruleStorage = storage;
    }
    /**
     * Adds rule to the allowlist map.
     *
     * @param key Can be used any string, but here we use ruleContent, scriptlet content, or scriptlet name.
     * @param storageIdx Index of the rule.
     */
    addAllowlistRule(key, storageIdx) {
        const existingRules = this.allowlist.get(key);
        if (!existingRules) {
            this.allowlist.set(key, [storageIdx]);
            return;
        }
        existingRules.push(storageIdx);
    }
    /**
     * Checks if the rule is a scriptlet rule.
     *
     * @param ruleParts Rule to check.
     *
     * @returns True if the rule is a scriptlet rule.
     */
    static isScriptletRule(ruleParts) {
        return ruleParts.type === 2 /* CosmeticRuleType.JsInjectionRule */
            && ruleParts.text.startsWith(`${ADG_SCRIPTLET_MASK}(`, ruleParts.contentStart)
            && ruleParts.text.endsWith(')', ruleParts.contentEnd);
    }
    /**
     * Adds rule to the appropriate collection.
     *
     * @param ruleParts Rule to add.
     * @param storageIdx Index of the rule in the storage.
     */
    addRule(ruleParts, storageIdx) {
        if (ruleParts.allowlist) {
            if (!CosmeticLookupTable.isScriptletRule(ruleParts)) {
                // Store all non-scriptlet rules by their content.
                this.addAllowlistRule(ruleParts.text.slice(ruleParts.contentStart, ruleParts.contentEnd), storageIdx);
                return;
            }
            /*
             * Retrieve the full CosmeticRule to reuse its already-parsed scriptletParams.
             * This avoids a second parser that could diverge from the AGTree-based parsing
             * used for blocking rules. The scriptletParams are populated from the AST during
             * CosmeticRule construction, correctly handling commas inside quoted arguments.
             */
            const cosmeticRule = this.ruleStorage.retrieveCosmeticRule(storageIdx);
            if (!cosmeticRule) {
                return;
            }
            const { scriptletParams } = cosmeticRule;
            /*
             * If only the scriptlet name is specified (no arguments), allowlist by name.
             * For example:
             * - #@%#//scriptlet('set-cookie')
             * Also, there are two special cases here:
             * - #@%#//scriptlet('')
             * - #@%#//scriptlet()
             * See https://github.com/AdguardTeam/Scriptlets/issues/377 for more details.
             */
            if (scriptletParams.args.length === 0) {
                this.addAllowlistRule(scriptletParams.name ?? '', storageIdx);
                return;
            }
            /*
             * If arguments are specified, allowlist by normalized scriptlet content.
             * For example:
             * - #@%#//scriptlet('log', 'arg')
             * Uses scriptletParams.toString() for consistent normalization
             * with the blocking rule's key (built from the AST path in CosmeticRule).
             */
            this.addAllowlistRule(scriptletParams.toString(), storageIdx);
            return;
        }
        if (ruleParts.domainsStart === undefined || ruleParts.domainsEnd === undefined) {
            const cosmeticRule = this.ruleStorage.retrieveCosmeticRule(storageIdx);
            if (cosmeticRule) {
                this.genericRules.push(cosmeticRule);
            }
            return;
        }
        const domains = ruleParts.text
            .slice(ruleParts.domainsStart, ruleParts.domainsEnd)
            .split(',')
            .map((d) => d.trim());
        if (!domains.length || domains.every((d) => d.startsWith('~'))) {
            const cosmeticRule = this.ruleStorage.retrieveCosmeticRule(storageIdx);
            if (cosmeticRule) {
                this.genericRules.push(cosmeticRule);
            }
            return;
        }
        if (domains.some(DomainModifier.isWildcardOrRegexDomain)) {
            this.seqScanRuleIndexes.push(storageIdx);
            return;
        }
        for (const domain of domains) {
            const tldResult = parse(domain);
            // tldResult.domain equals to eTLD domain,
            // e.g. sub.example.uk.org would result in example.uk.org
            const parsedDomain = tldResult.domain || domain;
            const key = fastHash(parsedDomain);
            const rules = this.byHostname.get(key) || [];
            rules.push(storageIdx);
            this.byHostname.set(key, rules);
        }
    }
    /**
     * Finds rules by hostname.
     *
     * @param request Request to check.
     *
     * @returns Array of matching cosmetic rules.
     */
    findByHostname(request) {
        const result = [];
        const { subdomains } = request;
        for (let i = 0; i < subdomains.length; i += 1) {
            const subdomain = subdomains[i];
            const rulesIndexes = this.byHostname.get(fastHash(subdomain));
            if (!rulesIndexes || rulesIndexes.length === 0) {
                continue;
            }
            const uniqueRulesIndexes = new Set(rulesIndexes);
            for (const ruleIndex of uniqueRulesIndexes) {
                const rule = this.ruleStorage.retrieveRule(ruleIndex, true, false);
                if (rule && !rule.isAllowlist() && rule.match(request)) {
                    result.push(rule);
                }
            }
        }
        for (const ruleIndex of this.seqScanRuleIndexes) {
            // Note: rule storage caches retrieved rules
            const rule = this.ruleStorage.retrieveCosmeticRule(ruleIndex);
            if (rule && !rule.isAllowlist() && rule.match(request)) {
                result.push(rule);
            }
        }
        return result;
    }
    /**
     * Checks if a scriptlet is allowlisted for a request. It looks up the scriptlet
     * by content in the allowlist map and evaluates two conditions:
     * 1. If there's a generic allowlist rule applicable to all sites.
     * 2. If there's a specific allowlist rule that matches the request.
     *
     * @param content Content of the scriptlet. Empty string '' searches for scriptlets allowlisted globally.
     * @param request Request details to match against allowlist rules.
     *
     * @returns True if allowlisted by a matching rule or a generic rule. False otherwise.
     */
    isScriptletAllowlisted = (content, request) => {
        // check for rules with that content
        const allowlistScriptletRulesIndexes = this.allowlist.get(content);
        if (allowlistScriptletRulesIndexes) {
            const rules = allowlistScriptletRulesIndexes
                .map((i) => this.ruleStorage.retrieveCosmeticRule(i))
                .filter((r) => r !== null);
            // here we check if there is at least one generic allowlist rule
            const hasAllowlistGenericScriptlet = rules.some((r) => r.isGeneric());
            if (hasAllowlistGenericScriptlet) {
                return true;
            }
            // here we check if there is at least one allowlist rule that matches the request
            const hasRuleMatchingRequest = rules.some((r) => r.match(request));
            if (hasRuleMatchingRequest) {
                return true;
            }
        }
        return false;
    };
    /**
     * Checks if the rule is disabled on the specified hostname.
     *
     * @param request Request to check.
     * @param rule Rule to check.
     *
     * @returns True if the rule is disabled on the specified hostname.
     */
    isAllowlisted(request, rule) {
        if (rule.isScriptlet) {
            // Empty string '' is a special case for scriptlet when the allowlist scriptlet has no name
            // e.g. #@%#//scriptlet(); example.org#@%#//scriptlet();
            const EMPTY_SCRIPTLET_NAME = '';
            if (this.isScriptletAllowlisted(EMPTY_SCRIPTLET_NAME, request)) {
                return true;
            }
            // If scriptlet allowlisted by name
            // e.g. #@%#//scriptlet('set-cookie'); example.org#@%#//scriptlet('set-cookie');
            if (rule.scriptletParams.name !== undefined
                && this.isScriptletAllowlisted(rule.scriptletParams.name, request)) {
                return true;
            }
            // If scriptlet allowlisted with args, using normalized scriptlet content for better matching
            // on different quote types (see https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2947)
            // e.g. #@%#//scriptlet("set-cookie", "arg1"); example.org#@%#//scriptlet('set-cookie', 'arg1');
            if (rule.scriptletParams.name !== undefined
                && rule.scriptletParams.args.length > 0
                && this.isScriptletAllowlisted(rule.scriptletParams.toString(), request)) {
                return true;
            }
        }
        const rulesIndexes = this.allowlist.get(rule.getContent());
        if (!rulesIndexes) {
            return false;
        }
        for (let j = 0; j < rulesIndexes.length; j += 1) {
            const r = this.ruleStorage.retrieveRule(rulesIndexes[j]);
            if (r && r.match(request)) {
                return true;
            }
        }
        return false;
    }
}

/**
 * @typedef {import('./cosmetic-result').CosmeticResult} CosmeticResult
 */
/**
 * This class stores found cosmetic html rules content in the appropriate collections
 * It is primarily used by the {@link CosmeticResult}.
 */
class CosmeticHtmlResult {
    /**
     * Collection of generic rules.
     */
    generic;
    /**
     * Collection of specific rules.
     */
    specific;
    /**
     * Constructor.
     */
    constructor() {
        this.generic = [];
        this.specific = [];
    }
    /**
     * Appends rule to the appropriate collection.
     *
     * @param rule Rule to process.
     */
    append(rule) {
        if (rule.isGeneric()) {
            this.generic.push(rule);
        }
        else {
            this.specific.push(rule);
        }
    }
    /**
     * Returns collected cosmetic **HTML** rules — both generic and specific.
     *
     * @returns Array of collected rules.
     */
    getRules() {
        return [...this.generic, ...this.specific];
    }
}

/**
 * @typedef {import('./cosmetic-result').CosmeticResult} CosmeticResult
 */
/**
 * This class stores found script rules content in the appropriate collections
 * It is primarily used by the {@link CosmeticResult}.
 */
class CosmeticScriptsResult {
    /**
     * Collection of generic (domain insensitive) rules.
     */
    generic;
    /**
     * Collection of domain specific rules.
     */
    specific;
    /**
     * Constructor.
     */
    constructor() {
        this.generic = [];
        this.specific = [];
    }
    /**
     * Appends rule to appropriate collection.
     *
     * @param rule Cosmetic rule.
     */
    append(rule) {
        if (rule.isGeneric()) {
            this.generic.push(rule);
        }
        else {
            this.specific.push(rule);
        }
    }
    /**
     * Returns collected cosmetic rules — both generic and specific.
     *
     * @returns Array of collected cosmetic rules.
     */
    getRules() {
        return [...this.generic, ...this.specific];
    }
}

/**
 * @typedef {import('./cosmetic-result').CosmeticResult} CosmeticResult
 */
/**
 * This class stores found cosmetic css rules content in the appropriate collections
 * It is primarily used by the {@link CosmeticResult}.
 */
class CosmeticStylesResult {
    /**
     * Collection of generic native CSS rules.
     * These rules are not using Extended CSS.
     */
    generic;
    /**
     * Collection of specific native CSS rules.
     * These rules are not using Extended CSS.
     */
    specific;
    /**
     * Collection of generic Extended CSS rules.
     * These rules are using Extended CSS engine.
     */
    genericExtCss;
    /**
     * Collection of specific Extended CSS rules.
     * These rules are using Extended CSS engine.
     */
    specificExtCss;
    /**
     * Constructor.
     */
    constructor() {
        this.generic = [];
        this.specific = [];
        this.genericExtCss = [];
        this.specificExtCss = [];
    }
    /**
     * Appends rule to the appropriate collection.
     *
     * @param rule Cosmetic rule.
     */
    append(rule) {
        if (rule.isGeneric()) {
            if (rule.isExtendedCss()) {
                this.genericExtCss.push(rule);
            }
            else {
                this.generic.push(rule);
            }
        }
        else if (rule.isExtendedCss()) {
            this.specificExtCss.push(rule);
        }
        else {
            this.specific.push(rule);
        }
    }
}

/**
 * @typedef {import('./cosmetic-engine').CosmeticEngine} CosmeticEngine
 */
/**
 * Cosmetic result is the representation of rules
 * It is primarily used by the {@link CosmeticEngine}.
 */
class CosmeticResult {
    /**
     * Storage of element hiding rules.
     */
    elementHiding;
    /**
     * Storage of CSS rules.
     */
    CSS;
    /**
     * Storage of JS rules.
     */
    JS;
    /**
     * Storage of Html filtering rules.
     */
    Html;
    /**
     * Constructor.
     */
    constructor() {
        this.elementHiding = new CosmeticStylesResult();
        this.CSS = new CosmeticStylesResult();
        this.JS = new CosmeticScriptsResult();
        this.Html = new CosmeticHtmlResult();
    }
    /**
     * Script rules.
     *
     * @returns Array of cosmetic **JavaScript** rules.
     */
    getScriptRules() {
        return this.JS.getRules();
    }
}

/**
 * CosmeticEngine combines all the cosmetic rules and allows to quickly
 * find all rules matching this or that hostname
 * It is primarily used by the {@link Engine}.
 */
class CosmeticEngine {
    /**
     * Rules storage.
     */
    ruleStorage;
    /**
     * Count of rules added to the engine.
     */
    rulesCount;
    /**
     * Lookup table for elemhide rules.
     */
    elementHidingLookupTable;
    /**
     * Lookup table for css rules.
     */
    cssLookupTable;
    /**
     * Lookup table for js and scriptlets rules.
     */
    jsLookupTable;
    /**
     * Lookup table for html filtering rules.
     */
    htmlLookupTable;
    /**
     * Creates an instance of the network engine in sync mode.
     *
     * @param indexedRulesParts Array of indexed storage cosmetic rules.
     * @param storage An object for a rules storage.
     *
     * @returns An instance of the network engine.
     */
    static createSync(indexedRulesParts, storage) {
        const engine = new CosmeticEngine(storage);
        for (const indexedRuleParts of indexedRulesParts) {
            engine.addRule(indexedRuleParts.ruleParts, indexedRuleParts.index);
        }
        return engine;
    }
    /**
     * Creates an instance of the network engine in async mode.
     *
     * @param indexedRulesParts Array of indexed storage cosmetic rules.
     * @param storage An object for a rules storage.
     *
     * @returns An instance of the network engine.
     */
    static async createAsync(indexedRulesParts, storage) {
        const engine = new CosmeticEngine(storage);
        let counter = 0;
        for (const indexedRuleParts of indexedRulesParts) {
            counter += 1;
            if (counter >= CHUNK_SIZE) {
                counter = 0;
                // Pause rule loading and let the browser handle pending UI
                // updates (repaints, user input, etc.) before continuing.
                // We use setTimeout (macrotask) instead of Promise.resolve()
                // (microtask) because microtasks don't give the browser a
                // chance to refresh the screen or respond to user actions.
                // eslint-disable-next-line no-await-in-loop
                await new Promise((resolve) => { setTimeout(resolve, 0); });
            }
            engine.addRule(indexedRuleParts.ruleParts, indexedRuleParts.index);
        }
        return engine;
    }
    /**
     * Builds instance of cosmetic engine.
     *
     * @param ruleStorage Rule storage.
     */
    constructor(ruleStorage) {
        this.ruleStorage = ruleStorage;
        this.rulesCount = 0;
        this.elementHidingLookupTable = new CosmeticLookupTable(ruleStorage);
        this.cssLookupTable = new CosmeticLookupTable(ruleStorage);
        this.jsLookupTable = new CosmeticLookupTable(ruleStorage);
        this.htmlLookupTable = new CosmeticLookupTable(ruleStorage);
    }
    /**
     * Adds rules into appropriate tables.
     *
     * @param ruleParts Cosmetic rule parts to add.
     * @param storageIdx Index of the rule in the storage.
     */
    addRule(ruleParts, storageIdx) {
        switch (ruleParts.type) {
            case 0 /* CosmeticRuleType.ElementHidingRule */: {
                this.elementHidingLookupTable.addRule(ruleParts, storageIdx);
                break;
            }
            case 1 /* CosmeticRuleType.CssInjectionRule */: {
                this.cssLookupTable.addRule(ruleParts, storageIdx);
                break;
            }
            case 2 /* CosmeticRuleType.JsInjectionRule */: {
                this.jsLookupTable.addRule(ruleParts, storageIdx);
                break;
            }
            case 3 /* CosmeticRuleType.HtmlFilteringRule */: {
                this.htmlLookupTable.addRule(ruleParts, storageIdx);
                break;
            }
        }
        this.rulesCount += 1;
    }
    /**
     * Checks if bitwise mask matches option.
     *
     * @param option Option to match.
     * @param targetOption Target option.
     *
     * @returns True if option matches targetOption.
     */
    static matchOption(option, targetOption) {
        return (option & targetOption) === targetOption;
    }
    /**
     * Prepares cosmetic result by request.
     *
     * @param request Request to match.
     * @param option Mask of enabled cosmetic types.
     *
     * @returns CosmeticResult.
     */
    match(request, option) {
        const includeGeneric = CosmeticEngine.matchOption(option, CosmeticOption.CosmeticOptionGenericCSS);
        const includeSpecific = CosmeticEngine.matchOption(option, CosmeticOption.CosmeticOptionSpecificCSS);
        const includeJs = CosmeticEngine.matchOption(option, CosmeticOption.CosmeticOptionJS);
        const includeHtml = CosmeticEngine.matchOption(option, CosmeticOption.CosmeticOptionHtml);
        const cosmeticResult = new CosmeticResult();
        if (includeGeneric) {
            CosmeticEngine.appendGenericRules(cosmeticResult.elementHiding, this.elementHidingLookupTable, request);
            CosmeticEngine.appendGenericRules(cosmeticResult.CSS, this.cssLookupTable, request);
        }
        if (includeSpecific) {
            CosmeticEngine.appendSpecificRules(cosmeticResult.elementHiding, this.elementHidingLookupTable, request);
            CosmeticEngine.appendSpecificRules(cosmeticResult.CSS, this.cssLookupTable, request);
        }
        if (includeJs) {
            CosmeticEngine.appendGenericRules(cosmeticResult.JS, this.jsLookupTable, request);
            CosmeticEngine.appendSpecificRules(cosmeticResult.JS, this.jsLookupTable, request);
        }
        if (includeHtml) {
            if (includeGeneric) {
                CosmeticEngine.appendGenericRules(cosmeticResult.Html, this.htmlLookupTable, request);
            }
            CosmeticEngine.appendSpecificRules(cosmeticResult.Html, this.htmlLookupTable, request);
        }
        return cosmeticResult;
    }
    /**
     * Selects generic rules and appends rules content to cosmetic result.
     *
     * @param cosmeticResult Cosmetic result.
     * @param lookupTable Lookup table.
     * @param request Request.
     */
    static appendGenericRules(cosmeticResult, lookupTable, request) {
        for (const genericRule of lookupTable.genericRules) {
            if (!lookupTable.isAllowlisted(request, genericRule)
                && genericRule.match(request)) {
                cosmeticResult.append(genericRule, request);
            }
        }
    }
    /**
     * Selects specific rules and appends rules content to cosmetic result.
     *
     * @param cosmeticResult Cosmetic result.
     * @param lookupTable Lookup table.
     * @param request Request.
     */
    static appendSpecificRules(cosmeticResult, lookupTable, request) {
        const specificRules = lookupTable.findByHostname(request);
        if (specificRules.length === 0) {
            return;
        }
        for (const rule of specificRules) {
            if (!lookupTable.isAllowlisted(request, rule)) {
                cosmeticResult.append(rule, request);
            }
        }
    }
}

/**
 * Domain lookup table.
 */
// TODO: This lookup table has a lot of common code with HostnameLookupTable,
// probably we can extract common code into a base class
class DomainsLookupTable {
    /**
     * Count of rules added to this lookup table.
     */
    rulesCount = 0;
    /**
     * Domain lookup table. Key is the domain name hash.
     * Value is an array of rule indexes in the storage.
     */
    domainsLookupTable = new Map();
    /**
     * Storage for the network filtering rules.
     */
    ruleStorage;
    /**
     * Creates a new instance.
     *
     * @param storage Rules storage. We store "rule indexes" in the lookup table which
     * can be used to retrieve the full rules from the storage.
     */
    constructor(storage) {
        this.ruleStorage = storage;
    }
    /** @inheritdoc */
    addRule(ruleParts, storageIdx) {
        if (ruleParts.domainsStart === undefined || ruleParts.domainsEnd === undefined) {
            return false;
        }
        const filteredDomains = [];
        const domains = ruleParts.text.slice(ruleParts.domainsStart, ruleParts.domainsEnd).split('|');
        if (domains.length === 0) {
            return false;
        }
        for (const domain of domains) {
            if (DomainModifier.isWildcardOrRegexDomain(domain)) {
                return false;
            }
            if (!domain.startsWith('~')) {
                filteredDomains.push(domain);
            }
        }
        if (filteredDomains.length === 0) {
            return false;
        }
        filteredDomains.forEach((domain) => {
            const hash = fastHash(domain);
            let rulesIndexes = this.domainsLookupTable.get(hash);
            if (!rulesIndexes) {
                rulesIndexes = [];
                this.domainsLookupTable.set(hash, rulesIndexes);
            }
            rulesIndexes.push(storageIdx);
        });
        this.rulesCount += 1;
        return true;
    }
    /** @inheritdoc */
    getRulesCount() {
        return this.rulesCount;
    }
    /** @inheritdoc */
    matchAll(request) {
        const result = [];
        if (!request.sourceHostname) {
            return result;
        }
        const domains = request.subdomains;
        if (request.hostname !== request.sourceHostname) {
            domains.push(...request.sourceSubdomains);
        }
        for (let i = 0; i < domains.length; i += 1) {
            const hash = fastHash(domains[i]);
            const rulesIndexes = this.domainsLookupTable.get(hash);
            if (!rulesIndexes) {
                continue;
            }
            for (let j = 0; j < rulesIndexes.length; j += 1) {
                let rule = null;
                let shouldRemove = false;
                try {
                    rule = this.ruleStorage.retrieveNetworkRule(rulesIndexes[j]);
                    if (!rule) {
                        shouldRemove = true;
                    }
                }
                catch (e) {
                    shouldRemove = true;
                }
                if (shouldRemove) {
                    // Fast tokenizing possibly allowed invalid rules
                    // Remove the rule index from the lookup table but keep the same array reference
                    rulesIndexes.splice(j, 1);
                    j -= 1;
                    continue;
                }
                if (rule && rule.match(request)) {
                    result.push(rule);
                }
            }
        }
        return result;
    }
}

/**
 * Hostname lookup table.
 * For specific kind of rules like '||hostname^' and '||hostname/path' more simple algorithm with hashes is faster.
 */
// TODO: This lookup table has a lot of common code with DomainsLookupTable,
// probably we can extract common code into a base class
class HostnameLookupTable {
    /**
     * Count of rules added to this lookup table.
     */
    rulesCount = 0;
    /**
     * Domain lookup table. Key is the domain name hash.
     * Value is an array of rule indexes in the storage.
     */
    hostnameLookupTable = new Map();
    /**
     * Storage for the network filtering rules.
     */
    ruleStorage;
    /**
     * Creates a new instance.
     *
     * @param storage Rules storage. We store "rule indexes" in the lookup table which
     * can be used to retrieve the full rules from the storage.
     */
    constructor(storage) {
        this.ruleStorage = storage;
    }
    /** @inheritdoc */
    addRule(ruleParts, storageIdx) {
        const { patternStart, patternEnd } = ruleParts;
        const pattern = ruleParts.text.slice(patternStart, patternEnd);
        if (!pattern) {
            return false;
        }
        let hostname = '';
        // Pattern: '||example.org^'
        if (pattern.startsWith(SimpleRegex.MASK_START_URL) && pattern.endsWith(SimpleRegex.MASK_SEPARATOR)) {
            hostname = pattern.slice(SimpleRegex.MASK_START_URL.length, pattern.length - SimpleRegex.MASK_SEPARATOR.length);
        }
        // Pattern: '||example.org/path'
        if (pattern.startsWith(SimpleRegex.MASK_START_URL) && pattern.indexOf(SimpleRegex.MASK_BACKSLASH) !== -1) {
            const end = pattern.indexOf(SimpleRegex.MASK_BACKSLASH);
            hostname = pattern.slice(SimpleRegex.MASK_START_URL.length, end);
        }
        if (!HostnameLookupTable.isValidHostname(hostname)) {
            return false;
        }
        const hash = fastHash(hostname);
        let rulesIndexes = this.hostnameLookupTable.get(hash);
        if (!rulesIndexes) {
            rulesIndexes = [];
            this.hostnameLookupTable.set(hash, rulesIndexes);
        }
        rulesIndexes.push(storageIdx);
        this.rulesCount += 1;
        return true;
    }
    /** @inheritdoc */
    getRulesCount() {
        return this.rulesCount;
    }
    /** @inheritdoc */
    matchAll(request) {
        const result = [];
        const domains = request.subdomains;
        for (let i = 0; i < domains.length; i += 1) {
            const hash = fastHash(domains[i]);
            const rulesIndexes = this.hostnameLookupTable.get(hash);
            if (!rulesIndexes) {
                continue;
            }
            for (let j = 0; j < rulesIndexes.length; j += 1) {
                let rule = null;
                let shouldRemove = false;
                try {
                    rule = this.ruleStorage.retrieveNetworkRule(rulesIndexes[j]);
                    if (!rule) {
                        shouldRemove = true;
                    }
                }
                catch (e) {
                    shouldRemove = true;
                }
                if (shouldRemove) {
                    // Fast tokenizing possibly allowed invalid rules
                    // Remove the rule index from the lookup table but keep the same array reference
                    rulesIndexes.splice(j, 1);
                    j -= 1;
                    continue;
                }
                if (rule && rule.match(request)) {
                    result.push(rule);
                }
            }
        }
        return result;
    }
    /**
     * Checks if this hostname string is valid.
     *
     * @param hostname Hostname to check.
     *
     * @returns True if the hostname is valid.
     */
    static isValidHostname(hostname) {
        if (!hostname) {
            return false;
        }
        if (hostname.indexOf(SimpleRegex.MASK_ANY_CHARACTER) !== -1) {
            return false;
        }
        if (hostname.indexOf('.') < 0 || hostname.endsWith('.')) {
            return false;
        }
        return true;
    }
}

/**
 * Sequence scan lookup table of rules for which we could not find a shortcut
 * and could not place it to the shortcuts lookup table.
 * In common case of rule there is always a way to just check a rule.match().
 */
class SeqScanLookupTable {
    /**
     * Count of rules added to this lookup table.
     */
    rulesCount = 0;
    /**
     * Rules for which we could not find a shortcut and could not place it to the shortcuts lookup table.
     */
    rules = new Map();
    /**
     * Storage for the network filtering rules.
     */
    ruleStorage;
    /**
     * Creates a new instance.
     *
     * @param storage Rules storage.
     */
    constructor(storage) {
        this.ruleStorage = storage;
    }
    /** @inheritdoc */
    addRule(ruleParts, storageIdx) {
        if (this.rules.has(storageIdx)) {
            return false;
        }
        try {
            const rule = this.ruleStorage.retrieveNetworkRule(storageIdx);
            if (!rule) {
                return false;
            }
            this.rules.set(storageIdx, rule);
            this.rulesCount += 1;
            return true;
        }
        catch (e) {
            // If we failed to parse the rule, we just skip it.
            logger.debug(`[tsurl.SeqScanLookupTable.addRule]: failed to create rule from '${ruleParts.text}', got error:`, getErrorMessage$1(e));
            return false;
        }
    }
    /** @inheritdoc */
    getRulesCount() {
        return this.rulesCount;
    }
    /** @inheritdoc */
    matchAll(request) {
        const result = [];
        for (const r of this.rules.values()) {
            if (r.match(request)) {
                result.push(r);
            }
        }
        return result;
    }
}

/**
 * Prefix tree implementation.
 */
class TrieNode {
    /**
     * This node's children could be
     * - undefined in case of no children
     * - an instance of TrieNode in case of lonely child
     * - a map where key is a character code and value is it's trie node.
     */
    children;
    /**
     * Character code of this TrieNode.
     */
    code;
    /**
     * Data, attached to this trie node. When trie traversal is being done,
     * data from all trie nodes is collected.
     */
    data;
    /**
     * Creates an instance of a TrieNode with the specified char code.
     *
     * @param code The character code for this TrieNode.
     */
    constructor(code) {
        this.code = code;
    }
    /**
     * Attaches data to this TrieNode.
     *
     * @param data The data to attach to this TrieNode.
     */
    attach(data) {
        if (!this.data) {
            this.data = [];
        }
        this.data.push(data);
    }
    /**
     * Adds the specified string to the Trie and attaches data to it.
     *
     * @param str String to add.
     * @param data Data to attach to the leaf node.
     */
    add(str, data) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let root = this;
        for (let i = 0; i < str.length; i += 1) {
            const c = str.charCodeAt(i);
            let next = root.getChild(c);
            if (!next) {
                next = root.addChild(c);
            }
            root = next;
        }
        root.attach(data);
    }
    /**
     * Traverses this TrieNode and it's children using the specified search string.
     * This method collects all the data that's attached on the way and returns as
     * a result.
     *
     * @param str String to check.
     * @param start Index in str where to start traversing from.
     *
     * @returns An array of numbers collected from the trie nodes.
     */
    traverse(str, start) {
        const result = [];
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let current = this;
        for (let i = start; i < str.length; i += 1) {
            const c = str.charCodeAt(i);
            const next = current.getChild(c);
            if (!next) {
                break;
            }
            if (next.data) {
                result.push(...next.data);
            }
            current = next;
        }
        return result;
    }
    /**
     * Traverses this TrieNode and it's children using the specified search string and all substrings.
     *
     * @param str String to check.
     * @param len Max length to check.
     *
     * @returns Array of numbers collected from the trie nodes.
     */
    traverseAll(str, len) {
        const data = [];
        for (let i = 0; i <= len; i += 1) {
            const result = this.traverse(str, i);
            if (result) {
                data.push(...result);
            }
        }
        return data;
    }
    /**
     * Returns a child node with the specified character code or
     * undefined if not found.
     *
     * @param code Character code.
     *
     * @returns Child node or undefined.
     */
    getChild(code) {
        const { children } = this;
        if (!children) {
            return undefined;
        }
        if (children instanceof TrieNode) {
            if (children.code === code) {
                return children;
            }
            return undefined;
        }
        return children.get(code);
    }
    /**
     * Adds a new child node with the specified character code.
     *
     * @param code Character code.
     *
     * @returns The newly created TrieNode.
     */
    addChild(code) {
        const node = new TrieNode(code);
        if (!this.children) {
            this.children = node;
        }
        else if (this.children instanceof TrieNode) {
            const oldNode = this.children;
            this.children = new Map();
            this.children.set(oldNode.code, oldNode);
            this.children.set(code, node);
        }
        else {
            this.children.set(code, node);
        }
        return node;
    }
}

/**
 * Look up table with underlying prefix tree.
 */
class TrieLookupTable {
    /**
     * Count of rules added to this lookup table.
     */
    rulesCount = 0;
    /**
     * Storage for the network filtering rules.
     */
    ruleStorage;
    /**
     * Trie that stores rules' shortcuts.
     */
    trie;
    /**
     * Creates a new instance of the TrieLookupTable.
     *
     * @param storage Rules storage. We store "rule indexes" in the lookup table which
     * can be used to retrieve the full rules from the storage.
     */
    constructor(storage) {
        this.ruleStorage = storage;
        this.trie = new TrieNode(0);
    }
    /** @inheritdoc */
    matchAll(request) {
        const rulesIndexes = this.traverse(request);
        return this.matchRules(request, rulesIndexes);
    }
    /** @inheritdoc */
    addRule(ruleParts, storageIdx) {
        const { patternStart, patternEnd } = ruleParts;
        const pattern = ruleParts.text.slice(patternStart, patternEnd);
        if (!pattern) {
            return false;
        }
        const shortcut = SimpleRegex.extractShortcut(pattern);
        if (!shortcut || TrieLookupTable.isAnyURLShortcut(shortcut)
            || shortcut.length < SimpleRegex.MIN_SHORTCUT_LENGTH) {
            return false;
        }
        this.trie.add(shortcut, storageIdx);
        this.rulesCount += 1;
        return true;
    }
    /** @inheritdoc */
    getRulesCount() {
        return this.rulesCount;
    }
    /**
     * For specified request finds matching rules from rules indexes array.
     *
     * @param request Request to check.
     * @param rulesIndexes Array of rules indexes.
     *
     * @returns Array of matching rules.
     */
    matchRules(request, rulesIndexes) {
        if (!rulesIndexes) {
            return [];
        }
        const result = [];
        for (let j = 0; j < rulesIndexes.length; j += 1) {
            let rule = null;
            let shouldRemove = false;
            try {
                rule = this.ruleStorage.retrieveNetworkRule(rulesIndexes[j]);
                if (!rule) {
                    shouldRemove = true;
                }
            }
            catch (e) {
                shouldRemove = true;
            }
            if (shouldRemove) {
                // Fast tokenizing possibly allowed invalid rules
                // Remove the rule index from the lookup table but keep the same array reference
                rulesIndexes.splice(j, 1);
                j -= 1;
                continue;
            }
            if (rule && rule.match(request, false)) {
                result.push(rule);
            }
        }
        return result;
    }
    /**
     * Traverses trie.
     *
     * @param request Request to check.
     *
     * @returns Array of numbers collected from the trie nodes.
     */
    traverse(request) {
        return this.trie.traverseAll(request.urlLowercase, request.urlLowercase.length);
    }
    /**
     * Checks if the rule potentially matches too many URLs.
     * We'd better use another type of lookup table for this kind of rules.
     *
     * @param shortcut Shortcut to check.
     *
     * @returns True if the rule potentially matches too many URLs.
     */
    static isAnyURLShortcut(shortcut) {
        // The numbers are basically ("PROTO://".length + 1)
        if (shortcut.length < 6 && shortcut.indexOf('ws:') === 0) {
            return true;
        }
        if (shortcut.length < 7 && shortcut.indexOf('|ws') === 0) {
            return true;
        }
        if (shortcut.length < 9 && shortcut.indexOf('http') === 0) {
            return true;
        }
        return !!(shortcut.length < 10 && shortcut.indexOf('|http') === 0);
    }
}

/**
 * Array of all stealth options available, even those which are not supported by browser extension.
 */
var UniversalStealthOption;
(function (UniversalStealthOption) {
    UniversalStealthOption["HideSearchQueries"] = "searchqueries";
    UniversalStealthOption["DoNotTrack"] = "donottrack";
    UniversalStealthOption["ThirdPartyCookies"] = "3p-cookie";
    UniversalStealthOption["FirstPartyCookies"] = "1p-cookie";
    UniversalStealthOption["ThirdPartyCache"] = "3p-cache";
    UniversalStealthOption["ThirdPartyAuth"] = "3p-auth";
    UniversalStealthOption["WebRTC"] = "webrtc";
    UniversalStealthOption["Push"] = "push";
    UniversalStealthOption["Location"] = "location";
    UniversalStealthOption["Flash"] = "flash";
    UniversalStealthOption["Java"] = "java";
    UniversalStealthOption["HideReferrer"] = "referrer";
    UniversalStealthOption["UserAgent"] = "useragent";
    UniversalStealthOption["IP"] = "ip";
    UniversalStealthOption["XClientData"] = "xclientdata";
    UniversalStealthOption["DPI"] = "dpi";
})(UniversalStealthOption || (UniversalStealthOption = {}));
/**
 * List of stealth options, supported by browser extension, which can be disabled by $stealth modifier.
 *
 * Following stealth options are initialized on the engine start
 * and can't be disabled via $stealth modifier:
 * - `Block trackers` and `Remove tracking parameters`, as they are applied by a specific
 *   rule lists, initialized on app start;
 * - `Disabling WebRTC`, as it is not being applied on per-request basis.
 */
var StealthOptionName;
(function (StealthOptionName) {
    StealthOptionName["HideSearchQueries"] = "searchqueries";
    StealthOptionName["DoNotTrack"] = "donottrack";
    StealthOptionName["HideReferrer"] = "referrer";
    StealthOptionName["XClientData"] = "xclientdata";
    StealthOptionName["FirstPartyCookies"] = "1p-cookie";
    StealthOptionName["ThirdPartyCookies"] = "3p-cookie";
})(StealthOptionName || (StealthOptionName = {}));
const StealthModifierOptions = new Set(Object.values(StealthOptionName));
const UniversalStealthOptions = new Set(Object.values(UniversalStealthOption));
const StealthOption = {
    NotSet: 0,
    [StealthOptionName.HideSearchQueries]: 1,
    [StealthOptionName.DoNotTrack]: 1 << 1,
    [StealthOptionName.HideReferrer]: 1 << 2,
    [StealthOptionName.XClientData]: 1 << 3,
    [StealthOptionName.FirstPartyCookies]: 1 << 4,
    [StealthOptionName.ThirdPartyCookies]: 1 << 5,
};
/**
 * Id to create stealth mode rule lists with,
 * e.g cookie rules for `Self-destructing third-party/first-party cookies` options.
 * It is also used to identify such rules when disabling on per-rule basis.
 */
const STEALTH_MODE_FILTER_ID = -1;
/**
 * Stealth modifier class.
 * Rules with $stealth modifier will disable specified stealth options for matched requests.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#stealth-modifier}
 */
class StealthModifier {
    /**
     * Pipe separator.
     */
    PIPE_SEPARATOR = '|';
    /**
     * Options.
     */
    options = StealthOption.NotSet;
    /**
     * Parses the options string and creates a new stealth modifier instance.
     *
     * @param optionsStr Options string.
     *
     * @throws SyntaxError on inverted stealth options, which are not supported.
     */
    constructor(optionsStr) {
        if (optionsStr.trim().length === 0) {
            return;
        }
        // This prevents parsing invalid syntax as rule without supported options
        if (optionsStr.includes(',')) {
            throw new SyntaxError(`Invalid separator of stealth options used: "${optionsStr}"`);
        }
        const tokens = optionsStr.split(this.PIPE_SEPARATOR);
        for (let i = 0; i < tokens.length; i += 1) {
            const optionName = tokens[i].trim();
            if (optionName === '') {
                continue;
            }
            if (optionName.startsWith('~')) {
                throw new SyntaxError(`Inverted $stealth modifier values are not allowed: "${optionsStr}"`);
            }
            if (!StealthModifier.isValidStealthOption(optionName)) {
                throw new SyntaxError(`Invalid $stealth option in modifier value: "${optionsStr}"`);
            }
            // Skip options which are not supported by browser extension
            if (!StealthModifier.isSupportedStealthOption(optionName)) {
                continue;
            }
            const option = StealthOption[optionName];
            if (this.options & option) {
                // TODO: Change log level to 'warn' after AG-42379
                logger.trace(`[tsurl.StealthModifier.constructor]: duplicate $stealth modifier value "${optionName}" in "${optionsStr}"`);
            }
            this.options |= option;
        }
        if (this.options === StealthOption.NotSet) {
            // TODO: Change log level to 'warn' after AG-42379
            logger.trace(`[tsurl.StealthModifier.constructor]: $stealth modifier does not contain any options supported by browser extension: "${optionsStr}"`);
        }
    }
    /**
     * Checks if the given string is a valid $stealth option, supported by browser extension.
     *
     * @param option Option name.
     *
     * @returns True if the given string is a valid $stealth option.
     */
    static isSupportedStealthOption = (option) => StealthModifierOptions.has(option);
    /**
     * Checks if the given string is a valid $stealth option.
     *
     * @param option Option name.
     *
     * @returns True if the given string is a valid $stealth option.
     */
    static isValidStealthOption = (option) => UniversalStealthOptions.has(option);
    /**
     * Checks if this stealth modifier has values.
     *
     * @returns True if this stealth modifier has at least one value.
     */
    hasValues() {
        return this.options !== StealthOption.NotSet;
    }
    /**
     * Checks if this stealth modifier is disabling the given stealth option.
     *
     * @param optionName Stealth option name.
     *
     * @returns True if this stealth modifier is disabling the given stealth option.
     */
    hasStealthOption(optionName) {
        const option = StealthOption[optionName];
        return !!(option && this.options & option);
    }
}

/**
 * This is a helper class that is used specifically to work with app restrictions.
 *
 * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#app}
 *
 * @example
 * ```adblock
 * ||baddomain.com^$app=org.example.app
 * ||baddomain.com^$app=org.example.app1|org.example.app2
 * ```
 */
class AppModifier {
    /**
     * List of permitted apps or null.
     */
    permittedApps;
    /**
     * List of restricted apps or null.
     */
    restrictedApps;
    /**
     * Parses the `apps` string.
     *
     * @param apps Apps string.
     *
     * @throws An error if the app string is empty or invalid.
     */
    constructor(apps) {
        if (!apps) {
            throw new SyntaxError('$app modifier cannot be empty');
        }
        const permittedApps = [];
        const restrictedApps = [];
        const parts = apps.split(SEPARATOR);
        for (let i = 0; i < parts.length; i += 1) {
            let app = parts[i];
            let restricted = false;
            if (app.startsWith('~')) {
                restricted = true;
                app = app.substring(1).trim();
            }
            if (app === '') {
                throw new SyntaxError(`Empty app specified in "${apps}"`);
            }
            if (restricted) {
                restrictedApps.push(app);
            }
            else {
                permittedApps.push(app);
            }
        }
        this.restrictedApps = restrictedApps.length > 0 ? restrictedApps : null;
        this.permittedApps = permittedApps.length > 0 ? permittedApps : null;
    }
}

/**
 * Cookie modifier class.
 *
 * Learn more about it here:
 * https://github.com/AdguardTeam/AdguardBrowserExtension/issues/961.
 */
class CookieModifier {
    /**
     * Cookie `maxAge` name.
     */
    static MAX_AGE = 'maxAge';
    /**
     * Cookie `sameSite` name.
     */
    static SAME_SITE = 'sameSite';
    /**
     * Option value.
     */
    optionValue;
    /**
     * Regexp value.
     */
    regex;
    /**
     * Cookie name.
     */
    cookieName;
    /**
     * Cookie `sameSite` value.
     */
    sameSite;
    /**
     * Cookie `maxAge` value.
     */
    maxAge;
    /**
     * Constructor.
     *
     * @param value Value of the modifier.
     */
    constructor(value) {
        // Save the source text of the option modifier
        this.optionValue = value || '';
        this.regex = null;
        this.cookieName = null;
        this.sameSite = null;
        this.maxAge = null;
        // Parse cookie name/regex
        const parts = this.optionValue.split(/;/);
        if (parts.length < 1) {
            throw new Error(`Cannot parse ${this.optionValue}`);
        }
        const cookieName = parts[0];
        if (cookieName.startsWith('/') && cookieName.endsWith('/')) {
            const pattern = cookieName.substring(1, cookieName.length - 1);
            // Save regex to be used further for matching cookies
            this.regex = new RegExp(pattern);
        }
        else {
            // Match by cookie name
            this.cookieName = cookieName;
        }
        // Parse other cookie options
        if (parts.length > 1) {
            for (let i = 1; i < parts.length; i += 1) {
                const nameValue = parts[i].split('=');
                const optionName = nameValue[0];
                const optionValue = nameValue[1];
                if (optionName === CookieModifier.MAX_AGE) {
                    this.maxAge = parseInt(optionValue, 10);
                }
                else if (optionName === CookieModifier.SAME_SITE) {
                    this.sameSite = optionValue;
                }
                else {
                    throw new Error(`Unknown $cookie option: ${optionName}`);
                }
            }
        }
    }
    /**
     * Gets modifier value.
     *
     * @returns Modifier value.
     */
    getValue() {
        return this.optionValue;
    }
    /**
     * First cookie name.
     *
     * @returns The first cookie name.
     */
    getCookieName() {
        return this.cookieName;
    }
    /**
     * Max age cookie value.
     *
     * @returns The max age cookie value.
     */
    getMaxAge() {
        return this.maxAge;
    }
    /**
     * Same site cookie value.
     *
     * @returns The same site cookie value.
     */
    getSameSite() {
        return this.sameSite;
    }
    /**
     * Checks if cookie with the specified name matches this option.
     *
     * @param name Cookie name.
     *
     * @returns True if matches, false otherwise.
     */
    matches(name) {
        if (!name) {
            return false;
        }
        if (this.regex) {
            return this.regex.test(name);
        }
        if (this.cookieName) {
            return this.cookieName === name;
        }
        // Empty regex and cookieName means that we must match all cookies
        return true;
    }
    /**
     * Checks if cookie rule has an empty $cookie option.
     *
     * @returns True if $cookie option is empty.
     */
    isEmpty() {
        return !this.regex && !this.cookieName;
    }
    /**
     * Checks if the given modifier is an instance of CookieModifier.
     *
     * @param m The modifier to check.
     *
     * @returns True if the modifier is an instance of CookieModifier, false otherwise.
     */
    static isCookieModifier = (m) => {
        return m instanceof CookieModifier;
    };
}

const CSP_HEADER_NAME = 'Content-Security-Policy';
/**
 * Csp modifier class.
 */
class CspModifier {
    /**
     * Csp directive.
     *
     * @returns The CSP directive.
     */
    cspDirective;
    /**
     * Is allowlist rule.
     */
    isAllowlist;
    /**
     * Constructor.
     *
     * @param value Value of the modifier.
     * @param isAllowlist Whether the rule is an allowlist rule or not.
     */
    constructor(value, isAllowlist) {
        this.cspDirective = value;
        this.isAllowlist = isAllowlist;
        this.validateCspDirective();
    }
    /**
     * Csp directive.
     *
     * @returns The CSP directive.
     */
    getValue() {
        return this.cspDirective;
    }
    /**
     * Validates CSP rule.
     */
    validateCspDirective() {
        /**
         * CSP directive may be empty in case of allowlist rule,
         * it means to disable all $csp rules matching the allowlist rule.
         *
         * @see {@link https://github.com/AdguardTeam/AdguardBrowserExtension/issues/685}
         */
        if (!this.isAllowlist && !this.cspDirective) {
            throw new Error('Invalid $CSP rule: CSP directive must not be empty');
        }
        if (this.cspDirective) {
            /**
             * Forbids report-to and report-uri directives.
             *
             * @see {@link https://github.com/AdguardTeam/AdguardBrowserExtension/issues/685#issue-228287090}
             */
            const cspDirective = this.cspDirective.toLowerCase();
            if (cspDirective.indexOf('report-') >= 0) {
                throw new Error(`Forbidden CSP directive: ${cspDirective}`);
            }
        }
    }
}

/**
 * This is the base class representing double values modifiers.
 */
class BaseValuesModifier {
    /**
     * List of permitted values or null.
     */
    permitted;
    /**
     * List of restricted values or null.
     */
    restricted;
    /**
     * Value.
     */
    value;
    /**
     * Parses the values string.
     *
     * @param values Values string.
     *
     * @throws An error if the string is empty or invalid.
     */
    constructor(values) {
        if (!values) {
            throw new SyntaxError('Modifier cannot be empty');
        }
        this.value = values;
        const permittedValues = [];
        const restrictedValues = [];
        const parts = values.split(SEPARATOR);
        for (let i = 0; i < parts.length; i += 1) {
            let app = parts[i];
            let restricted = false;
            if (app.startsWith('~')) {
                restricted = true;
                app = app.substring(1).trim();
            }
            if (app === '') {
                throw new SyntaxError(`Empty values specified in "${values}"`);
            }
            if (restricted) {
                restrictedValues.push(app);
            }
            else {
                permittedValues.push(app);
            }
        }
        this.restricted = restrictedValues.length > 0 ? restrictedValues : null;
        this.permitted = permittedValues.length > 0 ? permittedValues : null;
    }
    /**
     * Gets list of permitted values.
     *
     * @returns List of permitted values or null if none.
     */
    getPermitted() {
        return this.permitted;
    }
    /**
     * Gets list of restricted values.
     *
     * @returns List of restricted values or null if none.
     */
    getRestricted() {
        return this.restricted;
    }
    /**
     * Gets value.
     *
     * @returns Value.
     */
    getValue() {
        return this.value;
    }
    /**
     * Checks if value matches this modifier.
     *
     * @param value Value to check.
     *
     * @returns True if value matches this modifier, false otherwise.
     */
    match(value) {
        if (!this.restricted && !this.permitted) {
            return true;
        }
        if (this.restricted && this.restricted.includes(value)) {
            return false;
        }
        if (this.permitted) {
            return this.permitted.includes(value);
        }
        return true;
    }
}

// eslint-disable-next-line max-classes-per-file
/**
 * Netmasks class.
 */
class NetmasksCollection {
    /**
     * IPv4 masks.
     */
    ipv4Masks = [];
    /**
     * IPv6 masks.
     */
    ipv6Masks = [];
    /**
     * Returns true if any of the containing masks contains provided value.
     *
     * @param value Value to check.
     *
     * @returns True if any of the containing masks contains provided value.
     */
    contains(value) {
        if (isIp.v4(value)) {
            return this.ipv4Masks.some((x) => contains(x, value));
        }
        return this.ipv6Masks.some((x) => contains(x, value));
    }
}
/**
 * The client modifier allows specifying clients this rule will be working for.
 * It accepts client names (not ClientIDs), IP addresses, or CIDR ranges.
 */
class ClientModifier extends BaseValuesModifier {
    /**
     * Permitted netmasks.
     */
    permittedNetmasks;
    /**
     * Restricted netmasks.
     */
    restrictedNetmasks;
    /**
     * Constructor.
     *
     * @param value Value of the modifier.
     */
    constructor(value) {
        super(value);
        const permitted = this.getPermitted();
        if (permitted) {
            this.permitted = ClientModifier.stripValues(permitted);
            this.permittedNetmasks = ClientModifier.parseNetmasks(this.permitted);
        }
        const restricted = this.getRestricted();
        if (restricted) {
            this.restricted = ClientModifier.stripValues(restricted);
            this.restrictedNetmasks = ClientModifier.parseNetmasks(this.restricted);
        }
    }
    /**
     * Unquotes and unescapes string.
     *
     * @param values Values to process.
     *
     * @returns Unquoted and unescaped values.
     */
    static stripValues(values) {
        return values.map((v) => {
            if ((v.startsWith('"') && v.endsWith('"'))
                || (v.startsWith('\'') && v.endsWith('\''))) {
                // eslint-disable-next-line no-param-reassign
                v = v.substr(1, v.length - 2);
            }
            return v.replace(/\\/ig, '');
        });
    }
    /**
     * Checks if this modifier matches provided params.
     *
     * @param clientName Client name.
     * @param clientIP Client IP.
     *
     * @returns True if this modifier matches provided params.
     */
    matchAny(clientName, clientIP) {
        if (this.restricted) {
            if (clientName && this.restricted.includes(clientName)) {
                return false;
            }
            if (clientIP && this.restricted.includes(clientIP)) {
                return false;
            }
            return true;
        }
        if (this.restrictedNetmasks) {
            if (clientIP && this.restrictedNetmasks.contains(clientIP)) {
                return false;
            }
            return true;
        }
        if (this.permitted) {
            if (clientName && this.permitted.includes(clientName)) {
                return true;
            }
            if (clientIP && this.permitted.includes(clientIP)) {
                return true;
            }
        }
        if (this.permittedNetmasks) {
            if (clientIP && this.permittedNetmasks.contains(clientIP)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Parses netmasks from client's strings.
     *
     * @param values Values to parse.
     *
     * @returns Parsed netmasks.
     */
    static parseNetmasks(values) {
        const result = new NetmasksCollection();
        values.forEach((x) => {
            const cidrVersion = isCidr(x);
            if (cidrVersion === 4) {
                result.ipv4Masks.push(x);
            }
            else if (cidrVersion === 6) {
                result.ipv6Masks.push(x);
            }
        });
        return result;
    }
}

/**
 * The ctag modifier allows to block domains only for specific types of DNS client tags.
 */
class CtagModifier extends BaseValuesModifier {
    /**
     * The list of allowed tags.
     */
    static ALLOWED_TAGS = [
        // By device type:
        'device_audio',
        'device_camera',
        'device_gameconsole',
        'device_laptop',
        'device_nas',
        'device_pc',
        'device_phone',
        'device_printer',
        'device_securityalarm',
        'device_tablet',
        'device_tv',
        'device_other',
        // By operating system:
        'os_android',
        'os_ios',
        'os_linux',
        'os_macos',
        'os_windows',
        'os_other',
        // By user group:
        'user_admin',
        'user_regular',
        'user_child',
    ];
    /**
     * Constructor.
     *
     * @param value Value of the modifier.
     */
    constructor(value) {
        super(value);
        this.validate();
    }
    /**
     * Validates tag values.
     */
    validate() {
        if (!this.getValue()) {
            throw new Error('Invalid rule: Ctag modifier must not be empty');
        }
        const tags = this.permitted ? this.permitted : this.restricted;
        if (tags && tags.some((x) => !CtagModifier.ALLOWED_TAGS.includes(x))) {
            throw new Error('Invalid rule: Invalid ctag modifier');
        }
    }
}

/**
 * The dnsrewrite response modifier allows replacing the content of the response
 * to the DNS request for the matching hosts.
 *
 * TODO: This modifier is not yet implemented.
 *
 * @see {@link https://github.com/AdguardTeam/AdGuardHome/wiki/Hosts-Blocklists#dnsrewrite}
 */
class DnsRewriteModifier {
    /**
     * Value.
     */
    value;
    /**
     * Constructor.
     *
     * @param value Modifier value.
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * Modifier value.
     *
     * @returns The value of the modifier.
     */
    getValue() {
        return this.value;
    }
}

/**
 * The `$dnstype` modifier allows specifying DNS request type on which this rule will be triggered.
 */
class DnsTypeModifier extends BaseValuesModifier {
    /**
     * Constructor.
     *
     * @param value The value used to initialize the modifier.
     */
    constructor(value) {
        super(value);
        if (this.permitted) {
            this.restricted = null;
        }
    }
}

/**
 * Header modifier class.
 * The $header modifier allows matching the HTTP response
 * by a specific header with (optionally) a specific value.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#header-modifier}
 */
class HeaderModifier {
    /**
     * Colon separator.
     */
    COLON_SEPARATOR = ':';
    /**
     * Forward slash regexp marker.
     */
    FORWARD_SLASH = '/';
    /**
     * Header name to match on request.
     */
    header;
    /**
     * Header value to match on request.
     * Empty string if value is not specified, and, in that case,
     * only header name will be matched.
     */
    value;
    /**
     * Constructor.
     *
     * @param headerStr Header modifier value.
     */
    constructor(headerStr) {
        if (headerStr === '') {
            throw new SyntaxError('$header modifier value cannot be empty');
        }
        const separatorIndex = headerStr.indexOf(this.COLON_SEPARATOR);
        if (separatorIndex === -1) {
            this.header = headerStr;
            this.value = null;
            return;
        }
        this.header = headerStr.slice(0, separatorIndex);
        const rawValue = headerStr.slice(separatorIndex + 1);
        if (rawValue === '') {
            throw new SyntaxError(`Invalid $header modifier value: "${headerStr}"`);
        }
        if (rawValue.startsWith(this.FORWARD_SLASH) && rawValue.endsWith(this.FORWARD_SLASH)) {
            this.value = new RegExp(rawValue.slice(1, -1));
        }
        else {
            this.value = rawValue;
        }
    }
    /**
     * Returns header modifier matcher.
     *
     * @returns Header modifier matcher.
     */
    getHeaderModifierMatcher() {
        return {
            header: this.header,
            value: this.value,
        };
    }
}

var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod["GET"] = "GET";
    HTTPMethod["POST"] = "POST";
    HTTPMethod["PUT"] = "PUT";
    HTTPMethod["DELETE"] = "DELETE";
    HTTPMethod["PATCH"] = "PATCH";
    HTTPMethod["HEAD"] = "HEAD";
    HTTPMethod["OPTIONS"] = "OPTIONS";
    HTTPMethod["CONNECT"] = "CONNECT";
    HTTPMethod["TRACE"] = "TRACE";
})(HTTPMethod || (HTTPMethod = {}));
/**
 * Method modifier class.
 * Rules with $method modifier will be applied only to requests with specified methods.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#method-modifier}
 */
class MethodModifier {
    /**
     * Request methods separator.
     */
    static PIPE_SEPARATOR = '|';
    /**
     * List of permitted methods or null.
     */
    permittedValues;
    /**
     * List of restricted methods or null.
     */
    restrictedValues;
    /**
     * Constructor.
     *
     * @param methodsStr Value of the modifier.
     */
    constructor(methodsStr) {
        if (methodsStr === '') {
            throw new SyntaxError('$method modifier value cannot be empty');
        }
        const permittedMethods = [];
        const restrictedMethods = [];
        const parts = methodsStr.toUpperCase().split(MethodModifier.PIPE_SEPARATOR);
        for (let i = 0; i < parts.length; i += 1) {
            let method = parts[i].trim();
            let restricted = false;
            if (method.startsWith('~')) {
                restricted = true;
                method = method.substring(1);
            }
            if (!MethodModifier.isHTTPMethod(method)) {
                throw new SyntaxError(`Invalid $method modifier value: ${method}`);
            }
            if (restricted) {
                restrictedMethods.push(method);
            }
            else {
                permittedMethods.push(method);
            }
        }
        if (restrictedMethods.length > 0 && permittedMethods.length > 0) {
            throw new SyntaxError(`Negated values cannot be mixed with non-negated values: ${methodsStr}`);
        }
        this.restrictedValues = restrictedMethods.length > 0 ? restrictedMethods : null;
        this.permittedValues = permittedMethods.length > 0 ? permittedMethods : null;
    }
    /**
     * Checks if the value is a valid HTTP method.
     *
     * @param value Value to check.
     *
     * @returns True if the value is a valid HTTP method, otherwise false.
     */
    static isHTTPMethod = (value) => value in HTTPMethod;
}

const PERMISSIONS_POLICY_HEADER_NAME = 'Permissions-Policy';
const COMMA_SEPARATOR = ',';
const PIPE_SEPARATOR = '|';
/**
 * Permissions modifier class.
 * Allows setting permission policies, effectively blocking specific page functionality.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#permissions-modifier}
 */
class PermissionsModifier {
    /**
     * Permission Policy directive.
     */
    permissionPolicyDirective;
    /**
     * Regular expression to apply correct separators.
     * It replaces escaped commas and pipe separators with commas.
     */
    static RE_SEPARATOR_REPLACE = new RegExp(`(\\\\${COMMA_SEPARATOR}|\\${PIPE_SEPARATOR})`, 'g');
    /**
     * Constructor.
     *
     * @param permissionPolicyStr The permission policy string to be set.
     * @param isAllowlist Indicates if the permission policy is for an allowlist.
     */
    constructor(permissionPolicyStr, isAllowlist) {
        this.permissionPolicyDirective = permissionPolicyStr
            .replace(PermissionsModifier.RE_SEPARATOR_REPLACE, COMMA_SEPARATOR);
        PermissionsModifier.validatePermissionPolicyDirective(this.permissionPolicyDirective, isAllowlist);
    }
    /**
     * Returns permission policy allowlist string.
     *
     * @returns Permission policy allowlist string.
     */
    getValue() {
        return this.permissionPolicyDirective;
    }
    /**
     * Validates permission policy directive.
     *
     * @param directive The permission policy directive to validate.
     * @param isAllowlist Indicates if the directive is for an allowlist.
     *
     * @throws SyntaxError on invalid permission policy directive.
     */
    static validatePermissionPolicyDirective(directive, isAllowlist) {
        /**
         * $permissions modifier value may be empty only in case of allowlist rule,
         * it means to disable all $permissions rules matching the rule pattern.
         */
        if (!isAllowlist && !directive) {
            throw new SyntaxError('Invalid $permissions rule: permissions directive must not be empty');
        }
    }
}

/**
 * Redirect modifier class.
 */
class RedirectModifier {
    /**
     * Redirect title.
     */
    redirectTitle;
    /**
     * Is redirecting only blocked requests
     * See $redirect-rule options.
     */
    isRedirectingOnlyBlocked = false;
    /**
     * Constructor.
     *
     * @param value Redirect modifier value.
     * @param isAllowlist Is allowlist rule.
     * @param isRedirectingOnlyBlocked Is redirect-rule modifier.
     */
    constructor(value, isAllowlist, isRedirectingOnlyBlocked = false) {
        RedirectModifier.validate(value, isAllowlist);
        this.redirectTitle = value;
        this.isRedirectingOnlyBlocked = isRedirectingOnlyBlocked;
    }
    /**
     * Redirect title.
     *
     * @returns The redirect title.
     */
    getValue() {
        return this.redirectTitle;
    }
    /**
     * Validates redirect rule.
     *
     * @param redirectTitle The title of the redirect.
     * @param isAllowlist Indicates if the rule is an allowlist rule.
     */
    static validate(redirectTitle, isAllowlist) {
        if (isAllowlist && !redirectTitle) {
            return;
        }
        if (!redirectTitle) {
            throw new SyntaxError('Invalid $redirect rule, redirect value must not be empty');
        }
        if (!isRedirectResourceCompatibleWithAdg(redirectTitle)) {
            throw new SyntaxError('$redirect modifier is invalid');
        }
    }
}

/**
 * Headers filtering modifier class.
 * Rules with $removeheader modifier are intended to remove headers from HTTP requests and responses.
 */
class RemoveHeaderModifier {
    /**
     * List of forbidden headers.
     */
    static FORBIDDEN_HEADERS = [
        'access-control-allow-origin',
        'access-control-allow-credentials',
        'access-control-allow-headers',
        'access-control-allow-methods',
        'access-control-expose-headers',
        'access-control-max-age',
        'access-control-request-headers',
        'access-control-request-method',
        'origin',
        'timing-allow-origin',
        'allow',
        'cross-origin-embedder-policy',
        'cross-origin-opener-policy',
        'cross-origin-resource-policy',
        'content-security-policy',
        'content-security-policy-report-only',
        'expect-ct',
        'feature-policy',
        'origin-isolation',
        'strict-transport-security',
        'upgrade-insecure-requests',
        'x-content-type-options',
        'x-download-options',
        'x-frame-options',
        'x-permitted-cross-domain-policies',
        'x-powered-by',
        'x-xss-protection',
        'public-key-pins',
        'public-key-pins-report-only',
        'sec-websocket-key',
        'sec-websocket-extensions',
        'sec-websocket-accept',
        'sec-websocket-protocol',
        'sec-websocket-version',
        'p3p',
        'sec-fetch-mode',
        'sec-fetch-dest',
        'sec-fetch-site',
        'sec-fetch-user',
        'referrer-policy',
        'content-type',
        'content-length',
        'accept',
        'accept-encoding',
        'host',
        'connection',
        'transfer-encoding',
        'upgrade',
    ];
    /**
     * Request prefix.
     */
    static REQUEST_PREFIX = 'request:';
    /**
     * Prefixed headers are applied to request headers.
     */
    isRequestModifier;
    /**
     * Effective header name to be removed.
     */
    applicableHeaderName;
    /**
     * Value.
     */
    value;
    /**
     * Is rule valid or not.
     */
    valid;
    /**
     * Constructor.
     *
     * @param value Value of the modifier.
     * @param isAllowlist Whether the rule is an allowlist rule or not.
     */
    constructor(value, isAllowlist) {
        this.value = value.toLowerCase();
        if (!isAllowlist && !this.value) {
            throw new SyntaxError('Invalid $removeheader rule, removeheader value must not be empty');
        }
        this.isRequestModifier = this.value.startsWith(RemoveHeaderModifier.REQUEST_PREFIX);
        const headerName = this.isRequestModifier
            ? this.value.substring(RemoveHeaderModifier.REQUEST_PREFIX.length)
            : this.value;
        // Values with ":" are not supported in MV3 declarative rules, e.g. "$removeheader=dnt:1"
        this.valid = RemoveHeaderModifier.isAllowedHeader(headerName) && !headerName.includes(':');
        this.applicableHeaderName = this.valid ? headerName : null;
    }
    /**
     * Modifier value.
     *
     * @returns The value of the modifier.
     */
    getValue() {
        return this.value;
    }
    /**
     * Modifier validity.
     *
     * @returns True if the rule is valid, false otherwise.
     */
    get isValid() {
        return this.valid;
    }
    /**
     * Checks if the given modifier is an instance of RemoveHeaderModifier.
     *
     * @param m The modifier to check.
     *
     * @returns True if the modifier is an instance of RemoveHeaderModifier, false otherwise.
     */
    static isRemoveHeaderModifier = (m) => {
        return m instanceof RemoveHeaderModifier;
    };
    /**
     * Returns effective header name to be removed.
     *
     * @param isRequestHeaders Flag to determine that the header is a *request* header,
     * otherwise *response* header.
     *
     * @returns The applicable header name if valid, otherwise null.
     */
    getApplicableHeaderName(isRequestHeaders) {
        if (!this.applicableHeaderName) {
            return null;
        }
        if (isRequestHeaders !== this.isRequestModifier) {
            return null;
        }
        return this.applicableHeaderName;
    }
    /**
     * Some headers are forbidden to remove.
     *
     * @param headerName Header name to check.
     *
     * @returns True if the header is allowed to be removed, false otherwise.
     */
    static isAllowedHeader(headerName) {
        return !this.FORBIDDEN_HEADERS.includes(headerName);
    }
}

/**
 * Splits url into parts.
 *
 * @param url The URL to be checked.
 *
 * @returns An object containing the path, query, and hash of the URL.
 */
function splitUrl(url) {
    let strippedUrl = url;
    let hash = '';
    const hashIndex = url.indexOf('#');
    if (hashIndex >= 0) {
        hash = url.slice(hashIndex);
        strippedUrl = url.slice(0, hashIndex);
    }
    let query = '';
    const queryIndex = url.indexOf('?');
    if (queryIndex >= 0) {
        query = strippedUrl.slice(queryIndex + 1);
        strippedUrl = strippedUrl.slice(0, queryIndex);
    }
    return {
        path: strippedUrl,
        query,
        hash,
    };
}
/**
 * Normalizes url query parameters.
 *
 * @param query The query string to be normalized.
 *
 * @returns The normalized query string.
 */
function normalizeQuery(query) {
    // Cleanup empty params (p0=0&=2&=3)
    let result = query
        .split('&')
        .filter((x) => x && !x.startsWith('='))
        .join('&');
    // If we've collapsed the URL to the point where there's an '&' against the '?'
    // then we need to get rid of that.
    while (result.charAt(0) === '&') {
        result = result.slice(1);
    }
    return result;
}
/**
 * Removes query params from url by regexp.
 *
 * @param url The URL from which query parameters will be removed.
 * @param regExp The regular expression to match query parameters.
 * @param invert Remove every parameter in url except the ones matched regexp.
 *
 * @returns The URL with the specified query parameters removed.
 */
function cleanUrlParamByRegExp(url, regExp, invert = false) {
    const searchIndex = url.indexOf('?');
    // If no params, nothing to modify
    if (searchIndex === -1) {
        return url;
    }
    const split = splitUrl(url);
    /**
     * We are checking both regular param and decoded param, in case if regexp
     * contains decoded params and url contains encoded params.
     *
     * @see {@link https://github.com/AdguardTeam/AdguardBrowserExtension/issues/3015}
     */
    let modifiedQuery;
    if (invert) {
        modifiedQuery = split.query
            .split('&')
            .filter((x) => x && (x.match(regExp) || decodeURIComponent(x).match(regExp)))
            .join('&');
    }
    else {
        modifiedQuery = split.query
            .split('&')
            .filter((x) => {
            const test = x.includes('=') ? x : `${x}=`;
            return !test.match(regExp) && !decodeURIComponent(test).match(regExp);
        })
            .join('&');
    }
    // Do not normalize if regexp is not applied
    if (modifiedQuery === split.query) {
        return url;
    }
    modifiedQuery = normalizeQuery(modifiedQuery);
    let result = split.path;
    if (modifiedQuery) {
        result += `?${modifiedQuery}`;
    }
    return result + split.hash;
}
/**
 * Extract relative part from hierarchical structured URL.
 *
 * @param url The URL from which the relative part will be extracted.
 *
 * @returns The relative part of the URL or null if not found.
 */
const getRelativeUrl = (url) => {
    const i = url.indexOf('/', url.indexOf('://') + 3);
    return i !== -1 ? url.slice(i) : null;
};
/**
 * Checks if url is http or websocket.
 *
 * @param url Request url.
 *
 * @returns True if url starts with http{s?} or ws.
 */
function isHttpOrWsRequest(url) {
    return !!url && (url.startsWith('http') || url.startsWith('ws'));
}

/**
 * Query parameters filtering modifier class.
 * Works with `$removeparam` modifier.
 */
class RemoveParamModifier {
    /**
     * Value of the modifier.
     */
    value;
    /**
     * Is modifier valid for MV3 or not.
     *
     * @returns True if the modifier is valid for MV3, false otherwise.
     */
    mv3Valid = true;
    /**
     * RegExp to apply.
     */
    valueRegExp;
    /**
     * Constructor.
     *
     * @param value The value used to initialize the modifier.
     */
    constructor(value) {
        this.value = value;
        let rawValue = value;
        // TODO: Seems like negation not using in valueRegExp
        if (value.startsWith('~')) {
            rawValue = value.substring(1);
            this.mv3Valid = false;
        }
        if (rawValue.startsWith('/')) {
            this.valueRegExp = SimpleRegex.patternFromString(rawValue);
            this.mv3Valid = false;
        }
        else {
            if (rawValue.includes('|')) {
                throw new Error('Unsupported option in $removeparam: multiple values are not allowed');
            }
            // no need to match "&" in the beginning, because we are splitting by "&"
            // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/3076
            this.valueRegExp = new RegExp(`^${SimpleRegex.escapeRegexSpecials(rawValue)}=[^&#]*$`, 'g');
        }
    }
    /**
     * Modifier value.
     *
     * @returns The value of the modifier.
     */
    getValue() {
        return this.value;
    }
    /**
     * Is modifier valid for MV3 or not.
     *
     * @returns True if the modifier is valid for MV3, false otherwise.
     */
    getMV3Validity() {
        return this.mv3Valid;
    }
    /**
     * Checks if the given modifier is an instance of RemoveParamModifier.
     *
     * @param m The modifier to check.
     *
     * @returns True if the modifier is an instance of RemoveParamModifier, false otherwise.
     */
    static isRemoveParamModifier = (m) => {
        return m instanceof RemoveParamModifier;
    };
    /**
     * Removes query parameters from url.
     *
     * @param url The URL from which query parameters should be removed.
     *
     * @returns The URL with the query parameters removed.
     */
    removeParameters(url) {
        const sepIndex = url.indexOf('?');
        if (sepIndex < 0) {
            return url;
        }
        if (!this.value) {
            return url.substring(0, sepIndex);
        }
        if (sepIndex === url.length - 1) {
            return url;
        }
        if (this.value.startsWith('~')) {
            return cleanUrlParamByRegExp(url, this.valueRegExp, true);
        }
        return cleanUrlParamByRegExp(url, this.valueRegExp);
    }
}

/**
 * Parses a `/regexp/replacement/flags` option string into a compiled
 * replacement function.  Shared by `$replace` and `$urltransform`.
 *
 * - The `g` (global) flag is added automatically when not present.
 * - `\$` in the replacement is unescaped to `$`.
 * - Special characters are unescaped via {@link SimpleRegex.unescapeSpecials}.
 *
 * @param option Raw option value (e.g. `/regex/replacement/flags`).
 *
 * @returns Parsed substitution with an apply function and the original text.
 */
function parseRegexSubstitution(option) {
    if (!option) {
        return {
            apply: (x) => x,
            optionText: '',
        };
    }
    const parts = splitByDelimiterWithEscapeCharacter(option, '/', '\\', true);
    let flagsStr = parts[2] || '';
    if (flagsStr.indexOf('g') < 0) {
        flagsStr += 'g';
    }
    const pattern = new RegExp(parts[0], flagsStr);
    // unescape replacement alias
    let replacement = parts[1].replace(/\\\$/g, '$');
    replacement = SimpleRegex.unescapeSpecials(replacement);
    const apply = (input) => input.replace(pattern, replacement);
    return { apply, optionText: option };
}

/**
 * Replace modifier class.
 */
class ReplaceModifier {
    /**
     * Replace option value.
     */
    replaceOption;
    /**
     * Replace option apply function.
     */
    replaceApply;
    /**
     * Constructor.
     *
     * @param value Replace modifier value.
     */
    constructor(value) {
        const parsed = parseRegexSubstitution(value);
        this.replaceOption = parsed.optionText;
        this.replaceApply = parsed.apply;
    }
    /**
     * Replace content.
     *
     * @returns The replace option value.
     */
    getValue() {
        return this.replaceOption;
    }
    /**
     * Replace apply function.
     *
     * @returns The function to apply the replacement.
     */
    getApplyFunc() {
        return this.replaceApply;
    }
}

/**
 * `$to` modifier class.
 * Rules with $to modifier are limited to requests made to the specified domains and their subdomains.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#to-modifier}
 */
class ToModifier {
    /**
     * Domains separator.
     */
    static PIPE_SEPARATOR = '|';
    /**
     * List of permitted domains or null.
     */
    permittedValues;
    /**
     * List of restricted domains or null.
     */
    restrictedValues;
    /**
     * Constructor.
     *
     * @param domainsStr String with domains separated by `|`.
     */
    constructor(domainsStr) {
        if (!domainsStr) {
            throw new SyntaxError('$to modifier value cannot be empty');
        }
        const permittedDomains = [];
        const restrictedDomains = [];
        const parts = domainsStr.toLowerCase().split(ToModifier.PIPE_SEPARATOR);
        for (let i = 0; i < parts.length; i += 1) {
            let domain = parts[i].trim();
            let restricted = false;
            if (domain.startsWith('~')) {
                restricted = true;
                domain = domain.substring(1);
            }
            if (domain === '') {
                throw new SyntaxError(`Empty domain specified in "${domainsStr}"`);
            }
            if (restricted) {
                restrictedDomains.push(domain);
            }
            else {
                permittedDomains.push(domain);
            }
        }
        this.restrictedValues = restrictedDomains.length > 0 ? restrictedDomains : null;
        this.permittedValues = permittedDomains.length > 0 ? permittedDomains : null;
    }
}

/**
 * Prefix that identifies full-URL mode patterns.
 * When the regex pattern starts with this prefix, the substitution
 * is applied to the entire URL (not just path+query+hash).
 */
const FULL_URL_PATTERN_PREFIX = '^http';
/**
 * Allowed URL protocols for full-URL transform results.
 * Dangerous schemes (javascript:, data:, file:, etc.) are rejected.
 */
const ALLOWED_PROTOCOLS = new Set(['http:', 'https:', 'ws:', 'wss:']);
/**
 * Keyword for Base64 decode transform.
 */
const B64_KEYWORD = 'b64';
/**
 * Keyword for percent-decode transform.
 */
const PCT_KEYWORD = 'pct';
/**
 * UTF-8 decoder with fatal mode — throws on invalid byte sequences.
 */
const utf8Decoder = new TextDecoder('utf-8', { fatal: true });
/**
 * Decodes a Base64-encoded string to UTF-8 text.
 *
 * Supports standard Base64.
 * Padding is optional. Returns the input unchanged on failure.
 *
 * @param input The Base64-encoded string.
 *
 * @returns Decoded UTF-8 string, or the original input on failure.
 */
function decodeBase64(input) {
    if (input.length === 0) {
        return '';
    }
    try {
        // Normalize URL-safe characters to standard Base64
        let normalized = input.replace(/-/g, '+').replace(/_/g, '/');
        // Add padding if missing
        const remainder = normalized.length % 4;
        if (remainder === 2) {
            normalized += '==';
        }
        else if (remainder === 3) {
            normalized += '=';
        }
        // Decode Base64 to binary string
        const binaryString = atob(normalized);
        // Convert binary string to Uint8Array
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i += 1) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        // Interpret as UTF-8 (fatal mode throws on invalid sequences)
        return utf8Decoder.decode(bytes);
    }
    catch {
        return input;
    }
}
/**
 * Decodes a percent-encoded string.
 *
 * Equivalent to `decodeURIComponent()`. Returns the input unchanged if
 * decoding fails (e.g., invalid `%XX` sequences like `%GG`).
 *
 * @param input The percent-encoded string.
 *
 * @returns Decoded string, or the original input on failure.
 */
function decodePercent(input) {
    try {
        return decodeURIComponent(input);
    }
    catch {
        return input;
    }
}
/**
 * Splits a `$urltransform` value into pipeline segments by `|`.
 *
 * Handles `|` inside `/…/…/…/` substitution blocks correctly — those are
 * regex alternation operators, not pipeline separators.
 *
 * @param value The raw `$urltransform` modifier value.
 *
 * @returns Array of pipeline segment strings.
 */
function splitPipeline(value) {
    const segments = [];
    let current = '';
    let slashCount = 0;
    let inSubstitute = false;
    let escaped = false;
    for (let i = 0; i < value.length; i += 1) {
        const ch = value[i];
        if (escaped) {
            current += ch;
            escaped = false;
            continue;
        }
        if (ch === '\\') {
            current += ch;
            escaped = true;
            continue;
        }
        if (ch === '|' && !inSubstitute) {
            segments.push(current);
            current = '';
            slashCount = 0;
            continue;
        }
        if (ch === '/') {
            if (!inSubstitute && current.length === 0) {
                inSubstitute = true;
                slashCount = 0;
            }
            if (inSubstitute) {
                slashCount += 1;
                if (slashCount >= 3) {
                    inSubstitute = false;
                }
            }
        }
        current += ch;
    }
    segments.push(current);
    return segments;
}
/**
 * Compiles a single pipeline segment into a transform function.
 *
 * @param segment The segment text.
 *
 * @returns A `(input: string) => string` transform function.
 */
function compileSegment(segment) {
    const trimmed = segment.trim();
    if (trimmed.length === 0) {
        return (input) => input;
    }
    if (trimmed === B64_KEYWORD) {
        return decodeBase64;
    }
    if (trimmed === PCT_KEYWORD) {
        return decodePercent;
    }
    // In AdGuard filter syntax `$` is the modifier separator, so rule
    // authors write `\$` inside regex patterns.  Unescape before passing
    // to parseRegexSubstitution so that `$` works as the end-of-string
    // anchor (or `$1`-style backreference) in the compiled regex.
    const unescaped = trimmed.replace(/\\\$/g, '$');
    const parsed = parseRegexSubstitution(unescaped);
    return parsed.apply;
}
/**
 * Checks if a pipeline segment is a substitute transform (as opposed to a
 * decode keyword or empty segment).
 *
 * @param segment The trimmed segment text.
 *
 * @returns `true` if the segment is a substitute transform.
 */
function isSubstitute(segment) {
    if (segment.length === 0) {
        return false;
    }
    if (segment === B64_KEYWORD || segment === PCT_KEYWORD) {
        return false;
    }
    return true;
}
/**
 * Detects full-URL mode by checking the first substitute transform in
 * the pipeline.
 *
 * A substitute's regex starts with `^http` when:
 * - The segment is `/^http...` (leading `/` before the pattern), or
 * - The segment is `^http...` (no leading `/`, also valid for parseRegexSubstitution).
 *
 * @param segments Array of pipeline segment strings.
 *
 * @returns `true` if the first substitute's regex starts with `^http`.
 */
function detectFullUrlMode(segments) {
    for (const seg of segments) {
        const trimmed = seg.trim();
        if (isSubstitute(trimmed)) {
            // Pattern starts after optional leading '/'
            if (trimmed.startsWith('/')) {
                return trimmed.startsWith(`/${FULL_URL_PATTERN_PREFIX}`);
            }
            return trimmed.startsWith(FULL_URL_PATTERN_PREFIX);
        }
    }
    return false;
}
/**
 * UrlTransform modifier class.
 *
 * Parses a `$urltransform` value that may be a single transform or a
 * `|`-separated pipeline of transforms.
 *
 * Two modes of operation:
 * - **Path-only mode** (default): the pipeline input is `pathname+search+hash`,
 *   origin (scheme+host+port) is preserved.
 * - **Full-URL mode**: when the first substitute's regex starts with `^http`,
 *   the pipeline input is the entire URL string, allowing origin changes.
 */
class UrlTransformModifier {
    /**
     * Raw option text (e.g. `/\/old\//\/new\//` or `/X/Y/|pct`).
     */
    optionText;
    /**
     * Composed pipeline function that applies all transforms in sequence.
     */
    applyFn;
    /**
     * Whether this modifier operates in full-URL mode.
     * True when the first substitute's regex starts with `^http`.
     */
    fullUrlMode;
    /**
     * Constructor.
     *
     * @param value UrlTransform modifier value (may contain `|` pipeline separators).
     * @param isAllowlist Whether the rule is an allowlist (exception) rule.
     * The value may be omitted only in allowlist rules, e.g.
     * `@@||example.com^$urltransform` disables urltransform rules for matching requests.
     *
     * @throws SyntaxError if the value is empty and the rule is not an allowlist rule.
     */
    constructor(value, isAllowlist) {
        UrlTransformModifier.validate(value, isAllowlist);
        this.optionText = value;
        if (!value) {
            this.applyFn = (x) => x;
            this.fullUrlMode = false;
            return;
        }
        const segments = splitPipeline(value);
        this.fullUrlMode = detectFullUrlMode(segments);
        const transforms = segments.map(compileSegment);
        if (transforms.length === 1) {
            [this.applyFn] = transforms;
        }
        else {
            this.applyFn = (input) => {
                let result = input;
                for (const transform of transforms) {
                    result = transform(result);
                }
                return result;
            };
        }
    }
    /**
     * Returns the raw modifier value (including pipeline `|` separators).
     *
     * @returns The option text.
     */
    getValue() {
        return this.optionText;
    }
    /**
     * Returns the composed pipeline function.
     * Operates on raw strings — for URL-aware application use
     * {@link applyToUrl} instead.
     *
     * @returns The function to apply the pipeline.
     */
    getApplyFunc() {
        return this.applyFn;
    }
    /**
     * Whether this modifier operates in full-URL mode.
     * In full-URL mode the pipeline is applied to the entire URL string,
     * allowing origin-changing redirects.
     *
     * @returns True if the first substitute's regex starts with `^http`.
     */
    isFullUrlMode() {
        return this.fullUrlMode;
    }
    /**
     * Applies the url transform pipeline to the given URL.
     *
     * In path-only mode (default): only the path+query+hash portion is
     * subject to the pipeline. If the result would change the origin
     * (scheme+host+port), the original URL is returned unchanged.
     *
     * In full-URL mode (first substitute starts with `^http`): the entire URL
     * is subject to the pipeline. The result must be a valid URL with an
     * allowed scheme (http/https/ws/wss).
     *
     * @param url The full URL string to transform.
     *
     * @returns The transformed URL, or the original if no change,
     *          invalid result, or disallowed scheme.
     */
    applyToUrl(url) {
        if (this.fullUrlMode) {
            return this.applyFullUrl(url);
        }
        return this.applyPathOnly(url);
    }
    /**
     * Full-URL mode: apply pipeline to the entire URL string.
     *
     * @param url The full URL string.
     *
     * @returns Transformed URL or original on failure.
     */
    applyFullUrl(url) {
        const transformed = this.applyFn(url);
        // No change
        if (transformed === url) {
            return url;
        }
        // Validate the result is a proper URL with an allowed scheme
        try {
            const resultParsed = new URL(transformed);
            if (!ALLOWED_PROTOCOLS.has(resultParsed.protocol)) {
                return url;
            }
        }
        catch {
            return url;
        }
        return transformed;
    }
    /**
     * Path-only mode: apply pipeline to path+query+hash only, preserving origin.
     *
     * @param url The full URL string.
     *
     * @returns Transformed URL or original on failure.
     */
    applyPathOnly(url) {
        let parsed;
        try {
            parsed = new URL(url);
        }
        catch {
            return url;
        }
        const originalOrigin = parsed.origin;
        const target = `${parsed.pathname}${parsed.search}${parsed.hash}`;
        const transformed = this.applyFn(target);
        if (transformed === target) {
            return url;
        }
        const result = `${originalOrigin}${transformed}`;
        try {
            const resultParsed = new URL(result);
            if (resultParsed.origin !== originalOrigin) {
                return url;
            }
        }
        catch {
            return url;
        }
        return result;
    }
    /**
     * Validates urltransform rule.
     *
     * @param value UrlTransform modifier value.
     * @param isAllowlist Indicates if the rule is an allowlist rule.
     *
     * @throws SyntaxError if the value is empty and the rule is not an allowlist rule.
     */
    static validate(value, isAllowlist) {
        if (!isAllowlist && !value) {
            throw new SyntaxError('Invalid $urltransform rule, urltransform value must not be empty');
        }
    }
}

/* eslint-disable no-param-reassign */
/**
 * Counts the number of set bits (1s) in a 32-bit number using Hamming Weight (SWAR) method.
 *
 * @param a Number to count bits in.
 *
 * @returns The number of bits set to 1.
 */
function getBitCount(a) {
    a -= ((a >>> 1) & 0x55555555);
    a = (a & 0x33333333) + ((a >>> 2) & 0x33333333);
    a = (a + (a >>> 4)) & 0x0F0F0F0F;
    a += (a >>> 8);
    a += (a >>> 16);
    return a & 0x3F;
}
/**
 * Count the number of bits enabled in a number based on a bit mask.
 *
 * @param base Base number to check.
 * @param mask Mask to apply.
 *
 * @returns Number of bits set in `base & mask`.
 */
function countEnabledBits(base, mask) {
    return getBitCount(base & mask);
}

/**
 * Maximum number of usable bits per word (bits 0–30; bit 31 is the sign bit).
 */
const BITS_PER_LEVEL = 31;
/**
 * Stateless utility class with static helpers for operating on
 * {@link NetworkRuleOption} (`{ lo, hi }`) wide bitfields.
 * Does not hold any instance state — all methods are pure static functions.
 */
class OptionFlags {
    /**
     * Creates a {@link NetworkRuleOption} with a single bit set.
     * Bit 0 is reserved for `NotSet` and returns `{ lo: 0, hi: 0 }`.
     * Bits 1–31 go into `lo`; bits 32–62 automatically go into `hi`.
     *
     * @param bit Logical bit index (0–62). 0 means "not set".
     *
     * @returns A new `{ lo, hi }` object with that bit set.
     */
    static createOption(bit) {
        if (bit === 0) {
            return { lo: 0, hi: 0 };
        }
        const effective = bit - 1;
        if (effective < BITS_PER_LEVEL) {
            return { lo: 1 << effective, hi: 0 };
        }
        return { lo: 0, hi: 1 << (effective - BITS_PER_LEVEL) };
    }
    /**
     * Checks if all bits of `option` are set in `mask`.
     *
     * @param option Option flag(s) to test.
     * @param mask Mask to test against.
     *
     * @returns True if all bits of `option` are present in `mask`.
     */
    static has(option, mask) {
        return (mask.lo & option.lo) === option.lo
            && (mask.hi & option.hi) === option.hi;
    }
    /**
     * Returns true if both words are exactly equal.
     *
     * @param a First option flags.
     * @param b Second option flags.
     *
     * @returns True if equal.
     */
    static equals(a, b) {
        return a.lo === b.lo && a.hi === b.hi;
    }
    /**
     * Returns true if no bits are set.
     *
     * @param a Option flags to check.
     *
     * @returns True if empty (no bits set).
     */
    static isEmpty(a) {
        return a.lo === 0 && a.hi === 0;
    }
    /**
     * Bitwise OR — returns a new object.
     *
     * @param a First operand.
     * @param b Second operand.
     *
     * @returns New option flags with all bits from both operands.
     */
    static or(a, b) {
        return { lo: a.lo | b.lo, hi: a.hi | b.hi };
    }
    /**
     * Bitwise AND — returns a new object.
     *
     * @param a First operand.
     * @param b Second operand.
     *
     * @returns New option flags with only the bits common to both operands.
     */
    static and(a, b) {
        return { lo: a.lo & b.lo, hi: a.hi & b.hi };
    }
    /**
     * Bitwise XOR — returns a new object.
     *
     * @param a First operand.
     * @param b Second operand.
     *
     * @returns New option flags with bits that differ between operands.
     */
    static xor(a, b) {
        return { lo: a.lo ^ b.lo, hi: a.hi ^ b.hi };
    }
    /**
     * Mutates `target` in place — sets all bits from `flag`.
     *
     * @param target Target option flags to mutate.
     * @param flag Flag(s) to enable.
     */
    static enable(target, flag) {
        /* eslint-disable no-param-reassign */
        target.lo |= flag.lo;
        target.hi |= flag.hi;
        /* eslint-enable no-param-reassign */
    }
    /**
     * Counts set bits in `base` masked by `mask`.
     *
     * @param base Base option flags.
     * @param mask Mask to apply before counting.
     *
     * @returns Number of set bits in the masked value.
     */
    static maskedBitCount(base, mask) {
        return getBitCount(base.lo & mask.lo) + getBitCount(base.hi & mask.hi);
    }
    /**
     * Combines multiple options into one via bitwise OR.
     *
     * @param options Options to combine.
     *
     * @returns A new `{ lo, hi }` with all bits from all inputs.
     */
    static combine(...options) {
        let lo = 0;
        let hi = 0;
        for (const opt of options) {
            lo |= opt.lo;
            hi |= opt.hi;
        }
        return { lo, hi };
    }
}

/**
 * Rule pattern class.
 *
 * This class parses rule pattern text to simple fields.
 */
class Pattern {
    /**
     * Original pattern text.
     */
    pattern;
    /**
     * Shortcut string.
     */
    shortcut;
    /**
     * If this pattern already prepared indicator.
     */
    prepared;
    /**
     * Parsed hostname.
     */
    hostname;
    /**
     * Parsed regular expression.
     */
    regex;
    /**
     * Invalid regex flag.
     */
    regexInvalid;
    /**
     * Domain specific pattern flag.
     */
    patternDomainSpecific;
    /**
     * If true, pattern and shortcut are the same.
     * In this case, we don't actually need to use `matchPattern`
     * if shortcut was already matched.
     */
    patternShortcut;
    /**
     * If pattern is match-case regex.
     */
    matchcase;
    /**
     * Constructor.
     *
     * @param pattern Pattern.
     * @param matchcase Flag for case-sensitive matching, default is false.
     */
    constructor(pattern, matchcase = false) {
        this.pattern = pattern;
        this.shortcut = SimpleRegex.extractShortcut(this.pattern);
        this.matchcase = matchcase;
    }
    /**
     * Checks if this rule pattern matches the specified request.
     *
     * @param request Request to check.
     * @param shortcutMatched If true, it means that the request already matches
     * this pattern's shortcut and we don't need to match it again.
     *
     * @returns True if pattern matches.
     */
    matchPattern(request, shortcutMatched) {
        this.prepare();
        if (this.patternShortcut) {
            return shortcutMatched || this.matchShortcut(request.urlLowercase);
        }
        if (this.hostname) {
            // If we have a `||example.org^` rule, it's easier to match
            // against the request's hostname only without matching
            // a regular expression.
            return request.hostname === this.hostname
                || ( // First light check without new string memory allocation
                request.hostname.endsWith(this.hostname)
                    // Strict check
                    && request.hostname.endsWith(`.${this.hostname}`));
        }
        // If the regular expression is invalid, just return false right away.
        if (this.regexInvalid || !this.regex) {
            return false;
        }
        // This is needed for DNS filtering only, not used in browser blocking.
        if (this.shouldMatchHostname(request)) {
            return this.regex.test(request.hostname);
        }
        return this.regex.test(request.url);
    }
    /**
     * Checks if this rule pattern matches the specified relative path string.
     * This method is used in cosmetic rules to implement the $path modifier matching logic.
     *
     * @param path Path to check.
     *
     * @returns True if pattern matches.
     */
    matchPathPattern(path) {
        this.prepare();
        if (this.hostname) {
            return false;
        }
        const pathIsEmptyString = this.pattern === '';
        // No-value $path should match root URL
        if (pathIsEmptyString && path === '/') {
            return true;
        }
        if (!pathIsEmptyString && this.patternShortcut) {
            return this.matchShortcut(path);
        }
        // If the regular expression is invalid, just return false right away.
        if (this.regexInvalid || !this.regex) {
            return false;
        }
        return this.regex.test(path);
    }
    /**
     * Simply checks if shortcut is a substring of the URL.
     *
     * @param str Shortcut to check.
     *
     * @returns True if the shortcut is a substring of the URL.
     */
    matchShortcut(str) {
        return str.indexOf(this.shortcut) >= 0;
    }
    /**
     * Prepares this pattern.
     */
    prepare() {
        if (this.prepared) {
            return;
        }
        this.prepared = true;
        // If shortcut and pattern are the same, we don't need to actually compile
        // a regex and can simply use matchShortcut instead,
        // except for the $match-case modifier
        if (this.pattern === this.shortcut && !this.matchcase) {
            this.patternShortcut = true;
            return;
        }
        // Rules like `/example/*` are rather often in the real-life filters,
        // we might want to process them.
        if (this.pattern.startsWith(this.shortcut)
            && this.pattern.length === this.shortcut.length + 1
            && this.pattern.endsWith('*')) {
            this.patternShortcut = true;
            return;
        }
        if (this.pattern.startsWith(SimpleRegex.MASK_START_URL)
            && this.pattern.endsWith(SimpleRegex.MASK_SEPARATOR)
            && this.pattern.indexOf('*') < 0
            && this.pattern.indexOf('/') < 0) {
            this.hostname = this.pattern.slice(2, this.pattern.length - 1);
            return;
        }
        this.compileRegex();
    }
    /**
     * Compiles this pattern regex.
     */
    compileRegex() {
        const regexText = SimpleRegex.patternToRegexp(this.pattern);
        try {
            let flags = 'i';
            if (this.matchcase) {
                flags = '';
            }
            this.regex = new RegExp(regexText, flags);
        }
        catch (e) {
            this.regexInvalid = true;
        }
    }
    /**
     * Checks if we should match hostnames and not the URL
     * this is important for the cases when we use urlfilter for DNS-level blocking
     * Note, that even though we may work on a DNS-level, we should still sometimes match full URL instead.
     *
     * @param request Request to check.
     *
     * @returns True if the hostname should be matched.
     */
    shouldMatchHostname(request) {
        if (!request.isHostnameRequest) {
            return false;
        }
        return !this.isPatternDomainSpecific();
    }
    /**
     * In case pattern starts with the following it targets some specific domain.
     *
     * @returns True if the pattern targets a specific domain.
     */
    isPatternDomainSpecific() {
        if (this.patternDomainSpecific === undefined) {
            this.patternDomainSpecific = this.pattern.startsWith(SimpleRegex.MASK_START_URL)
                || this.pattern.startsWith('http://')
                || this.pattern.startsWith('https:/')
                || this.pattern.startsWith('://');
        }
        return this.patternDomainSpecific;
    }
}

/**
 * Default filter list ID for source mapping.
 *
 * It is -1, similar to `Array.indexOf()` return value when element is not found.
 */
const FILTER_LIST_ID_NONE = -1;
/**
 * Default rule index for source mapping.
 *
 * It is -1, similar to `Array.indexOf()` return value when element is not found.
 */
const RULE_INDEX_NONE = -1;
/**
 * Indexed rule.
 */
class IndexedRule {
    /**
     * Rule.
     */
    rule;
    /**
     * ID of the filter list this rule belongs to.
     */
    listId;
    /**
     * Rule index.
     */
    index;
    /**
     * Constructor.
     *
     * @param rule Rule.
     * @param index Index of the rule.
     * @param listId ID of the filter list this rule belongs to.
     */
    constructor(rule, index, listId) {
        this.listId = listId;
        this.rule = rule;
        this.index = index;
    }
}
/**
 * Indexed rule parts.
 */
class IndexedRuleParts {
    /**
     * Rule parts.
     */
    ruleParts;
    /**
     * ID of the filter list this rule belongs to.
     */
    listId;
    /**
     * Rule index.
     */
    index;
    /**
     * Constructor.
     *
     * @param ruleParts Rule parts.
     * @param index Index of the rule.
     * @param listId ID of the filter list this rule belongs to.
     */
    constructor(ruleParts, index, listId) {
        this.listId = listId;
        this.ruleParts = ruleParts;
        this.index = index;
    }
}
/**
 * Indexed storage rule parts.
 */
class IndexedStorageRuleParts {
    /**
     * Rule parts.
     */
    ruleParts;
    /**
     * Rule index.
     */
    index;
    /**
     * ID of the filter list this rule belongs to.
     */
    listId;
    /**
     * Constructor.
     *
     * @param ruleParts Rule.
     * @param index Index of the rule.
     * @param listId ID of the filter list this rule belongs to.
     */
    constructor(ruleParts, index, listId) {
        this.listId = listId;
        this.ruleParts = ruleParts;
        this.index = index;
    }
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const NetworkRuleOption = {
    /**
     * No value is set. Syntax sugar to simplify code.
     */
    NotSet: OptionFlags.createOption(0),
    /**
     * $third-party modifier.
     */
    ThirdParty: OptionFlags.createOption(1),
    /**
     * $match-case modifier.
     */
    MatchCase: OptionFlags.createOption(2),
    /**
     * $important modifier.
     */
    Important: OptionFlags.createOption(3),
    // Allowlist rules modifiers
    // Each of them can disable part of the functionality
    /**
     * $elemhide modifier.
     */
    Elemhide: OptionFlags.createOption(4),
    /**
     * $generichide modifier.
     */
    Generichide: OptionFlags.createOption(5),
    /**
     * $specifichide modifier.
     */
    Specifichide: OptionFlags.createOption(6),
    /**
     * $genericblock modifier.
     */
    Genericblock: OptionFlags.createOption(7),
    /**
     * $jsinject modifier.
     */
    Jsinject: OptionFlags.createOption(8),
    /**
     * $urlblock modifier.
     */
    Urlblock: OptionFlags.createOption(9),
    /**
     * $content modifier.
     */
    Content: OptionFlags.createOption(10),
    /**
     * $extension modifier.
     */
    Extension: OptionFlags.createOption(11),
    /**
     * $stealth modifier.
     */
    Stealth: OptionFlags.createOption(12),
    // Other modifiers
    /**
     * $popup modifier.
     */
    Popup: OptionFlags.createOption(13),
    /**
     * $csp modifier.
     */
    Csp: OptionFlags.createOption(14),
    /**
     * $replace modifier.
     */
    Replace: OptionFlags.createOption(15),
    /**
     * $cookie modifier.
     */
    Cookie: OptionFlags.createOption(16),
    /**
     * $redirect modifier.
     */
    Redirect: OptionFlags.createOption(17),
    /**
     * $badfilter modifier.
     */
    Badfilter: OptionFlags.createOption(18),
    /**
     * $removeparam modifier.
     */
    RemoveParam: OptionFlags.createOption(19),
    /**
     * $removeheader modifier.
     */
    RemoveHeader: OptionFlags.createOption(20),
    /**
     * $jsonprune modifier.
     */
    JsonPrune: OptionFlags.createOption(21),
    /**
     * $hls modifier.
     */
    Hls: OptionFlags.createOption(22),
    // Compatibility dependent
    /**
     * $network modifier.
     */
    Network: OptionFlags.createOption(23),
    /**
     * $client modifier.
     */
    Client: OptionFlags.createOption(24),
    /**
     * $dnsrewrite modifier.
     */
    DnsRewrite: OptionFlags.createOption(25),
    /**
     * $dnstype modifier.
     */
    DnsType: OptionFlags.createOption(26),
    /**
     * $ctag modifier.
     */
    Ctag: OptionFlags.createOption(27),
    /**
     * $method modifier.
     */
    Method: OptionFlags.createOption(28),
    /**
     * $to modifier.
     */
    To: OptionFlags.createOption(29),
    /**
     * $permissions modifier.
     */
    Permissions: OptionFlags.createOption(30),
    /**
     * $header modifier.
     */
    Header: OptionFlags.createOption(31),
    /**
     * $urltransform modifier.
     */
    Urltransform: OptionFlags.createOption(32),
};
/**
 * Returns the name of a NetworkRuleOption for error messages.
 * Replaces the enum's built-in reverse mapping (NetworkRuleOption[value]).
 *
 * @param option The option to look up.
 *
 * @returns The option name, or 'Unknown' if not found.
 */
function getOptionName(option) {
    for (const [key, value] of Object.entries(NetworkRuleOption)) {
        if (value.lo === option.lo && value.hi === option.hi) {
            return key;
        }
    }
    return 'Unknown';
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
const NetworkRuleGroupOptions = {
    /**
     * Allowlist-only modifiers.
     */
    AllowlistOnly: OptionFlags.combine(NetworkRuleOption.Elemhide, NetworkRuleOption.Genericblock, NetworkRuleOption.Generichide, NetworkRuleOption.Specifichide, NetworkRuleOption.Jsinject, NetworkRuleOption.Urlblock, NetworkRuleOption.Content, NetworkRuleOption.Extension, NetworkRuleOption.Stealth),
    /**
     * Options supported by host-level network rules.
     */
    OptionHostLevelRules: OptionFlags.combine(NetworkRuleOption.Important, NetworkRuleOption.Badfilter, NetworkRuleOption.Client, NetworkRuleOption.DnsRewrite, NetworkRuleOption.DnsType, NetworkRuleOption.Ctag),
    /**
     * Cosmetic option modifiers.
     */
    CosmeticOption: OptionFlags.combine(NetworkRuleOption.Elemhide, NetworkRuleOption.Generichide, NetworkRuleOption.Specifichide, NetworkRuleOption.Jsinject, NetworkRuleOption.Content),
    /**
     * Removeparam compatible modifiers.
     *
     * $removeparam rules are compatible only with content type modifiers
     * ($subdocument, $script, $stylesheet, etc) except $document (using by
     * default) and this list of modifiers.
     */
    RemoveParamCompatibleOptions: OptionFlags.combine(NetworkRuleOption.RemoveParam, NetworkRuleOption.ThirdParty, NetworkRuleOption.Important, NetworkRuleOption.MatchCase, NetworkRuleOption.Badfilter),
    /**
     * Removeheader compatible modifiers.
     *
     * $removeheader rules are compatible only with content type modifiers
     * ($subdocument, $script, $stylesheet, etc) except $document (using by
     * default) and this list of modifiers.
     */
    RemoveHeaderCompatibleOptions: OptionFlags.combine(NetworkRuleOption.RemoveHeader, NetworkRuleOption.ThirdParty, NetworkRuleOption.Important, NetworkRuleOption.MatchCase, NetworkRuleOption.Header, NetworkRuleOption.Badfilter),
    /**
     * Permissions compatible modifiers.
     *
     * $permissions is compatible with the limited list of modifiers:
     * $domain, $important, and $subdocument.
     */
    PermissionsCompatibleOptions: OptionFlags.combine(NetworkRuleOption.Permissions, NetworkRuleOption.Important, NetworkRuleOption.Badfilter),
    /**
     * Header compatible modifiers.
     *
     * $header is compatible with the limited list of modifiers:
     * - $important
     * - $csp
     * - $removeheader (on response headers)
     * - $third-party
     * - $match-case
     * - $badfilter
     * - $domain
     * - all content type modifiers ($subdocument, $script, $stylesheet, etc).
     */
    HeaderCompatibleOptions: OptionFlags.combine(NetworkRuleOption.Header, NetworkRuleOption.Important, NetworkRuleOption.Csp, NetworkRuleOption.RemoveHeader, NetworkRuleOption.ThirdParty, NetworkRuleOption.MatchCase, NetworkRuleOption.Badfilter),
    /**
     * Urltransform compatible modifiers.
     *
     * $urltransform rules are compatible only with content type modifiers
     * ($subdocument, $script, $stylesheet, etc) and this list of modifiers.
     */
    UrlTransformCompatibleOptions: OptionFlags.combine(NetworkRuleOption.Urltransform, NetworkRuleOption.ThirdParty, NetworkRuleOption.Important, NetworkRuleOption.MatchCase, NetworkRuleOption.Badfilter, NetworkRuleOption.To, NetworkRuleOption.Method, NetworkRuleOption.Popup),
};
/**
 * Basic network filtering rule.
 *
 * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#basic-rules}
 */
class NetworkRule {
    /**
     * Parser options for network rules.
     */
    static PARSER_OPTIONS = {
        ...defaultParserOptions,
        isLocIncluded: false,
    };
    /**
     * Rule index.
     */
    ruleIndex;
    /**
     * Filter list ID.
     */
    filterListId;
    /**
     * Rule text.
     */
    ruleText;
    /**
     * Allowlist flag.
     */
    allowlist;
    /**
     * Rule pattern.
     */
    pattern;
    /**
     * Domains in denyallow modifier providing exceptions for permitted domains.
     *
     * @see {@link https://github.com/AdguardTeam/CoreLibs/issues/1304}
     */
    denyAllowDomains = null;
    /**
     * Flag with all enabled rule options.
     */
    enabledOptions = OptionFlags.createOption(0);
    /**
     * Flag with all disabled rule options.
     */
    disabledOptions = OptionFlags.createOption(0);
    /**
     * Flag with all permitted request types.
     */
    permittedRequestTypes = RequestType.NotSet;
    /**
     * Flag with all restricted request types.
     */
    restrictedRequestTypes = RequestType.NotSet;
    /**
     * Rule Advanced modifier.
     */
    advancedModifier = null;
    /**
     * Rule Domain modifier.
     */
    domainModifier = null;
    /**
     * Rule App modifier.
     */
    appModifier = null;
    /**
     * Rule Method modifier.
     */
    methodModifier = null;
    /**
     * Rule header modifier.
     */
    headerModifier = null;
    /**
     * Rule To modifier.
     */
    toModifier = null;
    /**
     * Rule Stealth modifier.
     */
    stealthModifier = null;
    /**
     * Rule priority, which is needed when the engine has to choose between
     * several rules matching the query. This value is calculated based on
     * the rule modifiers enabled or disabled and rounded up
     * to the smallest integer greater than or equal to the calculated weight
     * in the {@link calculatePriorityWeight}.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-1
     */
    priorityWeight = 1;
    /**
     * Rules with base modifiers, from category 1, each of them adds 1
     * to the weight of the rule.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-1
     */
    static CATEGORY_1_OPTIONS_MASK = OptionFlags.combine(NetworkRuleOption.ThirdParty, NetworkRuleOption.MatchCase, NetworkRuleOption.DnsRewrite, NetworkRuleOption.Urltransform);
    /**
     * The priority weight used in {@link calculatePriorityWeight} for rules
     * with permitted request types and methods.
     * The value 50 is chosen in order to cover (with a margin) all possible
     * combinations and variations of rules from categories with a lower
     * priority (each of them adds 1 to the rule priority).
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-2
     */
    static CategoryTwoWeight = 50;
    /**
     * The priority weight used in {@link calculatePriorityWeight} for rules
     * with allowed domains.
     * The value 100 is chosen to cover all possible combinations and variations
     * of rules from categories with a lower priority, for example a rule with
     * one allowed query type will get priority 100 (50 + 50/1), but for allowed
     * domains with any number of domains we will get at least 101 (for 100
     * domains: 100 + 100/100; for 200 100 + 100/200; or even for 10000:
     * 100 + 100/10000) because the resulting weight is rounded up.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-3
     */
    static CategoryThreeWeight = 100;
    /**
     * The priority weight used in {@link calculatePriorityWeight}
     * for $redirect rules.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-6
     */
    static CategoryFourWeight = 10 ** 3;
    /**
     * The priority weight used in {@link calculatePriorityWeight} for rules
     * with specific exceptions.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-4
     */
    static CategoryFiveWeight = 10 ** 4;
    /**
     * Rules with specific exclusions, from category 4, each of them adds
     * {@link SpecificExceptionsWeight} to the weight of the rule.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-4
     */
    static SPECIFIC_EXCLUSIONS_MASK = OptionFlags.combine(NetworkRuleOption.Elemhide, NetworkRuleOption.Generichide, NetworkRuleOption.Specifichide, NetworkRuleOption.Content, NetworkRuleOption.Urlblock, NetworkRuleOption.Genericblock, NetworkRuleOption.Jsinject, NetworkRuleOption.Extension);
    /**
     * The priority weight used in {@link calculatePriorityWeight} for rules
     * with allowlist mark '@@'.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-5
     */
    static CategorySixWeight = 10 ** 5;
    /**
     * The priority weight used in {@link calculatePriorityWeight}
     * for $important rules.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-7
     */
    static CategorySevenWeight = 10 ** 6;
    /**
     * Separates the rule pattern from the list of modifiers.
     *
     * ```
     * rule = ["@@"] pattern [ "$" modifiers ]
     * modifiers = [modifier0, modifier1[, ...[, modifierN]]]
     * ```
     */
    static OPTIONS_DELIMITER = OPTIONS_DELIMITER;
    /**
     * A marker that is used in rules of exception.
     * To turn off filtering for a request, start your rule with this marker.
     */
    static MASK_ALLOWLIST = MASK_ALLOWLIST;
    /**
     * Mark that negates options.
     */
    static NOT_MARK = NOT_MARK;
    /**
     * Rule options.
     */
    static OPTIONS = NETWORK_RULE_OPTIONS;
    /**
     * Rule options that can be negated.
     */
    static NEGATABLE_OPTIONS = new Set([
        // General options
        NetworkRule.OPTIONS.FIRST_PARTY,
        NetworkRule.OPTIONS.THIRD_PARTY,
        NetworkRule.OPTIONS.MATCH_CASE,
        NetworkRule.OPTIONS.DOCUMENT,
        NetworkRule.OPTIONS.DOC,
        // Content type options
        NetworkRule.OPTIONS.SCRIPT,
        NetworkRule.OPTIONS.STYLESHEET,
        NetworkRule.OPTIONS.SUBDOCUMENT,
        NetworkRule.OPTIONS.OBJECT,
        NetworkRule.OPTIONS.IMAGE,
        NetworkRule.OPTIONS.XMLHTTPREQUEST,
        NetworkRule.OPTIONS.MEDIA,
        NetworkRule.OPTIONS.FONT,
        NetworkRule.OPTIONS.WEBSOCKET,
        NetworkRule.OPTIONS.OTHER,
        NetworkRule.OPTIONS.PING,
        // Dns modifiers
        NetworkRule.OPTIONS.EXTENSION,
    ]);
    /**
     * Advanced option modifier names.
     */
    static ADVANCED_OPTIONS = new Set([
        NetworkRule.OPTIONS.CSP,
        NetworkRule.OPTIONS.REPLACE,
        NetworkRule.OPTIONS.COOKIE,
        NetworkRule.OPTIONS.REDIRECT,
        NetworkRule.OPTIONS.REDIRECTRULE,
        NetworkRule.OPTIONS.REMOVEPARAM,
        NetworkRule.OPTIONS.REMOVEHEADER,
        NetworkRule.OPTIONS.PERMISSIONS,
        NetworkRule.OPTIONS.CLIENT,
        NetworkRule.OPTIONS.DNSREWRITE,
        NetworkRule.OPTIONS.DNSTYPE,
        NetworkRule.OPTIONS.CTAG,
        NetworkRule.OPTIONS.URLTRANSFORM,
    ]);
    /**
     * Returns the rule index.
     *
     * @returns Rule index.
     */
    getIndex() {
        return this.ruleIndex;
    }
    /**
     * Returns the identifier of the filter from which the rule was received.
     *
     * @returns Identifier of the filter from which the rule was received.
     */
    getFilterListId() {
        return this.filterListId;
    }
    /**
     * Returns the rule text.
     *
     * @returns Rule text.
     */
    getText() {
        return this.ruleText;
    }
    /**
     * Each rule has its own priority, which is necessary when several rules
     * match the request and the filtering system needs to select one of them.
     * Priority is measured as a positive integer.
     * In the case of a conflict between two rules with the same priority value,
     * it is not specified which one of them will be chosen.
     *
     * @returns Rule priority.
     */
    getPriorityWeight() {
        return this.priorityWeight;
    }
    /**
     * Returns rule pattern,
     * which currently is used only in the rule validator module.
     *
     * @returns Rule pattern.
     */
    getPattern() {
        return this.pattern.pattern;
    }
    /**
     * Returns `true` if the rule is "allowlist", e.g. if it disables other
     * rules when the pattern matches the request.
     *
     * @returns True if the rule is an allowlist rule.
     */
    isAllowlist() {
        return this.allowlist;
    }
    /**
     * Checks if the rule is a document-level allowlist rule with $urlblock or
     * $genericblock or $content.
     * This means that the rule is supposed to disable or modify blocking
     * of the page sub-requests.
     * For instance, `@@||example.org^$urlblock` unblocks all sub-requests.
     *
     * @returns True if the rule is a document-level allowlist rule with specific modifiers.
     */
    isDocumentLevelAllowlistRule() {
        if (!this.isAllowlist()) {
            return false;
        }
        return this.isOptionEnabled(NetworkRuleOption.Urlblock)
            || this.isOptionEnabled(NetworkRuleOption.Genericblock)
            || this.isOptionEnabled(NetworkRuleOption.Content);
    }
    /**
     * Checks if the rule completely disables filtering.
     *
     * @returns True if the rule completely disables filtering.
     */
    isFilteringDisabled() {
        if (!this.isAllowlist()) {
            return false;
        }
        return this.isOptionEnabled(NetworkRuleOption.Elemhide)
            && this.isOptionEnabled(NetworkRuleOption.Content)
            && this.isOptionEnabled(NetworkRuleOption.Urlblock)
            && this.isOptionEnabled(NetworkRuleOption.Jsinject);
    }
    /**
     * The longest part of pattern without any special characters.
     * It is used to improve the matching performance.
     *
     * @returns The longest part of the pattern without any special characters.
     */
    getShortcut() {
        return this.pattern.shortcut;
    }
    /**
     * Gets list of permitted domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#domain-modifier}
     *
     * @returns List of permitted domains or null if none.
     */
    getPermittedDomains() {
        if (this.domainModifier) {
            return this.domainModifier.getPermittedDomains();
        }
        return null;
    }
    /**
     * Gets list of restricted domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#domain-modifier}
     *
     * @returns List of restricted domains or null if none.
     */
    getRestrictedDomains() {
        if (this.domainModifier) {
            return this.domainModifier.getRestrictedDomains();
        }
        return null;
    }
    /**
     * Gets list of denyAllow domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#denyallow-modifier}
     *
     * @returns List of denyAllow domains or null if none.
     */
    getDenyAllowDomains() {
        return this.denyAllowDomains;
    }
    /**
     * Get list of permitted $to domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#to-modifier}
     *
     * @returns List of permitted $to domains or null if none.
     */
    getPermittedToDomains() {
        if (this.toModifier) {
            return this.toModifier.permittedValues;
        }
        return null;
    }
    /**
     * Get list of restricted $to domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#to-modifier}
     *
     * @returns List of restricted $to domains or null if none.
     */
    getRestrictedToDomains() {
        if (this.toModifier) {
            return this.toModifier.restrictedValues;
        }
        return null;
    }
    /**
     * Gets list of permitted domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#app}
     *
     * @returns List of permitted domains or null if none.
     */
    getPermittedApps() {
        if (this.appModifier) {
            return this.appModifier.permittedApps;
        }
        return null;
    }
    /**
     * Gets list of restricted domains.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#app}
     *
     * @returns List of restricted domains or null if none.
     */
    getRestrictedApps() {
        if (this.appModifier) {
            return this.appModifier.restrictedApps;
        }
        return null;
    }
    /**
     * Gets list of permitted methods.
     *
     * @see {@link https://kb.adguard.com/general/how-to-create-your-own-ad-filters#method-modifier}
     *
     * @returns List of permitted methods or null if none.
     */
    getRestrictedMethods() {
        if (this.methodModifier) {
            return this.methodModifier.restrictedValues;
        }
        return null;
    }
    /**
     * Gets list of restricted methods.
     *
     * @see {@link https://kb.adguard.com/general/how-to-create-your-own-ad-filters#method-modifier}
     *
     * @returns List of restricted methods or null if none.
     */
    getPermittedMethods() {
        if (this.methodModifier) {
            return this.methodModifier.permittedValues;
        }
        return null;
    }
    /**
     * Flag with all permitted request types.
     * The value {@link RequestType.NotSet} here means "all request types are allowed".
     *
     * @returns The flag with all permitted request types.
     */
    getPermittedRequestTypes() {
        return this.permittedRequestTypes;
    }
    /**
     * Flag with all restricted request types.
     * The value {@link RequestType.NotSet} here means "no type of request is restricted".
     *
     * @returns The flag with all restricted request types.
     */
    getRestrictedRequestTypes() {
        return this.restrictedRequestTypes;
    }
    /**
     * Advanced modifier.
     *
     * @returns The advanced modifier or null if none.
     */
    getAdvancedModifier() {
        return this.advancedModifier;
    }
    /**
     * Stealth modifier.
     *
     * @returns The stealth modifier or null if none.
     */
    getStealthModifier() {
        return this.stealthModifier;
    }
    /**
     * Advanced modifier value.
     *
     * @returns The advanced modifier value or null if none.
     */
    getAdvancedModifierValue() {
        return this.advancedModifier && this.advancedModifier.getValue();
    }
    /**
     * Retrieves the header modifier matcher.
     *
     * @returns The header modifier matcher or null if none.
     */
    getHeaderModifierMatcher() {
        if (!this.headerModifier) {
            return null;
        }
        return this.headerModifier.getHeaderModifierMatcher();
    }
    /**
     * Returns true if rule's pattern is a regular expression.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#regexp-support}
     *
     * @returns True if the rule pattern is a regular expression.
     */
    isRegexRule() {
        return (this.getPattern().startsWith(SimpleRegex.MASK_REGEX_RULE)
            && this.getPattern().endsWith(SimpleRegex.MASK_REGEX_RULE));
    }
    /**
     * Checks if this filtering rule matches the specified request.
     *
     * @param request Request to check.
     * @param useShortcut The flag to use this rule shortcut.
     *
     * @returns True if the rule matches the request.
     *
     * In case we use Trie in lookup table, we don't need to use shortcut cause we already check if request's url
     * includes full rule shortcut.
     */
    match(request, useShortcut = true) {
        // Regex rules should not be tested by shortcut
        if (useShortcut && !this.matchShortcut(request)) {
            return false;
        }
        if (this.isOptionEnabled(NetworkRuleOption.Method) && !this.matchMethod(request.method)) {
            return false;
        }
        if (this.isOptionEnabled(NetworkRuleOption.ThirdParty) && !request.thirdParty) {
            return false;
        }
        if (this.isOptionDisabled(NetworkRuleOption.ThirdParty) && request.thirdParty) {
            return false;
        }
        if (!this.matchRequestType(request.requestType)) {
            return false;
        }
        if (!this.matchDomainModifier(request)) {
            return false;
        }
        if (this.isOptionEnabled(NetworkRuleOption.RemoveParam)
            || this.isOptionEnabled(NetworkRuleOption.Permissions)) {
            if (!this.matchRequestTypeExplicit(request.requestType)) {
                return false;
            }
        }
        // Origin-changing (full-URL mode) $urltransform rules default to
        // GET-only when no explicit $method modifier is set.
        if (this.isOptionEnabled(NetworkRuleOption.Urltransform)
            && !this.isOptionEnabled(NetworkRuleOption.Method)
            && request.method !== undefined
            && request.method !== HTTPMethod.GET) {
            const modifier = this.getAdvancedModifier();
            if (modifier instanceof UrlTransformModifier && modifier.isFullUrlMode()) {
                return false;
            }
        }
        if (!this.matchDenyAllowDomains(request.hostname)) {
            return false;
        }
        if (this.isOptionEnabled(NetworkRuleOption.To) && !this.matchToModifier(request.hostname)) {
            return false;
        }
        if (!this.matchDnsType(request.dnsType)) {
            return false;
        }
        if (!this.matchClientTags(request.clientTags)) {
            return false;
        }
        if (!this.matchClient(request.clientName, request.clientIP)) {
            return false;
        }
        return this.pattern.matchPattern(request, true);
    }
    /**
     * Simply checks if shortcut is a substring of the URL.
     *
     * @param request Request to check.
     *
     * @returns True if the shortcut is a substring of the URL.
     */
    matchShortcut(request) {
        return request.urlLowercase.indexOf(this.getShortcut()) >= 0;
    }
    /**
     * Check if request matches domain modifier by request referrer (general case) or by request target.
     *
     * In some cases the $domain modifier can match not only the referrer domain, but also the target domain.
     * This happens when the following is true (1 AND ((2 AND 3) OR 4):
     *
     * 1) The request has $document request type (not subdocument)
     * 2) The rule's pattern doesn't match any particular domain(s)
     * 3) The rule's pattern doesn't contain regular expressions
     * 4) The $domain modifier contains only excluded domains (e.g., $domain=~example.org|~example.com).
     *
     * When all these conditions are met, the domain modifier will match both the referrer domain and the target domain.
     *
     * @see {@link https://github.com/AdguardTeam/tsurlfilter/issues/45}
     *
     * @param request The request to check.
     *
     * @returns True if the rule matches the domain modifier.
     */
    matchDomainModifier(request) {
        if (!this.domainModifier) {
            return true;
        }
        const { domainModifier } = this;
        const isDocumentType = request.requestType === RequestType.Document;
        const hasOnlyExcludedDomains = !domainModifier.hasPermittedDomains()
            && domainModifier.hasRestrictedDomains();
        const patternIsRegex = this.isRegexRule();
        const patternIsDomainSpecific = this.pattern.isPatternDomainSpecific();
        const matchesTargetByPatternCondition = !patternIsRegex && !patternIsDomainSpecific;
        if (isDocumentType && (hasOnlyExcludedDomains || matchesTargetByPatternCondition)) {
            // check if matches source hostname if exists or if matches target hostname
            return (request.sourceHostname && domainModifier.matchDomain(request.sourceHostname))
                || domainModifier.matchDomain(request.hostname);
        }
        return domainModifier.matchDomain(request.sourceHostname || '');
    }
    /**
     * Checks if the filtering rule is allowed on this domain.
     *
     * @param domain The request's domain.
     *
     * @returns True if the rule must be applied to the request.
     */
    matchDenyAllowDomains(domain) {
        if (!this.denyAllowDomains) {
            return true;
        }
        if (this.denyAllowDomains.length > 0) {
            if (DomainModifier.isDomainOrSubdomainOfAny(domain, this.denyAllowDomains)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Checks if the request domain matches the specified conditions.
     *
     * @param domain The request's domain.
     *
     * @returns True if the request domain matches the permitted domains and does not match the restricted domains.
     */
    matchToModifier(domain) {
        if (!this.toModifier) {
            return true;
        }
        /**
         * The request's domain must be either explicitly permitted or not be included
         * in the list of restricted domains for the rule to apply.
         */
        const permittedDomains = this.getPermittedToDomains();
        const restrictedDomains = this.getRestrictedToDomains();
        let matches = false;
        if (permittedDomains) {
            matches = DomainModifier.isDomainOrSubdomainOfAny(domain, permittedDomains);
        }
        if (restrictedDomains) {
            matches = !DomainModifier.isDomainOrSubdomainOfAny(domain, restrictedDomains);
        }
        return matches;
    }
    /**
     * Return `true` if this rule matches with the tags associated with a client.
     *
     * @param clientTags Client tags.
     *
     * @returns True if the rule matches the client tags.
     */
    matchClientTags(clientTags) {
        const advancedModifier = this.getAdvancedModifier();
        if (!advancedModifier || !(advancedModifier instanceof CtagModifier)) {
            return true;
        }
        if (!clientTags) {
            return false;
        }
        const cTagsModifier = advancedModifier;
        return clientTags.every((x) => cTagsModifier.match(x));
    }
    /**
     * Returns TRUE if the rule matches with the specified client.
     *
     * @param clientName The name of the client.
     * @param clientIP The IP address of the client.
     *
     * @returns True if the rule matches the client.
     */
    matchClient(clientName, clientIP) {
        const advancedModifier = this.getAdvancedModifier();
        if (!advancedModifier || !(advancedModifier instanceof ClientModifier)) {
            return true;
        }
        if (!clientName && !clientIP) {
            return false;
        }
        const modifier = advancedModifier;
        return modifier.matchAny(clientName, clientIP);
    }
    /**
     * Return `true` if this rule matches with the request DNS type.
     *
     * @param dnstype The DNS type to check.
     *
     * @returns True if the rule matches the DNS type.
     */
    matchDnsType(dnstype) {
        const advancedModifier = this.getAdvancedModifier();
        if (!advancedModifier || !(advancedModifier instanceof DnsTypeModifier)) {
            return true;
        }
        if (!dnstype) {
            return false;
        }
        const modifier = advancedModifier;
        return modifier.match(dnstype);
    }
    /**
     * Checks if the request's type matches the rule properties.
     *
     * @param requestType Request type to check.
     *
     * @returns True if the rule must be applied to the request.
     */
    matchRequestType(requestType) {
        if (this.permittedRequestTypes !== RequestType.NotSet) {
            if ((this.permittedRequestTypes & requestType) !== requestType) {
                return false;
            }
        }
        if (this.restrictedRequestTypes !== RequestType.NotSet) {
            if ((this.restrictedRequestTypes & requestType) === requestType) {
                return false;
            }
        }
        return true;
    }
    /**
     * In case of $removeparam, $permissions modifier,
     * we only allow it to target other content types if the rule has an explicit content-type modifier.
     *
     * @param requestType Request type to check.
     *
     * @returns True if the rule must be applied to the request.
     */
    matchRequestTypeExplicit(requestType) {
        if (this.permittedRequestTypes === RequestType.NotSet
            && this.restrictedRequestTypes === RequestType.NotSet
            && requestType !== RequestType.Document
            && requestType !== RequestType.SubDocument) {
            return false;
        }
        return this.matchRequestType(requestType);
    }
    /**
     * Checks if request's method matches with the rule.
     *
     * @param method Request's method.
     *
     * @returns True, if rule must be applied to the request.
     */
    matchMethod(method) {
        if (!method || !MethodModifier.isHTTPMethod(method)) {
            return false;
        }
        /**
         * Request's method must be either explicitly
         * permitted or not be included in list of restricted methods
         * for the rule to apply.
         */
        const permittedMethods = this.getPermittedMethods();
        if (permittedMethods?.includes(method)) {
            return true;
        }
        const restrictedMethods = this.getRestrictedMethods();
        return !!restrictedMethods && !restrictedMethods.includes(method);
    }
    /**
     * Checks if request's response headers matches with
     * the rule's $header modifier value.
     *
     * @param responseHeadersItems Request's response headers.
     *
     * @returns True, if rule must be applied to the request.
     */
    matchResponseHeaders(responseHeadersItems) {
        if (!responseHeadersItems || responseHeadersItems.length === 0) {
            return false;
        }
        const ruleData = this.getHeaderModifierMatcher();
        if (!ruleData) {
            return false;
        }
        const { header: ruleHeaderName, value: ruleHeaderValue, } = ruleData;
        return responseHeadersItems.some((responseHeadersItem) => {
            const { name: responseHeaderName, value: responseHeaderValue, } = responseHeadersItem;
            // Header name matching is case-insensitive
            if (ruleHeaderName.toLowerCase() !== responseHeaderName.toLowerCase()) {
                return false;
            }
            if (ruleHeaderValue === null) {
                return true;
            }
            // Unlike header name, header value matching is case-sensitive
            if (typeof ruleHeaderValue === 'string') {
                return ruleHeaderValue === responseHeaderValue;
            }
            if (responseHeaderValue && ruleHeaderValue instanceof RegExp) {
                return ruleHeaderValue.test(responseHeaderValue);
            }
            return false;
        });
    }
    /**
     * Checks if a network rule is too general.
     *
     * @param node AST node of the network rule.
     *
     * @returns True if the rule is too general.
     */
    static isTooGeneral(node) {
        return !(node.modifiers?.children?.length) && node.pattern.value.length < 4;
    }
    /**
     * Creates an instance of the {@link NetworkRule}.
     * It parses this rule and extracts the rule pattern (see {@link SimpleRegex}),
     * and rule modifiers.
     *
     * @param ruleText Rule text.
     * @param filterListId ID of the filter list this rule belongs to.
     * @param ruleIndex Line start index in the source filter list; it will be used to find the original rule text
     * in the filtering log when a rule is applied. Default value is {@link RULE_INDEX_NONE} which means that
     * the rule does not have source index.
     * @param node Optional pre-parsed network rule node to avoid re-parsing.
     *
     * @throws Error if it fails to parse the rule or if the rule is not a network rule.
     */
    constructor(ruleText, filterListId = FILTER_LIST_ID_NONE, ruleIndex = RULE_INDEX_NONE, node) {
        this.ruleIndex = ruleIndex;
        this.filterListId = filterListId;
        // Store rule text in the instance if the rule is not indexed in FiltersStorage.
        // When filterListId or ruleIndex is NONE, the rule text cannot be retrieved
        // from the engine and must be available via getText().
        if (filterListId === FILTER_LIST_ID_NONE || ruleIndex === RULE_INDEX_NONE) {
            this.ruleText = ruleText;
        }
        // Use provided node or parse the rule text
        const parsedNode = node ?? NetworkRuleParser.parse(ruleText, NetworkRule.PARSER_OPTIONS);
        this.allowlist = parsedNode.exception;
        const pattern = parsedNode.pattern.value;
        if (pattern && hasSpaces(pattern)) {
            throw new SyntaxError('Rule has spaces, seems to be an host rule');
        }
        if (parsedNode.modifiers?.children?.length) {
            this.loadOptions(parsedNode.modifiers);
        }
        if (NetworkRule.isTooGeneral(parsedNode)) {
            throw new SyntaxError(`Rule is too general: ${RuleGenerator.generate(parsedNode)}`);
        }
        this.calculatePriorityWeight();
        this.pattern = new Pattern(pattern, this.isOptionEnabled(NetworkRuleOption.MatchCase));
    }
    /**
     * Parses the options string and saves them.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#basic-rules-modifiers}
     *
     * @param options Modifier list node.
     *
     * @throws An error if there is an unsupported modifier.
     */
    loadOptions(options) {
        for (const option of options.children) {
            let value = EMPTY_STRING;
            if (option.value && option.value.value) {
                value = option.value.value;
            }
            this.loadOption(option.name.value, value, option.exception);
        }
        this.validateOptions();
    }
    /**
     * Returns true if rule contains (enabled or disabled) specified option.
     * Please note, that options have three state: enabled, disabled, undefined.
     *
     * @param option Rule option to check.
     *
     * @returns True if rule contains (enabled or disabled) specified option. Returns true for empty flags.
     */
    hasOption(option) {
        return this.isOptionEnabled(option) || this.isOptionDisabled(option);
    }
    /**
     * Returns true if rule has at least one cosmetic option enabled.
     *
     * @returns True if the rule has at least one cosmetic option enabled.
     */
    hasCosmeticOption() {
        return !OptionFlags.isEmpty(OptionFlags.and(this.enabledOptions, NetworkRuleGroupOptions.CosmeticOption));
    }
    /**
     * Returns true if the specified option is enabled.
     * Please note, that options have three state: enabled, disabled, undefined.
     *
     * @param option Rule option to check.
     *
     * @returns True if the specified option is enabled.
     */
    isOptionEnabled(option) {
        return OptionFlags.has(option, this.enabledOptions);
    }
    /**
     * Returns true if one and only option is enabled.
     *
     * @param option Rule option to check.
     *
     * @returns True if the specified option is enabled.
     */
    isSingleOptionEnabled(option) {
        return OptionFlags.equals(this.enabledOptions, option);
    }
    /**
     * Returns true if the specified option is disabled.
     * Please note, that options have three state: enabled, disabled, undefined.
     *
     * @param option Rule option to check.
     *
     * @returns True if the specified option is disabled.
     */
    isOptionDisabled(option) {
        return OptionFlags.has(option, this.disabledOptions);
    }
    /**
     * Checks if the rule has higher priority that the specified rule:
     * `allowlist + $important` > `$important` > `redirect` > `allowlist` > `basic rules`.
     *
     * @param r Rule to compare with.
     *
     * @returns True if the rule has higher priority than `r`.
     */
    isHigherPriority(r) {
        return this.priorityWeight > r.priorityWeight;
    }
    /**
     * Returns true if the rule is considered "generic"
     * "generic" means that the rule is not restricted to a limited set of domains
     * Please note that it might be forbidden on some domains, though.
     *
     * @returns True if the rule is considered "generic".
     */
    isGeneric() {
        return !this.domainModifier?.hasPermittedDomains();
    }
    /**
     * Returns true if this rule negates the specified rule.
     * Only makes sense when this rule has a `badfilter` modifier.
     *
     * @param specifiedRule Rule to check.
     *
     * @returns True if this rule negates the specified rule.
     */
    negatesBadfilter(specifiedRule) {
        if (!this.isOptionEnabled(NetworkRuleOption.Badfilter)) {
            return false;
        }
        if (this.allowlist !== specifiedRule.allowlist) {
            return false;
        }
        if (this.pattern.pattern !== specifiedRule.pattern.pattern) {
            return false;
        }
        if (this.permittedRequestTypes !== specifiedRule.permittedRequestTypes) {
            return false;
        }
        if (this.restrictedRequestTypes !== specifiedRule.restrictedRequestTypes) {
            return false;
        }
        const xored = OptionFlags.xor(this.enabledOptions, NetworkRuleOption.Badfilter);
        if (!OptionFlags.equals(xored, specifiedRule.enabledOptions)) {
            return false;
        }
        if (!OptionFlags.equals(this.disabledOptions, specifiedRule.disabledOptions)) {
            return false;
        }
        if (!stringArraysEquals(this.getRestrictedDomains(), specifiedRule.getRestrictedDomains())) {
            return false;
        }
        if (!stringArraysHaveIntersection(this.getPermittedDomains(), specifiedRule.getPermittedDomains())) {
            return false;
        }
        if (!stringArraysEquals(this.getDenyAllowDomains(), specifiedRule.getDenyAllowDomains())) {
            return false;
        }
        return true;
    }
    /**
     * Checks if this rule can be used for hosts-level blocking.
     *
     * @returns True if the rule can be used for hosts-level blocking.
     */
    isHostLevelNetworkRule() {
        if (this.domainModifier?.hasPermittedDomains() || this.domainModifier?.hasRestrictedDomains()) {
            return false;
        }
        if (this.permittedRequestTypes !== 0 && this.restrictedRequestTypes !== 0) {
            return false;
        }
        if (!OptionFlags.isEmpty(this.disabledOptions)) {
            return false;
        }
        if (!OptionFlags.isEmpty(this.enabledOptions)) {
            // enabledOptions must be a subset of OptionHostLevelRules
            return OptionFlags.has(this.enabledOptions, NetworkRuleGroupOptions.OptionHostLevelRules);
        }
        return true;
    }
    /**
     * Enables or disables the specified option.
     *
     * @param option Option to enable or disable.
     * @param enabled True to enable, false to disable.
     * @param skipRestrictions Skip options allowlist/blacklist restrictions.
     *
     * @throws An error if the option we're trying to enable cannot be.
     * For instance, you cannot enable $elemhide for blacklist rules.
     */
    setOptionEnabled(option, enabled, skipRestrictions = false) {
        if (!skipRestrictions) {
            if (!this.allowlist && OptionFlags.has(option, NetworkRuleGroupOptions.AllowlistOnly)) {
                throw new SyntaxError(`Modifier ${getOptionName(option)} cannot be used in blacklist rule`);
            }
        }
        if (enabled) {
            OptionFlags.enable(this.enabledOptions, option);
        }
        else {
            OptionFlags.enable(this.disabledOptions, option);
        }
    }
    /**
     * Permits or forbids the specified request type.
     * "Permits" means that the rule will match **only** the types that are permitted.
     * "Restricts" means that the rule will match **all but restricted**.
     *
     * @param requestType Request type.
     * @param permitted True if it's permitted (whic).
     */
    setRequestType(requestType, permitted) {
        if (permitted) {
            this.permittedRequestTypes |= requestType;
        }
        else {
            this.restrictedRequestTypes |= requestType;
        }
    }
    /**
     * Sets and validates exceptionally allowed domains presented in $denyallow modifier.
     *
     * @param optionValue Denyallow modifier value.
     */
    setDenyAllowDomains(optionValue) {
        const domainModifier = new DomainModifier(optionValue, PIPE_SEPARATOR$1);
        if (domainModifier.restrictedDomains && domainModifier.restrictedDomains.length > 0) {
            throw new SyntaxError('Invalid modifier: $denyallow domains cannot be negated');
        }
        if (domainModifier.permittedDomains) {
            if (domainModifier.permittedDomains.some(DomainModifier.isWildcardOrRegexDomain)) {
                throw new SyntaxError('Invalid modifier: $denyallow does not support wildcards and regex domains');
            }
        }
        this.denyAllowDomains = domainModifier.permittedDomains;
    }
    /**
     * Loads the specified modifier.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#basic-rules-modifiers}
     *
     * @param optionName Modifier name.
     * @param optionValue Modifier value.
     * @param exception True if the modifier is negated.
     *
     * @throws An error if there is an unsupported modifier.
     */
    loadOption(optionName, optionValue, exception = false) {
        const { OPTIONS, NEGATABLE_OPTIONS } = NetworkRule;
        if (optionName.startsWith(OPTIONS.NOOP)) {
            /**
             * A noop modifier does nothing and can be used to increase some rules readability.
             * It consists of the sequence of underscore characters (_) of any length
             * and can appear in a rule as many times as it's needed.
             */
            if (!optionName.split(OPTIONS.NOOP).some((s) => !!s)) {
                return;
            }
        }
        // TODO: Speed up this by creating a map from names to bit mask positions
        if (exception && !NEGATABLE_OPTIONS.has(optionName)) {
            throw new SyntaxError(`Invalid modifier: '${optionName}' cannot be negated`);
        }
        switch (optionName) {
            // General options
            // $first-party, $~first-party
            case OPTIONS.FIRST_PARTY:
                this.setOptionEnabled(NetworkRuleOption.ThirdParty, exception);
                break;
            // $third-party, $~third-party
            case OPTIONS.THIRD_PARTY:
                this.setOptionEnabled(NetworkRuleOption.ThirdParty, !exception);
                break;
            // $match-case, $~match-case
            case OPTIONS.MATCH_CASE:
                this.setOptionEnabled(NetworkRuleOption.MatchCase, !exception);
                break;
            // $important
            case OPTIONS.IMPORTANT:
                this.setOptionEnabled(NetworkRuleOption.Important, true);
                break;
            // $domain
            case OPTIONS.DOMAIN:
                this.domainModifier = new DomainModifier(optionValue, PIPE_SEPARATOR$1);
                break;
            // $denyallow
            case OPTIONS.DENYALLOW:
                this.setDenyAllowDomains(optionValue);
                break;
            // $method modifier
            case OPTIONS.METHOD: {
                this.setOptionEnabled(NetworkRuleOption.Method, true);
                this.methodModifier = new MethodModifier(optionValue);
                break;
            }
            // $header modifier
            case OPTIONS.HEADER:
                this.setOptionEnabled(NetworkRuleOption.Header, true);
                this.headerModifier = new HeaderModifier(optionValue);
                break;
            // $to modifier
            case OPTIONS.TO: {
                this.setOptionEnabled(NetworkRuleOption.To, true);
                this.toModifier = new ToModifier(optionValue);
                break;
            }
            // Document-level allowlist rules
            // $elemhide
            case OPTIONS.ELEMHIDE:
                this.setOptionEnabled(NetworkRuleOption.Elemhide, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $generichide
            case OPTIONS.GENERICHIDE:
                this.setOptionEnabled(NetworkRuleOption.Generichide, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $specifichide
            case OPTIONS.SPECIFICHIDE:
                this.setOptionEnabled(NetworkRuleOption.Specifichide, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $genericblock
            case OPTIONS.GENERICBLOCK:
                this.setOptionEnabled(NetworkRuleOption.Genericblock, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $jsinject
            case OPTIONS.JSINJECT:
                this.setOptionEnabled(NetworkRuleOption.Jsinject, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $urlblock
            case OPTIONS.URLBLOCK:
                this.setOptionEnabled(NetworkRuleOption.Urlblock, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $content
            case OPTIONS.CONTENT:
                this.setOptionEnabled(NetworkRuleOption.Content, true);
                this.setRequestType(RequestType.Document, true);
                this.setRequestType(RequestType.SubDocument, true);
                break;
            // $document, $doc / $~document, $~doc
            case OPTIONS.DOCUMENT:
            case OPTIONS.DOC:
                if (exception) {
                    this.setRequestType(RequestType.Document, false);
                    break;
                }
                this.setRequestType(RequestType.Document, true);
                // In the case of allowlist rules $document implicitly includes
                // all these modifiers: `$content`, `$elemhide`, `$jsinject`,
                // `$urlblock`.
                if (this.isAllowlist()) {
                    this.setOptionEnabled(NetworkRuleOption.Elemhide, true, true);
                    this.setOptionEnabled(NetworkRuleOption.Jsinject, true, true);
                    this.setOptionEnabled(NetworkRuleOption.Urlblock, true, true);
                    this.setOptionEnabled(NetworkRuleOption.Content, true, true);
                }
                break;
            // $stealth
            case OPTIONS.STEALTH:
                this.setOptionEnabled(NetworkRuleOption.Stealth, true);
                this.stealthModifier = new StealthModifier(optionValue);
                break;
            // $popup
            case OPTIONS.POPUP:
                this.setOptionEnabled(NetworkRuleOption.Popup, true);
                break;
            // Content type options
            // $script, $~script
            case OPTIONS.SCRIPT:
                this.setRequestType(RequestType.Script, !exception);
                break;
            // $stylesheet, $~stylesheet
            case OPTIONS.STYLESHEET:
                this.setRequestType(RequestType.Stylesheet, !exception);
                break;
            // $subdocument, $~subdocument
            case OPTIONS.SUBDOCUMENT:
                this.setRequestType(RequestType.SubDocument, !exception);
                break;
            // $object, $~object
            case OPTIONS.OBJECT:
                this.setRequestType(RequestType.Object, !exception);
                break;
            // $image, $~image
            case OPTIONS.IMAGE:
                this.setRequestType(RequestType.Image, !exception);
                break;
            // $xmlhttprequest, $~xmlhttprequest
            case OPTIONS.XMLHTTPREQUEST:
                this.setRequestType(RequestType.XmlHttpRequest, !exception);
                break;
            // $media, $~media
            case OPTIONS.MEDIA:
                this.setRequestType(RequestType.Media, !exception);
                break;
            // $font, $~font
            case OPTIONS.FONT:
                this.setRequestType(RequestType.Font, !exception);
                break;
            // $websocket, $~websocket
            case OPTIONS.WEBSOCKET:
                this.setRequestType(RequestType.WebSocket, !exception);
                break;
            // $other, $~other
            case OPTIONS.OTHER:
                this.setRequestType(RequestType.Other, !exception);
                break;
            // $ping, $~ping
            case OPTIONS.PING:
                this.setRequestType(RequestType.Ping, !exception);
                break;
            // Special modifiers
            // $badfilter
            case OPTIONS.BADFILTER:
                this.setOptionEnabled(NetworkRuleOption.Badfilter, true);
                break;
            // $csp
            case OPTIONS.CSP:
                this.setOptionEnabled(NetworkRuleOption.Csp, true);
                this.advancedModifier = new CspModifier(optionValue, this.isAllowlist());
                break;
            // $replace
            case OPTIONS.REPLACE:
                this.setOptionEnabled(NetworkRuleOption.Replace, true);
                this.advancedModifier = new ReplaceModifier(optionValue);
                break;
            // $urltransform
            case OPTIONS.URLTRANSFORM:
                this.setOptionEnabled(NetworkRuleOption.Urltransform, true);
                this.advancedModifier = new UrlTransformModifier(optionValue, this.isAllowlist());
                break;
            // $cookie
            case OPTIONS.COOKIE:
                this.setOptionEnabled(NetworkRuleOption.Cookie, true);
                this.advancedModifier = new CookieModifier(optionValue);
                break;
            // $redirect
            case OPTIONS.REDIRECT:
                this.setOptionEnabled(NetworkRuleOption.Redirect, true);
                this.advancedModifier = new RedirectModifier(optionValue, this.isAllowlist());
                break;
            // $redirect-rule
            case OPTIONS.REDIRECTRULE:
                this.setOptionEnabled(NetworkRuleOption.Redirect, true);
                this.advancedModifier = new RedirectModifier(optionValue, this.isAllowlist(), true);
                break;
            // $removeparam
            case OPTIONS.REMOVEPARAM:
                this.setOptionEnabled(NetworkRuleOption.RemoveParam, true);
                this.advancedModifier = new RemoveParamModifier(optionValue);
                break;
            // $removeheader
            case OPTIONS.REMOVEHEADER:
                this.setOptionEnabled(NetworkRuleOption.RemoveHeader, true);
                this.advancedModifier = new RemoveHeaderModifier(optionValue, this.isAllowlist());
                break;
            // $permissions
            case OPTIONS.PERMISSIONS:
                this.setOptionEnabled(NetworkRuleOption.Permissions, true);
                this.advancedModifier = new PermissionsModifier(optionValue, this.isAllowlist());
                break;
            // $jsonprune
            // simple validation of jsonprune rules for compiler
            // https://github.com/AdguardTeam/FiltersCompiler/issues/168
            case OPTIONS.JSONPRUNE:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension does not support $jsonprune modifier yet');
                }
                this.setOptionEnabled(NetworkRuleOption.JsonPrune, true);
                // TODO: should be properly implemented later
                // https://github.com/AdguardTeam/tsurlfilter/issues/71
                break;
            // $hls
            // simple validation of hls rules for compiler
            // https://github.com/AdguardTeam/FiltersCompiler/issues/169
            case OPTIONS.HLS:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension does not support $hls modifier yet');
                }
                this.setOptionEnabled(NetworkRuleOption.Hls, true);
                // TODO: should be properly implemented later
                // https://github.com/AdguardTeam/tsurlfilter/issues/72
                break;
            // $referrerpolicy
            // simple validation of referrerpolicy rules for compiler
            // https://github.com/AdguardTeam/FiltersCompiler/issues/191
            case OPTIONS.REFERRERPOLICY:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension does not support $referrerpolicy modifier');
                }
                // do nothing as $referrerpolicy is supported by CoreLibs-based apps only.
                // it is needed for proper rule conversion performed by FiltersCompiler
                // so rules with $referrerpolicy modifier is not marked as invalid
                break;
            // Dns modifiers
            // $client
            case OPTIONS.CLIENT:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $client modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.Client, true);
                this.advancedModifier = new ClientModifier(optionValue);
                break;
            // $dnsrewrite
            case OPTIONS.DNSREWRITE:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $dnsrewrite modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.DnsRewrite, true);
                this.advancedModifier = new DnsRewriteModifier(optionValue);
                break;
            // $dnstype
            case OPTIONS.DNSTYPE:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $dnstype modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.DnsType, true);
                this.advancedModifier = new DnsTypeModifier(optionValue);
                break;
            // $ctag
            case OPTIONS.CTAG:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $ctag modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.Ctag, true);
                this.advancedModifier = new CtagModifier(optionValue);
                break;
            // $app
            case OPTIONS.APP:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $app modifier');
                }
                this.appModifier = new AppModifier(optionValue);
                break;
            // $network
            case OPTIONS.NETWORK:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $network modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.Network, true);
                break;
            // $extension, $~extension
            case OPTIONS.EXTENSION:
                if (isCompatibleWith(CompatibilityTypes.Extension)) {
                    throw new SyntaxError('Extension doesn\'t support $extension modifier');
                }
                this.setOptionEnabled(NetworkRuleOption.Extension, !exception);
                break;
            // $all
            case OPTIONS.ALL:
                if (this.isAllowlist()) {
                    throw new SyntaxError('Rule with $all modifier can not be allowlist rule');
                }
                // Set all request types
                Object.values(RequestType).forEach((type) => {
                    this.setRequestType(type, true);
                });
                this.setOptionEnabled(NetworkRuleOption.Popup, true);
                break;
            // $empty and $mp4
            // Deprecated in favor of $redirect
            case OPTIONS.EMPTY:
            case OPTIONS.MP4:
                // Do nothing.
                break;
            default: {
                // clear empty values
                const modifierView = [optionName, optionValue]
                    .filter((i) => i)
                    .join('=');
                throw new SyntaxError(`Unknown modifier: ${modifierView}`);
            }
        }
    }
    /**
     * To calculate priority, we've categorized modifiers into different groups.
     * These groups are ranked based on their priority, from lowest to highest.
     * A modifier that significantly narrows the scope of a rule adds more
     * weight to its total priority. Conversely, if a rule applies to a broader
     * range of requests, its priority decreases.
     *
     * It's worth noting that there are cases where a single-parameter modifier
     * has a higher priority than multi-parameter ones. For instance, in
     * the case of `$domain=example.com|example.org`, a rule that includes two
     * domains has a slightly broader effective area than a rule with one
     * specified domain, therefore its priority is lower.
     *
     * The base priority weight of any rule is 1. If the calculated priority
     * is a floating-point number, it will be **rounded up** to the smallest
     * integer greater than or equal to the calculated weight.
     *
     * @see {@link NetworkRule.PermittedRequestTypeWeight}
     * @see {@link NetworkRule.PermittedDomainWeight}
     * @see {@link NetworkRule.SpecificExceptionsWeight}
     * @see {@link NetworkRule.AllowlistRuleWeight}
     * @see {@link NetworkRule.RedirectRuleWeight}
     * @see {@link NetworkRule.ImportantRuleWeight}
     * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-counting}
     */
    calculatePriorityWeight() {
        // Base modifiers, category 1.
        this.priorityWeight += OptionFlags.maskedBitCount(this.enabledOptions, NetworkRule.CATEGORY_1_OPTIONS_MASK);
        this.priorityWeight += OptionFlags.maskedBitCount(this.disabledOptions, NetworkRule.CATEGORY_1_OPTIONS_MASK);
        /**
         * When dealing with a negated domain, app, method, or content-type,
         * we add a point for the existence of the modifier itself, regardless
         * of the quantity of negated domains or content-types. This is because
         * the rule's scope is already infinitely broad. Put simply,
         * by prohibiting multiple domains, content-types, methods or apps,
         * the scope of the rule becomes only minimally smaller.
         */
        if (this.denyAllowDomains && this.denyAllowDomains.length > 0) {
            this.priorityWeight += 1;
        }
        const { domainModifier } = this;
        if (domainModifier?.hasRestrictedDomains()) {
            this.priorityWeight += 1;
        }
        if (this.methodModifier?.restrictedValues && this.methodModifier.restrictedValues.length > 0) {
            this.priorityWeight += 1;
        }
        if (this.restrictedRequestTypes !== RequestType.NotSet) {
            this.priorityWeight += 1;
        }
        // $to modifier is basically a replacement for a regular expression
        // See https://github.com/AdguardTeam/KnowledgeBase/pull/196#discussion_r1221401215
        if (this.toModifier) {
            this.priorityWeight += 1;
        }
        /**
         * Category 2: permitted request types, methods, headers, $popup.
         * Specified content-types add `50 + 50 / number_of_content_types`,
         * for example: `||example.com^$image,script` will add
         * `50 + 50 / 2 = 50 + 25 = 75` to the total weight of the rule.
         * The `$popup` also belongs to this category, because it implicitly
         * adds the modifier `$document`.
         * Similarly, specific exceptions add `$document,subdocument`.
         *
         * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-2}
         */
        if (this.permittedRequestTypes !== RequestType.NotSet) {
            const numberOfPermittedRequestTypes = getBitCount(this.permittedRequestTypes);
            // More permitted request types mean less priority weight.
            const relativeWeight = NetworkRule.CategoryTwoWeight / numberOfPermittedRequestTypes;
            this.priorityWeight += NetworkRule.CategoryTwoWeight + relativeWeight;
        }
        if (this.methodModifier?.permittedValues && this.methodModifier.permittedValues.length > 0) {
            // More permitted request methods mean less priority weight.
            const relativeWeight = NetworkRule.CategoryTwoWeight / this.methodModifier.permittedValues.length;
            this.priorityWeight += NetworkRule.CategoryTwoWeight + relativeWeight;
        }
        if (this.headerModifier) {
            // $header modifier in the rule adds 50
            this.priorityWeight += NetworkRule.CategoryTwoWeight;
        }
        /**
         * Category 3: permitted domains.
         * Specified domains through `$domain` and specified applications
         * through `$app` add `100 + 100 / number_domains (or number_applications)`,
         * for example:
         * `||example.com^$domain=example.com|example.org|example.net`
         * will add `100 + 100 / 3 = 134.3 = 134` or
         * `||example.com^$app=org.example.app1|org.example.app2`
         * will add `100 + 100 / 2 = 151`.
         */
        if (domainModifier?.hasPermittedDomains()) {
            // More permitted domains mean less priority weight.
            const relativeWeight = NetworkRule.CategoryThreeWeight / domainModifier.getPermittedDomains().length;
            this.priorityWeight += NetworkRule.CategoryThreeWeight + relativeWeight;
        }
        // Category 4: redirect rules.
        if (this.isOptionEnabled(NetworkRuleOption.Redirect)) {
            this.priorityWeight += NetworkRule.CategoryFourWeight;
        }
        // Category 5: specific exceptions.
        this.priorityWeight += NetworkRule.CategoryFiveWeight * OptionFlags.maskedBitCount(this.enabledOptions, NetworkRule.SPECIFIC_EXCLUSIONS_MASK);
        // Category 6: allowlist rules.
        if (this.isAllowlist()) {
            this.priorityWeight += NetworkRule.CategorySixWeight;
        }
        // Category 7: important rules.
        if (this.isOptionEnabled(NetworkRuleOption.Important)) {
            this.priorityWeight += NetworkRule.CategorySevenWeight;
        }
        // Round up to avoid overlap between different categories of rules.
        this.priorityWeight = Math.ceil(this.priorityWeight);
    }
    /**
     * Validates rule options.
     */
    validateOptions() {
        if (this.advancedModifier instanceof RemoveParamModifier) {
            this.validateRemoveParamRule();
        }
        else if (this.advancedModifier instanceof UrlTransformModifier) {
            this.validateUrlTransformRule();
        }
        else if (this.advancedModifier instanceof RemoveHeaderModifier) {
            this.validateRemoveHeaderRule();
        }
        else if (this.advancedModifier instanceof PermissionsModifier) {
            this.validatePermissionsRule();
        }
        else if (this.headerModifier instanceof HeaderModifier) {
            this.validateHeaderRule();
        }
        else if (this.toModifier !== null) {
            this.validateToRule();
        }
        else if (this.denyAllowDomains !== null) {
            this.validateDenyallowRule();
        }
    }
    /**
     * Validates $header rule.
     *
     * $header is compatible with the limited list of modifiers:
     * - $important
     * - $csp
     * - $removeheader (on response headers)
     * - $third-party
     * - $match-case
     * - $badfilter
     * - $domain
     * - all content type modifiers ($subdocument, $script, $stylesheet, etc).
     *
     * The rules with any other modifiers are considered invalid and will be discarded.
     */
    validateHeaderRule() {
        if (!OptionFlags.equals(OptionFlags.or(this.enabledOptions, NetworkRuleGroupOptions.HeaderCompatibleOptions), NetworkRuleGroupOptions.HeaderCompatibleOptions)) {
            throw new SyntaxError('$header rules are not compatible with some other modifiers');
        }
        if (this.advancedModifier && this.isOptionEnabled(NetworkRuleOption.RemoveHeader)) {
            const removeHeaderValue = this.getAdvancedModifierValue();
            if (!removeHeaderValue || removeHeaderValue.includes('request:')) {
                const message = '$header rules are only compatible with response headers removal of $removeheader.';
                throw new SyntaxError(message);
            }
        }
    }
    /**
     * $permissions rules are not compatible with any other
     * modifiers except $domain, $important, and $subdocument.
     * The rules with any other modifiers are considered invalid and will be discarded.
     */
    validatePermissionsRule() {
        if (!OptionFlags.equals(OptionFlags.or(this.enabledOptions, NetworkRuleGroupOptions.PermissionsCompatibleOptions), NetworkRuleGroupOptions.PermissionsCompatibleOptions)) {
            throw new SyntaxError('$permissions rules are not compatible with some other modifiers');
        }
    }
    /**
     * $removeparam rules are not compatible with any other modifiers except $domain,
     * $third-party, $app, $important, $match-case and permitted content type modifiers ($script, $stylesheet, etc).
     * The rules with any other modifiers are considered invalid and will be discarded.
     */
    validateRemoveParamRule() {
        if (!OptionFlags.equals(OptionFlags.or(this.enabledOptions, NetworkRuleGroupOptions.RemoveParamCompatibleOptions), NetworkRuleGroupOptions.RemoveParamCompatibleOptions)) {
            throw new SyntaxError('$removeparam rules are not compatible with some other modifiers');
        }
    }
    /**
     * $urltransform rules are not compatible with any other modifiers except
     * $domain, $third-party, $important, $match-case, $badfilter,
     * $to, $method, $popup, $denyallow
     * and permitted content type modifiers ($script, $stylesheet, etc).
     * The rules with any other modifiers are considered invalid
     * and will be discarded.
     */
    validateUrlTransformRule() {
        if (!OptionFlags.equals(OptionFlags.or(this.enabledOptions, NetworkRuleGroupOptions.UrlTransformCompatibleOptions), NetworkRuleGroupOptions.UrlTransformCompatibleOptions)) {
            throw new SyntaxError('$urltransform rules are not compatible with some other modifiers');
        }
    }
    /**
     * $removeheader rules are not compatible with any other modifiers except $domain,
     * $third-party, $app, $important, $match-case and permitted content type modifiers ($script, $stylesheet, etc).
     * The rules with any other modifiers are considered invalid and will be discarded.
     */
    validateRemoveHeaderRule() {
        if (!OptionFlags.equals(OptionFlags.or(this.enabledOptions, NetworkRuleGroupOptions.RemoveHeaderCompatibleOptions), NetworkRuleGroupOptions.RemoveHeaderCompatibleOptions)) {
            throw new SyntaxError('$removeheader rules are not compatible with some other modifiers');
        }
        if (this.headerModifier && this.isOptionEnabled(NetworkRuleOption.Header)) {
            const removeHeaderValue = this.getAdvancedModifierValue();
            if (!removeHeaderValue || removeHeaderValue.includes('request:')) {
                const message = 'Request headers removal of $removeheaders is not compatible with $header rules.';
                throw new SyntaxError(message);
            }
        }
    }
    /**
     * $to rules are not compatible $denyallow - these rules considered invalid
     * and will be discarded.
     */
    validateToRule() {
        if (this.denyAllowDomains) {
            throw new SyntaxError('modifier $to is not compatible with $denyallow modifier');
        }
    }
    /**
     * $denyallow rules are not compatible $to - these rules considered invalid
     * and will be discarded.
     */
    validateDenyallowRule() {
        if (this.toModifier) {
            throw new SyntaxError('modifier $to is not compatible with $denyallow modifier');
        }
    }
    /**
     * Checks if the rule is unsafe.
     *
     * @returns True if the rule is unsafe, false otherwise.
     */
    isUnsafe() {
        return this.getAdvancedModifier() !== null;
    }
}

/**
 * MatchingResult contains all the rules matching a web request, and provides methods
 * that define how a web request should be processed.
 */
class MatchingResult {
    /**
     * BasicRule - a rule matching the request.
     * It could lead to one of the following:
     * block the request
     * unblock the request (a regular allowlist rule or a document-level allowlist rule)
     * modify the way cosmetic rules work for this request
     * modify the response (see $redirect rules).
     */
    basicRule;
    /**
     * Rule matching the request's referrer and having on of the following modifiers:
     * - $document — this one basically disables everything;
     * - $urlblock — disables network-level rules (not cosmetic);
     * - $genericblock — disables generic network-level rules.
     *
     * Other document-level modifiers like $jsinject or $content will be ignored here as they don't do anything.
     */
    documentRule;
    /**
     * Set of rules modifying the response's content-security-policy
     * See $csp modifier.
     */
    cspRules;
    /**
     * Set of rules modifying the request's and response's cookies
     * See $cookie modifier.
     */
    cookieRules;
    /**
     * Set of rules modifying the response's content
     * See $replace modifier.
     */
    replaceRules;
    /**
     * Set of rules modifying the request URL.
     * See $urltransform modifier.
     *
     * Note: $urltransform rules should be applied BEFORE $removeparam rules
     * by the consumer (e.g. tswebextension).
     */
    urlTransformRules;
    /**
     * Set of rules redirecting request
     * See $redirect and $redirect-rule modifiers.
     */
    redirectRules;
    /**
     * RemoveParam rules - a set of rules modifying url query parameters
     * See $removeparam modifier.
     */
    removeParamRules;
    /**
     * RemoveHeader rules - a set of rules modifying headers
     * See $removeheader modifier.
     */
    removeHeaderRules;
    /**
     * Permissions rules - a set of rules modifying permissions policy
     * See $permissions modifier.
     */
    permissionsRules;
    /**
     * Headers rules - a set of rules for blocking rules by headers.
     */
    headerRules;
    /**
     * Stealth rules - a set of allowlist rules with $stealth modifier,
     * that negates stealth mode features.
     *
     * Note that the stealth rule can be received from both rules and sourceRules.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#stealth-modifier}
     */
    stealthRules;
    /**
     * CosmeticExceptionRule - a rule that disables cosmetic rules for the document or subdocument.
     * It is moved to it's own filed to not interfere with applying network blocking rules.
     */
    cosmeticExceptionRule;
    /**
     * PopupRule - this is a rule that specified which way should be used
     * to blocking document request: close the tab or open dummy blocking page.
     * We should store it separately from other blocking rules, because $popup
     * has an intersection by use cases with $all.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#popup-modifier}
     */
    popupRule;
    /**
     * Creates an instance of the MatchingResult struct and fills it with the rules.
     *
     * @param rules A list of network rules that match the request.
     * @param sourceRule A rule that matches the document that is a source
     * of the request, i.e. document-level exclusions.
     */
    constructor(rules, sourceRule) {
        this.basicRule = null;
        this.documentRule = null;
        this.cspRules = null;
        this.cookieRules = null;
        this.replaceRules = null;
        this.urlTransformRules = null;
        this.removeParamRules = null;
        this.removeHeaderRules = null;
        this.redirectRules = null;
        this.stealthRules = null;
        this.permissionsRules = null;
        this.headerRules = null;
        this.popupRule = null;
        this.cosmeticExceptionRule = null;
        // eslint-disable-next-line no-param-reassign
        rules = MatchingResult.removeBadfilterRules(rules);
        if (sourceRule) {
            this.documentRule = sourceRule;
        }
        // Second - check if blocking rules (generic or all of them) are allowed
        // generic blocking rules are allowed by default
        let genericAllowed = true;
        // basic blocking rules are allowed by default
        let basicAllowed = true;
        if (this.documentRule) {
            if (this.documentRule.isOptionEnabled(NetworkRuleOption.Urlblock)) {
                basicAllowed = false;
            }
            else if (this.documentRule.isOptionEnabled(NetworkRuleOption.Genericblock)) {
                genericAllowed = false;
            }
        }
        // Iterate through the list of rules and fill the MatchingResult
        for (const rule of rules) {
            if (rule.hasCosmeticOption()) {
                if (!this.cosmeticExceptionRule || rule.isHigherPriority(this.cosmeticExceptionRule)) {
                    this.cosmeticExceptionRule = rule;
                }
                /**
                 * Some rules include both cosmetic options and network modifiers,
                 * and affect both network and cosmetic engines matching.
                 *
                 * Such rules should also compete for `basicRule` slot down below,
                 * e.g `@@||example.org$document` and `@@||nhk.or.jp^$content`.
                 *
                 * Cosmetic options rules that don't contain such modifiers should only affect cosmetic engine.
                 */
                if (!rule.isOptionEnabled(NetworkRuleOption.Urlblock)
                    && !rule.isOptionEnabled(NetworkRuleOption.Genericblock)
                    && !rule.isOptionEnabled(NetworkRuleOption.Content)) {
                    continue;
                }
            }
            if (rule.isOptionEnabled(NetworkRuleOption.Cookie)) {
                (this.cookieRules ??= []).push(rule);
                continue;
            }
            if (rule.isOptionEnabled(NetworkRuleOption.Replace)) {
                (this.replaceRules ??= []).push(rule);
                continue;
            }
            if (rule.isOptionEnabled(NetworkRuleOption.Urltransform)) {
                (this.urlTransformRules ??= []).push(rule);
                continue;
            }
            if (rule.isOptionEnabled(NetworkRuleOption.RemoveParam)) {
                (this.removeParamRules ??= []).push(rule);
                continue;
            }
            if (rule.isOptionEnabled(NetworkRuleOption.RemoveHeader)) {
                (this.removeHeaderRules ??= []).push(rule);
                continue;
            }
            if (rule.isOptionEnabled(NetworkRuleOption.Redirect)) {
                (this.redirectRules ??= []).push(rule);
                continue;
            }
            if (rule.isOptionEnabled(NetworkRuleOption.Csp)) {
                (this.cspRules ??= []).push(rule);
                continue;
            }
            if (rule.isOptionEnabled(NetworkRuleOption.Stealth)) {
                (this.stealthRules ??= []).push(rule);
                continue;
            }
            if (rule.isOptionEnabled(NetworkRuleOption.Permissions)) {
                (this.permissionsRules ??= []).push(rule);
                continue;
            }
            if (rule.isOptionEnabled(NetworkRuleOption.Header)) {
                (this.headerRules ??= []).push(rule);
                continue;
            }
            if (rule.isOptionEnabled(NetworkRuleOption.Popup)
                // This check needed to split $all rules from $popup rules
                && !MatchingResult.isDocumentRule(rule)) {
                this.popupRule = rule;
                continue;
            }
            // Check blocking rules against $genericblock / $urlblock
            if (!rule.isAllowlist() && this.documentRule?.isHigherPriority(rule)) {
                if (!basicAllowed) {
                    continue;
                }
                if (!genericAllowed && rule.isGeneric()) {
                    continue;
                }
            }
            if (!this.basicRule || rule.isHigherPriority(this.basicRule)) {
                this.basicRule = rule;
            }
        }
    }
    /**
     * Returns popup rule.
     *
     * @returns The popup rule or null if not found.
     */
    getPopupRule() {
        return this.popupRule;
    }
    /**
     * GetBasicResult returns a rule that should be applied to the web request.
     *
     * Possible outcomes are:
     * - returns nil -- allow the request;
     * - returns an allowlist rule -- allow the request;
     * - returns a blocking rule -- block the request;
     * - returns a redirect rule -- redirect the request.
     *
     * @returns Basic result rule.
     */
    getBasicResult() {
        let basic = this.basicRule;
        // e.g. @@||example.com^$generichide
        if (this.cosmeticExceptionRule && (!basic || this.cosmeticExceptionRule.isHigherPriority(basic))) {
            // special case: `||example.org^$document` should not be allowlisted by cosmetic exception rules
            if (basic && !basic.isAllowlist() && MatchingResult.isDocumentRule(basic)) {
                return basic;
            }
            return this.cosmeticExceptionRule;
        }
        if (!basic) {
            // Only document-level frame rule would be returned as a basic result,
            // cause only those rules could block or modify page sub-requests.
            // Other frame rules (generichide, elemhide etc) will be used in getCosmeticOption function.
            if (this.documentRule && this.documentRule.isDocumentLevelAllowlistRule()) {
                basic = this.documentRule;
            }
        }
        // https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#replace-modifier
        // https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-extra
        // $replace rules have a higher priority than other basic rules (including exception rules).
        // So if a request corresponds to two different rules one of which has the $replace modifier,
        // this rule will be applied.
        if (this.replaceRules) {
            const isReplaceOrContent = basic?.isOptionEnabled(NetworkRuleOption.Replace)
                || basic?.isOptionEnabled(NetworkRuleOption.Content);
            // If basic rule is an exception with $replace or $content modifier,
            // then basic rule will disable $replace rules.
            if (basic?.isAllowlist() && isReplaceOrContent) {
                return basic;
            }
            // Otherwise null is returned to allow the request, because we need
            // to get response first to then apply the $replace rules to
            // the response.
            return null;
        }
        // Redirect rules have a high priority
        // https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#redirect-modifier
        // https://adguard.com/kb/general/ad-filtering/create-own-filters/#priority-category-6
        const redirectRule = this.getRedirectRule();
        if (redirectRule && (!basic || !basic.isHigherPriority(redirectRule))) {
            return redirectRule;
        }
        if (!basic) {
            return this.popupRule;
        }
        return basic;
    }
    /**
     * Returns a rule that should block a document request.
     *
     * @returns Document blocking rule if any, null otherwise.
     */
    getDocumentBlockingResult() {
        if (!this.basicRule || this.basicRule.isDocumentLevelAllowlistRule()) {
            return null;
        }
        // Document-level blocking rules are the only ones that can block 'document' requests
        if (MatchingResult.isDocumentRule(this.basicRule)) {
            return this.basicRule;
        }
        return null;
    }
    /**
     * Returns a single stealth rule, that is corresponding to the given option.
     * If no option is given, returns a rule that disables stealth completely if any.
     *
     * @param stealthOption Stealth option name.
     *
     * @returns Stealth rule or null.
     */
    getStealthRule(stealthOption) {
        if (!this.stealthRules) {
            return null;
        }
        return this.stealthRules.find((r) => {
            const stealthModifier = r.getStealthModifier();
            if (!stealthModifier) {
                logger.debug(`[tsurl.MatchingResult.getStealthRule]: stealth rule without stealth modifier: ${r}`);
                return false;
            }
            if (stealthOption) {
                return stealthModifier.hasStealthOption(stealthOption);
            }
            // $stealth rules without values are globally disabling stealth mode
            return !stealthModifier.hasValues();
        }) ?? null;
    }
    /**
     * Returns a single rule with $header modifier,
     * that should be applied to the web request, if any.
     *
     * Function is intended to be called on onHeadersReceived event as an alternative to getBasicResult,
     * it returns only a blocking or allowlist rule without modifiers which could modify the request.
     * Request modifying rules with $header modifier are handled in a corresponding service.
     *
     * TODO: filterAdvancedModifierRules may not be optimal for sorting rules with $header modifier,
     * as $header is not an advanced modifier.
     *
     * @param responseHeaders Response headers.
     *
     * @returns Header result rule or null.
     */
    getResponseHeadersResult(responseHeaders) {
        if (!responseHeaders || responseHeaders.length === 0) {
            return null;
        }
        const { basicRule, documentRule } = this;
        let { headerRules } = this;
        if (!headerRules) {
            return null;
        }
        if (!basicRule) {
            if (documentRule && documentRule.isDocumentLevelAllowlistRule()) {
                return null;
            }
        }
        else if (basicRule.isAllowlist()) {
            return null;
        }
        headerRules = headerRules.filter((rule) => rule.matchResponseHeaders(responseHeaders));
        // Handle allowlist rules with $header modifier,
        // filtering out blocking rules which are allowlisted
        const rules = MatchingResult.filterAdvancedModifierRules(headerRules, (bRule) => ((aRule) => {
            const bHeaderData = bRule.getHeaderModifierMatcher();
            const aHeaderData = aRule.getHeaderModifierMatcher();
            return bHeaderData?.header === aHeaderData?.header
                && bHeaderData?.value?.toString() === aHeaderData?.value?.toString();
        }));
        return MatchingResult.getHighestPriorityRule(rules);
    }
    /**
     * Returns a bit-flag with the list of cosmetic options.
     *
     * @returns Cosmetic option mask.
     */
    getCosmeticOption() {
        const { basicRule, documentRule, cosmeticExceptionRule } = this;
        let rule = cosmeticExceptionRule || basicRule;
        // We choose a non-empty rule and the one of the two with the higher
        // priority in order to accurately calculate cosmetic options.
        if ((!rule && documentRule) || (rule && documentRule?.isHigherPriority(rule))) {
            rule = documentRule;
        }
        if (!rule || !rule.isAllowlist()) {
            return CosmeticOption.CosmeticOptionAll;
        }
        let option = CosmeticOption.CosmeticOptionAll;
        if (rule.isOptionEnabled(NetworkRuleOption.Elemhide)) {
            option ^= CosmeticOption.CosmeticOptionGenericCSS;
            option ^= CosmeticOption.CosmeticOptionSpecificCSS;
        }
        if (rule.isOptionEnabled(NetworkRuleOption.Generichide)) {
            option ^= CosmeticOption.CosmeticOptionGenericCSS;
        }
        if (rule.isOptionEnabled(NetworkRuleOption.Specifichide)) {
            option ^= CosmeticOption.CosmeticOptionSpecificCSS;
        }
        if (rule.isOptionEnabled(NetworkRuleOption.Jsinject)) {
            option ^= CosmeticOption.CosmeticOptionJS;
        }
        if (rule.isOptionEnabled(NetworkRuleOption.Content)) {
            option ^= CosmeticOption.CosmeticOptionHtml;
        }
        return option;
    }
    /**
     * Return an array of replace rules.
     *
     * @returns An array of replace rules.
     */
    getReplaceRules() {
        if (!this.replaceRules) {
            return [];
        }
        // TODO: Look up for allowlist $content rule
        return MatchingResult.filterAdvancedModifierRules(this.replaceRules, (rule) => ((x) => x.getAdvancedModifierValue() === rule.getAdvancedModifierValue()));
    }
    /**
     * Returns an array of urltransform rules.
     *
     * Note: $urltransform rules should be applied BEFORE $removeparam rules
     * by the consumer (e.g. tswebextension).
     *
     * @returns An array of urltransform rules.
     */
    getUrlTransformRules() {
        if (!this.urlTransformRules) {
            return [];
        }
        return MatchingResult.filterAdvancedModifierRules(this.urlTransformRules, (rule) => ((x) => x.getAdvancedModifierValue() === rule.getAdvancedModifierValue()));
    }
    /**
     * Filters array of rules according to allowlist rules contained.
     * Empty advanced modifier allowlists everything.
     *
     * This function result will be called for testing if rule `x` allowlists rule `r`.
     *
     * @param rules Array of rules.
     * @param allowlistPredicate Allowlist criteria.
     *
     * @returns Filtered array of rules.
     */
    static filterAdvancedModifierRules(rules, allowlistPredicate) {
        const blockingRules = [];
        const allowlistRules = [];
        for (const rule of rules) {
            if (rule.isAllowlist()) {
                allowlistRules.push(rule);
            }
            else {
                blockingRules.push(rule);
            }
        }
        if (blockingRules.length === 0) {
            return [];
        }
        if (allowlistRules.length === 0) {
            return blockingRules;
        }
        if (allowlistRules.length > 0) {
            const allowlistRuleWithEmptyOption = allowlistRules
                .find((allowlistRule) => allowlistRule.getAdvancedModifierValue() === '');
            const result = [];
            blockingRules.forEach((blockRule) => {
                if (allowlistRuleWithEmptyOption
                    && !blockRule.isHigherPriority(allowlistRuleWithEmptyOption)) {
                    result.push(allowlistRuleWithEmptyOption);
                    return;
                }
                const allowlistingRule = allowlistRules.find((a) => {
                    return !blockRule.isHigherPriority(a) && allowlistPredicate.call(this, blockRule)(a);
                });
                if (allowlistingRule) {
                    result.push(allowlistingRule);
                }
                else {
                    result.push(blockRule);
                }
            });
            return result.filter((item, pos) => result.indexOf(item) === pos);
        }
        return blockingRules;
    }
    /**
     * Returns an array of csp rules.
     *
     * @returns An array of csp rules.
     */
    getCspRules() {
        if (!this.cspRules) {
            return [];
        }
        const blockingRules = [];
        const allowlistedRulesByDirective = new Map();
        for (const rule of this.cspRules) {
            if (rule.isAllowlist()) {
                if (!rule.getAdvancedModifierValue()) { // Global allowlist rule
                    return [rule];
                }
                MatchingResult.putWithPriority(rule, undefined, allowlistedRulesByDirective);
            }
            else {
                blockingRules.push(rule);
            }
        }
        const rulesByDirective = new Map();
        // Collect allowlist and blocking CSP rules in one array
        blockingRules.forEach((rule) => {
            if (rule.getAdvancedModifierValue()) {
                const allowlistRule = allowlistedRulesByDirective.get(rule.getAdvancedModifierValue());
                MatchingResult.putWithPriority(rule, allowlistRule, rulesByDirective);
            }
        });
        return Array.from(rulesByDirective.values());
    }
    /**
     * Checks if a network rule is sub document rule.
     *
     * @param rule Rule to check.
     *
     * @returns `true` if the rule is sub document rule.
     */
    static isSubDocumentRule(rule) {
        return (rule.getPermittedRequestTypes() & RequestType.SubDocument) === RequestType.SubDocument;
    }
    /**
     * Checks if a network rule is document rule.
     *
     * @param rule Rule to check.
     *
     * @returns True if the rule is document rule, false otherwise.
     */
    static isDocumentRule(rule) {
        return (rule.getPermittedRequestTypes() & RequestType.Document) === RequestType.Document;
    }
    /**
     * Returns an array of permission policy rules.
     *
     * @returns An array of permission policy rules.
     */
    getPermissionsPolicyRules() {
        if (!this.permissionsRules) {
            return [];
        }
        const allowlistRules = [];
        const blockingRules = [];
        let globalAllowlistRule = null;
        let globalSubDocAllowlistRule = null;
        for (let i = 0; i < this.permissionsRules.length; i += 1) {
            const rule = this.permissionsRules[i];
            if (rule.isAllowlist()) {
                // Global allowlist rule, where $permissions modifier doesn't have a value
                if (!rule.getAdvancedModifierValue()) {
                    if (MatchingResult.isSubDocumentRule(rule)) {
                        if (!globalSubDocAllowlistRule) {
                            // e.g. @@||example.com^$subdocument,permissions
                            globalSubDocAllowlistRule = rule;
                        }
                    }
                    else if (!globalAllowlistRule) {
                        // e.g. @@||example.com^$permissions
                        globalAllowlistRule = rule;
                    }
                }
                else {
                    allowlistRules.push(rule);
                }
            }
            else {
                blockingRules.push(rule);
            }
        }
        if (globalAllowlistRule) {
            return [globalAllowlistRule];
        }
        const result = new Set();
        blockingRules.forEach((rule) => {
            if (MatchingResult.isSubDocumentRule(rule) && globalSubDocAllowlistRule) {
                result.add(globalSubDocAllowlistRule);
                return;
            }
            const allowlistRule = allowlistRules.find((a) => !rule.isHigherPriority(a) && rule.getAdvancedModifierValue() === a.getAdvancedModifierValue()
                && MatchingResult.isSubDocumentRule(a) === MatchingResult.isSubDocumentRule(rule));
            if (allowlistRule) {
                result.add(allowlistRule);
            }
            else {
                result.add(rule);
            }
        });
        return Array.from(result);
    }
    /**
     * Returns a redirect rule or null if redirect rules are empty.
     * $redirect-rule is only returned if there's a blocking rule also matching
     * this request.
     *
     * @returns Redirect rule or null if not found.
     */
    getRedirectRule() {
        if (!this.redirectRules) {
            return null;
        }
        // Apply allowlist $redirect rules.
        let result = MatchingResult.filterAdvancedModifierRules(this.redirectRules, (rule) => ((x) => x.getAdvancedModifierValue() === rule.getAdvancedModifierValue()));
        // Filters only not allowlist rules.
        result = result.filter((r) => !r.isAllowlist());
        // Splits $redirect and $redirect-rule into separate arrays.
        const conditionalRedirectRules = [];
        const allWeatherRedirectRules = [];
        result.forEach((rule) => {
            const redirectModifier = rule.getAdvancedModifier();
            if (redirectModifier.isRedirectingOnlyBlocked) {
                conditionalRedirectRules.push(rule);
            }
            else {
                allWeatherRedirectRules.push(rule);
            }
        });
        if (allWeatherRedirectRules.length > 0) {
            return MatchingResult.getHighestPriorityRule(allWeatherRedirectRules);
        }
        if (conditionalRedirectRules.length > 0 && this.basicRule && !this.basicRule.isAllowlist()) {
            return MatchingResult.getHighestPriorityRule(conditionalRedirectRules);
        }
        return null;
    }
    /**
     * Returns an array of cookie rules.
     *
     * @returns An array of cookie rules.
     */
    getCookieRules() {
        if (!this.cookieRules) {
            return [];
        }
        const basic = this.getBasicResult();
        if (basic?.isAllowlist() && basic.isOptionEnabled(NetworkRuleOption.Urlblock)) {
            return [];
        }
        const allowlistPredicate = (rule) => ((allowlistRule) => {
            const allowlistRuleCookieModifier = allowlistRule.getAdvancedModifier();
            const ruleCookieModifier = rule.getAdvancedModifier();
            if (allowlistRule.getAdvancedModifierValue() === rule.getAdvancedModifierValue()) {
                return true;
            }
            // Matches by cookie name
            if (allowlistRuleCookieModifier.matches(ruleCookieModifier.getCookieName())) {
                return true;
            }
            return false;
        });
        let filtered = MatchingResult.filterAdvancedModifierRules(this.cookieRules, allowlistPredicate);
        // Cookie rule may also be disabled by a stealth rule with corresponding `1p-cookie` or `3p-cookie` value
        // If corresponding $stealth rule is found, such cookie rule does not get into resulting array
        filtered = filtered.filter((cookieRule) => {
            if (cookieRule.getFilterListId() !== STEALTH_MODE_FILTER_ID) {
                return true;
            }
            if (cookieRule.isOptionEnabled(NetworkRuleOption.ThirdParty)) {
                return !this.getStealthRule(StealthOptionName.ThirdPartyCookies);
            }
            return !this.getStealthRule(StealthOptionName.FirstPartyCookies);
        });
        return filtered.concat([...this.cookieRules.filter((r) => r.isAllowlist())]);
    }
    /**
     * Returns an array of removeparam rules.
     *
     * @returns Array of removeparam rules.
     */
    getRemoveParamRules() {
        if (!this.removeParamRules) {
            return [];
        }
        return MatchingResult.filterAdvancedModifierRules(this.removeParamRules, 
        // eslint-disable-next-line arrow-body-style
        (rule) => ((x) => {
            return x.isHigherPriority(rule) && x.getAdvancedModifierValue() === rule.getAdvancedModifierValue();
        }));
    }
    /**
     * Returns an array of removeheader rules.
     *
     * @returns An array of removeheader rules.
     */
    getRemoveHeaderRules() {
        if (!this.removeHeaderRules) {
            return [];
        }
        if (this.basicRule
            && this.basicRule.isAllowlist()
            && this.basicRule.isOptionEnabled(NetworkRuleOption.Urlblock)) {
            return [];
        }
        return MatchingResult.filterAdvancedModifierRules(this.removeHeaderRules, (rule) => ((x) => x.getAdvancedModifierValue() === rule.getAdvancedModifierValue()));
    }
    /**
     * Decides which rule should be put into the given map.
     * Compares priorities of the two given rules with the equal CSP directive and the rule that may already in the map.
     *
     * @param rule CSP rule (not null).
     * @param allowlistRule CSP allowlist rule (may be null).
     * @param map Rules mapped by csp directive.
     */
    // eslint-disable-next-line max-len
    static putWithPriority(rule, allowlistRule, map) {
        const cspDirective = rule.getAdvancedModifierValue();
        const currentRule = cspDirective ? map.get(cspDirective) : null;
        let newRule = rule;
        if (currentRule && !rule.isHigherPriority(currentRule)) {
            newRule = currentRule;
        }
        if (allowlistRule && allowlistRule.isHigherPriority(newRule)) {
            newRule = allowlistRule;
        }
        map.set(cspDirective, newRule);
    }
    /**
     * Looks if there are any matching $badfilter rules and removes
     * matching bad filters from the array (see the $badfilter description for more info).
     *
     * @param rules Rules to filter.
     *
     * @returns Filtered rules.
     */
    static removeBadfilterRules(rules) {
        const badfilterRules = [];
        for (const rule of rules) {
            if (rule.isOptionEnabled(NetworkRuleOption.Badfilter)) {
                badfilterRules.push(rule);
            }
        }
        if (badfilterRules.length > 0) {
            return rules.filter((rule) => {
                if (rule.isOptionEnabled(NetworkRuleOption.Badfilter)) {
                    return false;
                }
                const isRuleNegated = badfilterRules.some((badfilter) => badfilter.negatesBadfilter(rule));
                return !isRuleNegated;
            });
        }
        return rules;
    }
    /**
     * Returns the highest priority rule from the given array.
     *
     * @param rules Array of network rules.
     *
     * @returns Hightest priority rule or null if the array is empty.
     */
    static getHighestPriorityRule(rules) {
        if (rules.length === 0) {
            return null;
        }
        return rules.sort((a, b) => (b.isHigherPriority(a) ? 1 : -1))[0];
    }
}

/**
 * NetworkEngine is the engine that supports quick search over network rules.
 */
class NetworkEngine {
    /**
     * Storage for the network filtering rules.
     */
    ruleStorage;
    /**
     * Domain lookup table.
     */
    domainsLookupTable;
    /**
     * Lookup table that relies on the rule shortcuts to speed up the search.
     */
    shortcutsLookupTable;
    /**
     * Lookup table for rules like `||hostname^` or `||hostname/path`.
     */
    hostnameLookupTable;
    /**
     * Rules for which we could not find a shortcut and could not place it to the shortcuts lookup table.
     */
    seqScanLookupTable;
    /**
     * Creates an instance of the network engine in sync mode.
     *
     * @param indexedRulesParts Array of indexed storage network rules.
     * @param storage An object for a rules storage.
     *
     * @returns An instance of the network engine.
     */
    static createSync(indexedRulesParts, storage) {
        const engine = new NetworkEngine(storage);
        for (const indexedRuleParts of indexedRulesParts) {
            engine.addRule(indexedRuleParts.ruleParts, indexedRuleParts.index);
        }
        return engine;
    }
    /**
     * Creates an instance of the network engine in async mode.
     *
     * @param indexedRulesParts Array of indexed storage network rules.
     * @param storage An object for a rules storage.
     *
     * @returns An instance of the network engine.
     */
    static async createAsync(indexedRulesParts, storage) {
        const engine = new NetworkEngine(storage);
        let counter = 0;
        for (const indexedRuleParts of indexedRulesParts) {
            counter += 1;
            if (counter >= CHUNK_SIZE) {
                counter = 0;
                // Pause rule loading and let the browser handle pending UI
                // updates (repaints, user input, etc.) before continuing.
                // We use setTimeout (macrotask) instead of Promise.resolve()
                // (microtask) because microtasks don't give the browser a
                // chance to refresh the screen or respond to user actions.
                // eslint-disable-next-line no-await-in-loop
                await new Promise((resolve) => { setTimeout(resolve, 0); });
            }
            engine.addRule(indexedRuleParts.ruleParts, indexedRuleParts.index);
        }
        return engine;
    }
    /**
     * Builds an instance of the network engine.
     *
     * @param storage An object for a rules storage.
     */
    constructor(storage) {
        this.ruleStorage = storage;
        this.domainsLookupTable = new DomainsLookupTable(storage);
        this.hostnameLookupTable = new HostnameLookupTable(storage);
        this.shortcutsLookupTable = new TrieLookupTable(storage);
        this.seqScanLookupTable = new SeqScanLookupTable(storage);
    }
    /**
     * Match searches over all filtering rules loaded to the engine.
     * It returns rule if a match was found alongside the matching rule.
     *
     * @param request Request to check.
     *
     * @returns Rule matching request or null if no match was found.
     */
    match(request) {
        const networkRules = this.matchAll(request);
        if (networkRules.length === 0) {
            return null;
        }
        const result = new MatchingResult(networkRules, null);
        return result.getBasicResult();
    }
    /**
     * Finds all rules matching the specified request regardless of the rule types
     * It will find both allowlist and blacklist rules.
     *
     * @param request Request to check.
     *
     * @returns Array of matching rules.
     */
    matchAll(request) {
        // First check by shortcuts
        const result = this.hostnameLookupTable.matchAll(request);
        result.push(...(this.shortcutsLookupTable.matchAll(request)));
        result.push(...(this.domainsLookupTable.matchAll(request)));
        result.push(...(this.seqScanLookupTable.matchAll(request)));
        return result;
    }
    /**
     * Adds rule to the network engine.
     *
     * @param ruleParts Parts of rule to add.
     * @param storageIdx Storage index of the rule.
     */
    addRule(ruleParts, storageIdx) {
        if (this.hostnameLookupTable.addRule(ruleParts, storageIdx)) {
            return;
        }
        if (this.shortcutsLookupTable.addRule(ruleParts, storageIdx)) {
            return;
        }
        if (this.domainsLookupTable.addRule(ruleParts, storageIdx)) {
            return;
        }
        this.seqScanLookupTable.addRule(ruleParts, storageIdx);
    }
    /**
     * Returns the total number of rules in the engine.
     *
     * @returns The total number of rules.
     */
    get rulesCount() {
        return this.domainsLookupTable.getRulesCount()
            + this.hostnameLookupTable.getRulesCount()
            + this.shortcutsLookupTable.getRulesCount()
            + this.seqScanLookupTable.getRulesCount();
    }
}

/**
 * Scanner types enum.
 */
var ScannerType;
(function (ScannerType) {
    /**
     * Scanning for network rules.
     */
    ScannerType[ScannerType["NetworkRules"] = 0] = "NetworkRules";
    /**
     * Scanning for cosmetic rules.
     */
    ScannerType[ScannerType["CosmeticRules"] = 2] = "CosmeticRules";
    /**
     * Scanning for host rules.
     */
    ScannerType[ScannerType["HostRules"] = 4] = "HostRules";
    /**
     * All types of rules.
     */
    ScannerType[ScannerType["All"] = 6] = "All";
})(ScannerType || (ScannerType = {}));

/**
 * Request represents a web request with all it's necessary properties.
 */
class Request {
    /**
     * Max url length for matching
     * Some urls are really long and slow down matching, so we cut them to this length.
     */
    static MAX_URL_MATCH_LENGTH = 2000;
    /**
     * Request type.
     */
    requestType;
    /**
     * True if request is third-party.
     * Third-party basically means that Domain != SourceDomain.
     * It can be null in the case when there is no sourceUrl at all.
     */
    thirdParty;
    /**
     * Original request URL.
     */
    url;
    /**
     * Request identifier.
     */
    requestId;
    /**
     * Status code.
     */
    statusCode;
    /**
     * Method name.
     */
    method;
    /**
     * Request tab identifier.
     */
    tabId;
    /**
     * The same request URL, but in lower case and shortened.
     * It is necessary to use lower-cased URL in several places,
     * that's why we keep it in the object.
     */
    urlLowercase;
    /**
     * Request's hostname.
     */
    hostname;
    /**
     * Request's domain (eTLD+1).
     */
    domain;
    /**
     * Source URL. Can be empty.
     */
    sourceUrl;
    /**
     * Source hostname. Can be empty.
     */
    sourceHostname;
    /**
     * Source domain (eTLD+1). Can be empty.
     */
    sourceDomain;
    /**
     * The request is for a given Hostname, and not for a URL, and we don't really know what protocol it is.
     * This can be true for DNS requests, or for HTTP CONNECT, or SNI matching.
     */
    isHostnameRequest = false;
    /**
     * List of subdomains parsed from hostname.
     */
    subdomains;
    /**
     * List of source subdomains parsed from source hostname.
     */
    sourceSubdomains;
    /**
     * List of client tags.
     */
    clientTags;
    /**
     * DNS type.
     */
    dnsType;
    /**
     * Client name.
     */
    clientName;
    /**
     * Client IP.
     */
    clientIP;
    /**
     * Creates an instance of a Request.
     *
     * @param url Request URL.
     * @param sourceUrl Source URL.
     * @param requestType Request type.
     * @param method Request method.
     *
     * @throws
     */
    constructor(url, sourceUrl, requestType, method) {
        if (typeof url !== 'string' || !isHttpOrWsRequest(url)) {
            throw new TypeError(`Invalid request url: ${url}`);
        }
        this.url = url;
        this.requestType = requestType;
        this.method = method;
        this.urlLowercase = Request.compactUrl(url).toLowerCase();
        this.sourceUrl = Request.compactUrl(sourceUrl);
        const tldResult = Request.parse(url);
        // We suppose that request always has a hostname and a domain.
        this.hostname = tldResult.hostname;
        this.domain = tldResult.domain;
        this.subdomains = Request.getSubdomains(tldResult);
        let sourceTldResult;
        if (sourceUrl) {
            sourceTldResult = Request.parse(sourceUrl);
            this.sourceHostname = sourceTldResult.hostname;
            this.sourceDomain = sourceTldResult.domain;
            this.sourceSubdomains = Request.getSubdomains(sourceTldResult);
        }
        else {
            this.sourceHostname = null;
            this.sourceDomain = null;
            this.sourceSubdomains = [];
        }
        if (this.sourceDomain) {
            this.thirdParty = this.domain !== this.sourceDomain;
        }
        else if (sourceTldResult && sourceTldResult.isIp) {
            this.thirdParty = this.hostname !== this.sourceHostname;
        }
        else {
            this.thirdParty = null;
        }
    }
    /**
     * Parses URL using tldts and fallbacks to URL API if needed.
     *
     * @param url The URL to be parsed.
     *
     * @returns The parsed URL result.
     */
    static parse(url) {
        const tldResult = parse(url);
        /**
         * Tldts may fail to parse certain IPv6 hostnames (e.g., [::]),
         * so we fall back to the URL API as a workaround.
         *
         * @see https://github.com/AdguardTeam/AdguardBrowserExtension/issues/3360
         */
        if (!tldResult.hostname) {
            try {
                const u = new URL(url);
                tldResult.hostname = u.hostname;
            }
            catch (e) {
                // ignore
            }
        }
        return tldResult;
    }
    /**
     * We cut the url in performance purposes.
     *
     * @param url The URL to be compacted.
     *
     * @returns The compacted URL or null if the input URL is null.
     */
    static compactUrl(url) {
        let compacted = url;
        if (compacted && compacted.length > Request.MAX_URL_MATCH_LENGTH) {
            compacted = compacted.substring(0, Request.MAX_URL_MATCH_LENGTH);
        }
        return compacted;
    }
    /**
     * Splits subdomains and returns all subdomains (including the hostname itself).
     *
     * @param tldResult Result of `tldts.parse()`.
     *
     * @returns Array of subdomains.
     */
    static getSubdomains(tldResult) {
        const { domain, hostname, subdomain, publicSuffix, } = tldResult;
        const subdomainsResult = [];
        if (!domain) {
            if (hostname) {
                subdomainsResult.push(hostname);
                return subdomainsResult;
            }
            return [];
        }
        if (publicSuffix) {
            subdomainsResult.push(publicSuffix);
            // Extract subdomains from complex suffixes
            // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2037
            // https://github.com/AdguardTeam/tsurlfilter/issues/57
            for (let i = 0; i < publicSuffix.length; i += 1) {
                if (publicSuffix[i] === '.') {
                    subdomainsResult.push(publicSuffix.slice(i + 1));
                }
            }
        }
        subdomainsResult.push(domain);
        if (!subdomain) {
            return subdomainsResult;
        }
        const parts = subdomain.split('.');
        let incrementDomain = domain;
        for (let i = parts.length - 1; i >= 0; i -= 1) {
            incrementDomain = `${parts[i]}.${incrementDomain}`;
            subdomainsResult.push(incrementDomain);
        }
        return subdomainsResult;
    }
}

/**
 * Implements a host rule.
 *
 * HostRule is a structure for simple host-level rules (i.e. /etc/hosts syntax).
 * More details: http://man7.org/linux/man-pages/man5/hosts.5.html.
 * It also supports "just domain" syntax. In this case, the IP will be set to `0.0.0.0`.
 *
 * Rules syntax looks like this.
 * ```
 * IP_address canonical_hostname [aliases...]
 * ```
 *
 * Examples:
 * `192.168.1.13 bar.mydomain.org bar` -- ipv4
 * `ff02::1 ip6-allnodes` -- ipv6
 * `::1 localhost ip6-localhost ip6-loopback` -- ipv6 aliases
 * `example.org` -- "just domain" syntax.
 *
 * @returns True if this rule can be used on the specified hostname.
 */
class HostRule {
    /**
     * Parser options for host rules.
     */
    static PARSER_OPTIONS = {
        ...defaultParserOptions,
        parseHostRules: true,
        isLocIncluded: false,
    };
    /**
     * Rule index.
     */
    ruleIndex;
    /**
     * Filter list ID.
     */
    filterListId;
    /**
     * Rule text.
     */
    ruleText;
    /**
     * Hostnames.
     */
    hostnames = [];
    /**
     * IP address.
     */
    ip = '';
    /**
     * Invalid flag.
     */
    invalid = false;
    /**
     * Constructor.
     *
     * Parses the rule and creates a new HostRule instance.
     *
     * @param ruleText Rule text.
     * @param filterListId ID of the filter list this rule belongs to.
     * @param ruleIndex Index of the rule.
     * @param node Optional pre-parsed host rule node to avoid re-parsing.
     *
     * @throws Error if it fails to parse the rule or if the rule is not a host rule.
     */
    constructor(ruleText, filterListId = FILTER_LIST_ID_NONE, ruleIndex = RULE_INDEX_NONE, node) {
        this.ruleIndex = ruleIndex;
        this.filterListId = filterListId;
        // Store rule text in the instance if the rule is not indexed in FiltersStorage.
        // When filterListId or ruleIndex is NONE, the rule text cannot be retrieved
        // from the engine and must be available via getText().
        if (filterListId === FILTER_LIST_ID_NONE || ruleIndex === RULE_INDEX_NONE) {
            this.ruleText = ruleText;
        }
        // Use provided node or parse the rule text
        let parsedNode;
        if (node) {
            parsedNode = node;
        }
        else {
            const parsed = RuleParser.parse(ruleText, HostRule.PARSER_OPTIONS);
            // Validate that we got a valid host rule
            if (parsed.category !== RuleCategory.Network || parsed.type !== NetworkRuleType.HostRule) {
                throw new SyntaxError(`Expected host rule but got ${parsed.category}: ${ruleText}`);
            }
            parsedNode = parsed;
        }
        this.ip = parsedNode.ip.value;
        if (parsedNode.hostnames.children.length === 0) {
            this.invalid = true;
            return;
        }
        this.hostnames = parsedNode.hostnames.children.map((hostname) => hostname.value);
    }
    /**
     * Match returns true if this rule can be used on the specified hostname.
     *
     * @param hostname Hostname to check.
     *
     * @returns True if the hostname matches one of the hostnames in the rule.
     */
    match(hostname) {
        return this.hostnames.includes(hostname);
    }
    /**
     * Returns list id.
     *
     * @returns The filter list ID.
     */
    getFilterListId() {
        return this.filterListId;
    }
    /**
     * Returns rule index.
     *
     * @returns The rule index.
     */
    getIndex() {
        return this.ruleIndex;
    }
    /**
     * Returns the rule text.
     *
     * @returns Rule text.
     */
    getText() {
        return this.ruleText;
    }
    /**
     * Returns ip address.
     *
     * @returns IP address.
     */
    getIp() {
        return this.ip;
    }
    /**
     * Returns hostnames.
     *
     * @returns Array of hostnames.
     */
    getHostnames() {
        return this.hostnames;
    }
    /**
     * Checks if the rule is invalid.
     *
     * @returns True if the rule is invalid.
     */
    isInvalid() {
        return this.invalid;
    }
}

/**
 * DnsResult contains a network rule and host rules matching request.
 */
class DnsResult {
    /**
     * BasicRule - a network rule matching the request.
     */
    basicRule = null;
    /**
     * Host rules.
     */
    hostRules = [];
}

/**
 * DNSEngine combines host rules and network rules and is supposed to quickly find
 * matching rules for hostnames.
 * First, it looks over network rules and returns first rule found.
 * Then, if nothing found, it looks up the host rules.
 */
class DnsEngine {
    /**
     * Count of rules added to the engine.
     */
    rulesCount;
    /**
     * Storage.
     */
    ruleStorage;
    /**
     * Lookup table. Key is the hostname hash.
     */
    lookupTable;
    /**
     * Network engine instance.
     */
    networkEngine;
    /**
     * Builds an instance of dns engine.
     *
     * @param storage Rule storage.
     */
    constructor(storage) {
        this.ruleStorage = storage;
        this.rulesCount = 0;
        this.lookupTable = new Map();
        const scanner = this.ruleStorage.createRuleStorageScanner(ScannerType.HostRules);
        const networkRulesParts = [];
        while (scanner.scan()) {
            // TODO (AG-46284): Avoid double tokenization
            const indexedRule = scanner.getRuleParts();
            if (!indexedRule) {
                continue;
            }
            const rule = this.ruleStorage.retrieveRule(indexedRule.index, false);
            if (rule instanceof HostRule) {
                this.addRule(rule, indexedRule.index);
            }
            else if (rule instanceof NetworkRule && rule.isHostLevelNetworkRule()) {
                // Note: it is safe to cast here, because we checked rule type
                networkRulesParts.push(indexedRule);
            }
        }
        this.networkEngine = NetworkEngine.createSync(networkRulesParts, storage);
    }
    /**
     * Match searches over all filtering and host rules loaded to the engine.
     *
     * @param hostname To check.
     *
     * @returns Dns result object.
     */
    match(hostname) {
        const result = new DnsResult();
        if (!hostname) {
            return result;
        }
        const url = `http://${hostname}/`;
        const request = new Request(url, url, RequestType.Document);
        request.isHostnameRequest = true;
        const networkRule = this.networkEngine.match(request);
        if (networkRule) {
            // Network rules always have higher priority
            result.basicRule = networkRule;
            return result;
        }
        const hash = fastHash(hostname);
        const rulesIndexes = this.lookupTable.get(hash);
        if (rulesIndexes) {
            for (let j = 0; j < rulesIndexes.length; j += 1) {
                const rule = this.ruleStorage.retrieveHostRule(rulesIndexes[j]);
                if (rule && rule.match(hostname)) {
                    result.hostRules.push(rule);
                }
            }
        }
        return result;
    }
    /**
     * Adds rule to engine.
     *
     * @param rule Rule to add.
     * @param storageIdx Storage index of the rule.
     */
    addRule(rule, storageIdx) {
        rule.getHostnames().forEach((hostname) => {
            const hash = fastHash(hostname);
            // Add the rule to the lookup table
            let rulesIndexes = this.lookupTable.get(hash);
            if (!rulesIndexes) {
                rulesIndexes = [];
                this.lookupTable.set(hash, rulesIndexes);
            }
            rulesIndexes.push(storageIdx);
        });
        this.rulesCount += 1;
    }
}

/**
 * Checks if error has message.
 *
 * @param error Error object.
 *
 * @returns If param is error.
 */
function isErrorWithMessage(error) {
    return (typeof error === 'object'
        && error !== null
        && 'message' in error
        && typeof error.message === 'string');
}
/**
 * Converts error to the error with message.
 *
 * @param maybeError Possible error.
 *
 * @returns Error with message.
 */
function toErrorWithMessage(maybeError) {
    if (isErrorWithMessage(maybeError)) {
        return maybeError;
    }
    try {
        return new Error(JSON.stringify(maybeError));
    }
    catch {
        // fallback in case there's an error stringifying the maybeError
        // like with circular references for example.
        return new Error(String(maybeError));
    }
}
/**
 * Converts error object to error with message. This method might be helpful to handle thrown errors.
 *
 * @param error Error object.
 *
 * @returns Message of the error.
 */
function getErrorMessage(error) {
    // Special case: pretty print Zod errors
    if (error instanceof ZodError) {
        return fromZodError(error).toString();
    }
    return toErrorWithMessage(error).message;
}

/* eslint-disable @typescript-eslint/no-loop-func */
/**
 * Schema for validating and transforming non-negative integers that may be represented as strings or numbers.
 * Useful for handling JSON deserialization where numeric keys become strings.
 */
const nonNegativeIntegerSchema = z$1.union([z$1.string(), z$1.number()])
    .pipe(z$1.coerce.number())
    .refine((num) => Number.isInteger(num) && num >= 0, {
    message: 'Must be a non-negative integer',
});
/**
 * Conversion data validator.
 * With this data we can revert the conversion and get the original filter list.
 * It is designed to provide `O(1)` access to the original filtering rules.
 */
const conversionDataValidator = z$1.object({
    /**
     * Original filter list rules.
     */
    originals: z$1.string().array(),
    /**
     * Conversion map.
     * Maps line start offsets in the converted content to indexes in the `originals` array.
     *
     * Keys are 0-based line start offsets in the converted content.
     * Values are 0-based indexes in the `originals` array.
     */
    conversions: z$1.record(nonNegativeIntegerSchema, z$1.number()),
});
/**
 * FilterList is a class that represents a (converted) filter list.
 * It is designed to provide `O(1)` access to the original filtering rules.
 */
class FilterList {
    /**
     * Content of the converted filter list.
     */
    content;
    /**
     * Conversion data.
     * With this data we can revert the conversion and get the original filter list.
     * It is designed to provide `O(1)` access to the original filtering rules.
     */
    data;
    /**
     * Whether the filter list has been prepared.
     */
    prepared;
    /**
     * Filter list identifier, used to tag conversion errors.
     */
    filterId;
    /**
     * Errors that occurred during raw rule conversion.
     */
    errors = [];
    /**
     * Creates a new FilterList instance.
     *
     * @param content Filter list content.
     * @param filterId Optional filter list identifier. Used to tag conversion errors so callers
     * can trace an error back to its source filter list.
     * @param data Optional conversion data. If not provided, the filter list will be prepared.
     * If provided, this class trusts the data and does not prepare the filter list.
     */
    constructor(content, filterId, data) {
        this.filterId = filterId ?? FILTER_LIST_ID_NONE;
        if (data !== undefined) {
            this.prepared = true;
            this.content = content;
            this.data = data;
        }
        else {
            this.prepared = false;
            this.content = content;
            this.prepare(content);
        }
    }
    /**
     * Creates an empty converted filter list.
     *
     * @returns Empty converted filter list.
     */
    static createEmpty() {
        return new FilterList(EMPTY_STRING, FILTER_LIST_ID_NONE, FilterList.createEmptyConversionData());
    }
    /**
     * Creates an empty conversion data.
     *
     * @returns Empty conversion data.
     */
    static createEmptyConversionData() {
        return {
            originals: [],
            conversions: {},
        };
    }
    /**
     * Returns the converted content.
     *
     * @returns Converted filter list as a string.
     */
    getContent() {
        return this.content;
    }
    /**
     * Returns the conversion data.
     *
     * @returns Conversion data.
     */
    getConversionData() {
        return this.data;
    }
    /**
     * Returns errors that occurred during raw rule conversion.
     *
     * @returns Array of conversion errors.
     */
    getConversionErrors() {
        return this.errors;
    }
    /**
     * Prepares the filter list by converting it and recording conversion data.
     *
     * @param original The original unconverted filter list.
     */
    prepare(original) {
        if (this.prepared) {
            return;
        }
        const { length } = original;
        let convertedBuffer = EMPTY_STRING;
        const data = {
            originals: [],
            conversions: {},
        };
        let offset = 0;
        while (offset < length) {
            const [lineBreakIndex, lineBreakLen] = findNextLineBreakIndex(original, offset);
            const lineBreak = original.slice(lineBreakIndex, lineBreakIndex + lineBreakLen);
            const line = original.slice(offset, lineBreakIndex);
            try {
                const conversionResult = RawRuleConverter.convertToAdg(line);
                if (conversionResult.isConverted) {
                    const originalIndex = data.originals.length;
                    data.originals.push(line);
                    for (let i = 0; i < conversionResult.result.length; i += 1) {
                        const conversionIndex = convertedBuffer.length;
                        const convertedLine = conversionResult.result[i];
                        if (lineBreak.length > 0) {
                            convertedBuffer += convertedLine + lineBreak;
                        }
                        else if (i < conversionResult.result.length - 1) {
                            // If the file has no final line break, but we converted the last rule into multiple lines,
                            // we need to add a line break after each converted line, except the last one
                            convertedBuffer += `${convertedLine}${LF}`;
                        }
                        else {
                            convertedBuffer += convertedLine;
                        }
                        data.conversions[conversionIndex] = originalIndex;
                    }
                }
                else {
                    convertedBuffer += line + lineBreak;
                }
            }
            catch (e) {
                this.errors.push({
                    rule: line,
                    offset,
                    message: getErrorMessage(e),
                    filterId: this.filterId,
                });
                convertedBuffer += line + lineBreak;
            }
            offset = lineBreakIndex + lineBreakLen;
        }
        this.data = data;
        this.content = convertedBuffer;
        this.prepared = true;
    }
    /**
     * Returns the rule text for a given converted line number.
     * This rule may be converted from an original rule.
     * If you need the original rule, use `getOriginalRuleText`.
     *
     * @param offset Line start offset in the converted content.
     *
     * @returns Rule as string, or null if not found.
     */
    getRuleText(offset) {
        if (offset >= this.content.length) {
            return null;
        }
        const [lineBreakStartIndex] = findNextLineBreakIndex(this.content, offset);
        return this.content.slice(offset, lineBreakStartIndex);
    }
    /**
     * Returns the original rule text for a given converted line number.
     * If the rule at the offset was converted, returns the original from conversion data.
     * If the rule was not converted, returns the rule text (which is already the original).
     *
     * @param offset Line start offset in the converted content.
     *
     * @returns Original rule text, or null if offset is invalid.
     */
    getOriginalRuleText(offset) {
        if (offset < 0 || offset >= this.content.length) {
            return null;
        }
        const originalRuleIndex = this.data.conversions[offset];
        if (originalRuleIndex !== undefined) {
            return this.data.originals[originalRuleIndex];
        }
        return this.getRuleText(offset);
    }
    /**
     * Returns the original rule text only if the rule at the given offset was actually converted.
     * Unlike getOriginalRuleText(), this returns null for rules that were not converted.
     *
     * @param offset Line start offset in the converted content.
     *
     * @returns Original rule text if the rule was converted, or null if the rule was not converted
     * or offset is invalid.
     */
    getConvertedRuleOriginal(offset) {
        if (offset < 0 || offset >= this.content.length) {
            return null;
        }
        const originalRuleIndex = this.data.conversions[offset];
        if (originalRuleIndex !== undefined) {
            return this.data.originals[originalRuleIndex];
        }
        return null;
    }
    /**
     * Restores the original filter list content from the converted content.
     *
     * @returns Original filter list content.
     */
    getOriginalContent() {
        // Trivial case
        if (this.data.originals.length === 0) {
            return this.content;
        }
        let originalBuffer = EMPTY_STRING;
        const { length } = this.content;
        let offset = 0;
        while (offset < length) {
            let [nextLineBreakIndex, nextLineBreakLength] = findNextLineBreakIndex(this.content, offset);
            const currentLine = this.content.slice(offset, nextLineBreakIndex);
            const firstOriginalRuleIndex = this.data.conversions[offset]; // use char offset as key
            if (firstOriginalRuleIndex !== undefined) {
                // Write original rule
                originalBuffer += this.data.originals[firstOriginalRuleIndex];
                // Skip any subsequent converted lines that came from the same original rule
                let nextOffset = nextLineBreakIndex + nextLineBreakLength;
                while (this.data.conversions[nextOffset] === firstOriginalRuleIndex) {
                    [nextLineBreakIndex, nextLineBreakLength] = findNextLineBreakIndex(this.content, nextOffset);
                    nextOffset = nextLineBreakIndex + nextLineBreakLength;
                }
                // Update offset to the end of this group
                offset = nextLineBreakIndex + nextLineBreakLength;
            }
            else {
                // No mapping, just copy the line
                originalBuffer += currentLine;
                offset = nextLineBreakIndex + nextLineBreakLength;
            }
            // Preserve original line breaks, including final break if present
            originalBuffer += this.content.slice(nextLineBreakIndex, nextLineBreakIndex + nextLineBreakLength);
        }
        return originalBuffer;
    }
}

/**
 * StringLineReader is a class responsible for reading content line by line
 * from a string. It supports LF (`\n`) and CRLF (`\r\n`) line breaks.
 */
class StringLineReader {
    /**
     * Full string to read lines from.
     */
    text;
    /**
     * Current read position or -1 when the reader is finished.
     */
    currentIndex = 0;
    /**
     * Line number, 1-based.
     */
    currentLineNumber = 1;
    /**
     * Constructor of the `StringLineReader`.
     *
     * @param text Text to read line by line.
     */
    constructor(text) {
        this.text = text;
    }
    /** @inheritdoc */
    readLine() {
        if (this.currentIndex === -1 || this.currentIndex >= this.text.length) {
            this.currentIndex = -1;
            return null;
        }
        const startIndex = this.currentIndex;
        const lfIndex = this.text.indexOf(LF, startIndex);
        if (lfIndex === -1) {
            const line = this.text.substring(startIndex);
            this.currentIndex = -1;
            this.currentLineNumber += 1;
            return line;
        }
        let line;
        if (lfIndex > 0 && this.text[lfIndex - 1] === CR) {
            // CRLF: include \r in the break
            line = this.text.substring(startIndex, lfIndex - 1);
        }
        else {
            // LF only
            line = this.text.substring(startIndex, lfIndex);
        }
        this.currentIndex = lfIndex + 1;
        this.currentLineNumber += 1;
        return line;
    }
    /** @inheritdoc */
    getCurrentPos() {
        return this.currentIndex;
    }
    /** @inheritdoc */
    getCurrentLineNumber() {
        return this.currentLineNumber;
    }
    /** @inheritdoc */
    getDataLength() {
        return this.text.length;
    }
}

/**
 * List identifier max value.
 * We use "number" type for storage indexes, so we have some limits for list
 * identifiers.
 * We use line number for rule index, so if we save 11 ranks for rules, then we
 * have 6 ranks left for list ids. Check RuleStorageScanner class for more info.
 */
const LIST_ID_MAX_VALUE = 10 ** 6;
/**
 * No list id.
 */
const NO_LIST_ID = -1;

const MIN_RULE_LENGTH = 4;
const ADBLOCK_COMMENT_MARKER = '!';
const HOST_COMMENT_MARKER = '#';
const NETWORK_RULE_ALLOWLIST_MARKER = '@@';
const NETWORK_RULE_ALLOWLIST_MARKER_LENGTH = NETWORK_RULE_ALLOWLIST_MARKER.length;
const MODIFIER_ASSIGN = '=';
const DOMAIN_MODIFIER = 'domain';
const DOMAIN_MODIFIER_LENGTH = DOMAIN_MODIFIER.length;
const COSMETIC_SEPARATOR_OFFSET_MASK = (1 << 26) - 1; // 0x03FFFFFF (26 lowest bits)
const COSMETIC_SEPARATOR_LEN_SHIFT = 26; // 3 bits
const COSMETIC_SEPARATOR_TYPE_SHIFT = 29; // 2 bits
const COSMETIC_SEPARATOR_ALLOW_SHIFT = 31; // 1 bit
const DOMAIN_START_SHIFT = 16;
const DOMAIN_END_MASK = 0xffff;
/**
 * Encodes the offset, length, type, and allow flag into a single number.
 *
 * @param offset The offset of the separator.
 * @param length The length of the separator.
 * @param type The type of the separator.
 * @param allow Whether the separator is an allowlist.
 *
 * @returns The encoded separator value.
 */
const encodeSeparator = (offset, length, type, allow) => {
    return ((offset & COSMETIC_SEPARATOR_OFFSET_MASK)
        | ((length & 0x7) << COSMETIC_SEPARATOR_LEN_SHIFT)
        | ((type & 0x3) << COSMETIC_SEPARATOR_TYPE_SHIFT)
        | ((allow ? 1 : 0) << COSMETIC_SEPARATOR_ALLOW_SHIFT));
};
/**
 * Extracts the offset position from an encoded cosmetic separator value.
 *
 * @param v The encoded separator value.
 *
 * @returns The offset position.
 */
const decodeSeparatorOffset = (v) => v & COSMETIC_SEPARATOR_OFFSET_MASK;
/**
 * Extracts the length of the separator from an encoded cosmetic separator value.
 *
 * @param v The encoded separator value.
 *
 * @returns The length of the separator.
 */
const decodeSeparatorLength = (v) => (v >>> COSMETIC_SEPARATOR_LEN_SHIFT) & 0x7;
/**
 * Extracts the type of the separator from an encoded cosmetic separator value.
 *
 * @param v The encoded separator value.
 *
 * @returns The type of the separator.
 */
const decodeSeparatorType = (v) => (v >>> COSMETIC_SEPARATOR_TYPE_SHIFT) & 0x3;
/**
 * Extracts whether the separator is an allowlist from an encoded cosmetic separator value.
 *
 * @param v The encoded separator value.
 *
 * @returns Whether the separator is an allowlist.
 */
const decodeSeparatorIsAllowlist = (v) => ((v >>> COSMETIC_SEPARATOR_ALLOW_SHIFT) & 0x1) === 1;
/**
 * Scans a rule for a hashmark-based cosmetic separator and returns an encoded representation if found.
 *
 * @param rule The rule to scan.
 *
 * @returns An encoded representation of the separator if found, or `null` otherwise.
 */
const findHashmarkBasedCosmeticSeparator = (rule) => {
    let i = -1;
    // eslint-disable-next-line no-cond-assign
    while ((i = rule.indexOf('#', i + 1)) !== -1) {
        if (rule[i + 1] === '#' && rule[i - 1] !== SPACE) {
            // ##
            return encodeSeparator(i, 2, 0 /* CosmeticRuleType.ElementHidingRule */, false);
        }
        if (rule[i + 1] === '?' && rule[i + 2] === '#') {
            // #?#
            return encodeSeparator(i, 3, 0 /* CosmeticRuleType.ElementHidingRule */, false);
        }
        if (rule[i + 1] === '%' && rule[i + 2] === '#') {
            // #%#
            return encodeSeparator(i, 3, 2 /* CosmeticRuleType.JsInjectionRule */, false);
        }
        if (rule[i + 1] === '$') {
            if (rule[i + 2] === '#') {
                // #$#
                return encodeSeparator(i, 3, 1 /* CosmeticRuleType.CssInjectionRule */, false);
            }
            if (rule[i + 2] === '?' && rule[i + 3] === '#') {
                // #$?#
                return encodeSeparator(i, 4, 1 /* CosmeticRuleType.CssInjectionRule */, false);
            }
        }
        if (rule[i + 1] === '@') {
            if (rule[i + 2] === '#' && rule[i - 1] !== SPACE) {
                // #@#
                return encodeSeparator(i, 3, 0 /* CosmeticRuleType.ElementHidingRule */, true);
            }
            if (rule[i + 2] === '?' && rule[i + 3] === '#') {
                // #@?#
                return encodeSeparator(i, 4, 0 /* CosmeticRuleType.ElementHidingRule */, true);
            }
            if (rule[i + 2] === '%' && rule[i + 3] === '#') {
                // #@%#
                return encodeSeparator(i, 4, 2 /* CosmeticRuleType.JsInjectionRule */, true);
            }
            if (rule[i + 2] === '$') {
                if (rule[i + 3] === '#') {
                    // #@$#
                    return encodeSeparator(i, 4, 1 /* CosmeticRuleType.CssInjectionRule */, true);
                }
                if (rule[i + 3] === '?' && rule[i + 4] === '#') {
                    // #@$?#
                    return encodeSeparator(i, 5, 1 /* CosmeticRuleType.CssInjectionRule */, true);
                }
            }
        }
    }
    return null;
};
/**
 * Encodes the start and end positions of domains.
 *
 * @param start The start position of the domains.
 * @param end The end position of the domains.
 *
 * @returns The encoded domains value.
 */
const encodeDomains = (start, end) => {
    return (start << DOMAIN_START_SHIFT) | end;
};
/**
 * Decodes the start position of domains from an encoded domains value.
 *
 * @param value The encoded domains value.
 *
 * @returns The start position of the domains.
 */
const decodeDomainsStart = (value) => {
    return value >> DOMAIN_START_SHIFT;
};
/**
 * Decodes the end position of domains from an encoded domains value.
 *
 * @param value The encoded domains value.
 *
 * @returns The end position of the domains.
 */
const decodeDomainsEnd = (value) => {
    return value & DOMAIN_END_MASK;
};
/**
 * Extracts the start and end positions of domains from a modifier list.
 *
 * @param rule The rule containing the modifier list.
 * @param modifierListStart The start position of the modifier list.
 * @param modifiersEnd The end position of the modifiers.
 *
 * @returns The encoded domains value or `null` if no domains are found.
 */
const extractDomainsFromModifierList = (rule, modifierListStart, modifiersEnd) => {
    const start = rule.indexOf(DOMAIN_MODIFIER, modifierListStart);
    if (start === -1) {
        return null;
    }
    let i = findNextNonWhitespace(rule, start + DOMAIN_MODIFIER_LENGTH, modifiersEnd);
    if (rule[i] !== MODIFIER_ASSIGN) {
        return null;
    }
    i += 1;
    const valueStart = i;
    i = findNextNonWhitespace(rule, i, modifiersEnd);
    // find next unescaped comma or the end of the string
    while (i < modifiersEnd) {
        if (rule[i] === ESCAPE) {
            i += 2;
            continue;
        }
        if (rule[i] === COMMA) {
            break;
        }
        i += 1;
    }
    return encodeDomains(valueStart, i);
};
/**
 * Builds cosmetic rule parts.
 *
 * @param rule The adblock rule to tokenize.
 * @param realStart The start of the rule.
 * @param realEnd The end of the rule.
 * @param separatorEncoded The encoded separator.
 *
 * @returns The rule parts or null if the rule is not a cosmetic rule.
 */
function buildCosmeticRuleParts(rule, realStart, realEnd, separatorEncoded) {
    const offset = decodeSeparatorOffset(separatorEncoded);
    const length = decodeSeparatorLength(separatorEncoded);
    let domainsStart;
    let domainsEnd;
    // handle cosmetic modifiers
    if (rule[realStart] === OPEN_SQUARE) {
        // skip whitespace
        let i = realStart + 1;
        while (i < realEnd && (rule[i] === SPACE || rule[i] === TAB)) {
            i += 1;
        }
        if (rule[i] !== '$') {
            // invalid rule
            return null;
        }
        // find last unescaped ] from separator
        let j = offset - 1;
        while (j >= realStart) {
            if (rule[j] === CLOSE_SQUARE && rule[j - 1] !== ESCAPE) {
                break;
            }
            j -= 1;
        }
        if (j < realStart) {
            return null;
        }
        const domain = extractDomainsFromModifierList(rule, i + 1, j);
        if (domain !== null) {
            domainsStart = decodeDomainsStart(domain);
            domainsEnd = decodeDomainsEnd(domain);
        }
        else {
            // take the rest of the pattern as domains, skipping whitespace after ]
            const restStart = findNextNonWhitespace(rule, j + 1, offset);
            if (restStart < offset) {
                domainsStart = restStart;
                domainsEnd = offset;
            }
        }
    }
    else if (realStart < offset) {
        domainsStart = realStart;
        domainsEnd = offset;
    }
    return {
        category: 2 /* RuleCategory.Cosmetic */,
        type: decodeSeparatorType(separatorEncoded),
        allowlist: decodeSeparatorIsAllowlist(separatorEncoded),
        patternStart: realStart,
        patternEnd: offset,
        contentStart: findNextNonWhitespace(rule, offset + length, rule.length),
        contentEnd: realEnd,
        separatorStart: offset,
        separatorEnd: offset + length,
        domainsStart,
        domainsEnd,
        text: rule,
    };
}
/**
 * Parses a host rule and returns its parts.
 *
 * @param rule The rule to parse.
 * @param realStart The start of the rule.
 * @param realEnd The end of the rule.
 *
 * @returns The rule parts or null if the rule is not a host rule.
 */
function getHostRuleParts(rule, realStart, realEnd) {
    // rule end without comments, e.g. rule can be `example.com #comment` or `127.0.0.1 example.com #comment`
    // but we can drop the comments in such rules
    let endWithoutComment;
    const hashMarkIndex = rule.indexOf(HOST_COMMENT_MARKER, realStart);
    if (hashMarkIndex !== -1) {
        endWithoutComment = findPrevNonWhitespace(rule, hashMarkIndex - 1);
    }
    else {
        endWithoutComment = realEnd;
    }
    const ipStart = realStart;
    let ipEnd;
    // if IP present, it should be the first part
    const nextSpaceIndex = findNextWhitespace(rule, realStart);
    if (nextSpaceIndex === -1) {
        ipEnd = endWithoutComment;
    }
    else {
        ipEnd = nextSpaceIndex;
    }
    const firstPart = rule.slice(ipStart, ipEnd);
    if (!isIp(firstPart)) {
        // domains only syntax
        return {
            category: 0 /* RuleCategory.Host */,
            domainsStart: realStart,
            domainsEnd: endWithoutComment,
            text: rule,
        };
    }
    const domainsStart = findNextNonWhitespace(rule, nextSpaceIndex + 1, endWithoutComment);
    if (ipStart !== undefined && domainsStart >= endWithoutComment) {
        // invalid rule, because ip needs to be followed by domain(s)
        return null;
    }
    return {
        category: 0 /* RuleCategory.Host */,
        domainsStart,
        domainsEnd: endWithoutComment,
        ipStart,
        ipEnd,
        text: rule,
    };
}
/**
 * Tokenizes an adblock rule string into structured components: host, network, or cosmetic rule parts.
 *
 * Depending on rule content and options, it extracts relevant ranges for pattern, modifiers,
 * content, domains, separators, etc.
 *
 * ## Rule Categories:
 * - `Host`: domain-only or IP-based hosts file entries (e.g. `127.0.0.1 example.com`)
 * - `Network`: standard filter list entries with optional modifiers (e.g. `||example.com^$script`)
 * - `Cosmetic`: element hiding or injection rules (e.g. `example.com##.ad`, `[$domain=foo]##.ad`).
 *
 * @param rule The raw adblock rule string to tokenize.
 * @param ignoreCosmetics If true, skip processing cosmetic rules.
 * @param ignoreHosts If true, skip processing host file style rules.
 *
 * @returns Returns a structured rule object with offset ranges,
 * or `null` if the rule is invalid, a comment, or filtered out.
 */
function getRuleParts(rule, ignoreCosmetics = false, ignoreHosts = true) {
    const { length: ruleLength } = rule;
    const realStart = findNextNonWhitespace(rule, 0, ruleLength);
    const realEnd = findPrevNonWhitespace(rule, ruleLength);
    // Ignore comments
    if (rule[realStart] === ADBLOCK_COMMENT_MARKER) {
        return null;
    }
    // Drop rules that are too short or empty
    if (realEnd - realStart < MIN_RULE_LENGTH) {
        return null;
    }
    // Try to find a hash-based cosmetic separator
    let cosmeticSeparator = findHashmarkBasedCosmeticSeparator(rule);
    if (cosmeticSeparator !== null) {
        if (ignoreCosmetics) {
            return null;
        }
        return buildCosmeticRuleParts(rule, realStart, realEnd, cosmeticSeparator);
    }
    // Check host-like comments after the cosmetic separator, to avoid false positives, like `##example.com`
    if (rule[realStart] === HOST_COMMENT_MARKER) {
        return null;
    }
    // try to find dollar based cosmetic separator or network rule separator
    let dollarCount = 0;
    let lastDollarIndex = -1;
    let i = realStart - 1;
    // Check all '$' based patterns
    // eslint-disable-next-line no-cond-assign
    while ((i = rule.indexOf('$', i + 1)) !== -1) {
        dollarCount += 1;
        lastDollarIndex = i;
        if (rule[i + 1] === '$') {
            // $$
            cosmeticSeparator = encodeSeparator(i, 2, 3 /* CosmeticRuleType.HtmlFilteringRule */, false);
        }
        if (rule[i + 1] === '@' && rule[i + 2] === '$') {
            // $@$
            cosmeticSeparator = encodeSeparator(i, 3, 3 /* CosmeticRuleType.HtmlFilteringRule */, true);
        }
    }
    if (cosmeticSeparator !== null) {
        if (ignoreCosmetics) {
            return null;
        }
        return buildCosmeticRuleParts(rule, realStart, realEnd, cosmeticSeparator);
    }
    if (dollarCount === 0) {
        if (!ignoreHosts && hasWhitespace(rule, realStart, realEnd)) {
            // TODO (David): Handle domain-only host rules
            return getHostRuleParts(rule, realStart, realEnd);
        }
        const allowlist = rule.startsWith(NETWORK_RULE_ALLOWLIST_MARKER, realStart);
        // simple case, there are no modifiers
        return {
            category: 1 /* RuleCategory.Network */,
            allowlist,
            patternStart: allowlist ? realStart + NETWORK_RULE_ALLOWLIST_MARKER_LENGTH : realStart,
            patternEnd: realEnd,
            text: rule,
        };
    }
    // TODO (David): Handle this case in AGTree v5, this is just a temporary fix
    if (dollarCount > 1 && rule.indexOf('/', lastDollarIndex) !== -1) {
        lastDollarIndex = NetworkRuleParser$1.findNetworkRuleSeparatorIndex(rule);
    }
    const modifierListStart = lastDollarIndex + 1;
    const modifierListEnd = realEnd;
    const allowlist = rule.startsWith(NETWORK_RULE_ALLOWLIST_MARKER, realStart);
    const result = {
        category: 1 /* RuleCategory.Network */,
        allowlist,
        patternStart: allowlist ? realStart + NETWORK_RULE_ALLOWLIST_MARKER_LENGTH : realStart,
        patternEnd: lastDollarIndex,
        modifiersStart: modifierListStart,
        modifiersEnd: modifierListEnd,
        text: rule,
    };
    const domains = extractDomainsFromModifierList(rule, modifierListStart, modifierListEnd);
    if (domains) {
        result.domainsStart = decodeDomainsStart(domains);
        result.domainsEnd = decodeDomainsEnd(domains);
    }
    return result;
}

/**
 * Rule scanner provides the functionality for reading rules from a filter list.
 */
class RuleScanner {
    /**
     * Filter list ID.
     */
    listId;
    /**
     * True if we should ignore cosmetic rules.
     */
    ignoreCosmetic;
    /**
     * True if we should ignore javascript cosmetic rules.
     */
    ignoreJS;
    /**
     * True if we should ignore network rules.
     */
    ignoreNetwork;
    /**
     * True if we should ignore host filtering rules.
     */
    ignoreHost;
    /**
     * Underlying reader object.
     */
    reader;
    /**
     * Current rule.
     */
    currentRuleParts = null;
    /**
     * Index of the beginning of the current rule (basically, a line number).
     */
    currentRuleIndex = 0;
    /**
     * Constructor of a RuleScanner object.
     *
     * @param reader Source of the filtering rules.
     * @param listId Filter list ID.
     * @param configuration Scanner configuration object.
     */
    constructor(reader, listId, configuration) {
        this.reader = reader;
        this.listId = listId;
        this.ignoreCosmetic = !!configuration.ignoreCosmetic
            || ((configuration.scannerType & ScannerType.CosmeticRules) !== ScannerType.CosmeticRules);
        this.ignoreNetwork = (configuration.scannerType & ScannerType.NetworkRules) !== ScannerType.NetworkRules;
        this.ignoreHost = (configuration.scannerType & ScannerType.HostRules) !== ScannerType.HostRules;
        this.ignoreJS = !!configuration.ignoreJS;
    }
    /**
     * Scan advances the RuleScanner to the next rule, which will then be
     * available through the getRule() method.
     *
     * @returns - False when the scan stops, either by reaching the end of the
     * input or an error. If there's a rule available, returns true.
     */
    scan() {
        let lineIndex = this.reader.getCurrentPos();
        let line = this.readNextLine();
        while (line !== null) {
            const ruleParts = getRuleParts(line, this.ignoreCosmetic, this.ignoreHost);
            if (ruleParts && !this.isIgnored(ruleParts)) {
                this.currentRuleParts = ruleParts;
                this.currentRuleIndex = lineIndex;
                return true;
            }
            lineIndex = this.reader.getCurrentPos();
            line = this.reader.readLine();
        }
        return false;
    }
    /**
     * Gets the most recent rule parts generated by a call to scan(), and the
     * index of this rule's text.
     *
     * @returns The most recent rule generated by a call to scan(), and the
     * index of this rule's text.
     */
    getRuleParts() {
        if (this.currentRuleParts) {
            return new IndexedRuleParts(this.currentRuleParts, this.currentRuleIndex, this.listId);
        }
        return null;
    }
    /**
     * Get filter list id.
     *
     * @returns List id.
     */
    getListId() {
        return this.listId;
    }
    /**
     * Get the length of the data read by the scanner.
     *
     * @returns Data length.
     */
    getDataLength() {
        return this.reader.getDataLength();
    }
    /**
     * Reads the next line and returns it.
     *
     * @returns - Next line string or null.
     */
    readNextLine() {
        const line = this.reader.readLine();
        if (line != null) {
            return line.trim();
        }
        return null;
    }
    /**
     * Checks if the rule should be ignored by this scanner.
     *
     * @param ruleParts Rule parts to check.
     *
     * @returns - True if the rule should be ignored.
     */
    isIgnored(ruleParts) {
        if (!this.ignoreCosmetic && !this.ignoreJS) {
            return false;
        }
        if (ruleParts.category === 1 /* RuleCategory.Network */ && this.ignoreNetwork) {
            return true;
        }
        if (ruleParts.category === 0 /* RuleCategory.Host */ && this.ignoreHost) {
            return true;
        }
        if (ruleParts.category === 2 /* RuleCategory.Cosmetic */) {
            if (this.ignoreCosmetic) {
                return true;
            }
            // Ignore JS type rules.
            // TODO: in the future we may allow CSS rules and Scriptlets (except
            // for "trusted" scriptlets).
            if (this.ignoreJS
                && ruleParts.type === 2 /* CosmeticRuleType.JsInjectionRule */) {
                return true;
            }
        }
        return false;
    }
}

/**
 * `FilterRuleList` wraps a {@link FilterList} to provide {@link IRuleList} implementation.
 * It allows efficient rule scanning and retrieval from pre-converted filter lists,
 * with support for ignoring cosmetic, JS, and unsafe rules.
 */
class FilterRuleList {
    /**
     * Rule list ID.
     */
    id;
    /**
     * {@link FilterList} containing pre-processed filtering rules.
     */
    list;
    /**
     * Whether to ignore cosmetic rules or not.
     */
    ignoreCosmetic;
    /**
     * Whether to ignore javascript cosmetic rules or not.
     */
    ignoreJS;
    /**
     * Whether to ignore unsafe rules or not.
     */
    ignoreUnsafe;
    /**
     * Constructor.
     *
     * @param listId Rule list identifier.
     * @param list {@link FilterList} instance containing pre-processed rules.
     * @param ignoreCosmetic (Optional) default false.
     * @param ignoreJS (Optional) default false.
     * @param ignoreUnsafe (Optional) default false.
     */
    constructor(listId, list, ignoreCosmetic, ignoreJS, ignoreUnsafe) {
        if (listId >= LIST_ID_MAX_VALUE) {
            throw new Error(`Invalid list identifier, it must be less than ${LIST_ID_MAX_VALUE}`);
        }
        this.id = listId;
        this.list = list;
        this.ignoreCosmetic = !!ignoreCosmetic;
        this.ignoreJS = !!ignoreJS;
        this.ignoreUnsafe = !!ignoreUnsafe;
    }
    /**
     * Gets the rule list identifier.
     *
     * @returns The rule list identifier.
     */
    getId() {
        return this.id;
    }
    /**
     * Creates a new rules scanner that reads the list contents.
     *
     * @param scannerType Scanner type.
     *
     * @returns Scanner object.
     */
    newScanner(scannerType) {
        const reader = new StringLineReader(this.list.getContent());
        return new RuleScanner(reader, this.id, {
            scannerType,
            ignoreCosmetic: this.ignoreCosmetic,
            ignoreJS: this.ignoreJS,
        });
    }
    /**
     * Finds rule text by its index.
     * If there's no rule by that index or rule is invalid, it will return null.
     *
     * @param ruleIdx Rule index.
     *
     * @returns Rule text or null.
     */
    retrieveRuleText(ruleIdx) {
        return this.list.getRuleText(ruleIdx);
    }
    /**
     * Finds original rule text by its index.
     * If there's no rule by that index or rule is invalid, it will return null.
     *
     * @param ruleIdx Rule index.
     *
     * @returns Rule text or null.
     */
    retrieveOriginalRuleText(ruleIdx) {
        return this.list.getConvertedRuleOriginal(ruleIdx);
    }
}

/**
 * @file Known CSS / Extended CSS elements.
 */
/**
 * Supported Extended CSS pseudo-classes.
 *
 * These pseudo-classes are not supported by browsers natively, so we need Extended CSS library to support them.
 *
 * Pseudo-classes `:has()`, `:is()`, and `:not()` are not listed here,
 * because they may use native implementation.
 * They should be considered as extended CSS if:
 * - some other strictly extended CSS pseudo-classes are present in the selector, OR
 * - `#?#` separator is used explicitly.
 *
 * @see {@link https://github.com/AdguardTeam/ExtendedCss#extended-css-has}
 * @see {@link https://github.com/AdguardTeam/ExtendedCss#extended-css-is}
 * @see {@link https://github.com/AdguardTeam/ExtendedCss#extended-css-not}
 *
 * Please keep this list sorted alphabetically.
 */
const SUPPORTED_EXT_CSS_PSEUDO_CLASSES = new Set([
    '-abp-contains', // alias for 'contains'
    '-abp-has', // alias for 'has' - always extended (ABP-specific syntax)
    'contains',
    'has-text', // alias for 'contains'
    'if-not',
    'matches-attr',
    'matches-css',
    'matches-css-after', // deprecated, replaced by 'matches-css'
    'matches-css-before', // deprecated, replaced by 'matches-css'
    'matches-property',
    'nth-ancestor',
    'remove',
    'upward',
    'xpath',
]);
/**
 * Supported native CSS pseudo-classes.
 *
 * These pseudo-classes are supported by browsers natively, so we don't need Extended CSS library to support them.
 *
 * The problem with pseudo-classes is that any unknown pseudo-class makes browser ignore the whole CSS rule,
 * which contains a lot more selectors. So, if CSS selector contains a pseudo-class, we should try to validate it.
 * One more problem with pseudo-classes is that they are actively used in uBlock, hence it may mess AG styles.
 *
 * Please keep this list sorted alphabetically.
 */
const SUPPORTED_CSS_PSEUDO_CLASSES = new Set([
    'active', // https://developer.mozilla.org/en-US/docs/Web/CSS/:active
    'checked', // https://developer.mozilla.org/en-US/docs/Web/CSS/:checked
    'disabled', // https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled
    'empty', // https://developer.mozilla.org/en-US/docs/Web/CSS/:empty
    'enabled', // https://developer.mozilla.org/en-US/docs/Web/CSS/:enabled
    'first-child', // https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child
    'first-of-type', // https://developer.mozilla.org/en-US/docs/Web/CSS/:first-of-type
    'focus', // https://developer.mozilla.org/en-US/docs/Web/CSS/:focus
    'has', // https://developer.mozilla.org/en-US/docs/Web/CSS/:has
    'hover', // https://developer.mozilla.org/en-US/docs/Web/CSS/:hover
    'in-range', // https://developer.mozilla.org/en-US/docs/Web/CSS/:in-range
    'invalid', // https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid
    'is', // https://developer.mozilla.org/en-US/docs/Web/CSS/:is
    'lang', // https://developer.mozilla.org/en-US/docs/Web/CSS/:lang
    'last-child', // https://developer.mozilla.org/en-US/docs/Web/CSS/:last-child
    'last-of-type', // https://developer.mozilla.org/en-US/docs/Web/CSS/:last-of-type
    'link', // https://developer.mozilla.org/en-US/docs/Web/CSS/:link
    'not', // https://developer.mozilla.org/en-US/docs/Web/CSS/:not
    'nth-child', // https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child
    'nth-last-child', // https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-last-child
    'nth-last-of-type', // https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-last-of-type
    'nth-of-type', // https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type
    'only-child', // https://developer.mozilla.org/en-US/docs/Web/CSS/:only-child
    'only-of-type', // https://developer.mozilla.org/en-US/docs/Web/CSS/:only-of-type
    'optional', // https://developer.mozilla.org/en-US/docs/Web/CSS/:optional
    'out-of-range', // https://developer.mozilla.org/en-US/docs/Web/CSS/:out-of-range
    'read-only', // https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only
    'read-write', // https://developer.mozilla.org/en-US/docs/Web/CSS/:read-write
    'required', // https://developer.mozilla.org/en-US/docs/Web/CSS/:required
    'root', // https://developer.mozilla.org/en-US/docs/Web/CSS/:root
    'target', // https://developer.mozilla.org/en-US/docs/Web/CSS/:target
    'valid', // https://developer.mozilla.org/en-US/docs/Web/CSS/:valid
    'visited', // https://developer.mozilla.org/en-US/docs/Web/CSS/:visited
    'where', // https://developer.mozilla.org/en-US/docs/Web/CSS/:where
]);
/**
 * Every Extended CSS pseudo-class should start with this prefix.
 *
 * @see {@link https://github.com/AdguardTeam/ExtendedCss#-backward-compatible-syntax}
 */
const EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX = '-ext-';
/**
 * Supported legacy Extended CSS attribute selectors.
 *
 * Attribute selector way is deprecated and will be removed completely in the future,
 * we replaced it with Extended CSS pseudo-classes. For example, instead of
 * `[-ext-has="a[href]"]` you should use `:has(a[href])`.
 *
 * Please keep this list sorted alphabetically.
 */
const SUPPORTED_EXT_CSS_ATTRIBUTE_SELECTORS = new Set([
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}has`,
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}contains`,
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}has-text`,
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}matches-css`,
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}matches-css-before`,
    `${EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX}matches-css-after`,
]);
/**
 * Known CSS functions that aren't allowed in CSS injection rules, because they
 * able to load external resources. Please, keep this list sorted.
 */
const FORBIDDEN_CSS_FUNCTIONS = new Set([
    // https://developer.mozilla.org/en-US/docs/Web/CSS/cross-fade
    '-webkit-cross-fade',
    'cross-fade',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/image
    'image',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/image-set
    '-webkit-image-set',
    'image-set',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/url
    'url',
]);

/**
 * @file Declaration list validator.
 */
/**
 * Check if function name is forbidden. If so, throws an error.
 *
 * @param functionName Function name to check.
 *
 * @throws Error if function name is forbidden.
 */
const checkFunctionName = (functionName) => {
    // function name may contain escaped characters, like '\75' instead of 'u', so we need to decode it
    const decodedFunctionName = decodeIdent(functionName);
    if (FORBIDDEN_CSS_FUNCTIONS.has(decodedFunctionName)) {
        throw new Error(`Using '${decodedFunctionName}()' is not allowed`);
    }
};
/**
 * Does a basic validation of a declaration list.
 * Checks for unsafe resource loading and determines if the declaration list is an Extended CSS declaration list.
 *
 * @param declarationList Declaration list to validate.
 *
 * @returns Validation result, see {@link CssValidationResult}.
 *
 * @note This is a basic validation for the most necessary things, it does not guarantee that the CSS is completely
 * valid.
 */
const validateDeclarationList = (declarationList) => {
    const result = {
        isValid: true,
        isExtendedCss: false,
    };
    try {
        tokenizeExtended(declarationList, (token, start, end) => {
            switch (token) {
                // Special case: according to CSS specs, sometimes url() is handled as a separate token type
                case TokenType.Url:
                case TokenType.BadUrl:
                    throw new Error("Using 'url()' is not allowed");
                case TokenType.Function:
                    // we need -1 to exclude closing bracket, because function tokens look like 'func('
                    checkFunctionName(declarationList.slice(start, end - 1));
                    break;
                case TokenType.Ident:
                    // do a fast check before getting the substring
                    if (end - start === REMOVE_PROPERTY.length) {
                        // TODO: Improve this check, and check the whole `remove: true` sequence.
                        // Please note that the `remove : true` case also valid.
                        if (decodeIdent(declarationList.slice(start, end)) === REMOVE_PROPERTY) {
                            result.isExtendedCss = true;
                        }
                    }
                    break;
                case TokenType.Comment:
                    throw new Error('Comments are not allowed in declaration lists');
                default:
                    break;
            }
        });
    }
    catch (error) {
        result.isValid = false;
        result.errorMessage = getErrorMessage(error);
    }
    return result;
};

/**
 * @file Selector list validator.
 */
/**
 * Does a basic validation of a selector list.
 * Checks for unsupported pseudo-classes and attribute selectors,
 * and determines if the selector is an Extended CSS selector.
 *
 * Uses a single tokenization pass for optimal performance, combining both
 * validation and Extended CSS detection in one pass.
 *
 * @param selectorList Selector list to validate.
 *
 * @returns Validation result, see {@link CssValidationResult}.
 *
 * @note This is a basic validation for the most necessary things, it does not guarantee that the CSS is completely
 * valid.
 */
const validateSelectorList = (selectorList) => {
    const result = {
        isValid: true,
        isExtendedCss: false,
    };
    try {
        // Track Extended CSS detection during validation
        let hasStrictlyExtendedCss = false;
        let hasNativeCssPseudoClass = false;
        let prevIsDoubleColon = false;
        let prevToken;
        let prevNonWhitespaceToken;
        // Track :has() nesting depth - native CSS doesn't support nested :has()
        let hasDepth = 0;
        let isCurrentFunctionHas = false;
        // Track bracket balancing to detect unclosed brackets
        // Note: Curly brackets are explicitly rejected earlier, so we don't track them here
        const bracketStack = [];
        const bracketPairs = new Map([
            [TokenType.Function, TokenType.CloseParenthesis],
            [TokenType.OpenParenthesis, TokenType.CloseParenthesis],
            [TokenType.OpenSquareBracket, TokenType.CloseSquareBracket],
        ]);
        const closingBrackets = new Set(bracketPairs.values());
        tokenizeExtended(selectorList, (token, start, end) => {
            if ((token === TokenType.Function || token === TokenType.Ident)
                && prevToken === TokenType.Colon
                && !prevIsDoubleColon) {
                // whitespace is NOT allowed between the ':' and the pseudo-class name, like ': active('
                const name = selectorList.slice(start, 
                // function tokens look like 'func(', so we need to remove the last character
                token === TokenType.Function ? end - 1 : end);
                // function name may contain escaped characters, like '\75' instead of 'u', so we need to decode it
                const decodedName = decodeIdent(name);
                if (SUPPORTED_EXT_CSS_PSEUDO_CLASSES.has(decodedName)) {
                    // This is always extended CSS (includes -abp-has, contains, etc.)
                    hasStrictlyExtendedCss = true;
                    result.isExtendedCss = true;
                }
                else if (NATIVE_CSS_PSEUDO_CLASSES.has(decodedName)) {
                    // Track pseudo-classes that can be both native and extended (:has, :is, :not)
                    hasNativeCssPseudoClass = true;
                    // Track :has() nesting - native CSS doesn't support nested :has()
                    // https://developer.mozilla.org/en-US/docs/Web/CSS/:has#syntax
                    if (token === TokenType.Function && decodedName === 'has') {
                        hasDepth += 1;
                        isCurrentFunctionHas = true;
                        // If we're already inside a :has() (depth > 1), this is nested :has()
                        // which is not supported in native CSS but is supported in ExtendedCSS
                        if (hasDepth > 1) {
                            hasStrictlyExtendedCss = true;
                            result.isExtendedCss = true;
                        }
                    }
                }
                else if (!SUPPORTED_CSS_PSEUDO_CLASSES.has(decodedName)) {
                    throw new Error(`Unsupported pseudo-class: ':${decodedName}'`);
                }
                // Reset the flag after processing
                if (token !== TokenType.Function) {
                    isCurrentFunctionHas = false;
                }
            }
            else if (token === TokenType.Ident && prevNonWhitespaceToken === TokenType.OpenSquareBracket) {
                // whitespace is allowed between the '[' and the attribute name, like '[ attr]'
                const attributeName = selectorList.slice(start, end);
                if (attributeName.startsWith(EXT_CSS_ATTRIBUTE_SELECTOR_PREFIX)) {
                    hasStrictlyExtendedCss = true;
                    result.isExtendedCss = true;
                    if (!SUPPORTED_EXT_CSS_ATTRIBUTE_SELECTORS.has(attributeName)) {
                        throw new Error(`Unsupported Extended CSS attribute selector: '${attributeName}'`);
                    }
                }
            }
            else if (token === TokenType.OpenCurlyBracket || token === TokenType.CloseCurlyBracket) {
                throw new Error('Curly brackets are not allowed in selector lists');
            }
            else if (token === TokenType.Comment) {
                throw new Error('Comments are not allowed in selector lists');
            }
            // memorize tokens, we need them later
            if (token === TokenType.Colon) {
                prevIsDoubleColon = prevToken === TokenType.Colon;
            }
            prevToken = token;
            if (token !== TokenType.Whitespace) {
                prevNonWhitespaceToken = token;
            }
            // Track bracket balancing
            if (bracketPairs.has(token)) {
                bracketStack.push({ type: token, start, isHasFunction: isCurrentFunctionHas });
                // Reset the flag after pushing to stack
                isCurrentFunctionHas = false;
            }
            else if (closingBrackets.has(token)) {
                const lastOpening = bracketStack[bracketStack.length - 1];
                const expectedClosing = lastOpening ? bracketPairs.get(lastOpening.type) : undefined;
                if (expectedClosing === token) {
                    const popped = bracketStack.pop();
                    // Decrement :has() depth when exiting a :has() function
                    if (popped?.isHasFunction) {
                        hasDepth -= 1;
                    }
                }
                else {
                    // Mismatched bracket - determine token and expected names
                    let tokenName;
                    if (token === TokenType.CloseParenthesis) {
                        tokenName = ')';
                    }
                    else if (token === TokenType.CloseSquareBracket) {
                        tokenName = ']';
                    }
                    else {
                        tokenName = 'unknown';
                    }
                    let expectedName;
                    if (expectedClosing === TokenType.CloseParenthesis) {
                        expectedName = '<)-token>';
                    }
                    else if (expectedClosing === TokenType.CloseSquareBracket) {
                        expectedName = '<]-token>';
                    }
                    else {
                        expectedName = 'unknown';
                    }
                    throw new SyntaxError(`Expected '${expectedName}', but got '${tokenName}'`);
                }
            }
        });
        // Check for unclosed brackets
        if (bracketStack.length > 0) {
            const unclosedBracket = bracketStack[bracketStack.length - 1];
            let expectedName;
            if (unclosedBracket.type === TokenType.Function
                || unclosedBracket.type === TokenType.OpenParenthesis) {
                expectedName = '<)-token>';
            }
            else {
                // Must be OpenSquareBracket (curly brackets are rejected earlier)
                expectedName = '<]-token>';
            }
            throw new SyntaxError(`Expected '${expectedName}', but got 'end of input'`);
        }
        // If selector contains native pseudo-classes
        // i.e :has, :is, :not,
        // AND it also contains strictly extended CSS,
        // mark the whole thing as extended CSS.
        // Otherwise, :has/:is/:not alone are treated as native CSS.
        if (hasNativeCssPseudoClass && hasStrictlyExtendedCss) {
            result.isExtendedCss = true;
        }
    }
    catch (error) {
        result.isValid = false;
        result.errorMessage = getErrorMessage(error);
    }
    return result;
};

/**
 * Represents scriptlet properties parsed from the rule content.
 */
class ScriptletParams {
    /**
     * Scriptlet properties.
     */
    props = null;
    /**
     * ScriptletParams constructor.
     *
     * @param name Scriptlet name.
     * @param args Scriptlet arguments.
     */
    constructor(name, args) {
        if (typeof name !== 'undefined') {
            this.props = {
                name,
                args: args || [],
            };
        }
    }
    /**
     * Gets scriptlet name.
     *
     * @returns Scriptlet name.
     */
    get name() {
        return this.props?.name;
    }
    /**
     * Gets scriptlet arguments.
     *
     * @returns Scriptlet arguments.
     */
    get args() {
        return this.props?.args ?? [];
    }
    /**
     * Gets string representation of scriptlet parameters.
     *
     * @returns String representation of scriptlet parameters.
     */
    toString() {
        const result = [];
        result.push(ADG_SCRIPTLET_MASK);
        result.push('(');
        if (this.name) {
            result.push(QuoteUtils.setStringQuoteType(this.name, QuoteType.Single));
        }
        if (this.args.length) {
            result.push(', ');
            result.push(this.args.map((arg) => QuoteUtils.setStringQuoteType(arg, QuoteType.Single)).join(', '));
        }
        result.push(')');
        return result.join(EMPTY_STRING);
    }
}

/* eslint-disable max-classes-per-file */
/**
 * Represents special selector names used in HTML filtering rules.
 *
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#html-filtering-rules}
 *
 * @note Special attribute selectors (e.g. `[tag-content="content"]`) are not included here
 * as they are deprecated and will be removed in future versions, in AGTree converter they
 * are converted to `:contains(content)` special pseudo-class selector.
 */
var HtmlSpecialSelectorName;
(function (HtmlSpecialSelectorName) {
    /**
     * `:contains(content)` special selector.
     *
     * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#html-filtering-rules--contains}
     */
    HtmlSpecialSelectorName["Contains"] = "contains";
})(HtmlSpecialSelectorName || (HtmlSpecialSelectorName = {}));
/**
 * @typedef {import('./cosmetic-result').CosmeticResult} CosmeticResult
 */
/**
 * Implements a basic cosmetic rule.
 *
 * Cosmetic rules syntax are almost similar and looks like this.
 * ```
 * rule = [domains] "marker" content
 * domains = [domain0, domain1[, ...[, domainN]]]
 * ```
 *
 * The rule type is defined by the `type` property, you can find the list of them
 * in the {@link CosmeticRuleType} enumeration.
 *
 * What matters, though, is what's in the `content` part of it.
 *
 * @example
 * `example.org##.banner` -- element hiding rule
 * `example.org#$#.banner { display: block; }` -- CSS rule
 * `example.org#%#window.x=1;` -- JS rule
 * `example.org#%#//scriptlet('scriptlet-name')` -- Scriptlet rule
 * `example.org$$div[id="test"]` -- HTML filtering rule
 */
class CosmeticRule {
    /**
     * Parser options for cosmetic rules.
     */
    static PARSER_OPTIONS = {
        ...defaultParserOptions,
        parseAbpSpecificRules: false,
        parseUboSpecificRules: false,
        isLocIncluded: false,
        parseHtmlFilteringRuleBodies: true,
    };
    /**
     * Rule index.
     */
    ruleIndex;
    /**
     * Filter list ID.
     */
    filterListId;
    /**
     * Rule text.
     */
    ruleText;
    /**
     * Rule content.
     */
    content;
    /**
     * Rule type.
     */
    type;
    /**
     * Allowlist flag.
     */
    allowlist = false;
    /**
     * Extended CSS flag.
     */
    extendedCss = false;
    /**
     * $domain modifier pattern. It is only set if $domain modifier is specified for this rule.
     */
    domainModifier = null;
    /**
     * $path modifier pattern. It is only set if $path modifier is specified for this rule.
     */
    pathModifier;
    /**
     * $url modifier pattern. It is only set if $url modifier is specified for this rule,
     * but $path and $domain modifiers are not.
     *
     * TODO: add this to test cases.
     */
    urlModifier;
    /**
     * Js script to execute.
     */
    script = undefined;
    /**
     * Object with script code ready to execute and debug, domain values.
     *
     * @private
     */
    scriptData = null;
    /**
     * Object with scriptlet function and params.
     *
     * @private
     */
    scriptletData = null;
    /**
     * Scriptlet parameters.
     */
    scriptletParams;
    /**
     * If the rule contains scriptlet content.
     */
    isScriptlet = false;
    /**
     * HTML filtering rule selector list.
     */
    htmlSelectorList = null;
    /**
     * Gets rule index.
     *
     * @returns Rule index.
     */
    getIndex() {
        return this.ruleIndex;
    }
    /**
     * Gets filter list id.
     *
     * @returns Filter list id.
     */
    getFilterListId() {
        return this.filterListId;
    }
    /**
     * Returns the rule text.
     *
     * @returns Rule text.
     */
    getText() {
        return this.ruleText;
    }
    /**
     * Returns the rule content.
     *
     * @returns The content of the rule.
     */
    getContent() {
        return this.content;
    }
    /**
     * Cosmetic rule type (always present).
     *
     * @returns The type of the cosmetic rule.
     */
    getType() {
        return this.type;
    }
    /**
     * Allowlist means that this rule is meant to disable other rules,
     * i.e. an exception rule.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#elemhide-exceptions}
     *
     * @returns True if the rule is an allowlist rule, false otherwise.
     */
    isAllowlist() {
        return this.allowlist;
    }
    /**
     * Returns script ready to execute or null
     * Rebuilds scriptlet script if debug or domain params change.
     *
     * @param options Script options.
     *
     * @returns Script code or null.
     */
    getScript(options = {}) {
        const { debug = false, frameUrl } = options;
        const { scriptData } = this;
        if (scriptData && !this.isScriptlet) {
            return scriptData.code;
        }
        if (scriptData && scriptData.debug === debug) {
            if (frameUrl) {
                if (frameUrl === scriptData.frameUrl) {
                    return scriptData.code;
                }
            }
            else {
                return scriptData.code;
            }
        }
        this.initScript(options);
        return this.scriptData?.code ?? null;
    }
    /**
     * Gets list of permitted domains.
     *
     * @returns List of permitted domains or null if no domain modifier is set.
     */
    getPermittedDomains() {
        if (this.domainModifier) {
            return this.domainModifier.getPermittedDomains();
        }
        return null;
    }
    /**
     * Gets list of restricted domains.
     *
     * @returns List of restricted domains or null if no domain modifier is set.
     */
    getRestrictedDomains() {
        if (this.domainModifier) {
            return this.domainModifier.getRestrictedDomains();
        }
        return null;
    }
    /**
     * Returns HTML filtering rule selector list.
     *
     * @returns HTML filtering rule selector list or `null` if the rule is not an HTML filtering rule.
     */
    getHtmlSelectorList() {
        return this.htmlSelectorList;
    }
    /**
     * Returns true if the rule is considered "generic"
     * "generic" means that the rule is not restricted to a limited set of domains
     * Please note that it might be forbidden on some domains, though.
     *
     * @returns True if the rule is generic, false otherwise.
     */
    isGeneric() {
        return !this.domainModifier?.hasPermittedDomains();
    }
    /**
     * Checks if the rule is ExtendedCss.
     *
     * @returns True if the rule is ExtendedCss, false otherwise.
     */
    isExtendedCss() {
        return this.extendedCss;
    }
    /**
     * Processes cosmetic rule modifiers, e.g. `$path`.
     *
     * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#modifiers-for-non-basic-type-of-rules}
     *
     * @param ruleNode Cosmetic rule node to process.
     *
     * @returns Processed modifiers ({@link ProcessedModifiers}) or `null` if there are no modifiers.
     */
    static processModifiers(ruleNode) {
        // Do nothing if there are no modifiers in the rule node
        if (!ruleNode.modifiers) {
            return null;
        }
        const result = {};
        // We don't allow duplicate modifiers, so we collect them in a set
        const usedModifiers = new Set();
        // Destructure the modifiers array just for convenience
        const { children: modifierNodes } = ruleNode.modifiers;
        // AGTree parser tolerates this case: [$]example.com##.foo
        // However, we should throw an error here if the modifier list is empty
        // (if the modifier list isn't specified at all, then ruleNode.modifiers
        // will be undefined, so we won't get here)
        if (modifierNodes.length < 1) {
            throw new SyntaxError('Modifiers list cannot be be empty');
        }
        for (const modifierNode of modifierNodes) {
            const modifierName = modifierNode.name.value;
            // Check if the modifier is already used
            if (usedModifiers.has(modifierName)) {
                throw new Error(`Duplicated modifier: '${modifierName}'`);
            }
            // Mark the modifier as used by adding it to the set
            usedModifiers.add(modifierName);
            const modifierValue = modifierNode.value?.value || EMPTY_STRING;
            // Every modifier should have a value at the moment, so for simplicity we throw an error here if the
            // modifier value is not present.
            // TODO: Improve this when we decide to add modifiers without values
            if (modifierValue.length < 1 && modifierName !== "path" /* CosmeticRuleModifier.Path */) {
                throw new SyntaxError(`'$${modifierName}' modifier should have a value`);
            }
            // Process the modifier based on its name
            switch (modifierName) {
                case "domain" /* CosmeticRuleModifier.Domain */:
                    if (ruleNode.domains.children.length > 0) {
                        throw new SyntaxError(`'$${modifierName}' modifier is not allowed in a domain-specific rule`);
                    }
                    result.domainModifier = new DomainModifier(modifierValue, PIPE_MODIFIER_SEPARATOR);
                    break;
                case "path" /* CosmeticRuleModifier.Path */:
                    result.pathModifier = new Pattern(SimpleRegex.isRegexPattern(modifierValue)
                        // eslint-disable-next-line max-len
                        ? SimpleRegex.unescapeRegexSpecials(modifierValue, SimpleRegex.reModifierPatternEscapedSpecialCharacters)
                        : modifierValue);
                    break;
                case "url" /* CosmeticRuleModifier.Url */:
                    if (ruleNode.domains.children.length > 0) {
                        throw new SyntaxError(`'$${modifierName}' modifier is not allowed in a domain-specific rule`);
                    }
                    result.urlModifier = new Pattern(SimpleRegex.isRegexPattern(modifierValue)
                        // eslint-disable-next-line max-len
                        ? SimpleRegex.unescapeRegexSpecials(modifierValue, SimpleRegex.reModifierPatternEscapedSpecialCharacters)
                        : modifierValue);
                    break;
                // Don't allow unknown modifiers
                default:
                    throw new SyntaxError(`'$${modifierName}' modifier is not supported`);
            }
        }
        // $url modifier can't be used with other modifiers
        // TODO: Extend / change this check if we decide to add more such modifiers
        if (result.urlModifier && usedModifiers.size > 1) {
            throw new SyntaxError(`'$${"url" /* CosmeticRuleModifier.Url */}' modifier cannot be used with other modifiers`);
        }
        return result;
    }
    /**
     * Processes HTML filtering rule selector list.
     *
     * @param ruleNode Cosmetic rule node to process.
     *
     * @returns Processed {@link HtmlSelectorList} or `null` if the rule is not an HTML filtering rule.
     *
     * @throws Error if the rule body is not parsed into AST nodes.
     * @throws Error if special selector is missing a value.
     * @throws Error if an unsupported simple selector type is encountered.
     */
    static processHtmlSelectorList(ruleNode) {
        // Process only HTML filtering rules
        if (ruleNode.type !== CosmeticRuleType.HtmlFilteringRule) {
            return null;
        }
        // Process only parsed HTML filtering rule bodies
        // This can happen if the passed node is not parsed with `parseHtmlFilteringRuleBodies` option enabled
        // which indicates that the rule body is not used for filtering and thus selector list isn't used
        if (ruleNode.body.type !== 'HtmlFilteringRuleBody') {
            return null;
        }
        const result = {
            selectors: [],
        };
        // Destructure the selectors array just for convenience
        // Note: AGTree do not tolerate empty selector lists,
        // so we can assume that there is at least one selector in the list
        const { children: selectors } = ruleNode.body.selectorList;
        for (const selectorNode of selectors) {
            // Destructure the simple selectors array just for convenience
            // Note: AGTree do not tolerate empty simple selector lists,
            // so we can assume that there is at least one simple selector in the list
            const { children: simpleSelectors } = selectorNode;
            const complexSelectors = [];
            let previousCombinator = null;
            let currentNativeSelector = '';
            let currentSpecialSelectors = [];
            for (let i = 0; i < simpleSelectors.length; i += 1) {
                const simpleSelectorNode = simpleSelectors[i];
                const { type } = simpleSelectorNode;
                switch (type) {
                    // tag selectors can be added as-is
                    case 'TypeSelector':
                        currentNativeSelector += simpleSelectorNode.value;
                        break;
                    // id selectors should be prefixed
                    case 'IdSelector':
                        currentNativeSelector += `#${simpleSelectorNode.value}`;
                        break;
                    // class selectors should be prefixed
                    case 'ClassSelector':
                        currentNativeSelector += `.${simpleSelectorNode.value}`;
                        break;
                    // attribute selectors should be wrapped in square brackets and quoted
                    case 'AttributeSelector':
                        currentNativeSelector += `[${simpleSelectorNode.name.value}`;
                        if ('value' in simpleSelectorNode) {
                            currentNativeSelector += simpleSelectorNode.operator.value;
                            // It's safe to set double quotes here, as AGTree removes any existing quotes
                            // from the attribute value and unescapes it, so we just need to quote it properly
                            // again and escape any double quotes in the value
                            currentNativeSelector += QuoteUtils.setStringQuoteType(simpleSelectorNode.value.value, QuoteType.Double);
                            if (simpleSelectorNode.flag) {
                                currentNativeSelector += ` ${simpleSelectorNode.flag.value}`;
                            }
                        }
                        currentNativeSelector += ']';
                        break;
                    // if it's a pseudo-class selector, we need to check if it's a special one
                    // if yes, we add it to the special selectors list, otherwise we add it to the native selector
                    case 'PseudoClassSelector':
                        if (simpleSelectorNode.name.value === HtmlSpecialSelectorName.Contains) {
                            if (!simpleSelectorNode.argument) {
                                throw new Error(`'${HtmlSpecialSelectorName.Contains}' pseudo-class requires an argument`);
                            }
                            currentSpecialSelectors.push({
                                name: HtmlSpecialSelectorName.Contains,
                                // The argument is used as-is, mirroring CoreLibs:
                                // it is the raw text between the parentheses of
                                // the pseudo-class, so wrapping quotes (of any
                                // kind) are literal characters of the matched
                                // text — e.g. `:contains('advert')` matches text
                                // containing the apostrophes, and
                                // `:contains("(function(p,a,c)")` matches text
                                // containing the double quotes. An unbalanced
                                // argument, e.g. `:contains((function(g,b,a,c,e,d)`,
                                // is possible as well: AGTree parses such rules
                                // leniently. A regexp-looking argument
                                // (`/.../flags`) is compiled to a RegExp by
                                // `SimpleRegex.fromLiteral`, anything else is
                                // matched as a literal substring.
                                value: SimpleRegex.fromLiteral(simpleSelectorNode.argument.value),
                            });
                        }
                        else {
                            currentNativeSelector += `:${simpleSelectorNode.name.value}`;
                            if (simpleSelectorNode.argument) {
                                currentNativeSelector += `(${simpleSelectorNode.argument.value})`;
                            }
                        }
                        break;
                    // This case is handled after the switch
                    case 'SelectorCombinator':
                        break;
                    default:
                        throw new Error(`Unsupported simple selector type: '${type}'`);
                }
                // If it's a combinator or the last simple selector, we should finalize the current compound selector
                if (type === 'SelectorCombinator' || i === simpleSelectors.length - 1) {
                    const selector = {
                        nativeSelector: currentNativeSelector,
                        specialSelectors: currentSpecialSelectors,
                    };
                    if (previousCombinator) {
                        selector.combinator = previousCombinator;
                    }
                    complexSelectors.push(selector);
                    // Reset current compound selector state for the next one if it was a combinator
                    if (type === 'SelectorCombinator') {
                        previousCombinator = simpleSelectorNode.value;
                        currentNativeSelector = '';
                        currentSpecialSelectors = [];
                    }
                }
            }
            result.selectors.push(complexSelectors);
        }
        return result;
    }
    /**
     * Validates cosmetic rule node.
     *
     * @param ruleNode Cosmetic rule node to validate.
     *
     * @returns Validation result {@link ValidationResult}.
     */
    static validate(ruleNode) {
        const result = {
            isValid: true,
            isExtendedCss: false,
        };
        let scriptletName;
        let selectorListValidationResult;
        const { type: ruleType } = ruleNode;
        try {
            // Common validation: every cosmetic rule has a domain list
            if (ruleNode.domains?.children.length) {
                // Iterate over the domain list and check every domain
                for (const { value: domain } of ruleNode.domains.children) {
                    // Skip validation for regex domain patterns
                    if (!RegExpUtils.isRegexPattern(domain)
                        && !DomainUtils.isValidDomainOrHostname(domain)) {
                        throw new Error(`'${domain}' is not a valid domain name or regexp pattern`);
                    }
                }
            }
            // Type-specific validation
            switch (ruleType) {
                case CosmeticRuleType.ElementHidingRule:
                    selectorListValidationResult = validateSelectorList(ruleNode.body.selectorList.value);
                    if (!selectorListValidationResult.isValid) {
                        throw new Error(selectorListValidationResult.errorMessage);
                    }
                    // Detect ExtendedCss and unsupported pseudo-classes
                    result.isExtendedCss = selectorListValidationResult.isExtendedCss;
                    break;
                case CosmeticRuleType.CssInjectionRule:
                    selectorListValidationResult = validateSelectorList(ruleNode.body.selectorList.value);
                    if (!selectorListValidationResult.isValid) {
                        throw new Error(selectorListValidationResult.errorMessage);
                    }
                    // Detect ExtendedCss and unsupported pseudo-classes
                    result.isExtendedCss = selectorListValidationResult.isExtendedCss;
                    // AGTree won't allow the following rule:
                    // `#$#selector { remove: true; padding: 0; }`
                    // because it mixes removal and non-removal declarations.
                    if (ruleNode.body.declarationList) {
                        // eslint-disable-next-line max-len
                        const declarationListValidationResult = validateDeclarationList(ruleNode.body.declarationList.value);
                        if (!declarationListValidationResult.isValid) {
                            throw new Error(declarationListValidationResult.errorMessage);
                        }
                        // If the selector list is not ExtendedCss, then we should set this flag based on the
                        // declaration list validation result
                        if (!result.isExtendedCss) {
                            result.isExtendedCss = declarationListValidationResult.isExtendedCss;
                        }
                    }
                    break;
                case CosmeticRuleType.ScriptletInjectionRule:
                    // Scriptlet name is the first child of the parameter list
                    // eslint-disable-next-line max-len
                    scriptletName = QuoteUtils.removeQuotes(ruleNode.body.children[0]?.children[0]?.value ?? EMPTY_STRING);
                    // Special case: scriptlet name is empty, e.g. '#%#//scriptlet()'
                    if (scriptletName.length === 0) {
                        break;
                    }
                    // Check if the scriptlet name is valid
                    if (!isValidScriptletName(scriptletName)) {
                        throw new Error(`'${scriptletName}' is not a known scriptlet name`);
                    }
                    break;
                case CosmeticRuleType.HtmlFilteringRule:
                    // AGTree won't allow invalid selector lists (both in parser and converter)
                    // thus we don't need to validate them here
                    break;
                case CosmeticRuleType.JsInjectionRule:
                    // TODO: Validate JS injection rules
                    break;
                default:
                    break;
            }
        }
        catch (error) {
            result.isValid = false;
            result.errorMessage = getErrorMessage(error);
        }
        return result;
    }
    /**
     * Checks if the domain list contains any domains, but returns `false` if only
     * the wildcard domain is specified.
     *
     * @param domainListNode Domain list node to check.
     *
     * @returns `true` if the domain list contains any domains, `false` otherwise.
     */
    static isAnyDomainSpecified(domainListNode) {
        if (domainListNode.children.length > 0) {
            // Skip wildcard domain list (*)
            return !(domainListNode.children.length === 1 && domainListNode.children[0].value === WILDCARD);
        }
        return false;
    }
    /**
     * Creates an instance of the {@link CosmeticRule}.
     * It parses the rule and extracts the permitted/restricted domains,
     * and also the cosmetic rule's content.
     *
     * Depending on the rule type, the content might be transformed in
     * one of the helper classes, or kept as string when it's appropriate.
     *
     * @param ruleText Rule text.
     * @param filterListId ID of the filter list this rule belongs to.
     * @param ruleIndex Line start index in the source filter list; it will be used to find the original rule text
     * in the filtering log when a rule is applied. Default value is {@link RULE_INDEX_NONE} which means that
     * the rule does not have source index.
     * @param node Optional pre-parsed cosmetic rule node to avoid re-parsing.
     *
     * @throws Error if it fails to parse the rule or if the rule is not a cosmetic rule.
     */
    constructor(ruleText, filterListId = FILTER_LIST_ID_NONE, ruleIndex = RULE_INDEX_NONE, node) {
        this.ruleIndex = ruleIndex;
        this.filterListId = filterListId;
        // Store rule text in the instance if the rule is not indexed in FiltersStorage.
        // When filterListId or ruleIndex is NONE, the rule text cannot be retrieved
        // from the engine and must be available via getText().
        if (filterListId === FILTER_LIST_ID_NONE || ruleIndex === RULE_INDEX_NONE) {
            this.ruleText = ruleText;
        }
        // Use provided node or parse the rule text
        let parsedNode;
        if (node) {
            parsedNode = node;
        }
        else {
            const parsed = CosmeticRuleParser.parse(ruleText, CosmeticRule.PARSER_OPTIONS);
            // CosmeticRuleParser returns null if the rule is not a valid cosmetic rule
            if (!parsed) {
                throw new SyntaxError(`Failed to parse as cosmetic rule: ${ruleText}`);
            }
            parsedNode = parsed;
        }
        this.allowlist = CosmeticRuleSeparatorUtils.isException(parsedNode.separator.value);
        this.type = parsedNode.type;
        this.isScriptlet = parsedNode.type === CosmeticRuleType.ScriptletInjectionRule;
        this.content = CosmeticRuleBodyGenerator.generate(parsedNode);
        // Store the scriptlet parameters. They will be used later, when we initialize the scriptlet,
        // but at this point we need to store them in order to avoid double parsing
        if (parsedNode.type === CosmeticRuleType.ScriptletInjectionRule) {
            // Transform complex node into a simple array of strings
            const params = parsedNode.body.children[0]?.children.map((param) => (param === null ? EMPTY_STRING : QuoteUtils.removeQuotesAndUnescape(param.value))) ?? [];
            this.scriptletParams = new ScriptletParams(params[0] ?? '', params.slice(1));
        }
        else {
            this.scriptletParams = new ScriptletParams();
        }
        const validationResult = CosmeticRule.validate(parsedNode);
        // We should throw an error if the validation failed for any reason
        if (!validationResult.isValid) {
            throw new SyntaxError(validationResult.errorMessage);
        }
        // Check if the rule is ExtendedCss
        const isExtendedCssSeparator = CosmeticRuleSeparatorUtils.isExtendedCssMarker(parsedNode.separator.value);
        this.extendedCss = isExtendedCssSeparator || validationResult.isExtendedCss;
        // Process cosmetic rule modifiers
        const processedModifiers = CosmeticRule.processModifiers(parsedNode);
        if (processedModifiers) {
            if (processedModifiers.domainModifier) {
                this.domainModifier = processedModifiers.domainModifier;
            }
            if (processedModifiers.pathModifier) {
                this.pathModifier = processedModifiers.pathModifier;
            }
            if (processedModifiers.urlModifier) {
                this.urlModifier = processedModifiers.urlModifier;
            }
        }
        // Process domain list, if at least one domain is specified
        const { domains: domainListNode } = parsedNode;
        if (CosmeticRule.isAnyDomainSpecified(domainListNode)) {
            this.domainModifier = new DomainModifier(domainListNode, COMMA_DOMAIN_LIST_SEPARATOR);
        }
        // Process HTML filtering rule selector list
        this.htmlSelectorList = CosmeticRule.processHtmlSelectorList(parsedNode);
    }
    /**
     * Match returns true if this rule can be used on the specified request.
     *
     * @param request Request to check.
     *
     * @returns True if the rule matches the request, false otherwise.
     */
    match(request) {
        if (!this.domainModifier
            && !this.pathModifier
            && !this.urlModifier) {
            return true;
        }
        if (this.urlModifier) {
            return this.urlModifier.matchPattern(request, false);
        }
        if (this.domainModifier) {
            if (!this.domainModifier.matchDomain(request.hostname)) {
                return false;
            }
        }
        if (this.pathModifier) {
            const path = getRelativeUrl(request.urlLowercase);
            if (path) {
                return this.pathModifier.matchPathPattern(path);
            }
            return false;
        }
        return true;
    }
    /**
     * Returns the scriptlet's data consisting of the scriptlet function and its arguments.
     * This method is supposed to be used in the manifest V3 extension.
     *
     * @returns The scriptlet data or null if not available.
     */
    getScriptletData() {
        if (this.scriptletData) {
            return this.scriptletData;
        }
        this.initScript();
        return this.scriptletData;
    }
    /**
     * Updates this.scriptData and this.scriptletData when it is necessary in a lazy way.
     *
     * @param options Initialization options for the script.
     */
    initScript(options = {}) {
        const { debug = false, frameUrl } = options;
        const ruleContent = this.getContent();
        if (!this.isScriptlet) {
            this.scriptData = {
                code: ruleContent,
            };
            return;
        }
        // A scriptlet without a name can only be an allowlist scriptlet
        // https://github.com/AdguardTeam/Scriptlets/issues/377
        // or it is considered invalid if the scriptlet was invalid.
        // This does not require finding scriptData and scriptletData.
        if (!this.scriptletParams?.name) {
            return;
        }
        const params = {
            args: this.scriptletParams.args,
            engine: config.engine || EMPTY_STRING,
            name: this.scriptletParams.name,
            verbose: debug,
            domainName: frameUrl,
            version: config.version || EMPTY_STRING,
        };
        this.scriptData = {
            code: scriptlets.invoke(params) ?? null,
            debug,
            frameUrl,
        };
        this.scriptletData = {
            func: scriptlets.getScriptletFunction(params.name),
            params,
        };
    }
}

/**
 * Helper function to create an allowlist rule node for a given domain.
 *
 * @param domain Domain to create an allowlist rule for.
 *
 * @returns Allowlist rule node or null.
 */
const createAllowlistRuleNode = (domain) => {
    const domainToUse = domain.startsWith('www.') ? domain.substring(4) : domain;
    if (!domainToUse) {
        return null;
    }
    let pattern;
    // Special case: Wildcard TLD + N domain
    if (domainToUse.startsWith('*.')) {
        pattern = `${SimpleRegex.MASK_START_URL}${domainToUse.slice(2)}`;
    }
    else {
        // In other cases we use regexp to match domain and it`s 'www' subdomain strictly.
        let regexp = '';
        // transform allowlist domain special characters
        for (let i = 0; i < domainToUse.length; i += 1) {
            const char = domainToUse[i];
            // transform wildcard to regexp equivalent
            if (char === '*') {
                regexp += '.*';
                // escape domain separator
            }
            else if (char === '.') {
                regexp += String.raw `\.`;
            }
            else {
                regexp += char;
            }
        }
        pattern = String.raw `///(www\.)?${regexp}/`;
    }
    const node = {
        category: RuleCategory.Network,
        type: NetworkRuleType.NetworkRule,
        syntax: AdblockSyntax.Common,
        exception: true,
        pattern: {
            type: 'Value',
            value: pattern,
        },
        modifiers: {
            type: 'ModifierList',
            children: [
                {
                    type: 'Modifier',
                    name: {
                        type: 'Value',
                        value: 'document',
                    },
                },
                {
                    type: 'Modifier',
                    name: {
                        type: 'Value',
                        value: 'important',
                    },
                },
            ],
        },
    };
    return node;
};

/**
 * Rule builder class.
 */
class RuleFactory {
    /**
     * Creates rule of suitable class from text string.
     * It returns null if the line is empty or if it is a comment.
     *
     * This method avoids double parsing by trying to create each rule type directly.
     *
     * @param ruleText Rule text to parse.
     * @param filterListId List id.
     * @param ruleIndex Line start index in the source filter list; it will be used to find the original rule text
     * in the filtering log when a rule is applied. Default value is {@link RULE_INDEX_NONE} which means that
     * the rule does not have source index.
     * @param parseHostRules Whether to parse host rules. Default is true.
     * @param parseHtmlFilteringRuleBodies Whether to parse HTML filtering rule bodies. Default is false.
     *
     * @returns IRule object or null.
     */
    static createRule(ruleText, filterListId = FILTER_LIST_ID_NONE, ruleIndex = RULE_INDEX_NONE, parseHostRules = true, parseHtmlFilteringRuleBodies = false) {
        try {
            const node = RuleParser$1.parse(ruleText, {
                ...defaultParserOptions,
                parseHostRules,
                parseHtmlFilteringRuleBodies,
            });
            switch (node.category) {
                case RuleCategory.Invalid:
                case RuleCategory.Empty:
                case RuleCategory.Comment:
                    return null;
                case RuleCategory.Cosmetic:
                    return new CosmeticRule(ruleText, filterListId, ruleIndex, node);
                case RuleCategory.Network:
                    if (node.type === NetworkRuleType.HostRule) {
                        if (!parseHostRules) {
                            return null;
                        }
                        return new HostRule(ruleText, filterListId, ruleIndex, node);
                    }
                    return new NetworkRule(ruleText, filterListId, ruleIndex, node);
                default:
                    // should not happen in normal operation
                    return null;
            }
        }
        catch (e) {
            logger.debug(`[tsurl.RuleFactory.createRule]: failed to create rule from text: ${ruleText}, got ${getErrorMessage$1(e)}`);
        }
        return null;
    }
    /**
     * Creates allowlist rule for domain.
     *
     * @param domain Domain name.
     * @param filterListId List id.
     * @param ruleIndex Line start index in the source filter list.
     *
     * @returns Allowlist rule or null.
     */
    static createAllowlistRule(domain, filterListId, ruleIndex = RULE_INDEX_NONE) {
        const node = createAllowlistRuleNode(domain);
        if (!node) {
            return null;
        }
        // Generate rule text from the node
        const ruleText = RuleGenerator$1.generate(node);
        return new NetworkRule(ruleText, filterListId, ruleIndex);
    }
}

/**
 * RuleStorageScanner scans multiple RuleScanner instances.
 * The storage index is built from the rule position in the list
 * + cumulative offset value of filter lists.
 */
class RuleStorageScanner {
    /**
     * Current scanner.
     */
    currentScanner = null;
    /**
     * Index of the current scanner.
     */
    currentScannerIdx = -1;
    /**
     * Rule position in the concatenated filter lists data.
     */
    storageOffset = 0;
    /**
     * Constructor.
     *
     * @param scanners List of scanners.
     */
    constructor(scanners) {
        this.scanners = scanners;
        this.listOffsetEntriesCursor = 0;
        this.listOffsetKeys = new Int32Array(scanners.length);
        this.listOffsetValues = new Uint32Array(scanners.length);
    }
    /**
     * Scan advances the RuleStorageScanner to the next rule, which will then be available
     * through the Rule method. It returns false when the scan stops, either by
     * reaching the end of the input or an error.
     *
     * @returns True if there is some result.
     */
    scan() {
        const scannersLength = this.scanners.length;
        if (scannersLength === 0) {
            return false;
        }
        if (!this.currentScanner) {
            this.currentScannerIdx = 0;
            this.currentScanner = this.scanners[this.currentScannerIdx];
            this.setListOffset(this.currentScanner.getListId(), this.storageOffset);
        }
        while (this.currentScannerIdx < scannersLength) {
            if (this.currentScanner.scan()) {
                return true;
            }
            // Accumulate the length of the current scanner before moving to the next one
            this.storageOffset += this.currentScanner.getDataLength();
            // Move to the next scanner
            this.currentScannerIdx += 1;
            // Check if there's a next scanner
            if (this.currentScannerIdx < this.scanners.length) {
                this.currentScanner = this.scanners[this.currentScannerIdx];
                this.setListOffset(this.currentScanner.getListId(), this.storageOffset);
            }
        }
        return false;
    }
    /**
     * Rule returns the most recent rule parts generated by a call to Scan, and the index of this rule.
     * See ruleListIdxToStorageIdx for more information on what this index is.
     *
     * @returns The most recent rule parts and its index, or null if no rule is available.
     */
    getRuleParts() {
        if (!this.currentScanner) {
            return null;
        }
        const ruleParts = this.currentScanner.getRuleParts();
        if (!ruleParts) {
            return null;
        }
        const offset = this.getListOffset(ruleParts.listId);
        const index = offset + ruleParts.index;
        return new IndexedStorageRuleParts(ruleParts.ruleParts, index, ruleParts.listId);
    }
    /**
     * Match storage index with range of filter list offset
     * and return list id and local filter list position.
     *
     * @param storageIdx Rule position in concatenated filter lists data.
     *
     * @returns Tuple of list id and local filter list position.
     */
    getIds(storageIdx) {
        const listOffsetEntriesLength = this.listOffsetKeys.length;
        if (listOffsetEntriesLength === 1) {
            return [this.listOffsetKeys[0], storageIdx - this.listOffsetValues[0]];
        }
        for (let i = 0; i < listOffsetEntriesLength - 1; i += 1) {
            const offset = this.listOffsetValues[i];
            const nextOffset = this.listOffsetValues[i + 1];
            if (storageIdx >= offset && storageIdx < nextOffset) {
                return [this.listOffsetKeys[i], storageIdx - offset];
            }
        }
        return [
            this.listOffsetKeys[listOffsetEntriesLength - 1],
            storageIdx - this.listOffsetValues[listOffsetEntriesLength - 1],
        ];
    }
    /**
     * Push listID and offset to the {@link listOffsetEntries}.
     *
     * @param listId Filter list id.
     * @param offset Filter list offset position in the storage.
     */
    setListOffset(listId, offset) {
        this.listOffsetKeys[this.listOffsetEntriesCursor] = listId;
        this.listOffsetValues[this.listOffsetEntriesCursor] = offset;
        this.listOffsetEntriesCursor += 1;
    }
    /**
     * Gets filter list offset by list id.
     *
     * @param listId Filter list id.
     *
     * @returns Offset position in the storage.
     *
     * @throws Error if listId is not found.
     */
    getListOffset(listId) {
        const idx = this.listOffsetKeys.indexOf(listId);
        if (idx !== -1) {
            return this.listOffsetValues[idx];
        }
        throw new Error(`listId ${listId} not found in the storage`);
    }
}

/**
 * RuleStorage is an abstraction that combines several rule lists.
 * It can be scanned using RuleStorageScanner, and also it allows
 * retrieving rules by its index.
 *
 * The idea is to keep rules in a serialized format (even original format in the case of FileRuleList)
 * and create them in a lazy manner only when we really need them. When the filtering engine is
 * being initialized, we need to scan the rule lists once in order to fill up the lookup tables.
 * We use rule indexes as a unique rule identifier instead of the rule itself.
 * The rule is created (see RetrieveRule) only when there's a chance that it's needed.
 *
 * Rule index is an int64 value that actually consists of two int32 values:
 * One is the rule list identifier, and the second is the index of the rule inside of that list.
 */
class RuleStorage {
    /**
     * Lists is an array of rules lists which can be accessed using this RuleStorage.
     */
    lists;
    /**
     * Map with rule lists. Map key is the list ID.
     */
    listsMap;
    /**
     * Cache with the rules which are stored inside this cache instance.
     */
    cache;
    /**
     * Constructor.
     *
     * @param lists Rule lists array.
     *
     * @throws Error on duplicate lists.
     */
    constructor(lists) {
        this.lists = lists;
        this.listsMap = new Map();
        this.cache = new Map();
        this.lists.forEach((list) => {
            const filterListId = list.getId();
            if (this.listsMap.get(filterListId)) {
                throw new Error(`Duplicate list ID: ${filterListId}`);
            }
            this.listsMap.set(filterListId, list);
        });
    }
    /**
     * Retrieves a rule text by its filter list identifier and rule index.
     *
     * If there's no rule by that index or the rule structure is invalid, it will return null.
     *
     * @param filterId Filter list identifier.
     * @param ruleIndex Rule index.
     *
     * @returns Rule text or `null`.
     */
    retrieveRuleText(filterId, ruleIndex) {
        const list = this.listsMap.get(filterId);
        if (!list) {
            return null;
        }
        return list.retrieveRuleText(ruleIndex);
    }
    /**
     * Retrieves the original rule text by its filter list identifier and rule index.
     *
     * @param filterId Filter list identifier.
     * @param ruleIndex Rule index.
     *
     * @returns Rule text or `null`.
     */
    retrieveOriginalRuleText(filterId, ruleIndex) {
        const list = this.listsMap.get(filterId);
        if (list && list instanceof FilterRuleList) {
            return list.retrieveOriginalRuleText(ruleIndex);
        }
        return null;
    }
    /**
     * Creates a new instance of RuleStorageScanner.
     * It can be used to read and parse all the storage contents.
     *
     * @param scannerType The type of scanner to create.
     *
     * @returns Scanner instance.
     */
    createRuleStorageScanner(scannerType) {
        const scanners = this.lists.map((list) => list.newScanner(scannerType));
        this.scanner = new RuleStorageScanner(scanners);
        return this.scanner;
    }
    /**
     * Retrieves the filter list identifier from the storage index.
     *
     * @param storageIdx Storage index of the rule.
     *
     * @returns The filter list identifier.
     */
    getFilterListId(storageIdx) {
        return this.scanner.getIds(storageIdx)[0];
    }
    /**
     * Looks for the filtering rule in this storage.
     *
     * @param storageIdx The lookup index that you can get from the rule storage scanner.
     * @param ignoreHost Whether to ignore host rules.
     * @param ignoreHtmlFilteringBodies Whether to ignore HTML filtering body rules.
     *
     * @returns The rule or null if not found or an error occurs.
     *
     * @note It returns `null` for rules that are ignored in the rule list.
     */
    retrieveRule(storageIdx, ignoreHost = true, ignoreHtmlFilteringBodies = true) {
        const rule = this.cache.get(storageIdx);
        if (rule) {
            return rule;
        }
        const [listId, ruleId] = this.scanner.getIds(storageIdx);
        const list = this.listsMap.get(listId);
        if (!list) {
            logger.warn(`[tsurl.RuleStorage.retrieveRule]: Failed to retrieve list ${listId}, should not happen in normal operation`);
            return null;
        }
        const ruleText = list.retrieveRuleText(ruleId);
        if (!ruleText) {
            logger.warn(`[tsurl.RuleStorage.retrieveRule]: Failed to retrieve rule ${ruleId}, should not happen in normal operation`);
            return null;
        }
        let createdRule = null;
        try {
            createdRule = RuleFactory.createRule(ruleText, listId, ruleId, !ignoreHost, !ignoreHtmlFilteringBodies);
        }
        catch (e) {
            logger.debug(`[tsurl.RuleStorage.retrieveRule]: error: "${getErrorMessage$1(e)}" in the rule: "${ruleText}"`);
        }
        if (list.ignoreUnsafe) {
            if (createdRule instanceof NetworkRule && createdRule.isUnsafe()) {
                return null;
            }
            // TODO: Add support for more rule types, if needed
        }
        if (createdRule) {
            this.cache.set(storageIdx, createdRule);
        }
        return createdRule;
    }
    /**
     * Retrieves a network rule from the storage.
     *
     * @param storageIdx Storage index of the rule.
     *
     * @returns The rule or nil in any other case (not found or error).
     */
    retrieveNetworkRule(storageIdx) {
        const rule = this.retrieveRule(storageIdx);
        if (rule instanceof NetworkRule) {
            return rule;
        }
        return null;
    }
    /**
     * Retrieves a host rule from the storage.
     *
     * @param storageIdx Storage index of the rule.
     *
     * @returns The rule or nil in any other case (not found or error).
     */
    retrieveHostRule(storageIdx) {
        const rule = this.retrieveRule(storageIdx, false);
        if (rule instanceof HostRule) {
            return rule;
        }
        return null;
    }
    /**
     * Retrieves a cosmetic rule from the storage.
     *
     * @param storageIdx Storage index of the rule.
     *
     * @returns The rule or nil in any other case (not found or error).
     */
    retrieveCosmeticRule(storageIdx) {
        const rule = this.retrieveRule(storageIdx, true, false);
        if (rule instanceof CosmeticRule) {
            return rule;
        }
        return null;
    }
    /**
     * Returns the size of the cache.
     *
     * @returns The size of the cache.
     */
    getCacheSize() {
        return this.cache.size;
    }
}

/**
 * Engine represents the filtering engine with all the loaded rules.
 */
class Engine {
    /**
     * Request's cache size
     * Used as both source rules and others limit.
     * The value is based on benchmark runs.
     */
    static REQUEST_CACHE_SIZE = 500;
    /**
     * Basic filtering rules engine.
     */
    networkEngine;
    /**
     * Cosmetic rules engine.
     */
    cosmeticEngine;
    /**
     * Rules storage.
     */
    ruleStorage;
    /**
     * Request results cache.
     */
    resultCache;
    /**
     * Conversion errors that occurred during filter list processing.
     */
    conversionErrors = [];
    /**
     * Creates an instance of the network engine in sync mode.
     *
     * @param options Engine factory options.
     *
     * @returns An instance of the network engine.
     */
    static createSync(options) {
        const networkRulesParts = [];
        const cosmeticRulesParts = [];
        const lists = [];
        const conversionErrors = [];
        for (const filter of options.filters) {
            let list;
            if (filter.content instanceof FilterList) {
                list = filter.content;
            }
            else {
                list = new FilterList(filter.content, filter.id);
            }
            conversionErrors.push(...list.getConversionErrors());
            const ruleList = new FilterRuleList(filter.id, list, filter.ignoreCosmetic ?? false, filter.ignoreJS ?? false, filter.ignoreUnsafe ?? false);
            lists.push(ruleList);
        }
        const storage = new RuleStorage(lists);
        const scanner = storage.createRuleStorageScanner(ScannerType.NetworkRules | ScannerType.CosmeticRules);
        while (scanner.scan()) {
            const indexedRuleParts = scanner.getRuleParts();
            if (!indexedRuleParts) {
                continue;
            }
            if (indexedRuleParts.ruleParts.category === 1 /* RuleCategory.Network */) {
                // Note: it is safe to cast here, because we checked rule type
                networkRulesParts.push(indexedRuleParts);
            }
            else if (indexedRuleParts.ruleParts.category === 2 /* RuleCategory.Cosmetic */) {
                // Note: it is safe to cast here, because we checked rule type
                cosmeticRulesParts.push(indexedRuleParts);
            }
        }
        const networkEngine = NetworkEngine.createSync(networkRulesParts, storage);
        const cosmeticEngine = CosmeticEngine.createSync(cosmeticRulesParts, storage);
        const engine = new Engine(storage, networkEngine, cosmeticEngine, conversionErrors);
        return engine;
    }
    /**
     * Creates an instance of the network engine in async mode.
     *
     * @param options Engine factory options.
     *
     * @returns An instance of the network engine.
     */
    static async createAsync(options) {
        const networkRulesParts = [];
        const cosmeticRulesParts = [];
        const lists = [];
        const conversionErrors = [];
        for (const filter of options.filters) {
            let list;
            if (filter.content instanceof FilterList) {
                list = filter.content;
            }
            else {
                list = new FilterList(filter.content, filter.id);
            }
            conversionErrors.push(...list.getConversionErrors());
            const ruleList = new FilterRuleList(filter.id, list, filter.ignoreCosmetic ?? false, filter.ignoreJS ?? false, filter.ignoreUnsafe ?? false);
            lists.push(ruleList);
        }
        const storage = new RuleStorage(lists);
        const scanner = storage.createRuleStorageScanner(ScannerType.NetworkRules | ScannerType.CosmeticRules);
        let counter = 0;
        while (scanner.scan()) {
            counter += 1;
            if (counter >= CHUNK_SIZE) {
                counter = 0;
                // Pause rule scanning and let the browser handle pending UI
                // updates (repaints, user input, etc.) before continuing.
                // We use setTimeout (macrotask) instead of Promise.resolve()
                // (microtask) because microtasks don't give the browser a
                // chance to refresh the screen or respond to user actions.
                // eslint-disable-next-line no-await-in-loop
                await new Promise((resolve) => { setTimeout(resolve, 0); });
            }
            const ruleParts = scanner.getRuleParts();
            if (!ruleParts) {
                continue;
            }
            if (ruleParts.ruleParts.category === 1 /* RuleCategory.Network */) {
                // Note: it is safe to cast here, because we checked rule type
                networkRulesParts.push(ruleParts);
            }
            else if (ruleParts.ruleParts.category === 2 /* RuleCategory.Cosmetic */) {
                // Note: it is safe to cast here, because we checked rule type
                cosmeticRulesParts.push(ruleParts);
            }
        }
        const [networkEngine, cosmeticEngine] = await Promise.all([
            NetworkEngine.createAsync(networkRulesParts, storage),
            CosmeticEngine.createAsync(cosmeticRulesParts, storage),
        ]);
        const engine = new Engine(storage, networkEngine, cosmeticEngine, conversionErrors);
        return engine;
    }
    /**
     * Creates an instance of an Engine
     * Parses the filtering rules and creates a filtering engine of them.
     *
     * @param ruleStorage Storage.
     * @param networkEngine Network engine.
     * @param cosmeticEngine Cosmetic engine.
     * @param conversionErrors Conversion errors.
     */
    constructor(ruleStorage, networkEngine, cosmeticEngine, conversionErrors) {
        this.ruleStorage = ruleStorage;
        this.networkEngine = networkEngine;
        this.cosmeticEngine = cosmeticEngine;
        this.resultCache = new LRUCache({ max: Engine.REQUEST_CACHE_SIZE });
        this.conversionErrors = conversionErrors;
    }
    /**
     * Matches the specified request against the filtering engine and returns the matching result.
     *
     * @param request Request to check.
     * @param frameRule Source document rule or null.
     *
     * @returns Matching result.
     */
    matchRequest(request, frameRule = null) {
        let cacheKey = `${request.url}#${request.sourceHostname}#${request.requestType}`;
        if (request.method) {
            cacheKey += `#${request.method}`;
        }
        /**
         * Add frame url text to the key to avoid caching,
         * because allowlist rules are not stored in the engine. AG-12694.
         */
        if (frameRule) {
            cacheKey += `#${frameRule.getIndex()}`;
        }
        const res = this.resultCache.get(cacheKey);
        if (res) {
            return res;
        }
        const networkRules = this.networkEngine.matchAll(request);
        const result = new MatchingResult(networkRules, frameRule);
        this.resultCache.set(cacheKey, result);
        return result;
    }
    /**
     * Matches current frame and returns document-level allowlist rule if found.
     *
     * @param frameUrl The URL of the frame to match.
     *
     * @returns Document-level allowlist rule if found, otherwise null.
     */
    // TODO: Find a better name for this method
    matchFrame(frameUrl) {
        const sourceRequest = new Request(frameUrl, '', RequestType.Document);
        let sourceRules = this.networkEngine.matchAll(sourceRequest);
        sourceRules = MatchingResult.removeBadfilterRules(sourceRules);
        let result = null;
        sourceRules.forEach((r) => {
            if (r.isDocumentLevelAllowlistRule()) {
                if (!result || r.isHigherPriority(result)) {
                    result = r;
                }
            }
        });
        return result;
    }
    /**
     * Gets cosmetic result for the specified hostname and cosmetic options.
     *
     * @param request Host to check.
     * @param option Mask of enabled cosmetic types.
     *
     * @returns Cosmetic result.
     */
    getCosmeticResult(request, option) {
        return this.cosmeticEngine.match(request, option);
    }
    /**
     * Gets rules count.
     *
     * @returns The total number of rules.
     */
    getRulesCount() {
        return this.networkEngine.rulesCount + this.cosmeticEngine.rulesCount;
    }
    /**
     * Retrieves a rule text by its filter list identifier and rule index.
     *
     * If there's no rule by that index or the rule structure is invalid, it will return null.
     *
     * @param filterId Filter list identifier.
     * @param ruleIndex Rule index.
     *
     * @returns Rule text or `null`.
     */
    retrieveRuleText(filterId, ruleIndex) {
        return this.ruleStorage.retrieveRuleText(filterId, ruleIndex);
    }
    /**
     * Retrieves the original rule text by its filter list identifier and rule index.
     *
     * @param filterId Filter list identifier.
     * @param ruleIndex Rule index.
     *
     * @returns Rule text or `null`.
     */
    retrieveOriginalRuleText(filterId, ruleIndex) {
        return this.ruleStorage.retrieveOriginalRuleText(filterId, ruleIndex);
    }
    /**
     * Gets the conversion errors that occurred during filter list processing.
     *
     * @returns Array of conversion errors.
     */
    getConversionErrors() {
        return this.conversionErrors;
    }
}

/**
 * Source map.
 *
 * @note Since serialized rule nodes are not store original rule text, we need this source map between the
 * serialized filter list and the raw filter list.
 */
const filterListSourceMapValidator = z.record(
/**
 * Rule start index in the converted list's byte buffer.
 */
z.string(), 
/**
 * Rule start index in the raw converted list.
 */
z.number());

/**
 * Helper function to get the rule source text from the source string by its line start index.
 *
 * @param lineStartIndex Rule start index.
 * @param source Raw filter list source.
 *
 * @returns Rule string or null if the rule couldn't be found.
 */
const getRuleSourceText = (lineStartIndex, source) => {
    // note: checking for LF is enough, because we transform source before storing it, and it's always LF
    let [lineEndIndex] = findNextLineBreakIndex(source, lineStartIndex);
    // If the line end index is not found, we assume that the rule is the last line in the source.
    if (lineEndIndex === -1) {
        lineEndIndex = source.length;
    }
    // If the rule start index is equal to or greater than the rule end index, we return null,
    // and the rule is considered not found.
    if (lineStartIndex >= lineEndIndex) {
        return null;
    }
    const ruleSourceText = source.slice(lineStartIndex, lineEndIndex);
    // WARNING!
    // Potential memory leak mitigation for substring operation due to V8 optimizations:
    // When extracting a substring with rule.slice(), there's a concern in some JS environments
    // that the resulting substring might retain a hidden reference to the entire original 'rule' string.
    // This could prevent the garbage collector (GC) from freeing the memory allocated for filter rules.
    // This hidden reference occurs because the substring might not create a new string but rather
    // a view into the original, keeping it in memory longer than necessary.
    // And we receive a memory leak here because we store parsed tags from first N lines of the filter rules
    // which have references to the original large string with filter rules.
    // To ensure that the original large string can be garbage collected, and only the necessary
    // substring is retained, we explicitly force a copy of the substring via split and join,
    // thereby breaking the direct reference to the original string and allowing the GC to free the memory
    // for filter rules when they are no longer in use.
    return ruleSourceText.split('').join('');
};
/**
 * Helper function to get the rule source index (line start index in the source) from the source map by the rule index.
 *
 * @param ruleIdx Rule index.
 * @param sourceMap Source map.
 *
 * @returns Rule source index or RULE_INDEX_NONE (-1).
 *
 * @note Similar to `Array.prototype.indexOf`, we return -1 if the rule index is not found.
 */
const getRuleSourceIndex = (ruleIdx, sourceMap) => {
    return sourceMap[ruleIdx] ?? RULE_INDEX_NONE;
};

const FILTER_PREFIX = 'filter_';
/**
 * Extracts the filter ID from a given filter name.
 *
 * @param filterName The filter name in the format `filter_{filterId}.txt`.
 *
 * @returns The extracted filter ID, or null if the filter name does not match the expected format.
 */
const getIdFromFilterName = (filterName) => {
    const match = filterName.match(new RegExp(`${FILTER_PREFIX}(\\d+)\\.txt`));
    if (!match) {
        return null;
    }
    return parseInt(match[1], 10);
};

/**
 * Fetches a resource from the given URL and returns its content as text.
 *
 * @param url The URL of the resource to fetch.
 *
 * @returns A promise that resolves to the fetched content as a string.
 *
 * @throws If the request fails.
 */
const fetchExtensionResourceText = async (url) => {
    return fetch(url).then((response) => response.text());
};

/**
 * Module with miscellaneous syntax utils exposed in API.
 */
class RuleSyntaxUtils {
    /**
     * Dummy filter ID.
     */
    static DUMMY_FILTER_ID = 0;
    /**
     * Checks if rule can be matched by domain.
     *
     * @param ruleText Rule text.
     * @param domain Domain to check.
     *
     * @returns True if the rule can be matched by the domain, false otherwise.
     */
    static isRuleForDomain(ruleText, domain) {
        const rule = RuleFactory.createRule(ruleText, this.DUMMY_FILTER_ID);
        if (!rule) {
            return false;
        }
        const permittedDomains = rule.getPermittedDomains();
        return !!permittedDomains
            && DomainModifier.isDomainOrSubdomainOfAny(domain, permittedDomains);
    }
    /**
     * Checks if rule can be matched by URL.
     *
     * @param ruleText Rule text.
     * @param url URL to check.
     *
     * @returns True if the rule can be matched by the URL, false otherwise.
     */
    static isRuleForUrl(ruleText, url) {
        const domain = getHostname(url);
        if (!domain) {
            return false;
        }
        return this.isRuleForDomain(ruleText, domain);
    }
}

/**
 * StringRuleList represents a string-based rule list. Consider it a reference
 * implementation of an IRuleList that shows how to supply a custom storage
 * implementation.
 */
class StringRuleList {
    /**
     * Rule list ID.
     */
    id;
    /**
     * String with filtering rules (one per line).
     */
    rulesText;
    /**
     * Whether to ignore cosmetic rules or not.
     */
    ignoreCosmetic;
    /**
     * Whether to ignore javascript cosmetic rules or not.
     */
    ignoreJS;
    /**
     * Whether to ignore unsafe rules or not.
     */
    ignoreUnsafe;
    /**
     * Constructor.
     *
     * @param listId Rule list identifier.
     * @param ruleText String with filtering rules (one per line).
     * @param ignoreCosmetic (Optional) default false.
     * @param ignoreJS (Optional) default false.
     * @param ignoreUnsafe (Optional) default false.
     */
    constructor(listId, ruleText, ignoreCosmetic, ignoreJS, ignoreUnsafe) {
        if (listId >= LIST_ID_MAX_VALUE) {
            throw new Error(`Invalid list identifier, it must be less than ${LIST_ID_MAX_VALUE}`);
        }
        this.id = listId;
        this.rulesText = ruleText;
        this.ignoreCosmetic = !!ignoreCosmetic;
        this.ignoreJS = !!ignoreJS;
        this.ignoreUnsafe = !!ignoreUnsafe;
    }
    /**
     * Gets the rule list identifier.
     *
     * @returns The rule list identifier.
     */
    getId() {
        return this.id;
    }
    /**
     * Creates a new rules scanner that reads the list contents.
     *
     * @param scannerType Scanner type.
     *
     * @returns Scanner object.
     */
    newScanner(scannerType) {
        const reader = new StringLineReader(this.rulesText);
        return new RuleScanner(reader, this.id, {
            scannerType,
            ignoreCosmetic: this.ignoreCosmetic,
            ignoreJS: this.ignoreJS,
        });
    }
    /**
     * Finds rule text by its index.
     * If there's no rule by that index or rule is invalid, it will return null.
     *
     * @param ruleIdx Rule index.
     *
     * @returns Rule text or null.
     */
    retrieveRuleText(ruleIdx) {
        if (ruleIdx < 0 || ruleIdx >= this.rulesText.length) {
            return null;
        }
        const [endOfLine] = findNextLineBreakIndex(this.rulesText, ruleIdx);
        // Prevent memory leaks by splitting the string into an array and then joining it back.
        // This ensures the returned string is a completely new copy, rather than a slice referencing the original,
        // which could prevent the original string from being garbage collected.
        const line = this.rulesText.slice(ruleIdx, endOfLine).split('').join('');
        if (!line) {
            return null;
        }
        return line.trim();
    }
}

export { B64_KEYWORD, CSP_HEADER_NAME, CompatibilityTypes, CookieModifier, CosmeticEngine, CosmeticOption, CosmeticResult, CosmeticRule, DnsEngine, DnsResult, Engine, FILTER_LIST_ID_NONE, FilterList, HTTPMethod, HostRule, HtmlSpecialSelectorName, IndexedRule, IndexedRuleParts, IndexedStorageRuleParts, LIST_ID_MAX_VALUE, MatchingResult, NETWORK_RULE_OPTIONS, NO_LIST_ID, NetworkEngine, NetworkRule, NetworkRuleGroupOptions, NetworkRuleOption, OPTIONS_DELIMITER, OptionFlags, PCT_KEYWORD, PERMISSIONS_POLICY_HEADER_NAME, RULE_INDEX_NONE, RemoveHeaderModifier, RemoveParamModifier, ReplaceModifier, Request, RequestType, RuleFactory, RuleStorage, RuleSyntaxUtils, STEALTH_MODE_FILTER_ID, SimpleRegex, StealthOptionName, StringRuleList, TSURLFILTER_VERSION, UrlTransformModifier, cleanUrlParamByRegExp, config, conversionDataValidator, countEnabledBits, createAllowlistRuleNode, fastHash, fetchExtensionResourceText, filterListSourceMapValidator, findNextLineBreakIndex, findNextNonWhitespace, findNextWhitespace, findPrevNonWhitespace, getBitCount, getIdFromFilterName, getRelativeUrl, getRuleSourceIndex, getRuleSourceText, hasSpaces, hasWhitespace, isCompatibleWith, isHttpOrWsRequest, isString, logger, setConfiguration, splitByDelimiterWithEscapeCharacter, stringArraysEquals, stringArraysHaveIntersection, unescapeChar };
