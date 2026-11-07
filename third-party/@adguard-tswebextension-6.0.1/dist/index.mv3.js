import { FilterConverter, Filter, RULESET_NAME_PREFIX, InvalidMetadataChunksError, getRulesetId, extractRulesetId, getRulesetPath, parseCompactRuleset, RulesetWithSourceMap, METADATA_RULESET_ID, MetadataRuleset } from '@adguard/dnr-converter';
export { EmptyOrNegativeNumberOfRulesError, EmptyResourcesError, InvalidDeclarativeRuleError, MaxScannedRulesError, NegativeNumberOfRulesError, RULESET_NAME_PREFIX, ResourceType, ResourcesPathError, TooManyRegexpRulesError, TooManyRulesError, TooManyUnsafeRulesError, UnavailableFilterSourceError, UnavailableRulesetSourceError, UnsupportedModifierError, UnsupportedRegexpError } from '@adguard/dnr-converter';
import { Engine, setConfiguration, CompatibilityTypes, CosmeticResult, Request, RequestType, FilterList, NetworkRuleOption, fetchExtensionResourceText, CSP_HEADER_NAME, StealthOptionName, PERMISSIONS_POLICY_HEADER_NAME } from '@adguard/tsurlfilter';
export { FilterList, getRuleSourceIndex, getRuleSourceText } from '@adguard/tsurlfilter';
import browser from 'webextension-polyfill';
import { LogLevel } from '@adguard/logger';
import { U as USER_FILTER_ID, A as ALLOWLIST_FILTER_ID, M as MAIN_FRAME_ID, N as NO_PARENT_FRAME_ID, B as BACKGROUND_TAB_ID, F as FRAME_DELETION_TIMEOUT_MS, a as BLOCKING_TRUSTED_FILTER_ID } from './common/constants.js';
export { L as LF } from './common/constants.js';
import { A as Allowlist$1, w as getUpperLevelDomain, a as createExtensionStorageDecorator, E as ExtensionStorage, B as BrowserStorage, M as MemoryStorage, i as isHttpOrWsRequest, x as getHost, n as isHttpRequest, u as getDomain, F as FrameCommon, T as TabContextCommon, e as defaultFilteringLog, f as TabsApiCommon, g as CosmeticApiCommon, h as createFrameMatchQuery, q as isExtensionUrl, D as DocumentLifecycle, t as ContentType, C as CommonAssistant, c as configurationValidator, b as basicFilterValidator, Y as settingsConfigValidator, m as FilteringEventType, p as isThirdPartyRequest, o as getRequestType, N as BrowserCookieApi, v as findHeaderByName, L as CookieUtils$1, P as ParsedCookie, O as CookieRulesFinder, l as getRuleTexts, y as messageValidator, Z as getCosmeticDataPayloadValidator, K as getAssistantCreateRulePayloadValidator, H as getCookieRulesPayloadValidator, a0 as isEmptySrcFrame, J as getRuleTextsByIndex, I as getSaveCookieLogEventPayloadValidator, k as companiesDbService, d as BrowserDetector, Q as DocumentBlockingServiceCommon, R as AbstractRemoveParamInjectionService, S as patchHistoryForRemoveParam, a1 as hasHeaderByName, a2 as hasHeader, U as StealthActions } from './common/stealth-actions.js';
export { V as EventChannel, W as TSWEBEXTENSION_VERSION } from './common/stealth-actions.js';
import { l as logger, s as stringifyObjectWithoutKeys } from './common/logger.js';
import { PIPE_MODIFIER_SEPARATOR } from '@adguard/agtree';
import { i as isUserScriptsApiEnabled } from './common/is-user-scripts-api-enabled.js';
import { __esDecorate, __runInitializers } from 'tslib';
import { z } from 'zod';
import { nanoid } from 'nanoid/non-secure';
import { F as FiltersStorage, I as IdbSingleton } from './common/filters.js';
import { getDomain as getDomain$1 } from 'tldts';
import { M as MessageType } from './common/message-constants.js';
export { a as MESSAGE_HANDLER_NAME } from './common/message-constants.js';
export { EXTENDED_CSS_VERSION } from '@adguard/extended-css/version';
import './common/package.js';
import '@adguard/tsurlfilter/es/request-type';
import 'lodash-es';
import 'bowser';
import './common/trackers-min.js';
import 'idb';

/**
 * The allowlist is used to exclude certain websites from filtering.
 * Blocking rules are not applied to the sites in the list.
 * The allowlist can also be inverted.
 * In inverted mode, the application will unblock ads everywhere except for the
 * sites added to this list.
 */
class AllowlistApi extends Allowlist$1 {
    /**
     * Configures allowlist state based on app configuration.
     *
     * @param configuration App configuration.
     */
    configure(configuration) {
        /**
         * For MV3 we add "*." for each domain to make matching algorithm
         * same as in DNR engine: requestDomains and excludedRequestDomains in
         * DNR will match all subdomains of the domain by default.
         */
        const domainWithSubDomainsMask = configuration.allowlist.reduce((acc, domain) => {
            acc.push(domain);
            if (!domain.startsWith('*.')) {
                acc.push(`*.${domain}`);
            }
            return acc;
        }, []);
        super.configure({
            ...configuration,
            allowlist: domainWithSubDomainsMask,
        });
    }
    /**
     * Creates allowlist rule for domains list.
     *
     * @param domains Domains to create allowlist rule for.
     *
     * @returns Allowlist rule for given domains or empty string if domains list is empty.
     *
     * @example
     * ```
     * const domains1 = ['example.com', 'example.org']
     * getAllowlistRule(domains1) -> '@@$document,to=example.com|example.org'
     *
     * const domains2 = []
     * getAllowlistRule(domains2) -> ''
     * ```
     */
    static getAllowlistRule(domains) {
        if (domains.length === 0) {
            return '';
        }
        const concatenatedUniqueDomains = Array.from(new Set(domains)).join(PIPE_MODIFIER_SEPARATOR);
        // Adding $important to ensure the allowlist rule takes precedence over
        // blocking rules that use important modifiers (AG-42867)
        // e.g. '@@$document,important,to=example.com|example.org'
        return `@@$document,important,to=${concatenatedUniqueDomains}`;
    }
    /**
     * Creates one allowlist rule for all allowlistRules. This one combined rule
     * will be passed to the DNR converter.
     *
     * NOTE: We use $to (_to domains_) modifier instead of $domain (_from domains_),
     * because it is needed to match frame request itself and all requests from
     * this frame.
     *
     * @see https://groups.google.com/a/chromium.org/g/chromium-extensions/c/S0TtE9Vk4N4/m/hPtSafzVAQAJ
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#to-modifier
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/#domain-modifier
     *
     * @returns Combined rule in AG format.
     */
    combineAllowListRulesForDNR() {
        // In inverted allowlist mode with an empty list, we must not block anything anywhere.
        // To ensure that browser DNR does not block requests, generate a global allowlist
        // rule that applies to all documents.
        if (this.inverted && this.domains.length === 0) {
            return '@@$document,important';
        }
        const allDomains = this.domains.map((domain) => {
            // Map subdomain masks to upper domains records, because masks itself
            // will be ignored by DNR. Transforming masks to upper domains will
            // match all subdomains by default in DNR.
            // We added them for consistency between DNR engine and
            // our tsurlfilter (for cosmetic in MV3).
            const d = domain.startsWith('*.')
                ? getUpperLevelDomain(domain)
                : domain;
            return this.inverted ? `~${d}` : d;
        });
        return AllowlistApi.getAllowlistRule(allDomains);
    }
}
const allowlistApi = new AllowlistApi();

/**
 * API for storing data described by {@link SessionStorageSchema} in the {@link browser.storage.session}.
 */
class ExtSessionStorage extends ExtensionStorage {
    static #DOMAIN = 'tswebextension';
    static #DEFAULT_DATA = {
        isAppStarted: false,
        configuration: undefined,
        startTimeMs: undefined,
        cosmeticsInjectedOnStartup: false,
    };
    /**
     * Creates {@link SessionStorage} instance.
     */
    constructor() {
        // Use memory storage as a fallback for old browsers and cases when the code
        // is launched outside the extension (case from partners)
        super(ExtSessionStorage.#DOMAIN, browser.storage.session
            ? new BrowserStorage(browser.storage.session)
            : new MemoryStorage());
    }
    /** @inheritdoc */
    init() {
        return super.init(ExtSessionStorage.#DEFAULT_DATA);
    }
}
const extSessionStorage = new ExtSessionStorage();
const sessionDecorator = createExtensionStorageDecorator(extSessionStorage);

/**
 * Top level app context storage.
 *
 * This context is needed to share data between other modules without cyclic dependencies.
 *
 * TODO (v.zhelvis) delete this context after DI is implemented.
 */
let AppContext = (() => {
    let _isAppStarted_decorators;
    let _isAppStarted_initializers = [];
    let _isAppStarted_extraInitializers = [];
    let _configuration_decorators;
    let _configuration_initializers = [];
    let _configuration_extraInitializers = [];
    let _startTimeMs_decorators;
    let _startTimeMs_initializers = [];
    let _startTimeMs_extraInitializers = [];
    let _cosmeticsInjectedOnStartup_decorators;
    let _cosmeticsInjectedOnStartup_initializers = [];
    let _cosmeticsInjectedOnStartup_extraInitializers = [];
    return class AppContext {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _isAppStarted_decorators = [sessionDecorator("isAppStarted" /* SessionStorageKey.IsAppStarted */)];
            _configuration_decorators = [sessionDecorator("configuration" /* SessionStorageKey.Configuration */)];
            _startTimeMs_decorators = [sessionDecorator("startTimeMs" /* SessionStorageKey.StartTimeMs */)];
            _cosmeticsInjectedOnStartup_decorators = [sessionDecorator("cosmeticsInjectedOnStartup" /* SessionStorageKey.CosmeticsInjectedOnStartup */)];
            __esDecorate(this, null, _isAppStarted_decorators, { kind: "accessor", name: "isAppStarted", static: false, private: false, access: { has: obj => "isAppStarted" in obj, get: obj => obj.isAppStarted, set: (obj, value) => { obj.isAppStarted = value; } }, metadata: _metadata }, _isAppStarted_initializers, _isAppStarted_extraInitializers);
            __esDecorate(this, null, _configuration_decorators, { kind: "accessor", name: "configuration", static: false, private: false, access: { has: obj => "configuration" in obj, get: obj => obj.configuration, set: (obj, value) => { obj.configuration = value; } }, metadata: _metadata }, _configuration_initializers, _configuration_extraInitializers);
            __esDecorate(this, null, _startTimeMs_decorators, { kind: "accessor", name: "startTimeMs", static: false, private: false, access: { has: obj => "startTimeMs" in obj, get: obj => obj.startTimeMs, set: (obj, value) => { obj.startTimeMs = value; } }, metadata: _metadata }, _startTimeMs_initializers, _startTimeMs_extraInitializers);
            __esDecorate(this, null, _cosmeticsInjectedOnStartup_decorators, { kind: "accessor", name: "cosmeticsInjectedOnStartup", static: false, private: false, access: { has: obj => "cosmeticsInjectedOnStartup" in obj, get: obj => obj.cosmeticsInjectedOnStartup, set: (obj, value) => { obj.cosmeticsInjectedOnStartup = value; } }, metadata: _metadata }, _cosmeticsInjectedOnStartup_initializers, _cosmeticsInjectedOnStartup_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * Is storage initialized.
         * This flag is used to prevent access to persistent storage data on
         * request from content script, before app is started.
         */
        isStorageInitialized = false;
        #isAppStarted_accessor_storage = __runInitializers(this, _isAppStarted_initializers, void 0);
        /**
         * Is app started.
         */
        get isAppStarted() { return this.#isAppStarted_accessor_storage; }
        set isAppStarted(value) { this.#isAppStarted_accessor_storage = value; }
        #configuration_accessor_storage = (__runInitializers(this, _isAppStarted_extraInitializers), __runInitializers(this, _configuration_initializers, void 0));
        /**
         * MV3 ConfigurationMV3 excludes heavyweight fields with rules.
         */
        get configuration() { return this.#configuration_accessor_storage; }
        set configuration(value) { this.#configuration_accessor_storage = value; }
        #startTimeMs_accessor_storage = (__runInitializers(this, _configuration_extraInitializers), __runInitializers(this, _startTimeMs_initializers, void 0));
        /**
         * Start time of the app.
         */
        get startTimeMs() { return this.#startTimeMs_accessor_storage; }
        set startTimeMs(value) { this.#startTimeMs_accessor_storage = value; }
        #cosmeticsInjectedOnStartup_accessor_storage = (__runInitializers(this, _startTimeMs_extraInitializers), __runInitializers(this, _cosmeticsInjectedOnStartup_initializers, void 0));
        /**
         * Flag that indicates that cosmetics were injected on startup.
         */
        get cosmeticsInjectedOnStartup() { return this.#cosmeticsInjectedOnStartup_accessor_storage; }
        set cosmeticsInjectedOnStartup(value) { this.#cosmeticsInjectedOnStartup_accessor_storage = value; }
        constructor() {
            __runInitializers(this, _cosmeticsInjectedOnStartup_extraInitializers);
        }
    };
})();
const appContext = new AppContext();

/**
 * Api for executing user scripts.
 *
 * Note: This API is only utilized in developer mode as an additional
 * safety measure to comply with Chrome Web Store policies. In normal operation,
 * only pre-verified statically bundled scripts are executed.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/api/userScripts}
 */
class UserScriptsApi {
    // eslint-disable-next-line jsdoc/require-description, jsdoc/require-returns
    /**
     * @see {@link isUserScriptsApiEnabled}.
     */
    static get isEnabled() {
        return isUserScriptsApiEnabled();
    }
    /**
     * This is STEP 4.3: if User scripts API permission is explicitly granted,
     * all Scriptlet and JS rules (including those from custom filters)
     * are executed using the browser's built-in userScripts API.
     * This execution path bypasses the local script verification
     * but remains secure through Chrome's native sandbox isolation.
     *
     * The whole process is explained below.
     *
     * To fully comply with Chrome Web Store policies regarding remote code execution,
     * we implement a strict security-focused approach for Scriptlet and JavaScript rules execution.
     *
     * 1. Default - regular users that did not grant User scripts API permission explicitly:
     *    - We collect and pre-build script rules from the filters and statically bundle
     *      them into the extension - STEP 1. See 'updateLocalResourcesForMv3' in our build tools.
     *      IMPORTANT: all scripts and their arguments are local and bundled within the extension.
     *    - These pre-verified local scripts are passed to the engine - STEP 2.
     *    - At runtime before the execution, we check if each script rule is included
     *      in our local scripts list (STEP 3).
     *    - Only pre-verified local scripts are executed via chrome.scripting API (STEP 4.1 and 4.2).
     *      All other scripts are discarded.
     *    - Custom filters are NOT allowed for regular users to prevent any possibility
     *      of remote code execution, regardless of rule interpretation.
     *
     * 2. For advanced users that explicitly granted User scripts API permission -
     *    via enabling the Developer mode or Allow user scripts in the extension details:
     *    - Custom filters are allowed and may contain Scriptlet and JS rules
     *      that can be executed using the browser's built-in userScripts API (STEP 4.3),
     *      which provides a secure sandbox.
     *    - This execution bypasses the local script verification process but remains
     *      isolated and secure through Chrome's native sandboxing.
     *    - This mode requires explicit user activation and is intended for advanced users only.
     *
     * IMPORTANT:
     * Custom filters are ONLY supported when User scripts API permission is explicitly enabled.
     * This strict policy prevents Chrome Web Store rejection due to potential remote script execution.
     * When custom filters are allowed, they may contain:
     * 1. Network rules – converted to DNR rules and applied via dynamic rules.
     * 2. Cosmetic rules – interpreted directly in the extension code.
     * 3. Scriptlet and JS rules – executed via the browser's userScripts API (userScripts.execute)
     *    with Chrome's native sandboxing providing security isolation.
     *
     * For regular users without User scripts API permission (default case):
     * - Only pre-bundled filters with statically verified scripts are supported.
     * - Downloading custom filters or any rules from remote sources is blocked entirely
     *   to ensure compliance with the store policies.
     *
     * This implementation ensures perfect compliance with Chrome Web Store policies
     * by preventing any possibility of remote code execution for regular users.
     *
     * It is possible to follow all places using this logic by searching JS_RULES_EXECUTION.
     */
    /**
     * Executes a list of user scripts in a specified tab and frame.
     *
     * @param params The parameters for executing the scripts.
     * @param params.scriptText Combined scripts and scriptlets texts to be injected.
     * @param params.tabId The ID of the tab where the scripts will be executed.
     * @param params.frameId The ID of the frame within the tab where the scripts will
     * be executed.
     *
     * @returns A promise that resolves when the scripts have been executed.
     *
     * @throws Will log an error if the script execution fails.
     */
    static async executeScripts({ scriptText, tabId, frameId, }) {
        const code = UserScriptsApi.wrapScriptCode(String(appContext.startTimeMs), String(scriptText));
        try {
            await chrome.userScripts.execute({
                target: {
                    frameIds: [frameId],
                    tabId,
                },
                injectImmediately: true,
                js: [{ code }],
                world: 'MAIN',
            });
        }
        catch (e) {
            logger.info(`[tsweb.UserScriptsApi.executeScripts]: failed to execute user script to tabId ${tabId} and frameId ${frameId} due to:`, e);
        }
    }
    /**
     * Wraps the script code with a try-catch block and a check to avoid
     * multiple executions of it.
     *
     * @param injectedKey Unique key to identify that the script
     * has been injected to this namespace.
     * @param code Script code.
     *
     * @returns Wrapped script code.
     */
    static wrapScriptCode(injectedKey, code) {
        return `
            (function () {
                try {
                    const flag = 'done';
                    if (Window.prototype.toString["${injectedKey}"] === flag) {
                        return;
                    }
                    ${code}
                    Object.defineProperty(Window.prototype.toString, "${injectedKey}", {
                        value: flag,
                        enumerable: false,
                        writable: false,
                        configurable: false
                    });
                } catch (error) {
                    console.error('Error executing AG js rule with uniqueId "${injectedKey}" due to:', error);
                }
            })()
        `;
    }
}

/**
 * EngineApi - TSUrlFilter engine wrapper which controls how to work with
 * cosmetic rules.
 */
class EngineApi {
    /**
     * Link to current Engine.
     */
    engine;
    // TODO: Make private
    /**
     * To prevent multiple calls to startEngine, saves the first call to
     * startEngine and waits for it.
     */
    waitingForEngine;
    /**
     * List of filter ids for local rules.
     * It is used to split local and remote rules.
     */
    localRulesFiltersIds = [];
    /**
     * Id of user rules filter.
     * It is used to split local and remote rules.
     */
    userFilterId = USER_FILTER_ID;
    /**
     * Starts the engine with the provided bunch of rules,
     * wrapped in filters or custom rules.
     *
     * @param config {@link EngineConfig} Which contains filters (static and
     * custom), custom rules, quick fixes rules and the verbose flag.
     */
    async startEngine(config) {
        const { localFilters, remoteFilters, userRulesFilter, allowlistRulesList, verbose, } = config;
        const lists = [];
        /**
         * Local (built-in) filters are always applied and are trusted.
         * Remote (custom) filters are only applied when userScripts permission
         * is granted, and are not trusted (JS rules are restricted).
         */
        for (let i = 0; i < localFilters.length; i += 1) {
            try {
                const filter = localFilters[i];
                // eslint-disable-next-line no-await-in-loop
                const content = await filter.getContent();
                lists.push({
                    id: filter.getId(),
                    content,
                    ignoreCosmetic: false,
                    ignoreJS: false,
                    ignoreUnsafe: false,
                });
            }
            catch (e) {
                const filterId = localFilters[i].getId();
                logger.error(`[tsweb.EngineApi.startEngine]: cannot create IRuleList for filter ${filterId} due to: `, e);
            }
        }
        if (UserScriptsApi.isEnabled) {
            for (let i = 0; i < remoteFilters.length; i += 1) {
                try {
                    const filter = remoteFilters[i];
                    // eslint-disable-next-line no-await-in-loop
                    const content = await filter.getContent();
                    lists.push({
                        id: filter.getId(),
                        content,
                        ignoreCosmetic: false,
                        ignoreJS: !filter.isTrusted(),
                        ignoreUnsafe: !filter.isTrusted(),
                    });
                }
                catch (e) {
                    const filterId = remoteFilters[i].getId();
                    logger.error(`[tsweb.EngineApi.startEngine]: cannot create IRuleList for filter ${filterId} due to: `, e);
                }
            }
        }
        /**
         * Only rules from built-in filters are allowed to be executed
         * from user rules.
         *
         * @see CosmeticFrameProcessor.splitLocalRemoteScriptRules
         */
        try {
            const userrules = await userRulesFilter.getContent();
            // User rules can be empty (e.g. on a fresh install); in that case
            // the resolved content is simply empty and we skip adding it.
            if (userrules.length > 0) {
                // Note: rules are already converted at the extension side
                lists.push({
                    id: USER_FILTER_ID,
                    content: userrules,
                    ignoreCosmetic: false,
                    ignoreJS: false,
                    ignoreUnsafe: false,
                });
            }
        }
        catch (e) {
            const filterId = userRulesFilter.getId();
            logger.error(`[tsweb.EngineApi.startEngine]: cannot create IRuleList for user rules filter ${filterId} due to: `, e);
        }
        if (allowlistRulesList) {
            lists.push({
                id: ALLOWLIST_FILTER_ID,
                content: allowlistRulesList,
                ignoreCosmetic: true,
                ignoreJS: false,
                ignoreUnsafe: false,
            });
        }
        /*
         * UI thread becomes blocked on the options page while request filter is
         * created that's why we create filter rules using chunks of
         * the specified length.
         * Request filter creation is rather slow operation so we should
         * use setTimeout calls to give UI thread some time.
        */
        this.engine = await Engine.createAsync({
            filters: lists,
        });
        // Update IDs of loaded to engine filters for split local and remote
        // scripts.
        this.localRulesFiltersIds = localFilters.map((filter) => filter.getId());
        this.userFilterId = userRulesFilter.getId();
        // Update configuration of engine.
        setConfiguration({
            engine: 'extension',
            version: browser.runtime.getManifest().version,
            verbose,
            compatibility: CompatibilityTypes.Extension,
        });
    }
    /**
     * Stops filtering engine with cosmetic rules.
     */
    stopEngine() {
        this.engine = undefined;
    }
    /**
     * Matches current frame and returns document-level allowlist rule if found.
     *
     * @param frameUrl Url of current frame.
     *
     * @returns Document-level allowlist rule if found, otherwise null.
     */
    matchFrame(frameUrl) {
        if (!this.engine || !isHttpOrWsRequest(frameUrl)) {
            return null;
        }
        return this.engine.matchFrame(frameUrl);
    }
    /**
     * Gets cosmetic result for the specified url and cosmetic options if
     * engine is started.
     * Otherwise returns empty CosmeticResult.
     *
     * @param url Hostname to check.
     * @param option Mask of enabled cosmetic types.
     *
     * @returns Cosmetic result.
     */
    getCosmeticResult(url, option) {
        if (!this.engine) {
            return new CosmeticResult();
        }
        const frameUrl = getHost(url);
        const request = new Request(url, frameUrl, RequestType.Document);
        return this.engine.getCosmeticResult(request, option);
    }
    /**
     * Gets current loaded rules in the filtering engine
     * (except declarative rules).
     *
     * @returns Number of loaded rules in the filtering engine.
     */
    getRulesCount() {
        return this.engine ? this.engine.getRulesCount() : 0;
    }
    /**
     * Searched for cosmetic rules by match query.
     *
     * @param matchQuery Query against which the request would be matched.
     *
     * @returns Cosmetic result.
     */
    matchCosmetic(matchQuery) {
        if (!this.engine || !isHttpRequest(matchQuery.frameUrl)) {
            return new CosmeticResult();
        }
        const matchingResult = this.matchRequest(matchQuery);
        if (!matchingResult) {
            return new CosmeticResult();
        }
        const cosmeticOption = matchingResult.getCosmeticOption();
        return this.getCosmeticResult(matchQuery.requestUrl, cosmeticOption);
    }
    /**
     * Matches the specified request against the filtering engine and returns the matching result.
     *
     * @param matchQuery Item of {@link MatchQuery}, contains request details.
     *
     * @returns Item of {@link MatchingResult} or null, if engine is not started.
     */
    matchRequest(matchQuery) {
        if (!this.engine) {
            return null;
        }
        const { requestUrl, frameUrl, requestType, frameRule, } = matchQuery;
        const request = new Request(requestUrl, frameUrl, requestType);
        return this.engine.matchRequest(request, frameRule);
    }
    /**
     * Checks if the filter with the specified id is local (built-in).
     *
     * @param filterId Filter id to check.
     *
     * @returns `true` if the filter is local, `false` otherwise.
     */
    isLocalFilter(filterId) {
        return this.localRulesFiltersIds.includes(filterId);
    }
    /**
     * Checks if the filter with the specified id is defined by user,
     * i.e. User rules.
     *
     * @param filterId Filter id to check.
     *
     * @returns `true` if the filter is defined by user, `false` otherwise.
     */
    isUserRulesFilter(filterId) {
        return filterId === this.userFilterId;
    }
    /**
     * Retrieves rule text by filter list id and rule index.
     *
     * @param filterListId Filter list id.
     * @param ruleIndex Rule index.
     *
     * @returns Rule text or `null` if rule is not found.
     */
    retrieveRuleText(filterListId, ruleIndex) {
        return this.engine?.retrieveRuleText(filterListId, ruleIndex) ?? null;
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
        return this.engine?.retrieveOriginalRuleText(filterId, ruleIndex) ?? null;
    }
}
const engineApi = new EngineApi();

/**
 * Matches rules from {@link EngineApi} based on current {@link Allowlist} state.
 */
class DocumentApi {
    /**
     * Match frame rule based on allowlist state.
     *
     * @param frameUrl Frame url.
     *
     * @returns Matched rule or null.
     */
    static matchFrame(frameUrl) {
        const { enabled, inverted } = allowlistApi;
        /**
         * If inverted allowlist enabled, use specific matching strategy.
         */
        if (enabled && inverted) {
            return DocumentApi.matchFrameInverted(frameUrl);
        }
        /**
         * If allowlist mode is default, request rule from engine.
         * If allowlist is enabled, rules have already loaded.
         */
        return engineApi.matchFrame(frameUrl);
    }
    /**
     * Creates allowlist rule for domains that are not in the inverted list.
     * In other cases returns engine matched rule.
     *
     * @param frameUrl Frame url.
     *
     * @returns Matched rule or null.
     */
    static matchFrameInverted(frameUrl) {
        const domain = getDomain(frameUrl);
        if (!domain) {
            return null;
        }
        const upperDomain = getUpperLevelDomain(domain);
        if (!allowlistApi.domains.includes(domain) && !allowlistApi.domains.includes(`*.${upperDomain}`)) {
            return AllowlistApi.createAllowlistRule(domain);
        }
        return engineApi.matchFrame(frameUrl);
    }
}

/**
 * Frame context data for MV3.
 *
 * @see {@link FrameCommon} description.
 */
class FrameMV3 extends FrameCommon {
    /**
     * Prepared cosmetic result for the frame in MV3.
     *
     * This data is saved in the frame because it is needed for injecting
     * cosmetic rules into the frames.
     *
     * Optional, since this data will be computed after the frame is created
     * and may not be available immediately, but it should be available.
     */
    preparedCosmeticResult;
}

/**
 * Tab context.
 */
class TabContext extends TabContextCommon {
    info;
    filteringLog;
    /**
     * Context constructor.
     *
     * @param info Webextension API tab data.
     * @param filteringLog Filtering Log API.
     */
    constructor(info, filteringLog = defaultFilteringLog) {
        super(info, filteringLog);
        this.info = info;
        this.filteringLog = filteringLog;
    }
    // TODO: consider moving to common class AG-39552.
    /**
     * Creates context for new tab.
     *
     * @param tab Webextension API tab data.
     *
     * @returns Tab context for new tab.
     */
    static createNewTabContext(tab) {
        const tabContext = new TabContext(tab);
        // In some cases, tab is created while browser navigation processing.
        // For example: when you navigate outside the browser or create new empty tab.
        // `pendingUrl` represent url navigated to. We check it first.
        // If server returns redirect, new main frame url will be processed in WebRequestApi.
        const url = tab.pendingUrl || tab.url;
        if (url && isHttpOrWsRequest(url)) {
            tabContext.mainFrameRule = DocumentApi.matchFrame(url);
            tabContext.frames.set(MAIN_FRAME_ID, new FrameMV3({
                tabId: tab.id,
                frameId: MAIN_FRAME_ID,
                parentFrameId: NO_PARENT_FRAME_ID,
                url,
                // timestamp is 0, so that it will be recalculated in the next event
                timeStamp: 0,
            }));
        }
        return tabContext;
    }
}

/**
 * TabsApi works with {@link browser.tabs} to record tabs' URLs - they are
 * needed for work domain-specific blocking/allowing cosmetic rules.
 */
class TabsApi extends TabsApiCommon {
    /**
     * @inheritdoc
     */
    // eslint-disable-next-line class-methods-use-this
    createTabContext(tab) {
        return TabContext.createNewTabContext(tab);
    }
    /**
     * Updates tab's main frame rule.
     *
     * @param tabId Tab ID.
     */
    updateTabMainFrameRule(tabId) {
        const tabContext = this.context.get(tabId);
        if (!tabContext?.info.url || !isHttpOrWsRequest(tabContext.info.url)) {
            return;
        }
        tabContext.mainFrameRule = DocumentApi.matchFrame(tabContext.info.url);
    }
    /**
     * Updates tab context data after filter engine load.
     */
    async updateCurrentTabsMainFrameRules() {
        const currentTabs = await browser.tabs.query({});
        if (!Array.isArray(currentTabs)) {
            return;
        }
        for (const tab of currentTabs) {
            if (typeof tab.id === 'number') {
                this.updateTabMainFrameRule(tab.id);
            }
        }
    }
    /**
     * Checks if tab is a new tab.
     *
     * TODO: Change in AG-22715: if the lifetime of the tab is less than N
     * seconds (for example 5 seconds), then it is a popup and we close it. If
     * the opposite is true, then we block it with a stub.
     *
     * @param tabId Tab ID.
     *
     * @returns True if tab is a new tab.
     */
    isNewPopupTab(tabId) {
        const tab = this.context.get(tabId);
        if (!tab) {
            return false;
        }
        const url = tab.info?.url;
        return url === undefined
            || url === ''
            || url === 'about:blank';
    }
}
const tabsApi = new TabsApi();

/**
 * This class is wrapping around chrome.scripting API.
 */
class ScriptingApi {
    /**
     * Injects CSS into a tab.
     *
     * @param params Parameters for applying CSS rules.
     * @param params.tabId Tab id.
     * @param params.frameId Frame id.
     * @param params.cssText CSS text.
     *
     * @returns Promise that resolves when the CSS is injected.
     */
    static async insertCSS({ tabId, frameId, cssText, }) {
        await chrome.scripting.insertCSS({
            css: cssText,
            origin: 'USER',
            target: { tabId, frameIds: [frameId] },
        });
    }
    /**
     * Executes a scriptlet within the scope of the page.
     *
     * @param params Parameters for executing the scriptlet.
     * @param params.tabId The ID of the tab.
     * @param params.frameId The ID of the frame.
     * @param params.scriptletData The scriptlet data to be executed.
     * @param params.domainName The domain name of the frame. Used for debugging.
     *
     * @returns Promise that resolves when the script is executed.
     */
    static async executeScriptlet({ tabId, frameId, scriptletData, domainName, }) {
        const params = {
            ...scriptletData.params,
            uniqueId: String(appContext.startTimeMs),
            verbose: appContext.configuration?.settings.debugScriptlets || false,
            domainName: domainName ?? undefined,
        };
        /**
         * This is STEP 4.2: Apply Scriptlet functions from pre-built filters — via chrome.scripting API.
         *
         * The whole process is explained below.
         *
         * To fully comply with Chrome Web Store policies regarding remote code execution,
         * we implement a strict security-focused approach for Scriptlet and JavaScript rules execution.
         *
         * 1. Default - regular users that did not grant User scripts API permission explicitly:
         *    - We collect and pre-build script rules from the filters and statically bundle
         *      them into the extension - STEP 1. See 'updateLocalResourcesForMv3' in our build tools.
         *      IMPORTANT: all scripts and their arguments are local and bundled within the extension.
         *    - These pre-verified local scripts are passed to the engine - STEP 2.
         *    - At runtime before the execution, we check if each script rule is included
         *      in our local scripts list (STEP 3).
         *    - Only pre-verified local scripts are executed via chrome.scripting API (STEP 4.1 and 4.2).
         *      All other scripts are discarded.
         *    - Custom filters are NOT allowed for regular users to prevent any possibility
         *      of remote code execution, regardless of rule interpretation.
         *
         * 2. For advanced users that explicitly granted User scripts API permission -
         *    via enabling the Developer mode or Allow user scripts in the extension details:
         *    - Custom filters are allowed and may contain Scriptlet and JS rules
         *      that can be executed using the browser's built-in userScripts API (STEP 4.3),
         *      which provides a secure sandbox.
         *    - This execution bypasses the local script verification process but remains
         *      isolated and secure through Chrome's native sandboxing.
         *    - This mode requires explicit user activation and is intended for advanced users only.
         *
         * IMPORTANT:
         * Custom filters are ONLY supported when User scripts API permission is explicitly enabled.
         * This strict policy prevents Chrome Web Store rejection due to potential remote script execution.
         * When custom filters are allowed, they may contain:
         * 1. Network rules – converted to DNR rules and applied via dynamic rules.
         * 2. Cosmetic rules – interpreted directly in the extension code.
         * 3. Scriptlet and JS rules – executed via the browser's userScripts API (userScripts.execute)
         *    with Chrome's native sandboxing providing security isolation.
         *
         * For regular users without User scripts API permission (default case):
         * - Only pre-bundled filters with statically verified scripts are supported.
         * - Downloading custom filters or any rules from remote sources is blocked entirely
         *   to ensure compliance with the store policies.
         *
         * This implementation ensures perfect compliance with Chrome Web Store policies
         * by preventing any possibility of remote code execution for regular users.
         *
         * It is possible to follow all places using this logic by searching JS_RULES_EXECUTION.
         */
        await chrome.scripting.executeScript({
            target: { tabId, frameIds: [frameId] },
            func: scriptletData.func,
            injectImmediately: true,
            world: 'MAIN',
            args: [params, scriptletData.params.args],
        });
    }
    /**
     * Executes a script within the scope of the page.
     *
     * @param params Parameters for executing the script.
     * @param params.tabId The ID of the tab.
     * @param params.frameId The ID of the frame.
     * @param params.scriptFunction The script function to be executed.
     * @param params.args Optional arguments to pass to the script function.
     * @param params.world The execution world. Defaults to `'MAIN'`.
     *
     * @returns Promise that resolves when the script is executed.
     */
    static async executeScriptFunc({ tabId, frameId, scriptFunction, args, world = 'MAIN', }) {
        /**
         * This is STEP 4.2: Apply JS functions from pre-built filters — via chrome.scripting API.
         *
         * The whole process is explained below.
         *
         * To fully comply with Chrome Web Store policies regarding remote code execution,
         * we implement a strict security-focused approach for Scriptlet and JavaScript rules execution.
         *
         * 1. Default - regular users that did not grant User scripts API permission explicitly:
         *    - We collect and pre-build script rules from the filters and statically bundle
         *      them into the extension - STEP 1. See 'updateLocalResourcesForMv3' in our build tools.
         *      IMPORTANT: all scripts and their arguments are local and bundled within the extension.
         *    - These pre-verified local scripts are passed to the engine - STEP 2.
         *    - At runtime before the execution, we check if each script rule is included
         *      in our local scripts list (STEP 3).
         *    - Only pre-verified local scripts are executed via chrome.scripting API (STEP 4.1 and 4.2).
         *      All other scripts are discarded.
         *    - Custom filters are NOT allowed for regular users to prevent any possibility
         *      of remote code execution, regardless of rule interpretation.
         *
         * 2. For advanced users that explicitly granted User scripts API permission -
         *    via enabling the Developer mode or Allow user scripts in the extension details:
         *    - Custom filters are allowed and may contain Scriptlet and JS rules
         *      that can be executed using the browser's built-in userScripts API (STEP 4.3),
         *      which provides a secure sandbox.
         *    - This execution bypasses the local script verification process but remains
         *      isolated and secure through Chrome's native sandboxing.
         *    - This mode requires explicit user activation and is intended for advanced users only.
         *
         * IMPORTANT:
         * Custom filters are ONLY supported when User scripts API permission is explicitly enabled.
         * This strict policy prevents Chrome Web Store rejection due to potential remote script execution.
         * When custom filters are allowed, they may contain:
         * 1. Network rules – converted to DNR rules and applied via dynamic rules.
         * 2. Cosmetic rules – interpreted directly in the extension code.
         * 3. Scriptlet and JS rules – executed via the browser's userScripts API (userScripts.execute)
         *    with Chrome's native sandboxing providing security isolation.
         *
         * For regular users without User scripts API permission (default case):
         * - Only pre-bundled filters with statically verified scripts are supported.
         * - Downloading custom filters or any rules from remote sources is blocked entirely
         *   to ensure compliance with the store policies.
         *
         * This implementation ensures perfect compliance with Chrome Web Store policies
         * by preventing any possibility of remote code execution for regular users.
         *
         * It is possible to follow all places using this logic by searching JS_RULES_EXECUTION.
         */
        await chrome.scripting.executeScript({
            target: { tabId, frameIds: [frameId] },
            func: scriptFunction,
            args: args ?? [],
            injectImmediately: true,
            world,
        });
    }
}

/**
 * Due to Chrome Web Store policies, we cannot execute remotely hosted code.
 * Therefore, we use the following approach:
 *
 * 1. We bundle AdGuard’s script rules into a local file included with the extension.
 * 2. At runtime, we verify each script rule to see if it's included in our local bundle.
 *    If it is, we allow it to run; otherwise, we discard it.
 *
 * The whole process is explained below.
 *
 * To fully comply with Chrome Web Store policies regarding remote code execution,
 * we implement a strict security-focused approach for Scriptlet and JavaScript rules execution.
 *
 * 1. Default - regular users that did not grant User scripts API permission explicitly:
 *    - We collect and pre-build script rules from the filters and statically bundle
 *      them into the extension - STEP 1. See 'updateLocalResourcesForMv3' in our build tools.
 *      IMPORTANT: all scripts and their arguments are local and bundled within the extension.
 *    - These pre-verified local scripts are passed to the engine - STEP 2.
 *    - At runtime before the execution, we check if each script rule is included
 *      in our local scripts list (STEP 3).
 *    - Only pre-verified local scripts are executed via chrome.scripting API (STEP 4.1 and 4.2).
 *      All other scripts are discarded.
 *    - Custom filters are NOT allowed for regular users to prevent any possibility
 *      of remote code execution, regardless of rule interpretation.
 *
 * 2. For advanced users that explicitly granted User scripts API permission -
 *    via enabling the Developer mode or Allow user scripts in the extension details:
 *    - Custom filters are allowed and may contain Scriptlet and JS rules
 *      that can be executed using the browser's built-in userScripts API (STEP 4.3),
 *      which provides a secure sandbox.
 *    - This execution bypasses the local script verification process but remains
 *      isolated and secure through Chrome's native sandboxing.
 *    - This mode requires explicit user activation and is intended for advanced users only.
 *
 * IMPORTANT:
 * Custom filters are ONLY supported when User scripts API permission is explicitly enabled.
 * This strict policy prevents Chrome Web Store rejection due to potential remote script execution.
 * When custom filters are allowed, they may contain:
 * 1. Network rules – converted to DNR rules and applied via dynamic rules.
 * 2. Cosmetic rules – interpreted directly in the extension code.
 * 3. Scriptlet and JS rules – executed via the browser's userScripts API (userScripts.execute)
 *    with Chrome's native sandboxing providing security isolation.
 *
 * For regular users without User scripts API permission (default case):
 * - Only pre-bundled filters with statically verified scripts are supported.
 * - Downloading custom filters or any rules from remote sources is blocked entirely
 *   to ensure compliance with the store policies.
 *
 * This implementation ensures perfect compliance with Chrome Web Store policies
 * by preventing any possibility of remote code execution for regular users.
 *
 * It is possible to follow all places using this logic by searching JS_RULES_EXECUTION.
 */
class LocalScriptRulesService {
    /**
     * When {@link setLocalScriptRules} is called, this holds a list of prebuilt JS rules
     * allowed to run. If it is never called, this remains undefined.
     */
    localScripts;
    /**
     * Stores prebuilt JS rules in memory for later use.
     *
     * @param localScriptRules A map of script text to their corresponding functions.
     */
    setLocalScriptRules(localScriptRules) {
        this.localScripts = localScriptRules;
    }
    /**
     * Checks if the given script text is included in our prebuilt local scripts.
     *
     * This helper method is primarily for transparency during the Chrome Web Store review process.
     *
     * @param scriptText The script rule to verify.
     *
     * @returns True if the script is part of our local collection, false otherwise.
     */
    isLocalScript(scriptText) {
        if (this.localScripts === undefined) {
            return false;
        }
        return this.localScripts[scriptText] !== undefined;
    }
    /**
     * Retrieves the function associated with the specified script text
     * from our local scripts collection.
     *
     * @param scriptText The script content to look up.
     *
     * @returns The corresponding function if found, or null otherwise.
     */
    getLocalScriptFunction(scriptText) {
        if (this.localScripts === undefined) {
            return null;
        }
        const scriptFunc = this.localScripts[scriptText];
        return scriptFunc !== undefined ? scriptFunc : null;
    }
}
const localScriptRulesService = new LocalScriptRulesService();

/**
 * Cosmetic api class.
 * Used to prepare and inject javascript and css into pages.
 */
class CosmeticApi extends CosmeticApiCommon {
    /**
     * This is STEP 3: All previously matched script rules are processed and filtered:
     * Scriptlet and JS rules from pre-built filters (previously collected, pre-built and passed to the engine)
     * are going to be executed as functions via chrome.scripting API,
     * or userScripts API if User scripts API permission is explicitly granted.
     *
     * The whole process is explained below.
     *
     * To fully comply with Chrome Web Store policies regarding remote code execution,
     * we implement a strict security-focused approach for Scriptlet and JavaScript rules execution.
     *
     * 1. Default - regular users that did not grant User scripts API permission explicitly:
     *    - We collect and pre-build script rules from the filters and statically bundle
     *      them into the extension - STEP 1. See 'updateLocalResourcesForMv3' in our build tools.
     *      IMPORTANT: all scripts and their arguments are local and bundled within the extension.
     *    - These pre-verified local scripts are passed to the engine - STEP 2.
     *    - At runtime before the execution, we check if each script rule is included
     *      in our local scripts list (STEP 3).
     *    - Only pre-verified local scripts are executed via chrome.scripting API (STEP 4.1 and 4.2).
     *      All other scripts are discarded.
     *    - Custom filters are NOT allowed for regular users to prevent any possibility
     *      of remote code execution, regardless of rule interpretation.
     *
     * 2. For advanced users that explicitly granted User scripts API permission -
     *    via enabling the Developer mode or Allow user scripts in the extension details:
     *    - Custom filters are allowed and may contain Scriptlet and JS rules
     *      that can be executed using the browser's built-in userScripts API (STEP 4.3),
     *      which provides a secure sandbox.
     *    - This execution bypasses the local script verification process but remains
     *      isolated and secure through Chrome's native sandboxing.
     *    - This mode requires explicit user activation and is intended for advanced users only.
     *
     * IMPORTANT:
     * Custom filters are ONLY supported when User scripts API permission is explicitly enabled.
     * This strict policy prevents Chrome Web Store rejection due to potential remote script execution.
     * When custom filters are allowed, they may contain:
     * 1. Network rules – converted to DNR rules and applied via dynamic rules.
     * 2. Cosmetic rules – interpreted directly in the extension code.
     * 3. Scriptlet and JS rules – executed via the browser's userScripts API (userScripts.execute)
     *    with Chrome's native sandboxing providing security isolation.
     *
     * For regular users without User scripts API permission (default case):
     * - Only pre-bundled filters with statically verified scripts are supported.
     * - Downloading custom filters or any rules from remote sources is blocked entirely
     *   to ensure compliance with the store policies.
     *
     * This implementation ensures perfect compliance with Chrome Web Store policies
     * by preventing any possibility of remote code execution for regular users.
     *
     * It is possible to follow all places using this logic by searching JS_RULES_EXECUTION.
     */
    /**
     * Generates data for scriptlets and local scripts:
     * - functions for scriptlets,
     * - script texts for JS rules from pre-built filters.
     *
     * @param rules Cosmetic rules.
     *
     * @returns An object with data for scriptlets and script texts.
     */
    static getScriptsAndScriptletsData(rules) {
        if (rules.length === 0) {
            return {
                scriptTexts: [],
                scriptletDataList: [],
            };
        }
        const uniqueScriptTexts = new Set();
        const scriptletDataList = [];
        for (let i = 0; i < rules.length; i += 1) {
            const rule = rules[i];
            if (rule.isScriptlet) {
                const scriptletData = rule.getScriptletData();
                if (scriptletData) {
                    scriptletDataList.push(scriptletData);
                }
            }
            else {
                // TODO: Optimize script injection by checking if common scripts (e.g., AG_)
                //  are actually used in the rules. If not, avoid injecting them to reduce overhead.
                const ruleScriptText = rule.getContent();
                if (ruleScriptText) {
                    uniqueScriptTexts.add(ruleScriptText);
                }
            }
        }
        return {
            scriptTexts: [...uniqueScriptTexts],
            scriptletDataList,
        };
    }
    /**
     * Builds scripts from cosmetic rules.
     *
     * @param rules Cosmetic rules.
     * @param frameUrl Frame url.
     *
     * @returns Script text or empty string if no script rules are passed.
     *
     * @todo Move to common class when a way to use appContext in common
     * class will be found.
     */
    static getScriptText(rules, frameUrl) {
        if (rules.length === 0) {
            return '';
        }
        const uniqueScriptStrings = new Set();
        // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2584
        const debug = appContext?.configuration?.settings?.debugScriptlets;
        const scriptParams = {
            debug,
            frameUrl,
        };
        rules.forEach((rule) => {
            const scriptStr = rule.getScript(scriptParams);
            if (scriptStr) {
                uniqueScriptStrings.add(scriptStr);
            }
        });
        const scriptText = CosmeticApi.combineScripts(uniqueScriptStrings);
        return CosmeticApi.wrapScriptText(scriptText);
    }
    /**
     * Returns content script data for applying cosmetic.
     *
     * @param frameUrl Frame url.
     * @param tabId Tab id.
     * @param frameId Frame id.
     *
     * @returns Content script data for applying cosmetic.
     */
    static getContentScriptData(frameUrl, tabId, frameId) {
        const data = {
            isAppStarted: false,
            areHitsStatsCollected: false,
            extCssRules: null,
            nativeCssSelectors: null,
        };
        // if storage is not initialized, then app is not ready yet.
        if (!appContext.isStorageInitialized) {
            return data;
        }
        const { isAppStarted, configuration } = appContext;
        const areHitsStatsCollected = configuration?.settings.collectStats || false;
        data.isAppStarted = isAppStarted;
        data.areHitsStatsCollected = areHitsStatsCollected;
        const tabContext = tabsApi.getTabContext(tabId);
        if (!tabContext?.info.url) {
            return data;
        }
        // Do not collect hits stats if website is allowlisted
        const isDocumentAllowlisted = !!tabContext.mainFrameRule
            && tabContext.mainFrameRule.isFilteringDisabled();
        data.areHitsStatsCollected = data.areHitsStatsCollected && !isDocumentAllowlisted;
        const matchQuery = createFrameMatchQuery(frameUrl, frameId, tabContext);
        const cosmeticResult = engineApi.matchCosmetic(matchQuery);
        data.extCssRules = CosmeticApi.getExtCssRules(cosmeticResult, {
            areHitsStatsCollected,
            // always true for MV3
            // since minimum version of mv3 browser already supports :has()
            isNativeHasSupported: true,
        });
        data.nativeCssSelectors = CosmeticApi.getNativeCssSelectors(cosmeticResult, { isNativeHasSupported: true });
        return data;
    }
    /**
     * Injects JS to specified tab and frame.
     *
     * @param tabId Tab id.
     * @param frameId Frame id.
     * @param scriptTexts Script texts to inject.
     *
     * @returns A promise that resolves when the JS is injected.
     */
    static async applyJsFuncs(tabId, frameId, scriptTexts = []) {
        if (scriptTexts.length === 0) {
            return;
        }
        const tasks = scriptTexts.map(async (scriptText) => {
            /**
             * This is STEP 4.1: Selecting only local script functions which were pre-built into the extension.
             *
             * The whole process is explained below.
             *
             * To fully comply with Chrome Web Store policies regarding remote code execution,
             * we implement a strict security-focused approach for Scriptlet and JavaScript rules execution.
             *
             * 1. Default - regular users that did not grant User scripts API permission explicitly:
             *    - We collect and pre-build script rules from the filters and statically bundle
             *      them into the extension - STEP 1. See 'updateLocalResourcesForMv3' in our build tools.
             *      IMPORTANT: all scripts and their arguments are local and bundled within the extension.
             *    - These pre-verified local scripts are passed to the engine - STEP 2.
             *    - At runtime before the execution, we check if each script rule is included
             *      in our local scripts list (STEP 3).
             *    - Only pre-verified local scripts are executed via chrome.scripting API (STEP 4.1 and 4.2).
             *      All other scripts are discarded.
             *    - Custom filters are NOT allowed for regular users to prevent any possibility
             *      of remote code execution, regardless of rule interpretation.
             *
             * 2. For advanced users that explicitly granted User scripts API permission -
             *    via enabling the Developer mode or Allow user scripts in the extension details:
             *    - Custom filters are allowed and may contain Scriptlet and JS rules
             *      that can be executed using the browser's built-in userScripts API (STEP 4.3),
             *      which provides a secure sandbox.
             *    - This execution bypasses the local script verification process but remains
             *      isolated and secure through Chrome's native sandboxing.
             *    - This mode requires explicit user activation and is intended for advanced users only.
             *
             * IMPORTANT:
             * Custom filters are ONLY supported when User scripts API permission is explicitly enabled.
             * This strict policy prevents Chrome Web Store rejection due to potential remote script execution.
             * When custom filters are allowed, they may contain:
             * 1. Network rules – converted to DNR rules and applied via dynamic rules.
             * 2. Cosmetic rules – interpreted directly in the extension code.
             * 3. Scriptlet and JS rules – executed via the browser's userScripts API (userScripts.execute)
             *    with Chrome's native sandboxing providing security isolation.
             *
             * For regular users without User scripts API permission (default case):
             * - Only pre-bundled filters with statically verified scripts are supported.
             * - Downloading custom filters or any rules from remote sources is blocked entirely
             *   to ensure compliance with the store policies.
             *
             * This implementation ensures perfect compliance with Chrome Web Store policies
             * by preventing any possibility of remote code execution for regular users.
             *
             * It is possible to follow all places using this logic by searching JS_RULES_EXECUTION.
             */
            /**
             * Here we check if the script text is local to guarantee that we do not execute remote code.
             */
            const isLocalScript = localScriptRulesService.isLocalScript(scriptText);
            if (!isLocalScript) {
                return;
            }
            /**
             * Here we get the function associated with the script text.
             */
            const localScriptFunction = localScriptRulesService.getLocalScriptFunction(scriptText);
            if (!localScriptFunction) {
                return;
            }
            try {
                await ScriptingApi.executeScriptFunc({
                    tabId,
                    frameId,
                    scriptFunction: localScriptFunction,
                });
            }
            catch (e) {
                logger.info(`[tsweb.CosmeticApi.applyJsFuncs]: error occurred during injection into tabId ${tabId} and frameId ${frameId}: `, e);
            }
        });
        // allSettled is used to ensure that all scripts will injected
        // even if some of them fail.
        await Promise.allSettled(tasks);
    }
    /**
     * Injects js to specified tab and frame.
     *
     * @param tabId Tab id.
     * @param frameId Frame id.
     * @param scriptletDataList List of scriptlet data to inject.
     * @param frameContextUrl Frame context url.
     */
    static async applyScriptlets(tabId, frameId, scriptletDataList, frameContextUrl) {
        if (scriptletDataList.length === 0) {
            return;
        }
        // allSettled is used to ensure that all scriptlets will injected
        // even if some of them fail.
        await Promise.allSettled(scriptletDataList.map(async (scriptletData) => {
            try {
                await ScriptingApi.executeScriptlet({
                    tabId,
                    frameId,
                    scriptletData,
                    domainName: getDomain(frameContextUrl),
                });
            }
            catch (e) {
                logger.info(`[tsweb.CosmeticApi.applyScriptlets]: error occurred during injection to tabId ${tabId} and frameId ${frameId}: ${e}`);
            }
        }));
    }
    /**
     * Checks if cosmetics should be applied —
     * background page or extension pages do not need cosmetics applied.
     *
     * @param tabId Tab id.
     * @param frameUrl Frame url.
     *
     * @returns True if cosmetics should be applied, false otherwise.
     */
    static shouldApplyCosmetics(tabId, frameUrl) {
        // no need to apply cosmetic rules on background or extension pages
        if (tabId === BACKGROUND_TAB_ID || isExtensionUrl(frameUrl)) {
            return false;
        }
        return true;
    }
    /**
     * Injects css to specified tab id and frame id.
     *
     * @param tabId Tab id.
     * @param frameId Frame id.
     * @param cssText CSS text to inject.
     *
     * @returns A promise that resolves when the CSS is injected.
     */
    static async applyCss(tabId, frameId, cssText) {
        if (!cssText) {
            return;
        }
        try {
            await ScriptingApi.insertCSS({
                cssText,
                tabId,
                frameId,
            });
        }
        catch (e) {
            logger.info(`[tsweb.CosmeticApi.applyCss]: error occurred during injection into tabId ${tabId} and frameId ${frameId} `, e);
        }
    }
    /**
     * Filters script rules for logging.
     *
     * @param params Data for JS rule logging.
     *
     * @returns Script rules which expected to be applied and logged.
     */
    static filterScriptRulesForLog(params) {
        const { preparedCosmeticResult: { localRules, remoteRules } } = params;
        // If User scripts API is enabled, we apply all script rules
        if (UserScriptsApi.isEnabled) {
            return localRules.rawRules.concat(remoteRules.rawRules);
        }
        // Otherwise, we apply only local script rules which were pre-built into
        // the extension.
        return localRules.rawRules.filter((rule) => {
            const ruleFromBuiltInFilter = engineApi.isLocalFilter(rule.getFilterListId());
            const ruleFromUserRules = engineApi.isUserRulesFilter(rule.getFilterListId());
            // Double-check that the rule was correctly marked as local.
            if (!ruleFromBuiltInFilter && !ruleFromUserRules) {
                return false;
            }
            // All rules from built-in filter are allowed.
            if (ruleFromBuiltInFilter) {
                return true;
            }
            // But local rules from user rules filter are allowed only
            // if they are exists in built in filters.
            const scriptText = rule.getScript();
            if (!scriptText) {
                return false;
            }
            const isLocalScript = localScriptRulesService.isLocalScript(scriptText);
            if (!isLocalScript) {
                return false;
            }
            return true;
        });
    }
    /**
     * Logs JS rules applied to specific frame.
     *
     * We need a separate function for logging because script rules can be logged
     * before injection to avoid duplicate logs while the JS rule is being applied.
     *
     * See {@link WebRequestApi.onBeforeRequest} for details.
     *
     * TODO: Since injection and logging are happened in different places,
     * we do not track was injection successful or not - we log all rules which
     * expected to be applied. We should track injection result.
     *
     * @param params Data for JS rule logging.
     */
    static logScriptRules(params) {
        const scriptRules = CosmeticApi.filterScriptRulesForLog(params);
        super.logScriptRules(params, scriptRules, engineApi);
    }
    /**
     * Applies cosmetic rules to the specified tab and frame.
     *
     * @param tabId Tab id.
     * @param frameId Frame id.
     * @param shouldApplyCss We are not applying CSS on onResponseStarted, since
     * it might be too early. Instead, we wait until the DOM is ready on
     * onCommitted and apply them then.
     *
     * @returns A promise that resolves when the cosmetic rules are applied.
     */
    static async applyCosmeticRules(tabId, frameId, shouldApplyCss) {
        const frameContext = tabsApi.getFrameContext(tabId, frameId);
        if (!frameContext || !frameContext.preparedCosmeticResult) {
            logger.debug(`[tsweb.CosmeticApi.applyCosmeticRules]: no prepared cosmetic result for tabId ${tabId} and frameId ${frameId}`);
            return [];
        }
        const tasks = [
            CosmeticApi.applyLocalCosmeticRules(tabId, frameId, frameContext.preparedCosmeticResult.localRules, frameContext.url),
            CosmeticApi.applyRemoteCosmeticRules(tabId, frameId, frameContext.preparedCosmeticResult.remoteRules),
        ];
        if (shouldApplyCss) {
            tasks.push(CosmeticApi.applyCss(tabId, frameId, frameContext.preparedCosmeticResult.cssText));
        }
        return Promise.allSettled(tasks);
    }
    /**
     * Applies local cosmetic rules to the specified tab and frame via using
     * Scripting API.
     * It is safe since local rules are pre-built into the extension
     * and do not contain any remote code.
     *
     * @param tabId Tab id.
     * @param frameId Frame id.
     * @param localRules Local rules to apply.
     * @param frameContextUrl Frame context url.
     *
     * @returns A promise that resolves when the local rules are applied.
     */
    static async applyLocalCosmeticRules(tabId, frameId, localRules, frameContextUrl) {
        const { scriptTexts, scriptletDataList } = localRules;
        await CosmeticApi.applyJsFuncs(tabId, frameId, scriptTexts);
        await CosmeticApi.applyScriptlets(tabId, frameId, scriptletDataList, frameContextUrl);
    }
    /**
     * Injects JS functions and scriptlets to specified tab and frame via using
     * UserScripts API.
     *
     * @param tabId Tab id.
     * @param frameId Frame id.
     * @param remoteRules JS rules from remote filters, e.g. custom filters or
     * user rules.
     *
     * @returns A promise that resolves when the remote rules are applied.
     */
    static async applyRemoteCosmeticRules(tabId, frameId, remoteRules) {
        // If User scripts API is not enabled, we can not apply remote cosmetic
        // rules due to Chrome Web Store policies.
        if (!UserScriptsApi.isEnabled) {
            return;
        }
        const { scriptText } = remoteRules;
        if (!scriptText) {
            return;
        }
        try {
            await UserScriptsApi.executeScripts({
                tabId,
                frameId,
                scriptText,
            });
        }
        catch (e) {
            logger.info('[tsweb.CosmeticApi.applyRemoteCosmeticRules]: error occurred during injection: ', e);
        }
    }
}

/**
 * Cosmetic frame processor.
 */
class CosmeticFrameProcessor {
    /**
     * Time threshold to consider two events as part of the same frame.
     * The value is chosen experimentally; in most cases, 100 ms is sufficient to consider the onBeforeNavigate
     * and onBeforeRequest events as related to the same frame. It is also small enough to ignore manual page
     * reloads by the user.
     */
    static SAME_FRAME_THRESHOLD_MS = 100;
    /**
     * Check if recalculation should be skipped.
     * If the time passed between two events is less than the threshold,
     * we consider it part of the same frame and do not recalculate.
     * Additionally, we check if the URL has changed.
     *
     * @param tabId Tab id.
     * @param frameId Frame id.
     * @param url Url.
     * @param timeStamp Event timestamp.
     *
     * @returns True if recalculation should be skipped.
     */
    static shouldSkipRecalculation(tabId, frameId, url, timeStamp) {
        const frameContext = tabsApi.getFrameContext(tabId, frameId);
        if (!frameContext) {
            return false;
        }
        // do not skip recalculation if the URL has changed
        if (frameContext.url !== url) {
            return false;
        }
        const timeDiff = Math.abs(frameContext.timeStamp - timeStamp);
        return timeDiff < CosmeticFrameProcessor.SAME_FRAME_THRESHOLD_MS;
    }
    /**
     * Extract cosmetic rules from the matching result and prepare them for
     * injection to reduce injection time.
     *
     * @param cosmeticResult Cosmetic result to prepare.
     *
     * @returns Prepared cosmetic result with CSS and scripts rules.
     */
    static prepareCosmeticResult(cosmeticResult) {
        const scriptRules = cosmeticResult.getScriptRules();
        const { localRules, remoteRules, } = CosmeticFrameProcessor.splitLocalRemoteScriptRules(scriptRules);
        const areHitsStatsCollected = appContext.configuration?.settings.collectStats || false;
        const preparedCosmeticResult = {
            cssText: CosmeticApi.getCssText(cosmeticResult, {
                areHitsStatsCollected,
                // always true for MV3
                isNativeHasSupported: true,
            }),
            // Local script rules should be processed separately
            // because they will be injected with two different calls
            // to scripting API.
            localRules: {
                ...CosmeticApi.getScriptsAndScriptletsData(localRules),
                rawRules: localRules,
            },
            // Remote script rules should be combined into one script text
            // for the user scripts API.
            remoteRules: {
                scriptText: CosmeticApi.getScriptText(remoteRules),
                rawRules: remoteRules,
            },
        };
        return preparedCosmeticResult;
    }
    /**
     * Handle sub frame without url.
     *
     * @param props Handle sub frame without url props.
     */
    static handleSubFrameWithoutUrl(props) {
        const { tabId, frameId, mainFrameUrl, parentDocumentId, } = props;
        let parentFrame;
        let tempParentDocumentId = parentDocumentId;
        while (tempParentDocumentId) {
            parentFrame = tabsApi.getByDocumentId(tabId, tempParentDocumentId);
            tempParentDocumentId = parentFrame?.parentDocumentId;
            if (isHttpRequest(parentFrame?.url)) {
                break;
            }
        }
        if (parentFrame) {
            tabsApi.updateFrameContext(tabId, frameId, {
                preparedCosmeticResult: parentFrame.preparedCosmeticResult,
                mainFrameUrl,
            });
        }
    }
    /**
     * Handle sub frame with url.
     *
     * @param props Handle sub frame with url props.
     */
    static handleSubFrameWithUrl(props) {
        const { url, tabId, frameId, mainFrameUrl, mainFrameRule, } = props;
        const result = engineApi.matchRequest({
            requestUrl: url,
            frameUrl: mainFrameUrl || url,
            requestType: RequestType.SubDocument,
            frameRule: mainFrameRule,
        });
        if (!result) {
            return;
        }
        const cosmeticResult = engineApi.getCosmeticResult(url, result.getCosmeticOption());
        const preparedCosmeticResult = CosmeticFrameProcessor.prepareCosmeticResult(cosmeticResult);
        tabsApi.updateFrameContext(tabId, frameId, {
            mainFrameUrl,
            matchingResult: result,
            cosmeticResult,
            preparedCosmeticResult,
        });
    }
    /**
     * Handle main frame.
     *
     * @param props Handle main frame props.
     */
    static handleMainFrame(props) {
        const { url, tabId, frameId, } = props;
        tabsApi.resetBlockedRequestsCount(tabId);
        if (!isHttpRequest(url)) {
            return;
        }
        const mainFrameRule = DocumentApi.matchFrame(url);
        tabsApi.setMainFrameRule(tabId, frameId, mainFrameRule);
        const matchingResult = engineApi.matchRequest({
            requestUrl: url,
            frameUrl: url,
            requestType: RequestType.Document,
            frameRule: mainFrameRule,
        });
        if (!matchingResult) {
            return;
        }
        const cosmeticResult = engineApi.getCosmeticResult(url, matchingResult.getCosmeticOption());
        const preparedCosmeticResult = CosmeticFrameProcessor.prepareCosmeticResult(cosmeticResult);
        tabsApi.updateFrameContext(tabId, frameId, {
            matchingResult,
            cosmeticResult,
            preparedCosmeticResult,
        });
    }
    /**
     * Handles frames used here and in the {@link TabsCosmeticInjector}.
     *
     * @param props Precalculate cosmetic props.
     */
    static handleFrame(props) {
        const { tabId, frameId, url, parentDocumentId, documentLifecycle, isPrefetchRequest, } = props;
        const isMainFrame = frameId === MAIN_FRAME_ID;
        const isPrerenderRequest = documentLifecycle === DocumentLifecycle.Prerender;
        // Don't process prerender or prefetch (Speculation Rules API) requests
        // further, because they should not reset the blocked counter or
        // trigger cosmetic recalculation for the current page.
        if (isMainFrame && (isPrerenderRequest || isPrefetchRequest)) {
            return;
        }
        if (isMainFrame) {
            CosmeticFrameProcessor.handleMainFrame({
                url,
                tabId,
                frameId,
            });
        }
        else {
            const mainFrame = tabsApi.getFrameContext(tabId, MAIN_FRAME_ID);
            const mainFrameRule = mainFrame?.frameRule || null;
            const mainFrameUrl = mainFrame?.url;
            if (!isHttpRequest(url)) {
                CosmeticFrameProcessor.handleSubFrameWithoutUrl({
                    tabId,
                    frameId,
                    mainFrameUrl,
                    parentDocumentId,
                });
            }
            else {
                CosmeticFrameProcessor.handleSubFrameWithUrl({
                    url,
                    tabId,
                    frameId,
                    mainFrameUrl,
                    mainFrameRule,
                });
            }
        }
    }
    /**
     * Split local and remote script rules, it is required to achieve
     * transparency for the security model of the MV3. See the schema below:
     *
     * UserScripts API OFF
     *     static filters  -> local   - apply all [via scripting API] (since all of them are built-it).
     *     Custom filters  -> remote  - apply nothing.
     *     User rules      -> remote  - apply only built-it script rules [via scripting API].
     *
     * UserScripts API ON
     *     static filters  -> local   - apply all [via scripting API] (since all of them are built-it).
     *     Custom filters  -> remote  - apply all [via userScripts API].
     *     User rules      -> remote  - apply all [via userScripts API].
     *
     * @param scriptRules Script rules to split.
     *
     * @returns Object with split local and remote rules.
     */
    static splitLocalRemoteScriptRules(scriptRules) {
        const res = {
            localRules: [],
            remoteRules: [],
        };
        for (const rule of scriptRules) {
            const filterId = rule.getFilterListId();
            const isBuiltInRule = engineApi.isLocalFilter(filterId);
            const isUserDefinedRule = engineApi.isUserRulesFilter(filterId);
            /**
             * Rule will be marked as local if it is rule from static filter list
             * OR the user scripts permission is NOT granted AND it is user
             * defined rule. This is needed in future processing, since local
             * rules will be additionally checked for locality before injection.
             */
            if (isBuiltInRule || (!UserScriptsApi.isEnabled && isUserDefinedRule)) {
                res.localRules.push(rule);
            }
            else {
                res.remoteRules.push(rule);
            }
        }
        return res;
    }
    /**
     * Precalculate cosmetic rules for the request.
     * This method used in the webNavigation.onBeforeNavigate event and webRequest.onBeforeRequest event.
     *
     * @param props Precalculate cosmetic props.
     */
    static precalculateCosmetics(props) {
        CosmeticFrameProcessor.handleFrame(props);
    }
}

/**
 * Injects cosmetic rules into tabs, opened before app initialization.
 */
class TabsCosmeticInjector {
    /**
     * Timeout for processing open tabs during startup.
     * Fail-open: if processing takes longer than this, startup continues anyway.
     */
    static PROCESS_OPEN_TABS_TIMEOUT_MS = 10_000;
    /**
     * Creates contexts for tabs opened before api initialization and
     * applies cosmetic rules for each frame.
     * Includes a fail-open timeout to prevent blocking startup indefinitely.
     */
    static async processOpenTabs() {
        const result = await new Promise((resolve) => {
            const timeoutId = setTimeout(() => {
                resolve('timeout');
            }, TabsCosmeticInjector.PROCESS_OPEN_TABS_TIMEOUT_MS);
            TabsCosmeticInjector.doProcessOpenTabs()
                .then(() => {
                clearTimeout(timeoutId);
                resolve('done');
            })
                .catch((error) => {
                clearTimeout(timeoutId);
                logger.error('[tsweb.TabsCosmeticInjector.processOpenTabs]: error processing open tabs: ', error);
                resolve('done');
            });
        });
        if (result === 'timeout') {
            logger.debug(`[tsweb.TabsCosmeticInjector.processOpenTabs]: timeout after ${TabsCosmeticInjector.PROCESS_OPEN_TABS_TIMEOUT_MS}ms, continue startup in fail-open mode`);
        }
    }
    /**
     * Internal implementation: queries all open tabs and injects cosmetics.
     */
    static async doProcessOpenTabs() {
        const currentTabs = await browser.tabs.query({});
        const tasks = currentTabs.map((tab) => TabsCosmeticInjector.processOpenTab(tab));
        const promises = await Promise.allSettled(tasks);
        // Handles errors
        promises.forEach((promise) => {
            if (promise.status === 'rejected') {
                logger.error('[tsweb.TabsCosmeticInjector.doProcessOpenTabs]: cannot inject cosmetic to open tab: ', promise.reason);
            }
        });
        appContext.cosmeticsInjectedOnStartup = true;
    }
    /**
     * Creates context for tab opened before api initialization and
     * applies cosmetic rules for each frame.
     *
     * @param tab Tab details.
     */
    static async processOpenTab(tab) {
        if (!TabContext.isBrowserTab(tab)) {
            return;
        }
        const tabContext = new TabContext(tab);
        const tabId = tab.id;
        tabsApi.context.set(tabId, tabContext);
        tabsApi.updateTabMainFrameRule(tabId);
        const frames = await chrome.webNavigation.getAllFrames({ tabId });
        if (!frames) {
            return;
        }
        const currentTime = Date.now();
        const tasks = frames.map(async (frameDetails) => {
            const { url, frameId, parentFrameId, parentDocumentId, documentId, } = frameDetails;
            tabsApi.setFrameContext(tabId, frameId, new FrameMV3({
                tabId,
                frameId,
                parentFrameId,
                url,
                timeStamp: currentTime,
                parentDocumentId,
                documentId,
            }));
            CosmeticFrameProcessor.handleFrame({
                tabId,
                frameId,
                parentFrameId,
                url,
                timeStamp: currentTime,
                parentDocumentId,
                documentId,
            });
            // TODO: Instead of this, it’s better to use the runtime.onStartup and runtime.onInstalled
            // events to inject cosmetics once during the extension's initialization
            // and browser startup without flags.
            // However, this would require big refactoring of the extension.
            /**
             * This condition prevents applying cosmetic rules to the tab multiple times.
             * Applying them once after the extension's initialization is enough.
             */
            if (appContext.cosmeticsInjectedOnStartup) {
                return;
            }
            if (!CosmeticApi.shouldApplyCosmetics(tabId, url)) {
                logger.debug(`[tsweb.TabsCosmeticInjector.processOpenTab]: skipping cosmetics injection for background or extension page with tabId ${tabId}, frameId ${frameId} and url ${url}`);
                return;
            }
            try {
                await CosmeticApi.applyCosmeticRules(tabId, frameId, true);
            }
            catch (e) {
                logger.error(`[tsweb.TabsCosmeticInjector.processOpenTab]: error applying cosmetic rules for tabId ${tabId} and frameId ${frameId}`, e);
            }
            const frameContext = tabsApi.getFrameContext(tabId, frameId);
            if (!frameContext?.preparedCosmeticResult) {
                logger.debug(`[tsweb.TabsCosmeticInjector.processOpenTab]: cannot log script rules due to not having prepared cosmetic result for tabId: ${tabId}, frameId: ${frameId}.`);
                return;
            }
            const isMainFrame = frameId === MAIN_FRAME_ID;
            CosmeticApi.logScriptRules({
                url,
                tabId,
                preparedCosmeticResult: frameContext.preparedCosmeticResult,
                timestamp: currentTime,
                contentType: isMainFrame ? ContentType.Document : ContentType.Subdocument,
            });
        });
        await Promise.allSettled(tasks);
    }
}

/**
 * Assistant class is the handler of messages and events related
 * to AdGuard assistant with extended detection of assistant frame.
 */
class Assistant extends CommonAssistant {
    /**
     * @inheritdoc
     */
    // eslint-disable-next-line class-methods-use-this
    injectAssistant(tabId, fileUrl) {
        /**
         * Using `chrome.scripting.executeScript` here is safe since the fileUrl
         * is a static file from the extension's directory, i.e. pre-built
         * and verified.
         */
        return chrome.scripting.executeScript({
            target: { tabId },
            files: [fileUrl],
        });
    }
}
const assistant = new Assistant();

/**
 * Custom filter list configuration validator for MV3.
 */
const customFilterMV3Validator = basicFilterValidator.extend({
    /**
     * Filter identifier.
     */
    filterId: z.number(),
    /**
     * Filter trusted flag.
     */
    trusted: z.boolean(),
});
const settingsConfigMV3 = settingsConfigValidator.extend({
    /**
     * Path to the content script that set GPC Signal.
     * Necessary for `Do Not Track` stealth option.
     * This content script will be dynamically registered and unregistered
     * by the tswebextension when the stealth option is enabled/disabled.
     */
    gpcScriptUrl: z.string(),
    /**
     * Path to the content script that hide document referrer.
     * Necessary for `Hide Search Queries` stealth option.
     * This content script will be dynamically registered and unregistered
     * by the tswebextension when the stealth option is enabled/disabled.
     */
    hideDocumentReferrerScriptUrl: z.string(),
});
/**
 * Configuration validator for MV3.
 */
const configurationMV3Validator = configurationValidator.extend({
    /**
     * List of static filters ids.
     * The content for these filters will be loaded by the tswebextension
     * from the "filtersPath" provided when needed.
     */
    staticFiltersIds: z.number().array(),
    /**
     * List of custom filters that can be added/edited/deleted by the user.
     */
    customFilters: customFilterMV3Validator.array(),
    /**
     * Path to directory with filters' text rules.
     */
    filtersPath: z.string(),
    /**
     * Path to directory with converted rule sets.
     * Note: it's better to convert filters with tsurlfilter.convertFilters.
     */
    rulesetsPath: z.string(),
    /**
     * Enables logging declarative rules, which will increase used memory,
     * because to extract matched source rule text we need to load ruleset
     * in memory.
     */
    declarativeLogEnabled: z.boolean(),
    settings: settingsConfigMV3,
    /**
     * List of rules added by user.
     */
    userrules: customFilterMV3Validator.omit({ filterId: true, trusted: true }),
});

/**
 * An error indicating that an operation timed out.
 */
class TimeoutError extends Error {
    /**
     * Constructs a new TimeoutError.
     *
     * @param message Optional error message. Defaults to 'Operation timed out'.
     */
    constructor(message = 'Operation timed out') {
        super(message);
        this.name = 'TimeoutError';
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, TimeoutError.prototype);
    }
}

/* eslint-disable max-classes-per-file */
/**
 * A mutual exclusion (mutex) primitive for coordinating asynchronous access to a critical section.
 *
 * Only one lock may be held at a time. Others attempting to acquire the lock will either:
 * - Wait in a queue until the lock is released, or
 * - Fail with a TimeoutError if not acquired within a given timeout.
 *
 * This class is useful in asynchronous environments (e.g. browser or Node.js)
 * where race conditions or critical sections need to be protected.
 */
class Mutex {
    /**
     * Indicates whether the mutex is currently locked.
     */
    locked = false;
    /**
     * Queue of resolvers waiting to acquire the mutex.
     */
    waitingResolvers = [];
    /**
     * Attempts to acquire the mutex lock within the specified timeout.
     *
     * If the mutex is free, acquires it immediately.
     * Otherwise, waits until the mutex is available or the timeout expires.
     * If the timeout expires before the lock is granted, a {@link TimeoutError} is thrown.
     *
     * @param timeoutMs The maximum time to wait (in milliseconds) to acquire the lock.
     *
     * @throws {TimeoutError} If the lock is not acquired within the specified time.
     */
    async lock(timeoutMs) {
        if (!this.locked) {
            this.locked = true;
            return;
        }
        let resolver;
        let timeoutId;
        const promise = new Promise((resolve) => {
            resolver = () => {
                clearTimeout(timeoutId);
                resolve();
            };
            this.waitingResolvers.push(resolver);
        });
        const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimeout(() => {
                const index = this.waitingResolvers.indexOf(resolver);
                if (index !== -1) {
                    this.waitingResolvers.splice(index, 1);
                }
                reject(new TimeoutError());
            }, timeoutMs);
        });
        await Promise.race([promise, timeoutPromise]);
    }
    /**
     * Releases the mutex and grants the lock to the next waiter in the queue, if any.
     *
     * If no one is waiting, the mutex becomes unlocked.
     *
     * @throws {Error} If the mutex is already unlocked.
     */
    unlock() {
        if (!this.locked) {
            throw new Error('Cannot unlock an unlocked mutex');
        }
        const next = this.waitingResolvers.shift();
        if (next) {
            next();
        }
        else {
            this.locked = false;
        }
    }
    /**
     * Returns whether the mutex is currently locked.
     *
     * @returns `true` if the mutex is locked; `false` otherwise.
     */
    isLocked() {
        return this.locked;
    }
    /**
     * Returns a promise that resolves once the mutex is unlocked.
     *
     * If the mutex is already unlocked, the promise resolves immediately.
     * Otherwise, it waits until the lock is released.
     *
     * @returns A promise that resolves when the mutex becomes available.
     */
    async waitUntilUnlocked() {
        if (!this.locked) {
            return;
        }
        await new Promise((resolve) => {
            this.waitingResolvers.push(resolve);
        });
    }
}

/**
 * Request context storage used to keep track of request data
 * and calculated rules for it.
 */
class RequestContextStorage {
    /**
     * Map of request context data.
     */
    requestMap = new Map();
    /**
     * Sets requestData context by requestData id.
     *
     * @param requestId Request id.
     * @param requestData Request context data.
     */
    set(requestId, requestData) {
        this.requestMap.set(requestId, requestData);
    }
    /**
     * Updates request context fields. Can be done partially.
     *
     * @param requestId Request id.
     * @param data Partial request context.
     *
     * @returns Updated request context or undefined if request context not found.
     */
    update(requestId, data) {
        const requestContext = this.requestMap.get(requestId);
        if (requestContext) {
            Object.assign(requestContext, data);
            return requestContext;
        }
        return undefined;
    }
    /**
     * Returns request context by request id.
     *
     * @param requestId Request id.
     *
     * @returns Request context or undefined if request context not found.
     */
    get(requestId) {
        return this.requestMap.get(requestId);
    }
    /**
     * Removes request context from the map by request id.
     *
     * @param requestId Request id.
     */
    delete(requestId) {
        this.requestMap.delete(requestId);
    }
    /**
     * Clears all request context data.
     */
    clear() {
        this.requestMap.clear();
    }
}
const requestContextStorage = new RequestContextStorage();

/**
 * Generic wrapper for browser.webRequest with custom event implementation.
 */
class RequestEvent {
    listeners = [];
    /**
     * Register listener for the browser.webRequest events.
     *
     * @param event WebRequest event name.
     * @param handler Handler to register.
     * @param filter Filter of the events.
     * @param extraInfoSpec Extra info spec.
     */
    init(event, handler, filter, extraInfoSpec) {
        // TODO: Remove BlockingResponseOrPromise because in MV3 we cannot block
        // response, so we need to left only void or promise<void> as result
        // of handlers.
        const handleBrowserEvent = (details) => {
            const data = handler(details);
            /**
             * Execute all registered listeners one by one until a non-empty value is returned.
             */
            for (let i = 0; i < this.listeners.length; i += 1) {
                const res = this.listeners[i](data);
                if (res) {
                    return res;
                }
            }
            return undefined;
        };
        event.addListener(handleBrowserEvent, filter, extraInfoSpec);
    }
    /**
     * Register listener for the browser.webRequest events.
     *
     * @param listener Event callback.
     */
    addListener(listener) {
        this.listeners.push(listener);
    }
    /**
     * Remove listener from the browser.webRequest events.
     *
     * @param listener Event callback.
     */
    removeListener(listener) {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }
}

const MAX_URL_LENGTH = 1024 * 16;
/**
 * Request events class.
 * TODO: Can it be moved to common?
 */
class RequestEvents {
    static onBeforeRequest = new RequestEvent();
    static onResponseStarted = new RequestEvent();
    static onBeforeSendHeaders = new RequestEvent();
    static onHeadersReceived = new RequestEvent();
    static onCompleted = new RequestEvent();
    static onErrorOccurred = new RequestEvent();
    /**
     * Initializes request events service.
     */
    static init() {
        // TODO: Maybe remove RequestEvents and RequestEvent layers?
        RequestEvents.onBeforeRequest.init(browser.webRequest.onBeforeRequest, RequestEvents.handleOnBeforeRequest, { urls: ['<all_urls>'] });
        const onBeforeSendHeadersOptions = ['requestHeaders'];
        const onBeforeSendHeadersOptionTypes = browser.webRequest.OnBeforeSendHeadersOptions;
        if (typeof onBeforeSendHeadersOptionTypes !== 'undefined'
            && Object.prototype.hasOwnProperty.call(onBeforeSendHeadersOptionTypes, 'EXTRA_HEADERS')) {
            onBeforeSendHeadersOptions.push('extraHeaders');
        }
        RequestEvents.onBeforeSendHeaders.init(browser.webRequest.onBeforeSendHeaders, RequestEvents.handleOnBeforeSendHeaders, { urls: ['<all_urls>'] }, onBeforeSendHeadersOptions);
        const onResponseStartedOptions = ['responseHeaders', 'extraHeaders'];
        RequestEvents.onResponseStarted.init(browser.webRequest.onResponseStarted, RequestEvents.handleOnResponseStarted, { urls: ['<all_urls>'] }, onResponseStartedOptions);
        const onHeadersReceivedOptions = ['responseHeaders'];
        const onHeadersReceivedOptionTypes = browser.webRequest.OnHeadersReceivedOptions;
        if (typeof onHeadersReceivedOptionTypes !== 'undefined'
            && Object.prototype.hasOwnProperty.call(onBeforeSendHeadersOptionTypes, 'EXTRA_HEADERS')) {
            onHeadersReceivedOptions.push('extraHeaders');
        }
        RequestEvents.onHeadersReceived.init(browser.webRequest.onHeadersReceived, RequestEvents.handleOnHeadersReceived, { urls: ['<all_urls>'] }, onHeadersReceivedOptions);
        RequestEvents.onCompleted.init(browser.webRequest.onCompleted, RequestEvents.handleOnCompleted, { urls: ['<all_urls>'] }, ['responseHeaders']);
        RequestEvents.onErrorOccurred.init(browser.webRequest.onErrorOccurred, RequestEvents.handleOnErrorOccurred, { urls: ['<all_urls>'] });
    }
    /**
     * Handles onResponseStarted event.
     *
     * @param details WebRequest details.
     *
     * @returns Request data with context.
     */
    static handleOnResponseStarted(details) {
        const { requestId, timeStamp } = details;
        const context = requestContextStorage.update(requestId, {
            state: "responseStarted" /* RequestContextState.ResponseStarted */,
            timestamp: timeStamp,
        });
        return { details, context };
    }
    /**
     * Handles onBeforeRequest event.
     *
     * @param details WebRequest details.
     *
     * @returns Request data.
     */
    static handleOnBeforeRequest(details) {
        const { requestId, type, tabId, parentFrameId, originUrl, initiator, method, timeStamp, documentLifecycle, parentDocumentId, frameAncestors, } = details;
        let { url, frameId } = details;
        /**
         * Truncate too long urls.
         *
         * @see {@link https://github.com/AdguardTeam/AdguardBrowserExtension/issues/1493}
         */
        if (url.length > MAX_URL_LENGTH) {
            url = url.slice(0, MAX_URL_LENGTH);
        }
        /**
         * FF sends http instead of ws protocol at the http-listeners layer
         * Although this is expected, as the Upgrade request is indeed an HTTP request,
         * we use a chromium based approach in this case.
         */
        if (type === 'websocket' && isHttpRequest(url)) {
            url = url.replace(/^http(s)?:/, 'ws$1:');
        }
        const { requestType, contentType } = getRequestType(type);
        const isDocumentRequest = requestType === RequestType.Document;
        const isPrerenderRequest = documentLifecycle === DocumentLifecycle.Prerender;
        // Pre-rendered documents can have a frame ID other than zero.
        frameId = isDocumentRequest ? MAIN_FRAME_ID : frameId;
        let requestFrameId = isDocumentRequest ? frameId : parentFrameId;
        // If there is no parent frame ID, we assume that the request is a main
        // frame request.
        if (requestFrameId === -1) {
            requestFrameId = 0;
        }
        /*
         * To mark requests started via navigation from the address bar (real
         * request or pre-render, it does not matter) as first-party requests,
         * we get only part of the request context to record only the tab and
         * frame information before calculating the request referrer.
         */
        // Prefetch requests are main frame requests that have a `documentId` set,
        // while normal main frame requests do not have a `documentId` set.
        const isPrefetchRequest = isDocumentRequest
            && !isPrerenderRequest
            && !!details.documentId;
        const tabFrameRequestContext = {
            requestUrl: url,
            requestType,
            requestId,
            frameId,
            tabId,
            parentDocumentId,
            frameAncestors,
            isPrefetchRequest,
        };
        // Do not publish TabReload (filtering log reset) for:
        // - prerender requests (not the final displayed document);
        // - prefetch requests (belongs to a future navigation, page is not displayed yet).
        //
        // Note: We do not check for existing request context here (as in MV2),
        // because in MV3 $removeparam rules are applied by the browser and do not
        // require page reload after applying.
        if (isDocumentRequest && !isPrerenderRequest && !isPrefetchRequest) {
            // dispatch filtering log reload event
            defaultFilteringLog.publishEvent({
                type: FilteringEventType.TabReload,
                data: { tabId },
            });
        }
        // We rely on browser-provided values as the source of truth
        let referrerUrl = originUrl
            || initiator
            || '';
        /**
         * For prerender document requests, use the request URL itself, because
         * for prerender request `originUrl` and `initiator` are both undefined.
         */
        if (!referrerUrl && isPrerenderRequest && isDocumentRequest) {
            referrerUrl = url;
        }
        /**
         * If we still do not determine referrerUrl, try to extract url from the
         * tab context or fallback to the request URL.
         */
        if (!referrerUrl) {
            // Try to get referrer from tab state during address bar navigation.
            referrerUrl = tabsApi.getTabMainFrame(tabId)?.url
                || tabsApi.getTabFrame(tabId, requestFrameId)?.url
                || url;
        }
        // Retrieve the rest part of the request context for record all fields.
        const context = {
            ...tabFrameRequestContext,
            eventId: nanoid(),
            state: "beforeRequest" /* RequestContextState.BeforeRequest */,
            timestamp: timeStamp,
            thirdParty: isThirdPartyRequest(url, referrerUrl),
            referrerUrl,
            contentType,
            method: method,
        };
        requestContextStorage.set(requestId, context);
        return { details, context };
    }
    /**
     * Handles onBeforeSendHeaders event.
     *
     * @param details WebRequest details.
     *
     * @returns Request data.
     */
    static handleOnBeforeSendHeaders(details) {
        const { requestId, timeStamp, requestHeaders } = details;
        const context = requestContextStorage.update(requestId, {
            state: "beforeSendHeaders" /* RequestContextState.BeforeSendHeaders */,
            timestamp: timeStamp,
            requestHeaders,
        });
        return { details, context };
    }
    /**
     * Handles onHeadersReceived event.
     *
     * @param details WebRequest details.
     *
     * @returns Request data with context.
     */
    static handleOnHeadersReceived(details) {
        const { requestId, responseHeaders, } = details;
        const context = requestContextStorage.update(requestId, {
            state: "headersReceived" /* RequestContextState.HeadersReceived */,
            responseHeaders,
        });
        return { details, context };
    }
    /**
     * Handles onCompleted event.
     *
     * @param details WebRequest details.
     *
     * @returns Request data with context.
     */
    static handleOnCompleted(details) {
        const { requestId, timeStamp } = details;
        const context = requestContextStorage.update(requestId, {
            state: "completed" /* RequestContextState.Completed */,
            timestamp: timeStamp,
        });
        return { details, context };
    }
    /**
     * Handles onErrorOccurred event.
     *
     * @param details WebRequest details.
     *
     * @returns Request data with context.
     */
    static handleOnErrorOccurred(details) {
        const { requestId, timeStamp } = details;
        const context = requestContextStorage.update(requestId, {
            state: "error" /* RequestContextState.Error */,
            timestamp: timeStamp,
        });
        return { details, context };
    }
}

/**
 * Reserved stealth rule ids for the DNR.
 */
var SessionRuleId;
(function (SessionRuleId) {
    SessionRuleId[SessionRuleId["HideReferrer"] = 1] = "HideReferrer";
    SessionRuleId[SessionRuleId["BlockChromeClientData"] = 2] = "BlockChromeClientData";
    SessionRuleId[SessionRuleId["SendDoNotTrack"] = 3] = "SendDoNotTrack";
    SessionRuleId[SessionRuleId["HideSearchQueries"] = 4] = "HideSearchQueries";
    SessionRuleId[SessionRuleId["CspReportBlocking"] = 5] = "CspReportBlocking";
    /**
     * Syntactic sugar for convenience - represents the last enum value.
     * Used to calculate MIN_DECLARATIVE_RULE_ID without dynamic enum introspection.
     */
    SessionRuleId[SessionRuleId["Last"] = 6] = "Last";
})(SessionRuleId || (SessionRuleId = {}));
/**
 * SessionRulesApi knows how to handle sessions rules: apply rules from tracking
 * protection and how to apply unsafe rules from static rulesets.
 */
class SessionRulesApi {
    /**
     * To prevent conflicts we reserve rule ids for predefined session rules.
     * This value uses SessionRuleId.LAST for convenience instead of dynamic enum introspection.
     *
     * Use with {@link SessionRuleId} enum to freeze rule ids for predefined
     * session rules (stealth + CSP blocking).
     */
    static MIN_DECLARATIVE_RULE_ID = SessionRuleId.Last;
    /**
     * Contains a mapping of session rule ids to their unsafe rules source:
     * ruleset id and rule id inside this ruleset. It will be used to show
     * original applied rule in the UI.
     */
    static sourceMapForUnsafeRules = new Map();
    /**
     * The maximum number of regular expression rules that an extension can add.
     * This limit is evaluated separately for the set of session rules,
     * dynamic rules and those specified in the rule_resources file.
     *
     * @returns Maximum number of regular expression rules.
     */
    static get MAX_NUMBER_OF_REGEX_RULES() {
        return browser.declarativeNetRequest.MAX_NUMBER_OF_REGEX_RULES;
    }
    /**
     * The maximum number of session rules (safe and unsafe) an extension can add.
     *
     * In Chrome before v120, this limit is enforced for the combination of dynamic and session scoped rules.
     * In Firefox and Chrome (staring v121), each ruleset has its own quota.
     *
     * @returns Maximum number of session rules.
     */
    static get MAX_NUMBER_OF_SESSION_RULES() {
        return browser.declarativeNetRequest.MAX_NUMBER_OF_SESSION_RULES;
    }
    /**
     * The maximum number of **unsafe** dynamic rules an extension can add.
     *
     * @see {@link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#property-MAX_NUMBER_OF_UNSAFE_SESSION_RULES}
     *
     * @returns Maximum number of dynamic **unsafe** rules.
     */
    static get MAX_NUMBER_OF_UNSAFE_SESSION_RULES() {
        // Replace chrome.declarativeNetRequest.MAX_NUMBER_OF_UNSAFE_SESSION_RULES
        // with webextension-polyfill later, when the value becomes available.
        return chrome.declarativeNetRequest.MAX_NUMBER_OF_UNSAFE_SESSION_RULES;
    }
    /**
     * Set the stealth rule to the ruleset.
     * If the rule with the same id already exists, it will be replaced.
     *
     * @param rule Session rule to set.
     *
     * @returns Resolved promise when the rule is set.
     */
    static async setSessionRule(rule) {
        // The rules with IDs listed in options.removeRuleIds are first removed,
        // and then the rules given in options.addRules are added
        return chrome.declarativeNetRequest.updateSessionRules({
            addRules: [rule],
            removeRuleIds: [rule.id],
        });
    }
    /**
     * Remove the session rule from the ruleset.
     *
     * @param ruleId Session rule id.
     *
     * @returns Resolved promise when the rule is removed.
     */
    static async removeSessionRule(ruleId) {
        return chrome.declarativeNetRequest.updateSessionRules({
            removeRuleIds: [ruleId],
        });
    }
    /**
     * Update session rules with unsafe rules from static filters. If we overflow
     * the limit of session rules, some rules will be ignored.
     *
     * @param enabledStaticRulesets List of enabled static rule sets.
     * @param declarativeRulesToCancel List of declarative rules to cancel
     * (collected from dynamic rules).
     *
     * @returns Resolved promise when the session rules are updated.
     */
    static async updateSessionRules(enabledStaticRulesets, declarativeRulesToCancel) {
        const rulesToCancel = new Map(declarativeRulesToCancel
            ? declarativeRulesToCancel.map(({ rulesetId, disableRuleIds }) => [rulesetId, disableRuleIds])
            : []);
        // Apply $badfilter rules from dynamic rules to static rules.
        const unsafeRulesFromStaticFilters = await Promise.all(enabledStaticRulesets.map(async (r) => {
            const rules = await r.getUnsafeRules();
            const rulesToRemove = rulesToCancel.get(r.getId()) || [];
            return {
                rulesetId: r.getId(),
                rules: rules.filter((rule) => !rulesToRemove.includes(rule.id)),
            };
        }));
        // Before collect rules to enable, record which rules should be removed
        // from browser session rules and also remove them from in-memory source
        // map.
        const currentSessionRules = await chrome.declarativeNetRequest.getSessionRules();
        const removeRuleIds = currentSessionRules
            .map((rule) => rule.id)
            // Ignore removing stealth rules.
            .filter((id) => id > SessionRulesApi.MIN_DECLARATIVE_RULE_ID);
        // Clear them from in-memory source map.
        removeRuleIds.forEach((id) => {
            SessionRulesApi.sourceMapForUnsafeRules.delete(id);
        });
        // Collect rules to enable.
        const unsafeRulesFromEnabledRulesets = [];
        // TODO: Add separated counters for these in ruleset.
        let regexpRulesCounter = 0;
        const ignoredRules = new Map(enabledStaticRulesets.map((r) => [r.getId(), []]));
        let availableId = SessionRulesApi.MIN_DECLARATIVE_RULE_ID + 1;
        // Reset id for each rule via saving it's source and check the limits.
        unsafeRulesFromStaticFilters.forEach(({ rulesetId, rules }) => {
            rules.forEach((rule) => {
                if (availableId > SessionRulesApi.MAX_NUMBER_OF_UNSAFE_SESSION_RULES) {
                    ignoredRules.get(rulesetId)?.push(rule.id);
                    return;
                }
                // TODO: Add separated counters for these in ruleset.
                if (rule.condition?.regexFilter) {
                    regexpRulesCounter += 1;
                    if (regexpRulesCounter > SessionRulesApi.MAX_NUMBER_OF_REGEX_RULES) {
                        ignoredRules.get(rulesetId)?.push(rule.id);
                        return;
                    }
                }
                SessionRulesApi.sourceMapForUnsafeRules.set(availableId, [rulesetId, rule.id]);
                // Add the rule to the session rules.
                unsafeRulesFromEnabledRulesets.push({ ...rule, id: availableId });
                availableId += 1;
            });
        });
        // Pretty print ignored rules, if any.
        if (ignoredRules.values().some((rules) => rules.length > 0)) {
            const stringifiedIgnoredRules = Array.from(ignoredRules.entries())
                .map(([rulesetId, rules]) => {
                return `${rulesetId}: ${rules.join(', ')}`;
            })
                .join(';\n');
            logger.debug(`[tsweb.SessionRulesApi.updateSessionRules]: Some session rules were ignored due to the limit of ${SessionRulesApi.MAX_NUMBER_OF_UNSAFE_SESSION_RULES} (current count of unsafe rules: ${unsafeRulesFromEnabledRulesets}) or limit of ${SessionRulesApi.MAX_NUMBER_OF_REGEX_RULES} regex rules (current count of regex rules: ${regexpRulesCounter}): \n`, stringifiedIgnoredRules);
        }
        // The rules with IDs listed in options.removeRuleIds are first removed,
        // and then the rules given in options.addRules are added
        return chrome.declarativeNetRequest.updateSessionRules({
            // dnr-converter uses PascalCase enum member names (Block, Redirect, …)
            // while @types/chrome uses UPPER_SNAKE_CASE (BLOCK, REDIRECT, …).
            // Runtime values are identical, so the cast is safe.
            addRules: unsafeRulesFromEnabledRulesets,
            removeRuleIds,
        });
    }
    /**
     * Clears all session rules from browser and in-memory source map.
     *
     * @returns Removed session rules.
     */
    static async removeAllRules() {
        const sessionRules = await chrome.declarativeNetRequest.getSessionRules();
        if (sessionRules.length > 0) {
            await chrome.declarativeNetRequest.updateSessionRules({
                removeRuleIds: sessionRules.map((rule) => rule.id),
            });
        }
        SessionRulesApi.sourceMapForUnsafeRules.clear();
        return sessionRules;
    }
}

/**
 * Declarative filtering log that can record information about the
 * applied declarative network rules with information about the original rule
 * text and the filter identifier.
 */
class DeclarativeFilteringLog {
    /**
     * Maximum wait time for rulesets to be loaded.
     */
    MAX_WAIT_TIME_MS = 30 * 1000;
    /**
     * Stores list of rulesets to extract rule info when needed.
     */
    sourceRulesets = [];
    /**
     * Is there an active listener for declarativeNetRequest.onRuleMatchedDebug or not.
     */
    #isListening = false;
    /**
     * Mutex for managing concurrent access to rule set updates.
     */
    mutex = new Mutex();
    /**
     * Returns is there an active listener for declarativeNetRequest.onRuleMatchedDebug or not.
     *
     * @returns Boolean value.
     */
    get isListening() {
        return this.#isListening;
    }
    /**
     * Initializes the declarative filtering log.
     * Binds needed methods to the instance.
     */
    constructor() {
        this.logMatchedRule = this.logMatchedRule.bind(this);
    }
    /**
     * Acquires the mutex lock within the specified timeout.
     * Used to prevent getting rule info during rule set updates.
     *
     * @param timeoutMs The maximum time to wait (in milliseconds) to acquire the lock.
     * Defaults to {@link DeclarativeFilteringLog.MAX_WAIT_TIME_MS}.
     *
     * @throws {TimeoutError} If the lock is not acquired within the specified time.
     */
    async startUpdate(timeoutMs = this.MAX_WAIT_TIME_MS) {
        await this.mutex.lock(timeoutMs);
    }
    /**
     * Releases the mutex and sets the new rule sets.
     * Used to prevent getting rule info during rule set updates.
     * Also, you can specify whether to enable declarative logging after update.
     *
     * @param rulesets List of {@link IRulesetWithSourceMap}.
     * @param enableLog Should we enable declarative logging after update.
     *
     * @throws Error if no update is in progress.
     */
    finishUpdate(rulesets, enableLog) {
        this.sourceRulesets = rulesets;
        this.mutex.unlock();
        if (enableLog) {
            this.start();
        }
        else {
            this.stop();
        }
    }
    /**
     * Returns converted declarative json rule, original text rule,
     * filter name and id specifically for session rules, since they are
     * collected from static rulesets.
     *
     * @param rulesetId Ruleset id.
     * @param ruleId Rule id in this filter.
     *
     * @returns Converted declarative json rule, original txt rule
     * and filter id.
     *
     * @throws Error when couldn't find ruleset or rule in ruleset.
     */
    getRuleInfoForSessionRule = async (rulesetId, ruleId) => {
        if (this.mutex.isLocked()) {
            await this.mutex.waitUntilUnlocked();
        }
        if (rulesetId !== chrome.declarativeNetRequest.SESSION_RULESET_ID) {
            throw new Error('getRuleInfoForSessionRule can be used only for session rules');
        }
        if (this.sourceRulesets.length === 0) {
            throw new Error('No rulesets loaded yet');
        }
        const source = SessionRulesApi.sourceMapForUnsafeRules.get(ruleId);
        if (!source) {
            throw new Error(`Cannot find source mapping for session rule id ${ruleId}`);
        }
        const [sourceRulesetId, sourceDnrRuleId] = source;
        const ruleset = this.sourceRulesets.find((r) => r.getId() === sourceRulesetId);
        if (!ruleset) {
            throw new Error(`Cannot find ruleset with id ${sourceRulesetId}`);
        }
        const sourceRules = await ruleset.getRulesById(sourceDnrRuleId);
        const unsafeDeclarativeRules = await ruleset.getUnsafeRules();
        const declarativeRule = unsafeDeclarativeRules.find((r) => r.id === sourceDnrRuleId);
        if (!declarativeRule) {
            throw new Error(`Cannot find rule with id ${sourceDnrRuleId} in ruleset ${sourceRulesetId}`);
        }
        return {
            sourceRules,
            declarativeRuleJson: JSON.stringify(declarativeRule),
        };
    };
    /**
     * Returns converted declarative json rule, original text rule,
     * filter name and id.
     *
     * @param rulesetId Ruleset id.
     * @param ruleId Rule id in this filter.
     *
     * @returns Converted declarative json rule, original txt rule
     * and filter id.
     *
     * @throws Error when couldn't find ruleset or rule in ruleset.
     */
    getRuleInfo = async (rulesetId, ruleId) => {
        if (this.mutex.isLocked()) {
            await this.mutex.waitUntilUnlocked();
        }
        if (this.sourceRulesets.length === 0) {
            throw new Error('No rulesets loaded yet');
        }
        const ruleset = this.sourceRulesets.find((r) => r.getId() === rulesetId);
        if (!ruleset) {
            throw new Error(`Cannot find ruleset with id ${rulesetId}`);
        }
        const sourceRules = await ruleset.getRulesById(ruleId);
        const declarativeRules = await ruleset.getDeclarativeRules();
        const declarativeRule = declarativeRules.find((r) => r.id === ruleId);
        if (!declarativeRule) {
            throw new Error(`Cannot find rule with id ${ruleId} in ruleset ${rulesetId}`);
        }
        return {
            sourceRules,
            declarativeRuleJson: JSON.stringify(declarativeRule),
        };
    };
    /**
     * Fires an {@link FilteringEventType.MatchedDeclarativeRule} event with
     * matched declarative rule and source text rule.
     *
     * In current approach we will always load all rules from all rule sets in
     * unpacked extension to extract the rule info. This can be optimized and
     * log rule only if filtering log is opened.
     *
     * @param record Request details {@link browser.declarativeNetRequest.MatchedRuleInfoDebug}.
     */
    async logMatchedRule(record) {
        const { request: { requestId, url: requestUrl }, rule: { rulesetId, ruleId }, } = record;
        const context = requestContextStorage.get(requestId);
        if (!context) {
            logger.error('[tsweb.DeclarativeFilteringLog.logMatchedRule]: cannot find request context for request id ', requestId);
            return;
        }
        /**
         * We do not log exact matched DNR rule from Tracking protection
         * (formerly stealth mode), since they are generic and too wide, so
         * they should not be logged to prevent collect garbage in the log as
         * it is done in MV2.
         * But we still need to log all other session rules, since we use them
         * for all not safe rules from static rulesets.
         */
        if (rulesetId === chrome.declarativeNetRequest.SESSION_RULESET_ID
            && ruleId <= SessionRulesApi.MIN_DECLARATIVE_RULE_ID) {
            return;
        }
        let declarativeRuleInfo;
        const getRuleInfoFn = rulesetId === chrome.declarativeNetRequest.SESSION_RULESET_ID
            ? this.getRuleInfoForSessionRule
            : this.getRuleInfo;
        try {
            declarativeRuleInfo = await getRuleInfoFn(rulesetId, ruleId);
        }
        catch (e) {
            logger.error('[tsweb.DeclarativeFilteringLog.logMatchedRule]: cannot get rule info due to: ', e);
            return;
        }
        // Determine the eventId to associate with this rule match.
        // If the matched URL differs from the stored context URL, Chrome
        // applied a DNR redirect without firing onBeforeRequest for this hop
        // (observed with $removeparam redirect chains). In that case we emit
        // a synthetic SendRequest so the filtering log gets a dedicated entry.
        let { eventId } = context;
        if (requestUrl !== context.requestUrl) {
            eventId = nanoid();
            defaultFilteringLog.publishEvent({
                type: FilteringEventType.SendRequest,
                data: {
                    tabId: context.tabId,
                    eventId,
                    requestUrl,
                    requestDomain: getDomain(requestUrl),
                    frameUrl: context.referrerUrl,
                    frameDomain: getDomain(context.referrerUrl),
                    requestType: context.contentType,
                    timestamp: context.timestamp,
                    requestThirdParty: context.thirdParty,
                    method: context.method,
                },
            });
            // Update the stored context so the next onRuleMatchedDebug for
            // the same requestId sees the current hop URL and eventId.
            requestContextStorage.update(requestId, {
                eventId,
                requestUrl,
            });
        }
        defaultFilteringLog.publishEvent({
            type: FilteringEventType.MatchedDeclarativeRule,
            data: {
                eventId,
                tabId: context.tabId,
                declarativeRuleInfo,
            },
        });
    }
    /**
     * Toggles the listener for declarativeNetRequest.onRuleMatchedDebug.
     *
     * @param needToAddListener If true, the listener will be added, otherwise removed.
     */
    toggleListener(needToAddListener) {
        // Wrapped in try-catch to prevent the extension from crashing if browser
        // will change the API in the future.
        try {
            // onRuleMatchedDebug can be null if the extension is running
            // as a packed version
            if (!chrome.declarativeNetRequest.onRuleMatchedDebug) {
                return;
            }
            if (needToAddListener) {
                // Already listening
                if (this.#isListening) {
                    return;
                }
                chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(this.logMatchedRule);
                this.#isListening = true;
            }
            else {
                chrome.declarativeNetRequest.onRuleMatchedDebug.removeListener(this.logMatchedRule);
                this.#isListening = false;
            }
        }
        catch (e) {
            const message = needToAddListener
                ? 'Cannot start recording declarative network rules due to: '
                : 'Cannot stop recording declarative network rules due to: ';
            logger.error(`[tsweb.DeclarativeFilteringLog.toggleListener]: ${message}: `, e);
        }
    }
    /**
     * Starts recording.
     */
    start() {
        this.toggleListener(true);
    }
    /**
     * Stops recording.
     */
    stop() {
        this.toggleListener(false);
    }
}
const declarativeFilteringLog = new DeclarativeFilteringLog();

/**
 * DynamicRulesApi knows how to handle dynamic rules: apply a list of custom
 * filters along with user rules, allowlist and quick fixes rules and disable
 * all dynamic rules when the filtration is stopped.
 */
class DynamicRulesApi {
    /**
     * The maximum number of regular expression rules that an extension can add.
     * This limit is evaluated separately for the set of session rules,
     * dynamic rules and those specified in the rule_resources file.
     *
     * @returns Maximum number of regular expression rules.
     */
    static get MAX_NUMBER_OF_REGEX_RULES() {
        return browser.declarativeNetRequest.MAX_NUMBER_OF_REGEX_RULES;
    }
    /**
     * The maximum number of dynamic rules (safe and unsafe) an extension can add.
     *
     * In Chrome before v120, this limit is enforced for the combination of dynamic and session scoped rules.
     * In Firefox and Chrome (staring v121), each ruleset has its own quota.
     *
     * TODO: Maybe now we can move Quick Fixes rules to session ruleset.
     *
     * @returns Maximum number of dynamic rules.
     */
    static get MAX_NUMBER_OF_DYNAMIC_RULES() {
        return browser.declarativeNetRequest.MAX_NUMBER_OF_DYNAMIC_RULES;
    }
    /**
     * The maximum number of **unsafe** dynamic rules an extension can add.
     *
     * @see {@link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#property-MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES}
     *
     * @returns Maximum number of dynamic **unsafe** rules.
     */
    static get MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES() {
        // Replace chrome.declarativeNetRequest.MAX_NUMBER_OF_UNSAFE_SESSION_RULES
        // with webextension-polyfill later, when the value becomes available.
        return chrome.declarativeNetRequest.MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES;
    }
    /**
     * Converts custom filters and user rules on the fly into a single merged
     * rule set and applies it via the declarativeNetRequest API.
     *
     * Filters will combine into one in following order:
     * - allowlistRules,
     * - blockingPageTrustedFilter - created on the blocking page by user,
     * - userRules,
     * - customFilters.
     *
     * @param allowlistRules Filter with allowlist rules.
     * @param blockingPageTrustedFilter Filter with blocking page trusted domains rules (badfiltered rules).
     * @param userRules Filter with user rules.
     * @param customFilters List of custom filters.
     * @param enabledStaticRulesets List of enabled static rule sets to apply
     * $badfilter rules from dynamic rules to static.
     * @param resourcesPath String path to web accessible resources,
     * relative to the extension root dir. Should start with leading slash '/'.
     *
     * @returns Converted dynamic rule set with rule set, errors and
     * limitations. @see {@link ConversionResult}.
     *
     * @throws Error if the conversion produces no results (empty filter list).
     * @throws Error if declarativeNetRequest.updateDynamicRules() receives invalid rules
     * e.g. with non-ASCII `urlFilter` value.
     * Details: {@link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#property-RuleCondition-urlFilter}.
     */
    static async updateDynamicFiltering(allowlistRules, blockingPageTrustedFilter, userRules, customFilters, enabledStaticRulesets, resourcesPath) {
        const filterList = [
            allowlistRules,
            blockingPageTrustedFilter,
            userRules,
            ...customFilters,
        ];
        // Collect $badfilter rules from static rulesets so the converter can
        // skip dynamic rules that are already negated by a static $badfilter.
        const staticBadFilterRules = enabledStaticRulesets
            .flatMap((ruleset) => ruleset.getBadFilterRules());
        const converter = new FilterConverter();
        const results = await converter.convert(filterList, {
            resourcesPath,
            maxNumberOfRules: DynamicRulesApi.MAX_NUMBER_OF_DYNAMIC_RULES,
            maxNumberOfUnsafeRules: DynamicRulesApi.MAX_NUMBER_OF_UNSAFE_DYNAMIC_RULES,
            maxNumberOfRegexpRules: DynamicRulesApi.MAX_NUMBER_OF_REGEX_RULES,
            withSourceMap: true,
            combine: true,
            badFilterRules: staticBadFilterRules,
        });
        if (results.length === 0) {
            throw new Error('Dynamic rules conversion produced no results');
        }
        const conversionResult = results[0];
        const { ruleset } = conversionResult;
        // Compute which static rules should be disabled by dynamic $badfilter rules.
        const declarativeRulesToCancel = await converter.computeRulesToDisable([ruleset], enabledStaticRulesets);
        const declarativeRules = await ruleset.getDeclarativeRules();
        // Remove existing dynamic rules, in order their ids not interfere with new ones
        await this.removeAllRules();
        await browser.declarativeNetRequest.updateDynamicRules({
            // TODO update rule types returned by getDeclarativeRules();
            addRules: declarativeRules,
        });
        if (declarativeRulesToCancel.length > 0) {
            // Apply $badfilter rules from dynamic filters.
            await this.applyBadFilterRules(declarativeRulesToCancel);
        }
        else {
            // TODO: (AG-34651) Check, if filter_1 has been enabled and we disable some
            // rules there - should we enable them back before disable filter?
            // Because in other case, when we will re-enable filter - maybe it
            // will contains already disabled rules?
            // Undoes all previously applied changes.
            await this.cancelAllStaticRulesUpdates(enabledStaticRulesets);
        }
        return {
            ...conversionResult,
            declarativeRulesToCancel,
        };
    }
    /**
     * Cancels any disabled rules ids for all static rulesets.
     *
     * @param staticRulesets List of static {@link IRulesetWithSourceMap}.
     */
    static async cancelAllStaticRulesUpdates(staticRulesets) {
        const tasks = staticRulesets.map(async (r) => {
            const rulesetId = r.getId();
            // Get list of current disabled rules ids.
            const enableRuleIds = await browser.declarativeNetRequest.getDisabledRuleIds({ rulesetId });
            // And enable all of them.
            return browser.declarativeNetRequest.updateStaticRules({
                rulesetId,
                enableRuleIds,
            });
        });
        try {
            await Promise.all(tasks);
        }
        catch (e) {
            logger.error('[tsweb.DynamicRulesApi.cancelAllStaticRulesUpdates]: cannot cancel all updates to static rules due to: ', e);
        }
    }
    /**
     * Applies rules with $badfilter modifier which can cancel other rules from
     * static filters which already converted to declarative rules.
     *
     * @param declarativeRulesToCancel List of {@link UpdateStaticRulesOptions}.
     */
    static async applyBadFilterRules(declarativeRulesToCancel) {
        const tasks = declarativeRulesToCancel.map(async ({ rulesetId, disableRuleIds: ruleIdsToDisable, }) => {
            // Get list of current disabled rules ids.
            const disabledRuleIds = await browser.declarativeNetRequest.getDisabledRuleIds({ rulesetId });
            // Collect rules which should be enabled.
            const enableRuleIds = disabledRuleIds.filter((id) => !ruleIdsToDisable.includes(id));
            // Filter only that rules which are not disabled already.
            const disableRuleIds = ruleIdsToDisable.filter((id) => !disabledRuleIds.includes(id));
            return browser.declarativeNetRequest.updateStaticRules({
                rulesetId,
                enableRuleIds,
                disableRuleIds,
            });
        });
        try {
            await Promise.all(tasks);
        }
        catch (e) {
            logger.error('[tsweb.DynamicRulesApi.applyBadFilterRules]: cannot apply updates to static rules due to: ', e);
        }
    }
    /**
     * Disables all enabled dynamic rules.
     */
    static async removeAllRules() {
        // Get existing dynamic rules
        const existingRules = await browser.declarativeNetRequest.getDynamicRules();
        const existingRulesIds = existingRules.map((rule) => rule.id);
        // Remove existing dynamic rules
        await browser.declarativeNetRequest.updateDynamicRules({ removeRuleIds: existingRulesIds });
    }
}

/**
 * Describes error when enabled static rule sets has been failed.
 */
class FailedEnableRulesetsError extends Error {
    /**
     * A list of the IDs of the rule sets that were attempted to enable.
     */
    enableRulesetIds;
    /**
     * A list of the IDs of the rule sets that were attempted to disable.
     */
    disableRulesetIds;
    /**
     * Describes error when enabled static rule sets has been failed.
     *
     * @param message Message of error.
     * @param enableRulesetIds A list of the IDs of the rule sets that were
     * attempted to enable.
     * @param disableRulesetIds A list of the IDs of the rule sets that were
     * attempted to disable.
     * @param cause Specific browser.declarativeNetRequest error.
     */
    constructor(message, enableRulesetIds, disableRulesetIds, cause) {
        super(message, { cause });
        this.name = this.constructor.name;
        this.enableRulesetIds = enableRulesetIds;
        this.disableRulesetIds = disableRulesetIds;
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, FailedEnableRulesetsError.prototype);
    }
}

/**
 * @file Extends {@link IFilter} with a per-filter trust flag used by the
 * engine to decide whether JS / unsafe cosmetic rules are allowed.
 */
/**
 * Concrete implementation of {@link ITrustedFilter}.
 *
 * Wraps the pre-loaded {@link Filter} from `@adguard/dnr-converter` and
 * adds a per-instance trust flag and conversion errors.
 */
class TrustedFilter extends Filter {
    /**
     * Whether the filter is trusted by the user.
     */
    trusted;
    /**
     * Conversion errors from FilterList preparation.
     */
    conversionErrors;
    /**
     * Creates a pre-loaded TrustedFilter.
     *
     * @param id Numeric filter identifier.
     * @param content Pre-loaded filter content (one rule per line).
     * @param trusted Whether the filter is trusted by the user.
     * @param conversionErrors Conversion errors that occurred during FilterList preparation.
     */
    constructor(id, content, trusted, conversionErrors) {
        super(id, content);
        this.trusted = trusted;
        this.conversionErrors = conversionErrors ?? [];
    }
    /** @inheritdoc */
    isTrusted() {
        return this.trusted;
    }
    /** @inheritdoc */
    getConversionErrors() {
        return this.conversionErrors;
    }
}

/**
 * FiltersApi knows how to enable or disable static rule sets (which were built
 * with the extension) and how to create {@link Filter} through
 * loading its contents.
 */
class FiltersApi {
    /**
     * Cache for already created filters. Needed to avoid multiple loading
     * of the same filter.
     */
    static filtersCache = new Map();
    /**
     * Enables or disables the provided rule set identifiers.
     *
     * @param disableFiltersIds Rule sets to disable.
     * @param enableFiltersIds Rule sets to enable.
     *
     * @returns Promise resolved with result of updating {@link UpdateStaticFiltersResult}.
     *
     * @note If browser.declarativeNetRequest.updateEnabledRulesets fails,
     * the error will be caught and returned in the result rather than thrown.
     * The browser does not update and even not enable any rulesets if any
     * single ruleset in the request is not found.
     */
    static async updateFiltering(disableFiltersIds, enableFiltersIds) {
        const res = {
            errors: [],
        };
        const enableRulesetIds = enableFiltersIds?.map((filterId) => `${RULESET_NAME_PREFIX}${filterId}`) || [];
        const disableRulesetIds = disableFiltersIds?.map((filterId) => `${RULESET_NAME_PREFIX}${filterId}`) || [];
        try {
            await browser.declarativeNetRequest.updateEnabledRulesets({
                enableRulesetIds,
                disableRulesetIds,
            });
        }
        catch (e) {
            const msg = 'Cannot change list of enabled rule sets';
            const err = new FailedEnableRulesetsError(msg, enableRulesetIds, disableRulesetIds, e);
            res.errors.push(err);
        }
        return res;
    }
    /**
     * Returns current enabled rule sets IDs.
     *
     * @returns List of extracted enabled rule sets ids.
     */
    static async getEnabledRulesets() {
        const rulesets = await browser.declarativeNetRequest.getEnabledRulesets();
        return rulesets.map((f) => Number.parseInt(f.slice(RULESET_NAME_PREFIX.length), 10));
    }
    /**
     * Wraps static filters into {@link IFilter}.
     *
     * @param filtersIds List of filters ids.
     *
     * @returns List of {@link IFilter} with a lazy content loading feature.
     */
    static createStaticFilters(filtersIds) {
        return filtersIds.map((filterId) => {
            const filterFromCache = this.filtersCache.get(filterId);
            if (filterFromCache) {
                return filterFromCache;
            }
            const filter = new Filter(filterId, async () => {
                const f = await FiltersApi.loadFilterContent(filterId);
                return f.getContent();
            });
            this.filtersCache.set(filterId, filter);
            return filter;
        });
    }
    /**
     * Wraps custom filter into {@link ITrustedFilter}.
     *
     * @param customFilters List of custom filters.
     *
     * @returns List of {@link ITrustedFilter} with a lazy content loading feature.
     */
    static createCustomFilters(customFilters) {
        return customFilters.map((f) => {
            const filterList = new FilterList(f.content, f.filterId, f.conversionData);
            return new TrustedFilter(f.filterId, filterList.getContent(), f.trusted, filterList.getConversionErrors());
        });
    }
    /**
     * Loads filter content by filter id.
     *
     * @param filterId Filter identifier to load content for.
     *
     * @returns Promise that resolves to the filter content (see {@link FilterList})
     * or null if the filter is not found.
     *
     * @throws Error if the filter content cannot be loaded.
     */
    static loadFilterContent = async (filterId) => {
        try {
            const result = await FiltersStorage.get(filterId);
            if (!result) {
                throw new Error(`Filter with id ${filterId} not found`);
            }
            return new FilterList(result.rawFilterList, filterId, result.conversionData);
        }
        catch (e) {
            throw new Error(`Failed to load filter content: ${e}`);
        }
    };
}

/**
 * Cookie filtering.
 *
 * The following public methods should be set as suitable webRequest events listeners, check sample extension in this
 * repo for an example.
 *
 * Logic introduction:
 *  CookieFiltering.onBeforeSendHeaders:
 *  - get all cookies for request url;
 *  - store cookies (first-party);
 *  - apply rules via modifying or removing them with browser.cookies api;
 *
 *  CookieFiltering.onHeadersReceived:
 *  - parse set-cookie header, only to detect if the cookie in header will be set from third-party request;
 *  - save third-party flag for this cookie cookie.thirdParty=request.thirdParty;
 *  - apply rules via modifying or removing them with browser.cookies api;
 *
 *  CookieFiltering.onCompleted:
 *  - apply rules via content script.
 *
 *  In content-scripts (check /src/content-script/cookie-controller.ts):
 *  - apply matched cookie rules.
 */
class CookieFiltering {
    browserCookieApi = new BrowserCookieApi();
    /**
     * Parses cookies from request headers and applies matched rules
     * via browser.cookies api.
     *
     * @param context Request context.
     */
    onBeforeSendHeaders(context) {
        const { requestHeaders, requestUrl, requestId } = context;
        if (!requestHeaders || !requestUrl) {
            return;
        }
        const cookieHeader = findHeaderByName(requestHeaders, 'Cookie');
        if (!cookieHeader?.value) {
            return;
        }
        const cookies = CookieUtils$1.parseCookies(cookieHeader.value, requestUrl);
        if (cookies.length === 0) {
            return;
        }
        // Saves cookies to context
        requestContextStorage.update(requestId, { cookies });
        // Removes cookies from browser with browser.cookies api, but not
        // removing them from context to correct process them in headers.
        this.applyRules(context)
            .catch((e) => {
            logger.error('[tsweb.CookieFiltering.onBeforeSendHeaders]: cannot apply rules due to: ', e);
        });
    }
    /**
     * Parses set-cookie header from response, looks up third-party cookies
     * and applies matched rules via browser.cookies api.
     *
     * @param context Request context.
     */
    onHeadersReceived(context) {
        const { responseHeaders, requestUrl, thirdParty, requestId, } = context;
        /**
         * Full context can be created in onBeforeRequest, partial context can
         * be created on every requestContextStorage.update method call and
         * because of that case - we explicitly checks fields in object.
         * TODO: Improve in AG-24428.
         */
        if (responseHeaders && requestUrl && typeof thirdParty !== 'undefined') {
            const cookies = CookieUtils$1.parseSetCookieHeaders(responseHeaders, requestUrl);
            const newCookies = cookies.filter((c) => !context.cookies?.includes(c));
            for (const cookie of newCookies) {
                cookie.thirdParty = thirdParty;
            }
            requestContextStorage.update(requestId, {
                cookies: context.cookies ? [...context.cookies, ...newCookies] : newCookies,
            });
        }
        // Removes cookies from browser with browser.cookies api, but not
        // removing them from context to correct process them in headers.
        this.applyRules(context)
            .catch((e) => {
            logger.error('[tsweb.CookieFiltering.onHeadersReceived]: cannot apply rules due to: ', e);
        });
    }
    /**
     * Applies rules.
     *
     * @param context Request context.
     */
    async applyRules(context) {
        const { matchingResult, cookies, requestUrl, tabId, } = context;
        if (!matchingResult || !cookies) {
            return;
        }
        const cookieRules = matchingResult.getCookieRules();
        const promises = cookies.map(async (cookie) => {
            await this.applyRulesToCookie(cookie, cookieRules, requestUrl, tabId);
        });
        await Promise.all(promises);
    }
    /**
     * Attempts to find a "parent" cookie with a wider "path" field,
     * the scope of which includes the specified cookie from
     * the function parameters.
     *
     * This needs to prevent create of multiple "child"-cookies
     * and only modified expiration of general "parent"-cookie,
     * which covered "children"-cookies by 'path' value.
     *
     * @param cookie Cookie, for which need to find the "parent" cookie.
     *
     * @returns Item of parent cookie {@link ParsedCookie} or null if not found.
     */
    async findParentCookie(cookie) {
        const pattern = {
            url: cookie.url,
            name: cookie.name,
            domain: cookie.domain,
            secure: cookie.secure,
        };
        const parentCookies = await this.browserCookieApi.findCookies(pattern);
        const sortedParentCookies = parentCookies.sort((a, b) => a.path.length - b.path.length);
        for (let i = 0; i < sortedParentCookies.length; i += 1) {
            const parentCookie = sortedParentCookies[i];
            if (cookie.path?.startsWith(parentCookie.path)) {
                return ParsedCookie.fromBrowserCookie(parentCookie, cookie.url);
            }
        }
        return null;
    }
    /**
     * Applies rules to cookie.
     *
     * @param cookie Cookie.
     * @param cookieRules Cookie rules.
     * @param requestUrl Request URL, needs to record filtering event.
     * @param tabId Tab id.
     */
    async applyRulesToCookie(cookie, cookieRules, requestUrl, tabId) {
        const cookieName = cookie.name;
        const isThirdPartyCookie = cookie.thirdParty;
        const bRule = CookieRulesFinder.lookupNotModifyingRule(cookieName, cookieRules, isThirdPartyCookie);
        if (bRule) {
            if (bRule.isAllowlist() || await this.browserCookieApi.removeCookie(cookie.name, cookie.url)) {
                CookieFiltering.recordCookieEvent(tabId, cookie, requestUrl, bRule, false, isThirdPartyCookie);
            }
            return;
        }
        const mRules = CookieRulesFinder.lookupModifyingRules(cookieName, cookieRules, isThirdPartyCookie);
        if (mRules.length > 0) {
            // Try to find "parent" cookie and modify it instead of creating
            // "child copy" cookie.
            const parentCookie = await this.findParentCookie(cookie);
            const cookieToModify = parentCookie || cookie;
            const appliedRules = CookieFiltering.applyRuleToBrowserCookie(cookieToModify, mRules);
            if (appliedRules.length === 0) {
                return;
            }
            if (await this.browserCookieApi.modifyCookie(cookieToModify)) {
                appliedRules.forEach((r) => {
                    CookieFiltering.recordCookieEvent(tabId, cookieToModify, requestUrl, r, true, isThirdPartyCookie);
                });
            }
        }
    }
    /**
     * Modifies instance of {@link ParsedCookie} with provided rules.
     *
     * @param cookie Cookie modify.
     * @param rules Cookie matching rules.
     *
     * @returns Applied rules.
     */
    static applyRuleToBrowserCookie(cookie, rules) {
        const appliedRules = [];
        for (let i = 0; i < rules.length; i += 1) {
            const rule = rules[i];
            if (rule.isAllowlist()) {
                appliedRules.push(rule);
                continue;
            }
            const cookieModifier = rule.getAdvancedModifier();
            let modified = false;
            const sameSite = cookieModifier.getSameSite();
            if (sameSite && cookie.sameSite !== sameSite) {
                // eslint-disable-next-line no-param-reassign
                cookie.sameSite = sameSite;
                modified = true;
            }
            const maxAge = cookieModifier.getMaxAge();
            if (maxAge) {
                if (CookieUtils$1.updateCookieMaxAge(cookie, maxAge)) {
                    modified = true;
                }
            }
            if (modified) {
                appliedRules.push(rule);
            }
        }
        return appliedRules;
    }
    /**
     * Looks up blocking rules for content-script.
     *
     * @param frameUrl Frame url.
     * @param tabId Tab id.
     * @param frameId Frame id.
     *
     * @returns List of blocking rules.
     */
    static getBlockingRules(frameUrl, tabId, frameId) {
        const tabContext = tabsApi.getTabContext(tabId);
        if (!tabContext?.info.url) {
            return [];
        }
        const matchQuery = createFrameMatchQuery(frameUrl, frameId, tabContext);
        const matchingResult = engineApi.matchRequest(matchQuery);
        if (!matchingResult) {
            return [];
        }
        const cookieRules = matchingResult.getCookieRules();
        return CookieRulesFinder.getBlockingRules(matchQuery.requestUrl, cookieRules);
    }
    /**
     * Records cookie event to filtering log.
     *
     * @param tabId Id of the tab.
     * @param cookie Item of {@link ParsedCookie}.
     * @param requestUrl URL of the request.
     * @param rule Applied modifying or deleting rule.
     * @param isModifyingCookieRule Is applied rule modifying or not.
     * @param requestThirdParty Whether request third party or not.
     */
    static recordCookieEvent(tabId, cookie, requestUrl, rule, isModifyingCookieRule, requestThirdParty) {
        const { appliedRuleText, originalRuleText } = getRuleTexts(rule, engineApi);
        defaultFilteringLog.publishEvent({
            type: FilteringEventType.Cookie,
            data: {
                eventId: nanoid(),
                tabId,
                cookieName: cookie.name,
                cookieValue: cookie.value,
                frameDomain: getDomain(requestUrl) || requestUrl,
                filterId: rule.getFilterListId(),
                ruleIndex: rule.getIndex(),
                appliedRuleText,
                originalRuleText,
                isModifyingCookieRule,
                requestThirdParty,
                timestamp: Date.now(),
                requestType: ContentType.Cookie,
                isAllowlist: rule.isAllowlist(),
                isImportant: rule.isOptionEnabled(NetworkRuleOption.Important),
                isDocumentLevel: rule.isDocumentLevelAllowlistRule(),
                isCsp: rule.isOptionEnabled(NetworkRuleOption.Csp),
                isCookie: rule.isOptionEnabled(NetworkRuleOption.Cookie),
                advancedModifier: rule.getAdvancedModifierValue(),
            },
        });
    }
}
const cookieFiltering = new CookieFiltering();

/**
 * MessageApi knows how to handle {@link Message}.
 * It is used to communicate with content scripts.
 *
 * TODO: Move to common folder.
 */
class MessagesApi {
    tsWebExtension;
    tabsApi;
    filteringLog;
    /**
     * Creates new {@link MessagesApi}.
     *
     * @param tsWebExtension Current {@link TsWebExtension} app.
     * @param tabsApi Tabs API.
     * @param filteringLog Filtering log.
     *
     * @returns New {@link MessagesApi} handler.
     */
    constructor(tsWebExtension, tabsApi, filteringLog) {
        this.tsWebExtension = tsWebExtension;
        this.tabsApi = tabsApi;
        this.filteringLog = filteringLog;
        this.handleMessage = this.handleMessage.bind(this);
    }
    /**
     * Handles message with {@link MessageType}.
     *
     * @param message Message.
     * @param sender Sender of message.
     *
     * @returns Data according to the received message.
     */
    async handleMessage(message, sender) {
        logger.trace('[tsweb.MessagesApi.handleMessage]: received: ', message);
        try {
            message = messageValidator.parse(message);
        }
        catch (e) {
            logger.error('[tsweb.MessagesApi.handleMessage]: cannot parse message: ', message);
            // Ignore this message
            return undefined;
        }
        const { type } = message;
        switch (type) {
            case MessageType.GetCosmeticData: {
                return this.handleGetCosmeticData(sender, message.payload);
            }
            case MessageType.AssistantCreateRule: {
                return this.handleAssistantCreateRuleMessage(sender, message.payload);
            }
            case MessageType.GetCookieRules: {
                return this.getCookieRules(sender, message.payload);
            }
            case MessageType.SaveCookieLogEvent: {
                return MessagesApi.handleSaveCookieLogEvent(sender, message.payload);
            }
            case MessageType.SaveCssHitsStats: {
                return this.handleSaveCssHitsStats(sender, message.payload);
            }
            default: {
                logger.error('[tsweb.MessagesApi.handleMessage]: did not found handler for message');
            }
        }
        return undefined;
    }
    /**
     * Handles get cosmetic message.
     *
     * @param sender Tab which sent message.
     * @param payload Message payload.
     *
     * @returns Content script data for applying cosmetic rules or null if no data.
     */
    handleGetCosmeticData(sender, payload) {
        logger.trace('[tsweb.MessagesApi.handleGetCosmeticData]: received call: ', payload);
        if (!payload || !sender?.tab?.id) {
            return undefined;
        }
        if (!this.tsWebExtension.isStarted) {
            logger.debug('[tsweb.MessagesApi.handleGetCosmeticData]: tswebextension is not started.');
            return undefined;
        }
        const res = getCosmeticDataPayloadValidator.safeParse(payload);
        if (!res.success) {
            logger.error('[tsweb.MessagesApi.handleGetCosmeticData]: cannot parse payload: ', payload, res.error);
            return undefined;
        }
        const tabId = sender.tab?.id;
        let { frameId } = sender;
        if (!frameId) {
            frameId = MAIN_FRAME_ID;
        }
        return CosmeticApi.getContentScriptData(res.data.documentUrl, tabId, frameId);
    }
    /**
     * Handles message with new rule from assistant content script.
     *
     * @param sender An object containing information about the script context
     * that sent a message or request.
     * @param payload Object with rules text.
     *
     * @returns False if it cannot process the created rule,
     * or true for successful processing.
     */
    // eslint-disable-next-line class-methods-use-this
    handleAssistantCreateRuleMessage(sender, payload) {
        if (!payload || !sender?.tab?.id) {
            return false;
        }
        const res = getAssistantCreateRulePayloadValidator.safeParse(payload);
        if (!res.success) {
            return false;
        }
        const { ruleText } = res.data;
        Assistant.onCreateRule.dispatch(ruleText);
        return true;
    }
    /**
     * Returns cookie rules data for content script.
     *
     * @param sender Tab, which sent message.
     * @param payload Message payload.
     *
     * @returns Cookie rules data.
     */
    getCookieRules(sender, payload) {
        logger.trace('[tsweb.MessagesApi.getCookieRules]: received call: ', payload);
        const { isStorageInitialized } = appContext;
        const data = {
            isAppStarted: false,
            cookieRules: [],
        };
        // if storage is not initialized, then app is not ready yet.
        if (!isStorageInitialized || !this.tsWebExtension.isStarted) {
            return data;
        }
        const res = getCookieRulesPayloadValidator.safeParse(payload);
        if (!res.success) {
            // this log message is added here as error for faster identification of the issue
            logger.error('[tsweb.MessagesApi.getCookieRules]: cannot parse payload: ', payload, res.error);
            return undefined;
        }
        const { documentUrl } = res.data;
        if (isEmptySrcFrame(documentUrl)) {
            logger.debug('[tsweb.MessagesApi.getCookieRules]: frame has empty src');
            return undefined;
        }
        const tabId = sender.tab?.id;
        if (tabId === undefined) {
            logger.debug('[tsweb.MessagesApi.getCookieRules]: tabId is undefined');
            return undefined;
        }
        data.isAppStarted = true;
        let { frameId } = sender;
        if (!frameId) {
            frameId = MAIN_FRAME_ID;
        }
        const cookieRules = CookieFiltering.getBlockingRules(documentUrl, tabId, frameId);
        data.cookieRules = cookieRules.map((rule) => ({
            ruleIndex: rule.getIndex(),
            match: rule.getAdvancedModifierValue(),
            isThirdParty: rule.isOptionEnabled(NetworkRuleOption.ThirdParty),
            filterId: rule.getFilterListId(),
            isAllowlist: rule.isAllowlist(),
            isImportant: rule.isOptionEnabled(NetworkRuleOption.Important),
            isDocumentLevel: rule.isDocumentLevelAllowlistRule(),
            isCsp: rule.isOptionEnabled(NetworkRuleOption.Csp),
            isCookie: rule.isOptionEnabled(NetworkRuleOption.Cookie),
            advancedModifier: rule.getAdvancedModifierValue(),
        }));
        return data;
    }
    /**
     * Handle message about saving css hits stats.
     *
     * @param sender Tab, which sent message.
     * @param payload Message payload.
     *
     * @returns True if stats was saved.
     */
    handleSaveCssHitsStats(sender, 
    // TODO add payload type
    payload) {
        if (!payload || !sender?.tab?.id) {
            return false;
        }
        const tabId = sender.tab.id;
        const tabContext = this.tabsApi.getTabContext(tabId);
        if (!tabContext?.info.url) {
            return false;
        }
        const { url } = tabContext.info;
        let published = false;
        for (let i = 0; i < payload.length; i += 1) {
            const stat = payload[i];
            // Retrieve rule texts for content script cosmetic events
            const { appliedRuleText, originalRuleText } = getRuleTextsByIndex(stat.filterId, stat.ruleIndex, engineApi);
            this.filteringLog.publishEvent({
                type: FilteringEventType.ApplyCosmeticRule,
                data: {
                    tabId,
                    eventId: nanoid(),
                    filterId: stat.filterId,
                    ruleIndex: stat.ruleIndex,
                    appliedRuleText,
                    originalRuleText,
                    element: stat.element,
                    frameUrl: url,
                    frameDomain: getDomain$1(url),
                    requestType: ContentType.Document,
                    timestamp: Date.now(),
                    cssRule: true,
                    scriptRule: false,
                    contentRule: false,
                },
            });
            published = true;
        }
        return published;
    }
    /**
     * Calls filtering to add an event from cookie-controller content-script.
     *
     * @param sender Tab which sent the message.
     * @param payload Message payload.
     *
     * @returns True if event was published to filtering log.
     */
    static handleSaveCookieLogEvent(sender, payload) {
        if (!payload || !sender?.tab?.id) {
            return false;
        }
        const res = getSaveCookieLogEventPayloadValidator.safeParse(payload);
        if (!res.success) {
            return false;
        }
        const { data } = res;
        // For content script events, retrieve rule texts from engine if rule has valid index
        const { appliedRuleText, originalRuleText } = getRuleTextsByIndex(data.filterId, data.ruleIndex, engineApi);
        defaultFilteringLog.publishEvent({
            type: FilteringEventType.Cookie,
            data: {
                eventId: nanoid(),
                tabId: sender.tab.id,
                cookieName: data.cookieName,
                frameDomain: data.cookieDomain,
                cookieValue: data.cookieValue,
                filterId: data.filterId,
                ruleIndex: data.ruleIndex,
                appliedRuleText,
                originalRuleText,
                isModifyingCookieRule: false,
                requestThirdParty: data.thirdParty,
                timestamp: Date.now(),
                requestType: ContentType.Cookie,
                isAllowlist: data.isAllowlist,
                isImportant: data.isImportant,
                isDocumentLevel: data.isDocumentLevel,
                isCsp: data.isCsp,
                isCookie: data.isCookie,
                advancedModifier: data.advancedModifier,
            },
        });
        return true;
    }
}

/**
 * RulesetsLoaderApi is responsible for creating {@link IRulesetWithSourceMap} instances
 * from provided rule set IDs and paths.
 * It supports lazy loading, meaning the rule set contents are loaded only upon request.
 * This class implements a two-layer caching strategy to optimize performance:
 * ## Caching Architecture:
 * 1. **IDB (IndexedDB) Cache**: Persistent storage that survives service worker restarts
 *    - Stores checksums, metadata, lazy metadata, declarative rules and the
 *      number of metadata rules of each rule set file
 *    - Keys format: `<prefix>_<rulesetId>` (e.g., `checksum_ruleset_123`).
 *    - Nothing clears it; entries are overwritten when the checksum of the
 *      rule set file changes, e.g. after an extension update.
 *
 * 2. **In-Memory Cache**: Fast access layer for frequently accessed data within a session
 *    - `idbChecksumsCache`: Caches checksums from IDB with composite keys `<rulesetsPath>_<rulesetId>`
 *    - `rulesetsCache`: Caches fully created IRulesetWithSourceMap instances
 *    - `metadataRulesetsCache`: Caches metadata rule sets by path
 *    - It is empty after every service worker restart.
 *
 * ## Cache Synchronization:
 * The source of truth for data freshness is the checksum of the rule set file
 * stored in the metadata rule set (`ruleset_0`).
 * When the checksum in IDB differs, the rule set file is read again: the
 * preprocessed filter list is written to {@link FiltersStorage} first, then the
 * rule set data together with the new checksum in one IDB transaction. If any
 * step fails, the `rulesets` store keeps the previous checksum (the `filters`
 * store may already hold the new filter list) and the next start syncs again.
 *
 * The main functionalities include:
 * - Initializing the rule sets loader to prepare it for fetching rule sets.
 * - Fetching checksums of rule sets from disk (source of truth).
 * - Synchronizing rule sets with IDB when checksums change.
 * - Creating new {@link IRulesetWithSourceMap} instances with lazy loading capabilities.
 *
 * @example
 * ```typescript
 * const loader = new RulesetsLoaderApi('/path/to/rulesets');
 * const ruleset = await loader.createRuleset('ruleset_123', filters);
 * ```
 */
class RulesetsLoaderApi {
    /**
     * Database store name.
     */
    static DB_STORE_NAME = 'rulesets';
    /**
     * Combiner for key prefix and rule set id.
     */
    static KEY_COMBINER = '_';
    /**
     * Prefix for checksum key.
     */
    static KEY_PREFIX_CHECKSUM = 'checksum';
    /**
     * Prefix for metadata rule set key.
     */
    static KEY_PREFIX_RULESET_METADATA = 'metadata';
    /**
     * Prefix for lazy metadata rule set key.
     */
    static KEY_PREFIX_RULESET_LAZY_METADATA = 'lazyMetadata';
    /**
     * Prefix for declarative rules key.
     */
    static KEY_PREFIX_RULESET_DECLARATIVE_RULES = 'declarativeRules';
    /**
     * Prefix for the key of the number of metadata rules in the rule set file.
     */
    static KEY_PREFIX_METADATA_RULES_COUNT = 'metadataRulesCount';
    /**
     * Cache of metadata rule sets.
     */
    static metadataRulesetsCache = {};
    /**
     * Cache for already created rulesets. Needed to avoid multiple loading
     * of the same ruleset.
     */
    static rulesetsCache;
    /**
     * Path to rule sets cache directory to invalidate it when path changes.
     */
    static rulesetsCachePath;
    /**
     * Path to rule sets directory.
     */
    rulesetsPath;
    /**
     * Indicates whether the rule sets loader is initialized.
     */
    isInitialized;
    /**
     * Promise that resolves when the initialization is complete.
     * This helps prevent multiple fetches by ensuring {@link RulesetsLoaderApi.initialize}
     * is only called once, even if invoked multiple times in quick succession.
     */
    initializerPromise;
    /**
     * Cache of checksums retrieved from IDB to avoid repeated database queries.
     * Key format: `<rulesetsPath>_<rulesetId>` (e.g., `/path/to/rules_123`)
     * Only stores actual checksum values found in IDB, never undefined.
     * This cache is shared across all instances of the class.
     */
    static idbChecksumsCache = new Map();
    /**
     * Race condition lock map per rulesetId.
     * Made static to prevent concurrent syncs across different instances.
     */
    static syncLocks = new Map();
    /**
     * Creates new {@link RulesetsLoaderApi}.
     *
     * @param rulesetsPath Path to rule sets directory.
     */
    constructor(rulesetsPath) {
        this.rulesetsPath = rulesetsPath;
        this.isInitialized = false;
        if (RulesetsLoaderApi.rulesetsCachePath !== rulesetsPath) {
            RulesetsLoaderApi.rulesetsCachePath = rulesetsPath;
            RulesetsLoaderApi.rulesetsCache = new Map();
        }
    }
    /**
     * Returns key with prefix.
     * Key format: <prefix>_<rulesetId>, e.g. `metadata_ruleset_123`.
     *
     * @param keyPrefix Key prefix.
     * @param rulesetId Rule set id.
     *
     * @returns Key with prefix.
     */
    static getKey(keyPrefix, rulesetId) {
        return `${keyPrefix}${RulesetsLoaderApi.KEY_COMBINER}${rulesetId}`;
    }
    /**
     * Parses a rule set file and rethrows the error of a file whose metadata
     * cannot be read, e.g. written by `@adguard/dnr-converter` 1.x, with the
     * rule set id, a hint to update the rule sets and the reason. The reason
     * is repeated in the message because the logger does not print `cause`.
     *
     * @param rulesetId Rule set id.
     * @param parse Parses the rule set file.
     *
     * @returns Result of `parse`.
     *
     * @throws Error with {@link InvalidMetadataChunksError} as `cause` if the
     * metadata of the file cannot be read, or the error of `parse` as is.
     */
    static parseRulesetFile(rulesetId, parse) {
        try {
            return parse();
        }
        catch (e) {
            if (e instanceof InvalidMetadataChunksError) {
                const hint = `Rule set ${rulesetId} has invalid or unsupported metadata, update the rule sets`;
                throw new Error(`${hint}: ${e.message}`, { cause: e });
            }
            throw e;
        }
    }
    /**
     * Returns opened database.
     *
     * @param store Database store name.
     *
     * @returns Promise, resolved with opened database.
     */
    static async getOpenedDb(store) {
        return IdbSingleton.getOpenedDb(store, () => {
            RulesetsLoaderApi.idbChecksumsCache.clear();
        });
    }
    /**
     * Gets the value from the IDB database.
     *
     * @param key The key to look up.
     *
     * @returns The value associated with the key, or undefined if the key is not found.
     */
    static async getValueFromIdb(key) {
        const db = await RulesetsLoaderApi.getOpenedDb(RulesetsLoaderApi.DB_STORE_NAME);
        const tx = db.transaction(RulesetsLoaderApi.DB_STORE_NAME, 'readonly');
        const store = tx.objectStore(RulesetsLoaderApi.DB_STORE_NAME);
        const value = await store.get(key);
        await tx.done;
        return value;
    }
    /**
     * Gets the checksums of the rule sets.
     *
     * @param rulesetId Rule set id.
     *
     * @returns Checksums of the rule sets.
     *
     * @throws If the rule sets loader is not initialized or the checksum for the specified rule set is not found.
     */
    async getChecksum(rulesetId) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        const rulesetIdWithPrefix = getRulesetId(rulesetId);
        return RulesetsLoaderApi.metadataRulesetsCache[this.rulesetsPath]?.getChecksum(rulesetIdWithPrefix);
    }
    /**
     * Initializes the rule sets loader.
     * It loads the metadata ruleset which contains checksums and other metadata
     * needed for rule set management and caching.
     *
     * @throws Error if the metadata ruleset file is not found or its content is invalid.
     */
    async initialize() {
        if (this.isInitialized) {
            return;
        }
        if (this.initializerPromise) {
            await this.initializerPromise;
            return;
        }
        const initialize = async () => {
            try {
                if (!RulesetsLoaderApi.metadataRulesetsCache[this.rulesetsPath]) {
                    const metadataRulesetPath = getRulesetPath(METADATA_RULESET_ID, this.rulesetsPath);
                    const rawMetadataRuleset = await fetchExtensionResourceText(browser.runtime.getURL(metadataRulesetPath));
                    const metadataRuleset = RulesetsLoaderApi.parseRulesetFile(getRulesetId(METADATA_RULESET_ID), () => MetadataRuleset.deserialize(rawMetadataRuleset));
                    RulesetsLoaderApi.metadataRulesetsCache[this.rulesetsPath] = metadataRuleset;
                }
                this.isInitialized = true;
                this.initializerPromise = undefined;
            }
            catch (error) {
                logger.error('[tsweb.RulesetsLoaderApi.initialize]: failed to initialize. Got error: ', error);
                throw error;
            }
        };
        this.initializerPromise = initialize();
        await this.initializerPromise;
    }
    /**
     * Synchronizes the rule set with the IDB database.
     * This method ensures that the rule set is up-to-date in the IDB database.
     * If the rule set is not found in the IDB database, it will be added.
     * If the rule set is found but its checksum does not match, it will be updated.
     *
     * @param rulesetId Rule set id.
     */
    async syncRulesetWithIdb(rulesetId) {
        // Use a per-ruleset lock to avoid parallel syncs
        const existingLock = RulesetsLoaderApi.syncLocks.get(rulesetId);
        if (existingLock) {
            await existingLock;
            return;
        }
        const syncPromise = (async () => {
            try {
                if (!this.isInitialized) {
                    await this.initialize();
                }
                const checksum = await this.getChecksum(rulesetId);
                if (!checksum) {
                    logger.error(`[tsweb.RulesetsLoaderApi.syncRulesetWithIdb]: Failed to get checksum for rule set: ${rulesetId}`);
                    return;
                }
                let idbChecksum;
                const cacheKey = `${this.rulesetsPath}_${rulesetId}`;
                // Check cache first
                if (RulesetsLoaderApi.idbChecksumsCache.has(cacheKey)) {
                    idbChecksum = RulesetsLoaderApi.idbChecksumsCache.get(cacheKey);
                }
                else {
                    // Not in cache - go to database
                    idbChecksum = await RulesetsLoaderApi.getValueFromIdb(RulesetsLoaderApi.getKey(RulesetsLoaderApi.KEY_PREFIX_CHECKSUM, rulesetId));
                    // Only cache if we found a value to avoid storing undefined
                    if (idbChecksum) {
                        RulesetsLoaderApi.idbChecksumsCache.set(cacheKey, idbChecksum);
                    }
                }
                if (idbChecksum === checksum) {
                    return;
                }
                const rulesetIdNumber = extractRulesetId(rulesetId);
                if (!rulesetIdNumber) {
                    throw new Error(`Invalid rule set id: ${rulesetId}`);
                }
                logger.info(`[tsweb.RulesetsLoaderApi.syncRulesetWithIdb]: Syncing rule set with IDB: ${rulesetId} (previous checksum: ${idbChecksum}, current checksum: ${checksum})`);
                const rulesetPath = getRulesetPath(rulesetId, this.rulesetsPath);
                const rawRuleset = await fetchExtensionResourceText(browser.runtime.getURL(rulesetPath));
                const { metadata, lazyMetadata, filterContent, declarativeRules, metadataRulesCount, } = RulesetsLoaderApi.parseRulesetFile(rulesetId, () => parseCompactRuleset(rulesetId, JSON.parse(rawRuleset)));
                // TODO: AG-53262 — Measure cold start time after migration
                // from rawFilterList+conversionData → filterContent.
                // FilterList.prepare() now runs at runtime (was build-time).
                // Could add ~100-200ms per 100k+ line filter on first start.
                const filterList = new FilterList(filterContent);
                // The preprocessed filter list is written before the rule set
                // data and its checksum, so a failure at any step leaves the
                // previous checksum in the rulesets store and the next start
                // syncs again.
                await FiltersStorage.setMultiple({
                    [rulesetIdNumber]: {
                        rawFilterList: filterList.getContent(),
                        conversionData: filterList.getConversionData(),
                        checksum,
                    },
                });
                const db = await RulesetsLoaderApi.getOpenedDb(RulesetsLoaderApi.DB_STORE_NAME);
                const tx = db.transaction(RulesetsLoaderApi.DB_STORE_NAME, 'readwrite');
                const store = tx.objectStore(RulesetsLoaderApi.DB_STORE_NAME);
                const puts = [
                    store.put(JSON.stringify(metadata), RulesetsLoaderApi.getKey(RulesetsLoaderApi.KEY_PREFIX_RULESET_METADATA, rulesetId)),
                    store.put(JSON.stringify(lazyMetadata), RulesetsLoaderApi.getKey(RulesetsLoaderApi.KEY_PREFIX_RULESET_LAZY_METADATA, rulesetId)),
                    store.put(JSON.stringify(declarativeRules), RulesetsLoaderApi.getKey(RulesetsLoaderApi.KEY_PREFIX_RULESET_DECLARATIVE_RULES, rulesetId)),
                    store.put(metadataRulesCount, RulesetsLoaderApi.getKey(RulesetsLoaderApi.KEY_PREFIX_METADATA_RULES_COUNT, rulesetId)),
                    store.put(checksum, RulesetsLoaderApi.getKey(RulesetsLoaderApi.KEY_PREFIX_CHECKSUM, rulesetId)),
                ];
                await Promise.all([...puts, tx.done]);
                // After updating cache in db we should update it in memory cache
                RulesetsLoaderApi.idbChecksumsCache.set(cacheKey, checksum);
                // Invalidate the ruleset cache since the data has changed
                RulesetsLoaderApi.rulesetsCache.delete(rulesetId);
                logger.info(`[tsweb.RulesetsLoaderApi.syncRulesetWithIdb]: Synced rule set with IDB: ${rulesetId}, checksum: ${checksum}`);
            }
            catch (err) {
                logger.error(`[tsweb.RulesetsLoaderApi.syncRulesetWithIdb]: Failed to sync rule set ${rulesetId}:`, err);
                throw err;
            }
            finally {
                RulesetsLoaderApi.syncLocks.delete(rulesetId);
            }
        })();
        RulesetsLoaderApi.syncLocks.set(rulesetId, syncPromise);
        await syncPromise;
    }
    /**
     * If the rule set with the provided ID is already loaded, it will
     * be returned from the cache. Otherwise, it will create a new {@link IRulesetWithSourceMap}
     * from the provided ID and list of {@link IFilter|filters} with lazy
     * loading of this rule set contents.
     *
     * @param rulesetId Rule set id.
     * @param filterList List of all available {@link IFilter|filters}.
     *
     * @returns New {@link IRulesetWithSourceMap}.
     *
     * @throws If initialization fails, the rule set with the provided ID is not
     * found or invalid, or its number of metadata rules is missing in IDB.
     */
    async createRuleset(rulesetId, filterList) {
        const rulesetIdNumber = extractRulesetId(rulesetId);
        if (rulesetIdNumber === null) {
            throw new Error(`Invalid rule set id: ${rulesetId}`);
        }
        const rulesetCache = RulesetsLoaderApi.rulesetsCache.get(rulesetId);
        if (rulesetCache) {
            return rulesetCache;
        }
        if (!this.isInitialized) {
            await this.initialize();
        }
        await this.syncRulesetWithIdb(rulesetId);
        const [rawData, metadataRulesCount] = await Promise.all([
            RulesetsLoaderApi.getValueFromIdb(RulesetsLoaderApi.getKey(RulesetsLoaderApi.KEY_PREFIX_RULESET_METADATA, rulesetId)),
            RulesetsLoaderApi.getValueFromIdb(RulesetsLoaderApi.getKey(RulesetsLoaderApi.KEY_PREFIX_METADATA_RULES_COUNT, rulesetId)),
        ]);
        const loadLazyData = async () => RulesetsLoaderApi.getValueFromIdb(RulesetsLoaderApi.getKey(RulesetsLoaderApi.KEY_PREFIX_RULESET_LAZY_METADATA, rulesetId));
        const loadDeclarativeRules = () => RulesetsLoaderApi.getValueFromIdb(RulesetsLoaderApi.getKey(RulesetsLoaderApi.KEY_PREFIX_RULESET_DECLARATIVE_RULES, rulesetId));
        const deserialized = await RulesetWithSourceMap.deserialize(rulesetId, rawData, loadLazyData, loadDeclarativeRules, filterList);
        // The count is written together with the checksum, so a missing count
        // means the cache was synced by a version that did not write it, from
        // a rule set file that has not changed since, i.e. in an old format.
        if (metadataRulesCount === undefined) {
            // eslint-disable-next-line max-len
            const message = `Metadata rules count of rule set ${rulesetId} is missing in IDB, the cache may be built from rule sets with metadata in an old format, update the rule sets`;
            throw new Error(message);
        }
        const ruleset = RulesetWithSourceMap.fromDeserialized(deserialized, metadataRulesCount);
        if (filterList.some((f) => f.getId() === rulesetIdNumber)) {
            // We save the rule set in the cache only if its filter is loaded.
            RulesetsLoaderApi.rulesetsCache.set(rulesetId, ruleset);
        }
        return ruleset;
    }
}

/**
 * Api for processing request filtering.
 *
 * Method {@link getBlockingResponse} processes rule applying for request and computes response
 * for {@link WebRequestApi.onBeforeRequest} listener.
 *
 * Method {@link shouldCollapseElement} checks, if initializer for request should be collapsed by content-script.
 *
 * This class also provides method {@link isRequestBlockedByRule} for checking, if rule is blocking rule.
 */
class RequestBlockingApi {
    /**
     * Set of tab ids for which `closeTab` has already been invoked
     * but `browser.tabs.remove` has not yet resolved.
     *
     * In MV3 `webRequest` is observe-only — `return { cancel: true }` is a
     * no-op, so the popup tab keeps loading and any redirect (e.g. http→https)
     * arrives as a fresh `onBeforeRequest`. Without this guard, that second
     * event would publish a duplicate `PopupBlocked` event and queue another
     * `tabs.remove` call for an already-closing tab.
     */
    static closingPopupTabs = new Set();
    /**
     * Checks if request rule is blocked.
     *
     * @param requestRule Request network rule or null.
     *
     * @returns True, if rule is request blocking, else returns false.
     */
    static isRequestBlockedByRule(requestRule) {
        return !!requestRule
            && !requestRule.isAllowlist()
            && !requestRule.isOptionEnabled(NetworkRuleOption.Replace)
            && !requestRule.isOptionEnabled(NetworkRuleOption.Redirect);
    }
    /**
     * Closes the tab which considered as a popup.
     *
     * @param data Needed data for logging closing of tab.
     * @param appliedRule Network rule which was applied to request. This field
     * is needed because data contains two rules: one for the request and
     * one for the popup. And we should log only the rule which was applied
     * to the request.
     *
     * @returns Response for {@link RequestApi.onBeforeRequest} listener.
     */
    static closeTab(data, appliedRule) {
        // Skip if this popup tab is already being closed. In MV3 the cancel
        // response is observe-only, so a server-side 301 (e.g.
        // http://evilsite.com/ → https://evilsite.com/) will produce a second
        // `onBeforeRequest` for the same tab while `tabs.remove` is still in
        // flight, which would otherwise duplicate the filtering-log entry.
        if (RequestBlockingApi.closingPopupTabs.has(data.tabId)) {
            return { cancel: true };
        }
        RequestBlockingApi.closingPopupTabs.add(data.tabId);
        // Publish a dedicated `PopupBlocked` event with the real popup tabId.
        // Browser extension filtering log decides where to attach the entry —
        // typically the background page — since the popup tab is removed
        // immediately after this call and would otherwise have no UI surface
        // to render the entry under.
        // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/1686
        RequestBlockingApi.publishPopupBlockedEvent(data, appliedRule);
        browser.tabs.remove(data.tabId).finally(() => {
            RequestBlockingApi.closingPopupTabs.delete(data.tabId);
        });
        return { cancel: true };
    }
    /**
     * Processes rule applying for request and compute response for {@link WebRequestApi.onBeforeRequest} listener.
     *
     * @param data Data for request processing.
     *
     * @returns Response for {@link WebRequestApi.onBeforeRequest} listener.
     */
    static getBlockingResponse(data) {
        const { rule, popupRule, requestType, tabId, eventId, requestId, requestUrl, contentType, referrerUrl, } = data;
        if (!rule) {
            return undefined;
        }
        // popup rule will be handled in the condition with requestType === document below
        if (popupRule === rule && requestType !== RequestType.Document) {
            return undefined;
        }
        if (rule.isAllowlist()) {
            RequestBlockingApi.logRuleApplying(data, rule);
            return undefined;
        }
        if (rule.isOptionEnabled(NetworkRuleOption.Redirect)) {
            const { appliedRuleText, originalRuleText } = getRuleTexts(rule, engineApi);
            defaultFilteringLog.publishEvent({
                type: FilteringEventType.ApplyBasicRule,
                data: {
                    tabId,
                    eventId,
                    requestType: contentType,
                    frameUrl: referrerUrl,
                    requestId,
                    requestUrl,
                    companyCategoryName: companiesDbService.match(requestUrl),
                    filterId: rule.getFilterListId(),
                    ruleIndex: rule.getIndex(),
                    appliedRuleText,
                    originalRuleText,
                    isAllowlist: rule.isAllowlist(),
                    isImportant: rule.isOptionEnabled(NetworkRuleOption.Important),
                    isDocumentLevel: rule.isDocumentLevelAllowlistRule(),
                    isCsp: rule.isOptionEnabled(NetworkRuleOption.Csp),
                    isCookie: rule.isOptionEnabled(NetworkRuleOption.Cookie),
                    advancedModifier: rule.getAdvancedModifierValue(),
                    isAssuredlyBlocked: true,
                },
            });
            // TODO: Check that redirected url exists in our resources as in mv2.
            return { redirectUrl: '' };
        }
        // Basic rules for blocking requests are applied only to sub-requests
        // so `||example.com^` will not block the main page
        // https://adguard.com/kb/general/ad-filtering/create-own-filters/#basic-rules
        // For document requests we need to show blocking page or close tab.
        if (requestType === RequestType.Document) {
            // Blocking rule can be with $popup modifier - in this case we need
            // to close the tab as soon as possible.
            // https://adguard.com/kb/general/ad-filtering/create-own-filters/#popup-modifier
            if (popupRule && tabsApi.isNewPopupTab(tabId)) {
                return RequestBlockingApi.closeTab(data, popupRule);
            }
            // to handle rules with $all modifier, where popup was added implicitly
            if (rule.isOptionEnabled(NetworkRuleOption.Popup) && tabsApi.isNewPopupTab(tabId)) {
                return RequestBlockingApi.closeTab(data, rule);
            }
            // we do not want to block the main page if rule has only $popup modifier
            if (rule === popupRule && !tabsApi.isNewPopupTab(tabId)) {
                return undefined;
            }
            // but if the blocking rule has $document modifier, blocking page should be shown
            // e.g. `||example.com^$document`
            if ((rule.getPermittedRequestTypes() & RequestType.Document) === RequestType.Document) {
                RequestBlockingApi.logRuleApplying(data, rule);
                return { cancel: true };
            }
            return undefined;
        }
        RequestBlockingApi.logRuleApplying(data, rule);
        return { cancel: true };
    }
    /**
     * Logs header rule that would be blocked.
     * In MV3, we don't actually block in web request API, but we log supposedly blocked requests.
     *
     * @param context Request context.
     */
    static logHeaderRuleIfAny(context) {
        const { matchingResult, responseHeaders, tabId, referrerUrl, parentDocumentId, frameAncestors, } = context;
        if (!matchingResult || !responseHeaders) {
            return;
        }
        const rule = matchingResult.getResponseHeadersResult(responseHeaders);
        if (rule) {
            RequestBlockingApi.logRuleApplying(context, rule);
            tabsApi.incrementTabBlockedRequestCount({
                tabId,
                referrerUrl,
                parentDocumentId,
                frameAncestors,
            });
        }
    }
    /**
     * Creates {@link FilteringLog} event of rule applying for processed request.
     *
     * @param data Data for request processing.
     * @param appliedRule Network rule which was applied to request.
     */
    static logRuleApplying(data, appliedRule) {
        const { tabId, eventId, referrerUrl, requestId, requestUrl, requestType, contentType, } = data;
        if (!appliedRule || requestType === 0) {
            return;
        }
        const { appliedRuleText, originalRuleText } = getRuleTexts(appliedRule, engineApi);
        defaultFilteringLog.publishEvent({
            type: FilteringEventType.ApplyBasicRule,
            data: {
                tabId,
                eventId,
                requestType: contentType,
                frameUrl: referrerUrl,
                requestId,
                requestUrl,
                filterId: appliedRule.getFilterListId(),
                ruleIndex: appliedRule.getIndex(),
                appliedRuleText,
                originalRuleText,
                isAllowlist: appliedRule.isAllowlist(),
                isImportant: appliedRule.isOptionEnabled(NetworkRuleOption.Important),
                isDocumentLevel: appliedRule.isDocumentLevelAllowlistRule(),
                isCsp: appliedRule.isOptionEnabled(NetworkRuleOption.Csp),
                isCookie: appliedRule.isOptionEnabled(NetworkRuleOption.Cookie),
                advancedModifier: appliedRule.getAdvancedModifierValue(),
            },
        });
    }
    /**
     * Publishes a {@link FilteringEventType.PopupBlocked} event for a tab
     * that is being closed by a `$popup` modifier rule.
     *
     * The event carries the real popup `tabId`. Consumers decide where to
     * attach the entry (typically the background page) since the popup tab
     * is removed immediately after the event is published.
     *
     * @param data Data for the popup request being blocked.
     * @param appliedRule Network rule that was applied to the request.
     */
    static publishPopupBlockedEvent(data, appliedRule) {
        const { tabId, eventId, referrerUrl, requestId, requestUrl, requestType, contentType, } = data;
        if (!appliedRule || requestType === 0) {
            return;
        }
        const { appliedRuleText, originalRuleText } = getRuleTexts(appliedRule, engineApi);
        defaultFilteringLog.publishEvent({
            type: FilteringEventType.PopupBlocked,
            data: {
                tabId,
                eventId,
                requestType: contentType,
                frameUrl: referrerUrl,
                requestId,
                requestUrl,
                filterId: appliedRule.getFilterListId(),
                ruleIndex: appliedRule.getIndex(),
                appliedRuleText,
                originalRuleText,
                isAllowlist: appliedRule.isAllowlist(),
                isImportant: appliedRule.isOptionEnabled(NetworkRuleOption.Important),
                isDocumentLevel: appliedRule.isDocumentLevelAllowlistRule(),
                // TODO: we should simplify events like this and exclude unused fields
                // e.g. isCsp, isCookie, isAllowlist if we already know that this is $popup rule
                isCsp: appliedRule.isOptionEnabled(NetworkRuleOption.Csp),
                isCookie: appliedRule.isOptionEnabled(NetworkRuleOption.Cookie),
                advancedModifier: appliedRule.getAdvancedModifierValue(),
            },
        });
    }
}

/**
 * Content Security Policy Headers filtering service module.
 *
 * This service blocks third-party CSP reports using Chrome's Declarative Net Request API.
 *
 * @note **Does not work for allowlisted domains:**
 *    - Allowlist rules have higher priority than CSP blocking rules
 *    - This is correct behavior - allowlist should disable ALL filtering for the domain
 *    - @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#rule-priorities}
 */
class CspService {
    /**
     * Adds a CSP report blocking rule to the declarative net request API.
     */
    static async addCspReportBlockingRule() {
        const rule = {
            id: SessionRuleId.CspReportBlocking,
            action: {
                type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
            },
            condition: {
                urlFilter: '*',
                resourceTypes: [chrome.declarativeNetRequest.ResourceType.CSP_REPORT],
                domainType: chrome.declarativeNetRequest.DomainType.THIRD_PARTY,
            },
        };
        await SessionRulesApi.setSessionRule(rule);
    }
    /**
     * Logs CSP report blocking events in onBeforeRequest.
     * Called for all requests to detect third-party CSP reports that will be blocked by DNR.
     *
     * **IMPORTANT**: We EXPECT these requests to be blocked by DNR rules, but cannot know for certain
     * in production mode. We mark them as "blocked" for convenience in filtering logs.
     *
     * @param context Request context.
     */
    static onBeforeRequest(context) {
        const { requestType, thirdParty, tabId, referrerUrl, parentDocumentId, frameAncestors, } = context;
        if (requestType !== RequestType.CspReport) {
            return;
        }
        if (thirdParty) {
            defaultFilteringLog.publishEvent({
                type: FilteringEventType.CspReportBlocked,
                data: {
                    eventId: context.eventId,
                    tabId: context.tabId,
                    cspReportBlocked: true,
                },
            });
            tabsApi.incrementTabBlockedRequestCount({
                tabId,
                referrerUrl,
                parentDocumentId,
                frameAncestors,
            });
        }
    }
    /**
     * Applies CSP rules to response headers and returns modified headers.
     * It is applied when webRequest.onHeadersReceived event is fired.
     *
     * @param context Request context.
     */
    static onHeadersReceived(context) {
        const { matchingResult, responseHeaders, requestId, tabId, requestUrl, referrerUrl, } = context;
        if (!matchingResult) {
            return;
        }
        const cspHeaders = [];
        const cspRules = matchingResult.getCspRules();
        for (let i = 0; i < cspRules.length; i += 1) {
            const rule = cspRules[i];
            if (rule.isOptionEnabled(NetworkRuleOption.Header)) {
                const responseHeaderMatch = rule.matchResponseHeaders(responseHeaders);
                if (!responseHeaderMatch || rule.isAllowlist()) {
                    continue;
                }
            }
            // Don't forget: getCspRules returns all $csp rules, we must directly check that the rule is blocking.
            if (RequestBlockingApi.isRequestBlockedByRule(rule)) {
                const cspHeaderValue = rule.getAdvancedModifierValue();
                if (cspHeaderValue) {
                    cspHeaders.push({
                        name: CSP_HEADER_NAME,
                        value: cspHeaderValue,
                    });
                }
            }
            const { appliedRuleText, originalRuleText } = getRuleTexts(rule, engineApi);
            defaultFilteringLog.publishEvent({
                type: FilteringEventType.ApplyCspRule,
                data: {
                    tabId,
                    eventId: nanoid(),
                    requestUrl,
                    frameUrl: referrerUrl,
                    frameDomain: getDomain$1(referrerUrl),
                    requestType: ContentType.Csp,
                    filterId: rule.getFilterListId(),
                    ruleIndex: rule.getIndex(),
                    appliedRuleText,
                    originalRuleText,
                    timestamp: Date.now(),
                    isAllowlist: rule.isAllowlist(),
                    isImportant: rule.isOptionEnabled(NetworkRuleOption.Important),
                    isDocumentLevel: rule.isDocumentLevelAllowlistRule(),
                    isCsp: rule.isOptionEnabled(NetworkRuleOption.Csp),
                    isCookie: rule.isOptionEnabled(NetworkRuleOption.Cookie),
                    advancedModifier: rule.getAdvancedModifierValue(),
                },
            });
        }
        if (cspHeaders.length > 0) {
            requestContextStorage.update(requestId, {
                responseHeaders: responseHeaders ? [...responseHeaders, ...cspHeaders] : cspHeaders,
            });
        }
    }
    /**
     * Removes all CSP rules.
     */
    static clearAll() {
        SessionRulesApi.removeSessionRule(SessionRuleId.CspReportBlocking);
    }
}

/**
 * Browser detector for MV3.
 */
// eslint-disable-next-line no-restricted-globals
const browserDetectorMV3 = new BrowserDetector(self);

/**
 * This service encapsulate processing of $document modifier rules.
 *
 * Service is initialized in {@link configure} method, called from {@link EngineApi#startEngine}.
 *
 * Request rule is processed in {@link handleDocumentBlocking} method, called
 * from {@link RequestBlockingApi.getBlockingResponse}.
 *
 * Request rule is processed following scenario:
 * - if domain is trusted, ignore request
 * - if rule is document blocking and {@link documentBlockingPageUrl} is undefined, return
 * {@link WebRequestApi.onBeforeRequest} blocking response
 * - if rule is document blocking and {@link documentBlockingPageUrl} is defined, return redirect response with
 * required params.
 * - if browser is Firefox, update page url by {@link browser.tabs} API, because FF doesn't support redirects to
 * extension pages.
 */
class DocumentBlockingService extends DocumentBlockingServiceCommon {
    /**
     * List of rules which are temporarily considered trusted.
     */
    trustedDomains = [];
    /**
     * Creates instance of {@link DocumentBlockingService}.
     *
     * @param tabsApiInstance Wrapper around browser.tabs API.
     * @param engineApiInstance Engine API.
     */
    constructor(tabsApiInstance, engineApiInstance) {
        super(tabsApiInstance, engineApiInstance, browserDetectorMV3);
    }
    /**
     * Configures service instance {@link documentBlockingPageUrl}.
     *
     * @param configuration App {@link Configuration}.
     */
    configure(configuration) {
        const { settings, trustedDomains } = configuration;
        this.documentBlockingPageUrl = settings?.documentBlockingPageUrl;
        this.trustedDomains = trustedDomains;
    }
    /**
     * Checks if rule is trusted which means that blocking page should not be shown.
     *
     * @param ruleText Rule to check.
     *
     * @returns True if rule is trusted, false otherwise.
     */
    isTrusted(ruleText) {
        return this.trustedDomains.includes(ruleText);
    }
    /**
     * Processes $document modifier rule matched request in {@link RequestBlockingApi.getBlockingResponse}.
     *
     * @param data Data for document request processing.
     */
    handleDocumentBlocking(data) {
        const { tabId, rule, requestUrl, } = data;
        // if documentBlockingPage is undefined, block request
        if (!this.documentBlockingPageUrl) {
            logger.warn(`[tsweb.DocumentBlockingService.handleDocumentBlocking]: documentBlockingPageUrl is not set while handling request ${requestUrl}`);
            return;
        }
        const ruleText = this.getRuleText(rule);
        /**
         * If rule is trusted, no redirect to blocking page.
         *
         * IMPORTANT: MV3 implementation is different from MV2
         * because declarative blocking rules are applied by browser.
         * So to undo the blocking, we are saving a rule as trusted
         * when user clicks "Proceed anyway" button on the blocking page,
         * and applying it (dynamically) with $badfilter modifier after it.
         */
        if (this.isTrusted(ruleText)) {
            return;
        }
        // If the request is a prerender request, instead of redirecting, we
        // block the request.
        // Actual redirect will happen after user navigates to the prerendered
        // page.
        if (data.isPrerenderRequest) {
            logger.debug(`[tsweb.DocumentBlockingService.handleDocumentBlocking]: Skipping document blocking for prerender request ${requestUrl} in tab ${tabId}`);
            return;
        }
        // If the request is a prefetch request (e.g. via Chrome's Speculation
        // Rules API), skip the redirect — user has not navigated to the page.
        if (data.isPrefetchRequest) {
            logger.debug(`[tsweb.DocumentBlockingService.handleDocumentBlocking]: Skipping document blocking for prefetch request ${requestUrl} in tab ${tabId}`);
            return;
        }
        // Prefetch/prerender requests shouldn't be logged as blocked documents
        this.logEvent(data);
        this.redirectToBlockingUrl({
            tabId,
            documentBlockingPageUrl: this.documentBlockingPageUrl,
            requestUrl,
            rule,
        });
    }
}
const documentBlockingService = new DocumentBlockingService(tabsApi, engineApi);

/**
 * MV3 implementation of the $removeparam injection service.
 *
 * Uses `ScriptingApi.executeScriptFunc` (which wraps `chrome.scripting.executeScript`
 * with `world: 'MAIN'`) for both initial injection and descriptor updates.
 */
class RemoveParamInjectionService extends AbstractRemoveParamInjectionService {
    /**
     * Bound handler for `chrome.webNavigation.onHistoryStateUpdated`.
     *
     * @param details Web navigation event details.
     */
    handleHistoryStateUpdated = (details) => {
        this.onHistoryStateUpdated(details.tabId, details.frameId, details.url);
    };
    /**
     * Bound handler for `chrome.tabs.onRemoved`.
     *
     * @param tabId Removed tab identifier.
     */
    handleTabRemoved = (tabId) => {
        this.onTabRemoved(tabId);
    };
    /**
     * @inheritdoc
     */
    registerListeners() {
        chrome.webNavigation.onHistoryStateUpdated.addListener(this.handleHistoryStateUpdated);
        chrome.tabs.onRemoved.addListener(this.handleTabRemoved);
    }
    /**
     * @inheritdoc
     */
    unregisterListeners() {
        chrome.webNavigation.onHistoryStateUpdated.removeListener(this.handleHistoryStateUpdated);
        chrome.tabs.onRemoved.removeListener(this.handleTabRemoved);
    }
    /**
     * @inheritdoc
     */
    // eslint-disable-next-line class-methods-use-this
    executeInjection(tabId, frameId, descriptors, nonce, secret) {
        ScriptingApi.executeScriptFunc({
            tabId,
            frameId,
            scriptFunction: patchHistoryForRemoveParam,
            args: [descriptors, nonce, secret],
        }).catch((e) => {
            logger.error('[tsweb.RemoveParamInjectionService.executeInjection]: failed to inject removeparam script:', e);
        });
    }
    /**
     * @inheritdoc
     */
    // eslint-disable-next-line class-methods-use-this
    executeUpdate(tabId, frameId, secret, descriptors, nonce) {
        const scriptFunction = (token, descs, nonceProp) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updater = window[nonceProp];
            if (typeof updater === 'function') {
                updater(token, descs);
            }
        };
        ScriptingApi.executeScriptFunc({
            tabId,
            frameId,
            scriptFunction: scriptFunction,
            args: [secret, descriptors, nonce],
        }).catch((e) => {
            logger.error('[tsweb.RemoveParamInjectionService.executeUpdate]: failed to send descriptor update:', e);
        });
    }
}
/**
 * Singleton instance of the MV3 remove-param injection service.
 */
const removeParamInjectionService = new RemoveParamInjectionService(tabsApi, engineApi, defaultFilteringLog);

const searchEngineDomains = [
    // Google domains
    // src: https://www.google.com/supported_domains
    'google.com',
    'google.ad',
    'google.ae',
    'google.com.af',
    'google.com.ag',
    'google.al',
    'google.am',
    'google.co.ao',
    'google.com.ar',
    'google.as',
    'google.at',
    'google.com.au',
    'google.az',
    'google.ba',
    'google.com.bd',
    'google.be',
    'google.bf',
    'google.bg',
    'google.com.bh',
    'google.bi',
    'google.bj',
    'google.com.bn',
    'google.com.bo',
    'google.com.br',
    'google.bs',
    'google.bt',
    'google.co.bw',
    'google.by',
    'google.com.bz',
    'google.ca',
    'google.cd',
    'google.cf',
    'google.cg',
    'google.ch',
    'google.ci',
    'google.co.ck',
    'google.cl',
    'google.cm',
    'google.cn',
    'google.com.co',
    'google.co.cr',
    'google.com.cu',
    'google.cv',
    'google.com.cy',
    'google.cz',
    'google.de',
    'google.dj',
    'google.dk',
    'google.dm',
    'google.com.do',
    'google.dz',
    'google.com.ec',
    'google.ee',
    'google.com.eg',
    'google.es',
    'google.com.et',
    'google.fi',
    'google.com.fj',
    'google.fm',
    'google.fr',
    'google.ga',
    'google.ge',
    'google.gg',
    'google.com.gh',
    'google.com.gi',
    'google.gl',
    'google.gm',
    'google.gr',
    'google.com.gt',
    'google.gy',
    'google.com.hk',
    'google.hn',
    'google.hr',
    'google.ht',
    'google.hu',
    'google.co.id',
    'google.ie',
    'google.co.il',
    'google.im',
    'google.co.in',
    'google.iq',
    'google.is',
    'google.it',
    'google.je',
    'google.com.jm',
    'google.jo',
    'google.co.jp',
    'google.co.ke',
    'google.com.kh',
    'google.ki',
    'google.kg',
    'google.co.kr',
    'google.com.kw',
    'google.kz',
    'google.la',
    'google.com.lb',
    'google.li',
    'google.lk',
    'google.co.ls',
    'google.lt',
    'google.lu',
    'google.lv',
    'google.com.ly',
    'google.co.ma',
    'google.md',
    'google.me',
    'google.mg',
    'google.mk',
    'google.ml',
    'google.com.mm',
    'google.mn',
    'google.com.mt',
    'google.mu',
    'google.mv',
    'google.mw',
    'google.com.mx',
    'google.com.my',
    'google.co.mz',
    'google.com.na',
    'google.com.ng',
    'google.com.ni',
    'google.ne',
    'google.nl',
    'google.no',
    'google.com.np',
    'google.nr',
    'google.nu',
    'google.co.nz',
    'google.com.om',
    'google.com.pa',
    'google.com.pe',
    'google.com.pg',
    'google.com.ph',
    'google.com.pk',
    'google.pl',
    'google.pn',
    'google.com.pr',
    'google.ps',
    'google.pt',
    'google.com.py',
    'google.com.qa',
    'google.ro',
    'google.ru',
    'google.rw',
    'google.com.sa',
    'google.com.sb',
    'google.sc',
    'google.se',
    'google.com.sg',
    'google.sh',
    'google.si',
    'google.sk',
    'google.com.sl',
    'google.sn',
    'google.so',
    'google.sm',
    'google.sr',
    'google.st',
    'google.com.sv',
    'google.td',
    'google.tg',
    'google.co.th',
    'google.com.tj',
    'google.tl',
    'google.tm',
    'google.tn',
    'google.to',
    'google.com.tr',
    'google.tt',
    'google.com.tw',
    'google.co.tz',
    'google.com.ua',
    'google.co.ug',
    'google.co.uk',
    'google.com.uy',
    'google.co.uz',
    'google.com.vc',
    'google.co.ve',
    'google.co.vi',
    'google.com.vn',
    'google.vu',
    'google.ws',
    'google.rs',
    'google.co.za',
    'google.co.zm',
    'google.co.zw',
    'google.cat',
    // Yandex domains
    // src: https://serpapi.com/yandex-domains
    'yandex.com',
    'yandex.ru',
    'ya.ru',
    'yandex.by',
    'yandex.kz',
    'yandex.uz',
    'yandex.com.tr',
    'yandex.fr',
    'yandex.az',
    'yandex.com.ge',
    'yandex.com.am',
    'yandex.co.il',
    'yandex.lv',
    'yandex.lt',
    'yandex.ee',
    'yandex.md',
    'yandex.tm',
    'yandex.tj',
    'yandex.eu',
    // Other search engines
    'yahoo.com',
    'bing.com',
    'go.mail.ru',
    'ask.com',
    'aol.com',
    'baidu.com',
    'seznam.cz',
];

/**
 * Reserved stealth content script ids.
 */
var StealthContentScriptId;
(function (StealthContentScriptId) {
    StealthContentScriptId["Gpc"] = "gpc";
    StealthContentScriptId["DocumentReferrer"] = "documentReferrer";
})(StealthContentScriptId || (StealthContentScriptId = {}));
/**
 * Stealth service module.
 */
class StealthService {
    /**
     * Checks if both stealth mode and filtering are enabled.
     *
     * @param settings Settings configuration.
     *
     * @returns True if stealth mode and filtering are enabled.
     */
    static isStealthAllowed(settings) {
        return settings.stealthModeEnabled && settings.filteringEnabled;
    }
    /**
     * Required permissions for the stealth options related to browser settings.
     */
    static REQUIRED_PERMISSIONS = ['privacy'];
    /**
     * Scope of the applied browser setting related to the stealth options.
     * Regular scope means that the setting is applied to the both incognito and regular windows.
     */
    static SETTING_SCOPE = 'regular';
    /**
     * Stealth headers.
     */
    static HEADERS = {
        REFERRER: {
            name: 'Referer',
        },
        X_CLIENT_DATA: {
            name: 'X-Client-Data',
        },
        DO_NOT_TRACK: {
            name: 'DNT',
            value: '1',
        },
        GLOBAL_PRIVACY_CONTROL: {
            name: 'Sec-GPC',
            value: '1',
        },
    };
    /**
     * Types of resources to apply the stealth declarative network rules.
     *
     * @returns Array of resource types.
     */
    static get RESOURCE_TYPES() {
        return [
            chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
            chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
            chrome.declarativeNetRequest.ResourceType.STYLESHEET,
            chrome.declarativeNetRequest.ResourceType.SCRIPT,
            chrome.declarativeNetRequest.ResourceType.IMAGE,
            chrome.declarativeNetRequest.ResourceType.FONT,
            chrome.declarativeNetRequest.ResourceType.OBJECT,
            chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST,
            chrome.declarativeNetRequest.ResourceType.PING,
            chrome.declarativeNetRequest.ResourceType.CSP_REPORT,
            chrome.declarativeNetRequest.ResourceType.MEDIA,
            chrome.declarativeNetRequest.ResourceType.WEBSOCKET,
            chrome.declarativeNetRequest.ResourceType.OTHER,
        ];
    }
    /**
     * Temporary flag that used to identify is stealth allowlist implemented or not.
     * It's used to identify should we check for allowlist rule in order
     * to publish `StealthAllowlistAction` event.
     *
     * TODO: After adding stealth allowlist we should remove it.
     */
    static IS_ALLOWLIST_IMPLEMENTED = false;
    /**
     * Temporary flag that used to identify is stealth `Hide Referrer`
     * and `Hide Search Queries` checkboxes is presented or not.
     *
     * TODO: After reverting that checkboxes we should remove it (AG-34765).
     */
    static IS_REFERRER_CHECKBOX_PRESENT = false;
    /**
     * Applies stealth actions to request headers and publishes filtering log event.
     *
     * @param context Request context.
     */
    static onBeforeSendHeaders(context) {
        const settings = appContext.configuration?.settings;
        if (!settings) {
            return;
        }
        if (!StealthService.isStealthAllowed(settings)) {
            return;
        }
        let stealthActions = StealthActions.None;
        const { requestUrl, requestHeaders, matchingResult, tabId, eventId, referrerUrl, contentType, timestamp, requestId, } = context;
        if (!requestHeaders || matchingResult?.documentRule) {
            return;
        }
        /**
         * Regarding stealth rule modifier, stealth options can be disabled on two occasions:
         * - stealth modifier does not have specific values, thus disabling stealth entirely
         * - stealth modifier has specific options to disable.
         */
        matchingResult?.getStealthRule();
        const { blockChromeClientData, sendDoNotTrack, } = settings.stealth;
        const headersToRemove = new Set();
        const headersToAdd = [];
        // Collect applied allowlist rules in a set to only publish
        // one filtering event per applied allowlist rule
        const appliedAllowlistRules = new Set();
        // Removes `X-Client-Data` header if present
        if (blockChromeClientData) {
            matchingResult?.getStealthRule(StealthOptionName.XClientData);
            if (hasHeaderByName(requestHeaders, StealthService.HEADERS.X_CLIENT_DATA.name)) {
                stealthActions |= StealthActions.BlockChromeClientData;
                headersToRemove.add(StealthService.HEADERS.X_CLIENT_DATA.name.toLowerCase());
            }
        }
        // Adds `Do-Not-Track (DNT)` and `Global-Privacy-Control (Sec-GPC)` headers if not present
        if (sendDoNotTrack) {
            matchingResult?.getStealthRule(StealthOptionName.DoNotTrack);
            {
                let headerAdded = false;
                if (!hasHeader(requestHeaders, StealthService.HEADERS.DO_NOT_TRACK)) {
                    headersToAdd.push(StealthService.HEADERS.DO_NOT_TRACK);
                    headerAdded = true;
                }
                if (!hasHeader(requestHeaders, StealthService.HEADERS.GLOBAL_PRIVACY_CONTROL)) {
                    headersToAdd.push(StealthService.HEADERS.GLOBAL_PRIVACY_CONTROL);
                    headerAdded = true;
                }
                if (headerAdded) {
                    stealthActions |= StealthActions.SendDoNotTrack;
                }
            }
        }
        // Removing headers
        let newRequestHeaders = requestHeaders;
        if (headersToRemove.size > 0) {
            newRequestHeaders = requestHeaders.filter((header) => {
                return !headersToRemove.has(header.name.toLowerCase());
            });
        }
        // Adding headers
        for (const header of headersToAdd) {
            const foundHeader = findHeaderByName(newRequestHeaders, header.name);
            if (foundHeader) {
                foundHeader.value = header.value;
            }
            else {
                newRequestHeaders.push(header);
            }
        }
        requestContextStorage.update(requestId, {
            requestHeaders: newRequestHeaders,
        });
        if (appliedAllowlistRules.size > 0) {
            defaultFilteringLog.publishEvent({
                type: FilteringEventType.StealthAllowlistAction,
                data: {
                    tabId,
                    eventId,
                    rules: Array.from(appliedAllowlistRules).map((rule) => ({
                        filterId: rule.getFilterListId(),
                        ruleIndex: rule.getIndex(),
                        // fallback should never happen during normal operation
                        // eslint-disable-next-line max-len
                        appliedRuleText: rule.getText() ?? `<dynamic rule text is not specified> (${rule.getFilterListId()}:${rule.getIndex()})`,
                        originalRuleText: null,
                        isAllowlist: rule.isAllowlist(),
                        isImportant: rule.isOptionEnabled(NetworkRuleOption.Important),
                        isDocumentLevel: rule.isDocumentLevelAllowlistRule(),
                        isCsp: rule.isOptionEnabled(NetworkRuleOption.Csp),
                        isCookie: rule.isOptionEnabled(NetworkRuleOption.Cookie),
                        advancedModifier: rule.getAdvancedModifierValue(),
                    })),
                    requestUrl,
                    frameUrl: referrerUrl,
                    requestType: contentType,
                    timestamp,
                },
            });
        }
        if (stealthActions > 0) {
            defaultFilteringLog.publishEvent({
                type: FilteringEventType.StealthAction,
                data: {
                    tabId,
                    eventId,
                    stealthActions,
                },
            });
        }
    }
    /**
     * Applies the stealth options from the settings configuration.
     *
     * @param settingsConfig Settings configuration.
     *
     * @returns Partial stealth configuration with boolean status of applied
     * changes.
     */
    static async applySettings(settingsConfig) {
        const { stealthModeEnabled, stealth, gpcScriptUrl, hideDocumentReferrerScriptUrl, } = settingsConfig;
        // "Syntax sugar" to fit into 120 max characters per line.
        const enabled = stealthModeEnabled;
        const [hideReferrer, blockWebRTC, blockChromeClientData, sendDoNotTrack, hideSearchQueries,] = await Promise.all([
            StealthService.setHideReferrer(enabled && stealth.hideReferrer),
            StealthService.setDisableWebRTC(enabled && stealth.blockWebRTC),
            StealthService.setBlockChromeClientData(enabled && stealth.blockChromeClientData),
            StealthService.setSendDoNotTrack(enabled && stealth.sendDoNotTrack, gpcScriptUrl),
            StealthService.setHideSearchQueries(enabled && stealth.hideSearchQueries, hideDocumentReferrerScriptUrl),
        ]);
        return {
            hideReferrer,
            blockWebRTC,
            blockChromeClientData,
            sendDoNotTrack,
            hideSearchQueries,
        };
    }
    /**
     * Set the referrer header to be hidden.
     *
     * @param isReferrerHidden Flag that determines if the referrer should be hidden.
     *
     * @returns Promise that resolves with current state of the referrer header.
     */
    static async setHideReferrer(isReferrerHidden) {
        if (!isReferrerHidden) {
            try {
                await StealthService.removeSessionRule(SessionRuleId.HideReferrer);
                return isReferrerHidden;
            }
            catch (e) {
                logger.error('[tsweb.StealthService.setHideReferrer]: error on removing the stealth rule "hide-referrer": ', e);
                return !isReferrerHidden;
            }
        }
        try {
            await StealthService.setSessionRule({
                id: SessionRuleId.HideReferrer,
                action: {
                    type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
                    requestHeaders: [{
                            header: StealthService.HEADERS.REFERRER.name,
                            operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
                        }],
                },
                condition: {
                    urlFilter: '*',
                    resourceTypes: StealthService.RESOURCE_TYPES,
                },
            });
            return isReferrerHidden;
        }
        catch (e) {
            logger.error('[tsweb.StealthService.setHideReferrer]: error on setting the stealth rule $referrer: ', e);
            return !isReferrerHidden;
        }
    }
    /**
     * If {@link isBlockChromeClientData} is true, add the declarative network rule to remove
     * `X-Client-Data` header from every request.
     *
     * @param isBlockChromeClientData Flag that determines if the `X-Client-Data` header is removed.
     *
     * @returns Promise that resolves with current state of the referrer header.
     */
    static async setBlockChromeClientData(isBlockChromeClientData) {
        if (!isBlockChromeClientData) {
            try {
                await StealthService.removeSessionRule(SessionRuleId.BlockChromeClientData);
                return isBlockChromeClientData;
            }
            catch (e) {
                logger.error('[tsweb.StealthService.setBlockChromeClientData]: error on removing the stealth rule $xclientdata: ', e);
                return !isBlockChromeClientData;
            }
        }
        try {
            await StealthService.setSessionRule({
                id: SessionRuleId.BlockChromeClientData,
                action: {
                    type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
                    requestHeaders: [{
                            header: StealthService.HEADERS.X_CLIENT_DATA.name,
                            operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
                        }],
                },
                condition: {
                    urlFilter: '*',
                    resourceTypes: StealthService.RESOURCE_TYPES,
                },
            });
            return isBlockChromeClientData;
        }
        catch (e) {
            logger.error('[tsweb.StealthService.setBlockChromeClientData]: error on setting the stealth rule $xclientdata: ', e);
            return !isBlockChromeClientData;
        }
    }
    /**
     * If {@link isSendDoNotTrack} is true, add the declarative network rule to set `DNT`
     * and `Sec-GPC` headers for every request.
     *
     * @param isSendDoNotTrack Flag that determines if the `Do Not Track` and `Global Privacy Control` signals is set.
     * @param gpcScriptUrl Path to content script for injecting GPC signal.
     *
     * @returns Promise that resolves with current state of the referrer header.
     */
    static async setSendDoNotTrack(isSendDoNotTrack, gpcScriptUrl) {
        if (!isSendDoNotTrack) {
            try {
                await Promise.all([
                    StealthService.removeSessionRule(SessionRuleId.SendDoNotTrack),
                    StealthService.removeContentScript(StealthContentScriptId.Gpc),
                ]);
                return isSendDoNotTrack;
            }
            catch (e) {
                logger.error('[tsweb.StealthService.setSendDoNotTrack]: error on removing the stealth rule $donottrack: ', e);
                return !isSendDoNotTrack;
            }
        }
        try {
            await Promise.all([
                StealthService.setSessionRule({
                    id: SessionRuleId.SendDoNotTrack,
                    action: {
                        type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
                        requestHeaders: [{
                                header: StealthService.HEADERS.DO_NOT_TRACK.name,
                                value: StealthService.HEADERS.DO_NOT_TRACK.value,
                                operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                            }, {
                                header: StealthService.HEADERS.GLOBAL_PRIVACY_CONTROL.name,
                                value: StealthService.HEADERS.GLOBAL_PRIVACY_CONTROL.value,
                                operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                            }],
                    },
                    condition: {
                        urlFilter: '*',
                        resourceTypes: StealthService.RESOURCE_TYPES,
                    },
                }),
                StealthService.setContentScript({
                    id: StealthContentScriptId.Gpc,
                    js: [gpcScriptUrl],
                    world: 'MAIN',
                    runAt: 'document_start',
                    matches: [
                        'http://*/*',
                        'https://*/*',
                    ],
                    persistAcrossSessions: false,
                }),
            ]);
            return isSendDoNotTrack;
        }
        catch (e) {
            logger.error('[tsweb.StealthService.setSendDoNotTrack]: error on setting the stealth rule $donottrack: ', e);
            return !isSendDoNotTrack;
        }
    }
    /**
     * If {@link isHideSearchQueries} is true, adds the declarative network rule to set the
     * `Referrer-Policy` header to `no-referrer` for the search pages like Google, Bing, etc.
     *
     * @param isHideSearchQueries Flag that determines if the search queries should be hidden.
     * @param hideDocumentReferrerScriptUrl Path to content script for hiding the document referrer.
     *
     * @returns Promise that resolves with current state of the referrer header.
     */
    static async setHideSearchQueries(isHideSearchQueries, hideDocumentReferrerScriptUrl) {
        if (!isHideSearchQueries) {
            try {
                await Promise.all([
                    StealthService.removeSessionRule(SessionRuleId.HideSearchQueries),
                    StealthService.removeContentScript(StealthContentScriptId.DocumentReferrer),
                ]);
                return isHideSearchQueries;
            }
            catch (e) {
                logger.error('[tsweb.StealthService.setHideSearchQueries]: error on removing the stealth rule $searchqueries: ', e);
                return !isHideSearchQueries;
            }
        }
        try {
            await Promise.all([
                StealthService.setSessionRule({
                    id: SessionRuleId.HideSearchQueries,
                    action: {
                        type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
                        requestHeaders: [{
                                header: StealthService.HEADERS.REFERRER.name,
                                operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
                            }],
                    },
                    condition: {
                        urlFilter: '*',
                        resourceTypes: StealthService.RESOURCE_TYPES,
                        initiatorDomains: searchEngineDomains,
                    },
                }),
                StealthService.setContentScript({
                    id: StealthContentScriptId.DocumentReferrer,
                    js: [hideDocumentReferrerScriptUrl],
                    world: 'MAIN',
                    runAt: 'document_start',
                    matches: [
                        'http://*/*',
                        'https://*/*',
                    ],
                    persistAcrossSessions: false,
                }),
            ]);
            return isHideSearchQueries;
        }
        catch (e) {
            logger.error('[tsweb.StealthService.setHideSearchQueries]: error on setting the stealth rule $searchqueries: ', e);
            return !isHideSearchQueries;
        }
    }
    /**
     * If {@link isWebRTCDisabled} is true, sets the browser IP policy to `default_public_interface_only`,
     * otherwise restore default policy.
     *
     * @param isWebRTCDisabled Flag that determines if the WebRTC should be disabled.
     *
     * @returns Promise that resolves with current state of the referrer header.
     *
     * @throws Error if the permissions are not granted, but required to set the WebRTC policy.
     */
    static async setDisableWebRTC(isWebRTCDisabled) {
        const permissions = StealthService.REQUIRED_PERMISSIONS;
        const isPermissionGranted = await chrome.permissions.contains({ permissions });
        if (!isPermissionGranted) {
            // If the option is disabled, do nothing.
            if (!isWebRTCDisabled) {
                return isWebRTCDisabled;
            }
            logger.error('[tsweb.StealthService.setDisableWebRTC]: permissions are not granted: ', permissions.join(', '));
            return !isWebRTCDisabled;
        }
        try {
            const setting = chrome.privacy.network.webRTCIPHandlingPolicy;
            if (isWebRTCDisabled) {
                await StealthService.setSetting(setting, chrome.privacy.IPHandlingPolicy.DEFAULT_PUBLIC_INTERFACE_ONLY);
            }
            else {
                await StealthService.clearSetting(setting);
            }
            return isWebRTCDisabled;
        }
        catch (e) {
            logger.error('[tsweb.StealthService.setDisableWebRTC]: error on setting the WebRTC policy ($webrtc): ', e);
            /**
             * Edge case: If error occurred while applying WebRTC
             * setting, it means that other extension might be
             * blocking it, we should return false as a indicator
             * of that WebRTC can not be enabled.
             */
            return false;
        }
    }
    /**
     * Sets the browser settings value.
     *
     * @param setting Webextension setting API.
     * @param value Setting value to set.
     *
     * @returns Resolves when the setting is set.
     *
     * @throws Error if the setting is not controllable or controlled by other extensions.
     */
    static async setSetting(setting, value) {
        await StealthService.validateLevelOfControl(setting);
        return setting.set({ value, scope: StealthService.SETTING_SCOPE });
    }
    /**
     * Gets the browser settings value and webextension level of control.
     *
     * @param setting Webextension browser setting API.
     *
     * @returns Resolved promise with the setting value and level of control.
     *
     * @throws Error if something went wrong.
     */
    static async getSetting(setting) {
        // TODO: Check, should we use ChromeSettingGetDetails.incognito flag?
        return setting.get({});
    }
    /**
     * Sets the browser settings value to the default.
     *
     * @param setting Webextension browser setting API.
     *
     * @returns Resolved promise when the setting is cleared.
     *
     * @throws Error if something went wrong.
     */
    static async clearSetting(setting) {
        await StealthService.validateLevelOfControl(setting);
        return setting.clear({ scope: StealthService.SETTING_SCOPE });
    }
    /**
     * Checks if the setting is controllable.
     *
     * @param setting Webextension browser setting API.
     *
     * @throws Error, if setting is not controllable.
     */
    static async validateLevelOfControl(setting) {
        const { levelOfControl } = await StealthService.getSetting(setting);
        if (levelOfControl === 'not_controllable') {
            throw new Error('Setting is not controllable');
        }
        if (levelOfControl === 'controlled_by_other_extensions') {
            throw new Error('Setting is controlled by other extensions');
        }
    }
    /**
     * Set the stealth rule in the session ruleset.
     * If the rule with the same id already exists, it will be replaced.
     *
     * @param rule Stealth rule to set.
     *
     * @returns Resolved promise when the rule is set.
     */
    static async setSessionRule(rule) {
        return SessionRulesApi.setSessionRule(rule);
    }
    /**
     * Remove the stealth rule from the session ruleset.
     *
     * @param ruleId Stealth rule id.
     *
     * @returns Resolved promise when the rule is removed.
     */
    static async removeSessionRule(ruleId) {
        return SessionRulesApi.removeSessionRule(ruleId);
    }
    /**
     * Unregister content script with specified {@link contentScriptId}.
     * If content script is not found, do nothing.
     *
     * @param contentScriptId Content script id.
     */
    static async removeContentScript(contentScriptId) {
        const existedContentScripts = await chrome.scripting.getRegisteredContentScripts({
            ids: [contentScriptId],
        });
        if (existedContentScripts.length > 0) {
            await chrome.scripting.unregisterContentScripts({
                ids: existedContentScripts.map(((script) => script.id)),
            });
        }
    }
    /**
     * Register content script.
     * If content script with {@link contentScript} has already registered, update it.
     *
     * @param contentScript Content script to set.
     */
    static async setContentScript(contentScript) {
        await StealthService.removeContentScript(contentScript.id);
        await chrome.scripting.registerContentScripts([contentScript]);
    }
    /**
     * Removes all stealth rules and content scripts.
     */
    static async clearAll() {
        const contentScriptIds = Object.values(StealthContentScriptId);
        contentScriptIds.forEach(async (id) => {
            await StealthService.removeContentScript(id);
        });
        await StealthService.removeSessionRule(SessionRuleId.BlockChromeClientData);
        await StealthService.removeSessionRule(SessionRuleId.HideReferrer);
        await StealthService.removeSessionRule(SessionRuleId.HideSearchQueries);
        await StealthService.removeSessionRule(SessionRuleId.SendDoNotTrack);
    }
    /**
     * Is url search engine.
     *
     * @param url Url for check.
     *
     * @returns True if url is search engine.
     */
    static isSearchEngine(url) {
        const domain = getDomain(url);
        return searchEngineDomains.some((searchEngine) => searchEngine === domain);
    }
}

/**
 * Permissions Policy service.
 */
class PermissionsPolicyService {
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
     * Applies permissions policy directives to the response headers.
     *
     * @param context Request context.
     */
    static onHeadersReceived(context) {
        const { matchingResult, responseHeaders, requestId, requestType, tabId, requestUrl, referrerUrl, } = context;
        if (!matchingResult) {
            return;
        }
        const permissionsPolicyRules = matchingResult.getPermissionsPolicyRules();
        const permissionsPolicyHeaders = [];
        if (permissionsPolicyRules.length === 0) {
            return;
        }
        // Check if a global allowlist rule is present.
        if (permissionsPolicyRules.some((rule) => rule.isAllowlist()
            && !rule.getAdvancedModifierValue()
            && !PermissionsPolicyService.isSubDocumentRule(rule))) {
            return;
        }
        for (let i = 0; i < permissionsPolicyRules.length; i += 1) {
            const rule = permissionsPolicyRules[i];
            // Sub frames can only be affected by a rule where the $subdocument modifier has been set.
            if (PermissionsPolicyService.isSubDocumentRule(rule) !== (requestType === RequestType.SubDocument)) {
                continue;
            }
            const directives = rule.getAdvancedModifierValue();
            if (directives) {
                if (!rule.isAllowlist()) {
                    permissionsPolicyHeaders.push({
                        name: PERMISSIONS_POLICY_HEADER_NAME,
                        value: directives,
                    });
                }
                const { appliedRuleText, originalRuleText } = getRuleTexts(rule, engineApi);
                defaultFilteringLog.publishEvent({
                    type: FilteringEventType.ApplyPermissionsRule,
                    data: {
                        tabId,
                        // for proper filtering log request info rule displaying
                        // event id should be unique for each event, not copied from request
                        // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2341
                        eventId: nanoid(),
                        requestUrl,
                        frameUrl: referrerUrl,
                        frameDomain: getDomain$1(referrerUrl),
                        requestType: ContentType.PermissionsPolicy,
                        filterId: rule.getFilterListId(),
                        ruleIndex: rule.getIndex(),
                        appliedRuleText,
                        originalRuleText,
                        timestamp: Date.now(),
                        isAllowlist: rule.isAllowlist(),
                        isImportant: rule.isOptionEnabled(NetworkRuleOption.Important),
                        isDocumentLevel: rule.isDocumentLevelAllowlistRule(),
                        isCsp: rule.isOptionEnabled(NetworkRuleOption.Csp),
                        isCookie: rule.isOptionEnabled(NetworkRuleOption.Cookie),
                        advancedModifier: rule.getAdvancedModifierValue(),
                    },
                });
            }
        }
        requestContextStorage.update(requestId, {
            responseHeaders: responseHeaders ? [
                ...responseHeaders,
                ...permissionsPolicyHeaders,
            ] : permissionsPolicyHeaders,
        });
    }
}

/**
 * @file
 * API for applying rules from background service
 * by handling web Request API and web navigation events.
 *
 * This scheme describes flow for MV3.
 *
 * Event data is aggregated into two contexts: {@link RequestContext},
 * which contains data about the specified request
 * and {@link TabContext} which contains data about the specified tab and frames inside it.
 *
 * Applying {@link NetworkRule} from the background page:
 *
 * In case if {@link browser.tabs.onCreated} event is not fired before —
 * we create a {@link TabContext} manually for document requests,
 * and the cssText, scriptText, scriptletDataList for specified frame are calculated and stored in tab context storage,
 * at the time {@link RequestEvents.onBeforeRequest} or {@link WebNavigation.onBeforeNavigate} is processed.
 * In the most cases the onBeforeNavigate event is processed before onBeforeRequest.
 *
 * At {@link RequestEvents.onBeforeSendHeaders}, the request headers will be parsed to apply $cookie rules
 * based on the {@link MatchingResult} stored in {@link requestContextStorage}.
 * At {@link RequestEvents.onHeadersReceived}, the response headers are handled in the same way.
 *
 * At {@link RequestEvents.onErrorOccurred}, the blocked request url will be matched by {@link companiesDbService}
 * for collecting precise statistics of blocked requests.
 *
 * The specified {@link RequestContext} is removed from {@link requestContextStorage} on
 * {@link RequestEvents.onCompleted} or {@link RequestEvents.onErrorOccurred}.
 * Frame context {@link Frame} is removed from {@link TabContext} on
 * {@link WebNavigation.onCompleted} or {@link WebNavigation.onErrorOccurred}.
 *
 *
 * Web Request API Event Handling:
 *
 *                                       ┌─────────────────────────────┐
 * Create {@link TabContext}             │                             │
 * if it's not created before,           │       onBeforeRequest       ◄─┐
 * and matches {@link MatchingResult}    │                             │ │
 * for the request.                      └──────────────┬──────────────┘ │
 * If this is a frame request,                          │                │
 * also matches the                                     │                │
 * {@link CosmeticResult}.                              │                │
 * Also logs CSP report blocking events.                │                │
 *                                                      │                │
 *                                                      │                │
 *                                       ┌──────────────▼──────────────┐ │
 * Parses request headers and applies    │                             │ │
 * $cookie rules based on                │      onBeforeSendHeaders    ◄─┼─┐
 * {@link MatchingResult}.               │                             │ │ │
 *                                       └──────────────┬──────────────┘ │ │
 *                                                      │                │ │
 *                                       ┌──────────────▼──────────────┐ │ │
 *                                       │                             │ │ │
 *                                       │        onSendHeaders        │ │ │
 *                                       │                             │ │ │
 *                                       └──────────────┬──────────────┘ │ │
 *                                                      │                │ │
 *                                       ┌──────────────▼──────────────┐ │ │
 * Parses response headers and applies   │                             │ │ │
 * $cookie rules based on              ┌─┤      onHeadersReceived      │ │ │
 * {@link MatchingResult}.             │ │                             │ │ │
 *                                     │ └─────────────────────────────┘ │ │
 *                                     │                                 │ │
 *                                     │ ┌─────────────────────────────┐ │ │
 *                                     │ │                             │ │ │
 *                                     ├─►       onBeforeRedirect      ├─┘ │
 *                                     │ │                             │   │
 *                                     │ └─────────────────────────────┘   │
 *                                     │                                   │
 *                                     │ ┌─────────────────────────────┐   │
 *                                     │ │                             │   │
 *                                     ├─►        onAuthRequired       ├───┘
 *                                     │ │                             │
 *                                     │ └─────────────────────────────┘
 *                                     │
 *   On response started               │ ┌─────────────────────────────┐
 *   We try to inject js               │ │                             │
 *                                     └─►      onResponseStarted      │
 *                                       │                             │
 *                                       └──────────────┬──────────────┘
 *                                                      │
 *                                       ┌──────────────▼──────────────┐
 *                                       │                             │
 * Removes the request information       │         onCompleted         │
 * from {@link requestContextStorage}.   │                             │
 *                                       └─────────────────────────────┘.
 *
 *                                       ┌─────────────────────────────┐
 * Matches blocked request url           │                             │
 * by {@link companiesDbService}         │                             │
 * for collecting statistics.            │       onErrorOccurred       │
 * Also removes the request information  │                             │
 * from {@link requestContextStorage}.   │                             │
 *                                       └─────────────────────────────┘.
 *
 *
 * Web Navigation API Event Handling:
 *
 *                                       ┌─────────────────────────────┐
 *                                       │                             │
 *                                       │  onCreatedNavigationTarget  │
 *                                       │                             │
 *                                       └──────────────┬──────────────┘
 *                                                      │
 *                                       ┌──────────────▼──────────────┐
 * Create {@link TabContext}             │                             │
 * if it's not created before,           │       onBeforeNavigate      │
 * and update main frame data with       │                             │
 * {@link updateMainFrameData}           └──────────────┬──────────────┘
 * and matches {@link CosmeticResult}.                  │
 *                                                      │
 *                                                      │
 *                                       ┌──────────────▼──────────────┐
 * Try injecting js and css              │                             │
 * into the frame with source            │         onCommitted         │
 * based on {@link CosmeticRule}.        │                             │
 * and remove data from the              └──────────────┬──────────────┘
 * {@link RequestContextStorage}                        │
 *                                       ┌──────────────▼──────────────┐
 *                                       │                             │
 *                                       │      onDOMContentLoaded     ├─┐
 *                                       │                             │ │
 *                                       └──────────────┬──────────────┘ │
 *                                                      │                │
 *                                       ┌──────────────▼──────────────┐ │
 * Remove the frame data                 │                             │ │
 * from {@link TabContext}.            ┌─┤         onCompleted         │ │
 *                                     │ │                             │ │
 *                                     │ └─────────────────────────────┘ │
 *                                     │                                 │
 *                                     │ ┌─────────────────────────────┐ │
 *                                     │ │                             │ │
 *                                     ├─►    onHistoryStateUpdated    ◄─┤
 *                                     │ │                             │ │
 *                                     │ └─────────────────────────────┘ │
 *                                     │                                 │
 *                                     │ ┌─────────────────────────────┐ │
 *                                     │ │                             │ │
 *                                     └─►  onReferenceFragmentUpdated ◄─┘
 *                                       │                             │
 *                                       └─────────────────────────────┘.
 *
 *                                       ┌─────────────────────────────┐
 * Remove the frame data                 │                             │
 * from {@link TabContext}.              │       onErrorOccurred       │
 *                                       │                             │
 *                                       └─────────────────────────────┘.
 */
/**
 * API for applying rules from background service by handling
 * Web Request API and web navigation events.
 */
class WebRequestApi {
    /**
     * Adds listeners to web request events.
     */
    static start() {
        // browser.webRequest Events
        RequestEvents.onBeforeRequest.addListener(WebRequestApi.onBeforeRequest);
        RequestEvents.onResponseStarted.addListener(WebRequestApi.onResponseStarted);
        RequestEvents.onBeforeSendHeaders.addListener(WebRequestApi.onBeforeSendHeaders);
        RequestEvents.onHeadersReceived.addListener(WebRequestApi.onHeadersReceived);
        RequestEvents.onErrorOccurred.addListener(WebRequestApi.onErrorOccurred);
        RequestEvents.onCompleted.addListener(WebRequestApi.onCompleted);
        // browser.webNavigation Events
        // 'chrome' is used here because MV3 is mainly for Chrome,
        // and it provides better types compared to 'browser' from webextension-polyfill.
        chrome.webNavigation.onBeforeNavigate.addListener(WebRequestApi.onBeforeNavigate);
        chrome.webNavigation.onCommitted.addListener(WebRequestApi.onCommitted);
        browser.webNavigation.onErrorOccurred.addListener(WebRequestApi.deleteFrameContext);
        browser.webNavigation.onCompleted.addListener(WebRequestApi.deleteFrameContext);
    }
    /**
     * Removes web request event handlers.
     */
    static stop() {
        // browser.webRequest Events
        RequestEvents.onBeforeRequest.removeListener(WebRequestApi.onBeforeRequest);
        RequestEvents.onResponseStarted.removeListener(WebRequestApi.onResponseStarted);
        RequestEvents.onBeforeSendHeaders.removeListener(WebRequestApi.onBeforeSendHeaders);
        RequestEvents.onHeadersReceived.removeListener(WebRequestApi.onHeadersReceived);
        RequestEvents.onErrorOccurred.removeListener(WebRequestApi.onErrorOccurred);
        RequestEvents.onCompleted.removeListener(WebRequestApi.onCompleted);
        // browser.webNavigation Events
        chrome.webNavigation.onBeforeNavigate.removeListener(WebRequestApi.onBeforeNavigate);
        chrome.webNavigation.onCommitted.removeListener(WebRequestApi.onCommitted);
        browser.webNavigation.onErrorOccurred.removeListener(WebRequestApi.deleteFrameContext);
        browser.webNavigation.onCompleted.removeListener(WebRequestApi.deleteFrameContext);
    }
    /**
     * Flush browser in-memory cache.
     *
     * This function is called after an engine update or filtering switch to ensure
     * that new rules are applied to requests that may have been cached by the browser.
     */
    static async flushMemoryCache() {
        try {
            await browser.webRequest.handlerBehaviorChanged();
        }
        catch (e) {
            logger.error('[tsweb.WebRequestApi.flushMemoryCache]: Cannot flush memory cache and call browser.handlerBehaviorChanged: ', e);
        }
    }
    /**
     * On before request event handler. This is the earliest event in the chain of the web request events.
     *
     * @param requestData Object containing request context and details.
     * @param requestData.context Request context.
     * @param requestData.details Event details.
     */
    static onBeforeRequest({ context, details }) {
        if (!context) {
            return;
        }
        const { requestType, requestUrl, referrerUrl, requestId, method, tabId, frameId, eventId, contentType, timestamp, thirdParty, parentDocumentId, frameAncestors, isPrefetchRequest, } = context;
        const { parentFrameId, documentLifecycle, } = details;
        const isDocumentRequest = requestType === RequestType.Document;
        /**
         * In some cases `onBeforeRequest` might happen before Tabs API `onCreated`
         * event is fired or even not fired at all
         * (e.g. {@link https://github.com/microsoft/MicrosoftEdge-Extensions/issues/296 | Edge Split Screen Issue}),
         * in this cases we need to create tab context manually. This is needed
         * to ensure that we have tab context to be able to inject cosmetics and scripts.
         *
         * We create tab context only for document requests,
         * because other types of requests can't have tab context.
         */
        if (isDocumentRequest) {
            tabsApi.createTabContextIfNotExists(tabId, requestUrl);
        }
        const isDocumentOrSubDocumentRequest = isDocumentRequest || requestType === RequestType.SubDocument;
        /**
         * Speculative (prefetch/prerender) main-frame requests must not touch the
         * frame's cosmetic state, because cosmetic recalculation is skipped for
         * them in `CosmeticFrameProcessor.handleFrame`. Resetting the frame context
         * here would clear the already-prepared cosmetic result and refresh the
         * frame timestamp, so the subsequent real navigation would be wrongly
         * treated as a duplicate by `shouldSkipRecalculation` (within
         * `SAME_FRAME_THRESHOLD_MS`), leaving the frame without cosmetics.
         */
        const isPrerenderRequest = documentLifecycle === DocumentLifecycle.Prerender;
        const isSpeculativeMainFrame = frameId === MAIN_FRAME_ID && (isPrerenderRequest || !!isPrefetchRequest);
        let skipPrecalculation = true;
        if (isDocumentOrSubDocumentRequest && !isSpeculativeMainFrame) {
            skipPrecalculation = CosmeticFrameProcessor.shouldSkipRecalculation(tabId, frameId, requestUrl, timestamp);
            if (!skipPrecalculation) {
                /**
                 * Set in the beginning to let other events know that cosmetic result
                 * will be calculated in this event to avoid double calculation.
                 */
                tabsApi.setFrameContext(tabId, frameId, new FrameMV3({
                    tabId,
                    frameId,
                    parentFrameId,
                    url: requestUrl,
                    timeStamp: timestamp,
                    documentId: details.documentId,
                    parentDocumentId: details.parentDocumentId,
                }));
            }
        }
        if (!isHttpOrWsRequest(requestUrl)) {
            return;
        }
        /**
         * We use here referrerUrl as frameUrl for all type of requests, because
         * we have pre-process for this in {@link RequestEvents.handleOnBeforeRequest},
         * where we can set `referrerUrl` to `requestUrl` for prerender requests.
         */
        const frameUrl = referrerUrl;
        defaultFilteringLog.publishEvent({
            type: FilteringEventType.SendRequest,
            data: {
                tabId,
                eventId,
                requestUrl,
                requestDomain: getDomain(requestUrl),
                frameUrl,
                frameDomain: getDomain(referrerUrl),
                requestType: contentType,
                timestamp,
                requestThirdParty: thirdParty,
                method,
            },
        });
        // Note: Must be called after SendRequest event to ensure proper event ordering in logs
        CspService.onBeforeRequest(context);
        let frameRule;
        /**
         * For Document and SubDocument requests, we match frame, because
         * these requests are happening first in page's lifecycle (before other).
         *
         * For other requests we get the frame rule from tabsApi, assuming
         * the frame rule is already in the tab context.
         */
        if (isDocumentOrSubDocumentRequest) {
            frameRule = DocumentApi.matchFrame(frameUrl);
        }
        else {
            frameRule = tabsApi.getTabFrameRule(tabId);
        }
        const matchingResult = engineApi.matchRequest({
            requestUrl,
            frameUrl,
            requestType,
            frameRule,
            method,
        });
        if (!matchingResult) {
            return;
        }
        // Save matching result to the request context.
        requestContextStorage.update(requestId, { matchingResult });
        if (isDocumentOrSubDocumentRequest && !skipPrecalculation) {
            // Matching request
            CosmeticFrameProcessor.precalculateCosmetics({
                tabId,
                frameId,
                parentFrameId,
                url: requestUrl,
                timeStamp: timestamp,
                documentLifecycle,
                isPrefetchRequest,
            });
        }
        const response = RequestBlockingApi.getBlockingResponse({
            rule: matchingResult.getBasicResult(),
            popupRule: matchingResult.getPopupRule(),
            eventId,
            requestId,
            requestUrl,
            referrerUrl,
            requestType,
            contentType,
            tabId,
        });
        // redirects should be considered as blocked for the tab blocked request count
        // which is displayed on the extension badge
        // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2443
        if (response?.cancel || response?.redirectUrl !== undefined) {
            tabsApi.incrementTabBlockedRequestCount({
                tabId,
                referrerUrl,
                parentDocumentId,
                frameAncestors,
            });
        }
    }
    /**
     * On response started event handler.
     *
     * @param event On response started event.
     * @param event.context Event context.
     * @param event.details Event details.
     */
    static onResponseStarted({ context, details }) {
        if (!context) {
            return;
        }
        const { requestType, tabId, frameId } = context;
        if (requestType !== RequestType.Document
            && requestType !== RequestType.SubDocument) {
            return;
        }
        if (WebRequestApi.isAssistantFrame(tabId, details)) {
            logger.debug(`[tsweb.WebRequestApi.onResponseStarted]: assistant frame detected, skipping cosmetics injection for tabId ${tabId} and frameId ${frameId}`);
            return;
        }
        if (!CosmeticApi.shouldApplyCosmetics(tabId, details.url)) {
            logger.debug(`[tsweb.WebRequestApi.onResponseStarted]: skipping cosmetics injection for background or extension page with tabId ${tabId}, frameId ${frameId} and url ${details.url}`);
            return;
        }
        // Note: this is an async function, but we will not await it because
        // events do not support async listeners.
        CosmeticApi.applyCosmeticRules(tabId, frameId, false).catch((e) => {
            logger.error(`[tsweb.WebRequestApi.onResponseStarted]: error applying cosmetic rules for tabId ${tabId} and frameId ${frameId}`, e);
        });
    }
    /**
     * On before send headers event handler.
     *
     * @param details On before send headers details.
     * @param details.context Details context.
     */
    static onBeforeSendHeaders({ context }) {
        if (!context) {
            return;
        }
        const { referrerUrl, tabId, } = context;
        /**
         * TODO: Remove Cookie header from requests initiated by the background
         * extension via Declarative Net Request to implement SanitizeApi
         * functionality from MV2.
         */
        if (tabId === BACKGROUND_TAB_ID && isExtensionUrl(referrerUrl)) {
            return;
        }
        // If the current request does not comply with any rules - we do not
        // need to call any other processing services (e.g. cookie, header)
        if (context?.matchingResult) {
            cookieFiltering.onBeforeSendHeaders(context);
        }
        StealthService.onBeforeSendHeaders(context);
    }
    /**
     * On headers received event handler.
     *
     * @param event On headers received event.
     * @param event.context Event context.
     * @param event.details On headers received details.
     */
    static onHeadersReceived({ context, details, }) {
        if (!context) {
            return;
        }
        defaultFilteringLog.publishEvent({
            type: FilteringEventType.ReceiveResponse,
            data: {
                tabId: context.tabId,
                // It's important to use same eventId as onBeforeRequest to match
                // the request in the filtering log and update it's status.
                eventId: context.eventId,
                statusCode: details.statusCode,
            },
        });
        if (!context?.matchingResult
            || context.matchingResult.getBasicResult()?.isFilteringDisabled()) {
            return;
        }
        // Check for header rules and log them
        // In MV3, we don't actually block in web request API (blocking is done via DNR),
        // but we need to log supposedly blocked requests for statistics and filtering log
        RequestBlockingApi.logHeaderRuleIfAny(context);
        const { requestUrl, requestType } = context;
        const isDocumentOrSubDocumentRequest = requestType === RequestType.Document
            || requestType === RequestType.SubDocument;
        if (requestUrl && isDocumentOrSubDocumentRequest) {
            CspService.onHeadersReceived(context);
            PermissionsPolicyService.onHeadersReceived(context);
        }
        cookieFiltering.onHeadersReceived(context);
    }
    /**
     * On before navigate web navigation event handler.
     *
     * @param details Event details.
     */
    static onBeforeNavigate(details) {
        const { tabId, frameId, parentFrameId, url, parentDocumentId, timeStamp, documentLifecycle, } = details;
        const isPrerenderRequest = documentLifecycle === DocumentLifecycle.Prerender;
        /**
         * In some cases `onBeforeNavigate` might happen before Tabs API `onCreated`
         * event is fired or even not fired at all
         * (e.g. {@link https://github.com/microsoft/MicrosoftEdge-Extensions/issues/296 | Edge Split Screen Issue}),
         * in this cases we need to create tab context manually. This is needed
         * to ensure that we have tab context to be able to inject cosmetics and scripts.
         *
         * We create tab context only for document requests (outermost frame),
         * because other types of requests can't have tab context.
         *
         * Skip tab context creation for prerender requests, as the tabId may not
         * correspond to a real tab yet.
         */
        if (TabsApiCommon.isDocumentLevelFrame(parentFrameId) && !isPrerenderRequest) {
            tabsApi.createTabContextIfNotExists(tabId, url);
        }
        /**
         * Same reasoning as in `onBeforeRequest`: a speculative (prerender)
         * main-frame navigation must not touch the current page's state.
         * Cosmetic recalculation is skipped for prerenders in
         * `CosmeticFrameProcessor.handleFrame`, so resetting the frame context
         * here would clear the prepared cosmetic result and refresh the frame
         * timestamp, making the subsequent real navigation be wrongly skipped
         * by `shouldSkipRecalculation` (within `SAME_FRAME_THRESHOLD_MS`).
         * The `$removeparam` invalidation below must not run either, since
         * a prerender does not replace the current page context.
         *
         * Note: prefetch requests do not need a guard here because they are
         * plain network fetches and do not emit `webNavigation` events.
         */
        if (frameId === MAIN_FRAME_ID && isPrerenderRequest) {
            return;
        }
        if (CosmeticFrameProcessor.shouldSkipRecalculation(tabId, frameId, url, timeStamp)) {
            return;
        }
        // A new navigation invalidates any existing $removeparam injection
        // for this tab — the page context is being replaced.
        if (frameId === MAIN_FRAME_ID) {
            removeParamInjectionService.invalidateTab(tabId);
        }
        /**
         * Set in the beginning to let other events know that cosmetic result
         * will be calculated in this event to avoid double calculation.
         */
        tabsApi.setFrameContext(tabId, frameId, new FrameMV3({
            tabId,
            frameId,
            parentFrameId,
            url,
            timeStamp,
            documentId: details.documentId,
            parentDocumentId: details.parentDocumentId,
        }));
        // Matching request
        CosmeticFrameProcessor.precalculateCosmetics({
            tabId,
            frameId,
            parentFrameId,
            url,
            timeStamp,
            parentDocumentId,
            documentLifecycle,
        });
    }
    /**
     * Event handler for onErrorOccurred event. It fires when an error occurs, e.g. request is blocked.
     * So if the request is blocked by DNR rule,
     * we should log this event for collecting statistics due to {@link companiesDbService}.
     *
     * @param event On error occurred event.
     * @param event.details On error occurred event details.
     */
    static onErrorOccurred({ details, }) {
        const { tabId, requestId, url, type, error, documentLifecycle, } = details;
        /**
         * Error related to request blocking by DNR rule.
         */
        const CLIENT_BLOCKED_ERROR = 'net::ERR_BLOCKED_BY_CLIENT';
        // filter out non-related errors, e.g. 'net::ERR_ABORTED'
        if (error !== CLIENT_BLOCKED_ERROR) {
            return;
        }
        const context = requestContextStorage.get(requestId);
        if (!context) {
            return;
        }
        const { eventId, requestUrl, referrerUrl, contentType, matchingResult, isPrefetchRequest, } = context;
        // checking whether the matchingResult exists in the context guarantees
        // that the request was blocked by our extension
        if (!matchingResult) {
            return;
        }
        const companyCategoryName = companiesDbService.match(url);
        const appliedRule = matchingResult.getBasicResult();
        const { appliedRuleText, originalRuleText } = appliedRule
            ? getRuleTexts(appliedRule, engineApi)
            : { appliedRuleText: null, originalRuleText: null };
        defaultFilteringLog.publishEvent({
            type: FilteringEventType.ApplyBasicRule,
            data: {
                tabId,
                eventId,
                requestType: contentType,
                frameUrl: referrerUrl,
                requestId,
                requestUrl: url,
                filterId: appliedRule?.getFilterListId() ?? null,
                ruleIndex: appliedRule?.getIndex() ?? null,
                appliedRuleText,
                originalRuleText,
                isAllowlist: appliedRule?.isAllowlist() ?? false,
                isImportant: appliedRule?.isOptionEnabled(NetworkRuleOption.Important) ?? false,
                isDocumentLevel: appliedRule?.isDocumentLevelAllowlistRule() ?? false,
                isCsp: appliedRule?.isOptionEnabled(NetworkRuleOption.Csp) ?? false,
                isCookie: appliedRule?.isOptionEnabled(NetworkRuleOption.Cookie) ?? false,
                advancedModifier: appliedRule?.getAdvancedModifierValue() ?? null,
                companyCategoryName,
                isAssuredlyBlocked: true,
            },
        });
        WebRequestApi.deleteRequestContext(details.requestId);
        /**
         * Top-level frame request type.
         *
         * @see {@link https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType#main_frame}
         */
        const MAIN_FRAME_TYPE = 'main_frame';
        if (type !== MAIN_FRAME_TYPE) {
            return;
        }
        /**
         * When handling document blocking, we need to retrieve the rule responsible for the blocking.
         *
         * MatchingResult.getBasicResult() is not good enough, because it may return an exception rule,
         * while a blocking rule is still applied in MV3. For example, if there are two rules:
         * `||example.com^$document` and
         * `@@||example.com^$generichide`,
         * the first rule is converted and applied as DNR rule by browser (so here we are handling the error),
         * the second one is not related to the blocking and error handling.
         *
         * This behaviour is expected, correct, and consistent with the CoreLibs apps:
         * https://github.com/AdguardTeam/AdguardBrowserExtension/issues/3260.
         *
         * TODO: fix incorrect logic for the MV2 extension:
         * https://github.com/AdguardTeam/AdguardBrowserExtension/issues/3262.
         */
        const rule = matchingResult.getDocumentBlockingResult();
        if (!rule) {
            return;
        }
        const isPrerenderRequest = documentLifecycle === DocumentLifecycle.Prerender;
        documentBlockingService.handleDocumentBlocking({
            eventId,
            requestUrl,
            requestId,
            referrerUrl,
            rule,
            tabId,
            isPrerenderRequest,
            isPrefetchRequest,
        });
    }
    /**
     * Handler for the last event in the request lifecycle.
     *
     * @param event The event that occurred upon completion of the request.
     * @param event.context The context of the completed event.
     */
    static onCompleted({ context, }) {
        if (!context) {
            return;
        }
        const { tabId, frameId, requestUrl, requestType, contentType, timestamp, } = context;
        if (requestType === RequestType.Document || requestType === RequestType.SubDocument) {
            const frameContext = tabsApi.getFrameContext(tabId, frameId);
            if (!frameContext?.preparedCosmeticResult) {
                logger.debug(`[tsweb.WebRequestApi.onCompleted]: cannot log script rules due to not having prepared cosmetic result for tabId: ${tabId}, frameId: ${frameId}.`);
                return;
            }
            CosmeticApi.logScriptRules({
                tabId,
                preparedCosmeticResult: frameContext.preparedCosmeticResult,
                url: requestUrl,
                contentType,
                timestamp,
            });
        }
        WebRequestApi.deleteRequestContext(context.requestId);
    }
    /**
     * Deletes the request context immediately or after a timeout,
     * depending on whether declarativeFilteringLog is listening.
     *
     * @param requestId The ID of the request.
     */
    static deleteRequestContext(requestId) {
        // If declarativeFilteringLog is listening, wait for a specified timeout
        // before deleting the request context to extract the context event ID,
        // allowing the request to be linked with the matched declarative rule.
        if (declarativeFilteringLog.isListening) {
            setTimeout(() => {
                requestContextStorage.delete(requestId);
            }, FRAME_DELETION_TIMEOUT_MS);
        }
        else {
            requestContextStorage.delete(requestId);
        }
    }
    /**
     * Delete frame data from tab context when navigation is finished.
     *
     * @param details Navigation event details.
     */
    static deleteFrameContext(details) {
        const { tabId, frameId } = details;
        setTimeout(() => {
            tabsApi.deleteFrameContext(tabId, frameId, FRAME_DELETION_TIMEOUT_MS);
        }, FRAME_DELETION_TIMEOUT_MS);
    }
    /**
     * On WebNavigation.onCommitted event we will try to inject scripts into tab.
     *
     * @param details Navigation event details.
     */
    static onCommitted(details) {
        const { tabId, frameId, documentId } = details;
        // This is necessary mainly to update documentId
        tabsApi.updateFrameContext(tabId, frameId, { documentId });
        if (WebRequestApi.isAssistantFrame(tabId, details)) {
            logger.debug(`[tsweb.WebRequestApi.onCommitted]: assistant frame detected, skipping cosmetics injection for tabId ${tabId} and frameId: ${frameId}`);
            return;
        }
        if (!CosmeticApi.shouldApplyCosmetics(tabId, details.url)) {
            logger.debug(`[tsweb.WebRequestApi.onCommitted]: Skipping cosmetics injection for background or extension page with tabId ${tabId}, frameId ${frameId} and url ${details.url}`);
            return;
        }
        // Note: this is an async function, but we will not await it because
        // events do not support async listeners.
        CosmeticApi.applyCosmeticRules(tabId, frameId, true).catch((e) => {
            logger.error('[tsweb.WebRequestApi.onCommitted]: error on cosmetics injection: ', e);
        });
        removeParamInjectionService.injectRemoveParam(tabId, frameId, details.url);
    }
    /**
     * Checks whether the frame is an assistant frame.
     *
     * Needed to prevent cosmetic rules injection into the assistant frame.
     *
     * @param tabId Tab id.
     * @param details Event details.
     *
     * @returns True if the frame is an assistant frame, false otherwise.
     */
    static isAssistantFrame(tabId, details) {
        const tabContext = tabsApi.getTabContext(tabId);
        return CommonAssistant.isAssistantFrame(details, tabContext);
    }
}

/**
 * The TsWebExtension class is a facade for working with the Chrome
 * declarativeNetRequest module: enabling/disabling static filters,
 * adding/editing/deleting custom filters or custom rules,
 * starting/stopping declarative filtering log.
 */
class TsWebExtension {
    /**
     * Fires on filtering log event.
     */
    onFilteringLogEvent = defaultFilteringLog.onLogEvent;
    /**
     * Fires when a rule has been created from the helper.
     */
    onAssistantCreateRule = Assistant.onCreateRule;
    /**
     * This is where the configuration is stored, excluding "heavy" fields:
     * the contents of filters, custom rules and the allowlist.
     *
     * @returns Configuration context.
     */
    // eslint-disable-next-line class-methods-use-this
    get configuration() {
        return appContext.configuration;
    }
    /**
     * Sets app configuration context.
     *
     * @param value Status value.
     */
    // eslint-disable-next-line class-methods-use-this
    set configuration(value) {
        appContext.configuration = value;
    }
    /**
     * Whether filtering is enabled or not.
     */
    isStarted = false;
    /**
     * Stores the initialize promise to prevent multiple initialize calls when
     * a large number of messages are received when the service worker
     * starts or wakes up.
     */
    startPromise;
    /**
     * Web accessible resources path in the result bundle
     * relative to the root dir. Should start with leading slash '/'.
     */
    webAccessibleResourcesPath;
    /**
     * Creates new {@link TsWebExtension} class.
     *
     * @see {@link TsWebExtension.webAccessibleResourcesPath} for details.
     *
     * @param webAccessibleResourcesPath Path to resources.
     */
    constructor(webAccessibleResourcesPath) {
        this.webAccessibleResourcesPath = webAccessibleResourcesPath;
    }
    /**
     * Starts the configuration process, keeping the promise to prevent multiple
     * initialize calls, and executes scripts after configuration.
     *
     * @param config {@link ConfigurationMV3} Configuration object which contains all
     * needed information to start.
     *
     * @returns Promise resolved with result of configuration
     * {@link ConfigurationResult}.
     */
    async innerStart(config) {
        logger.trace('[tsweb.TsWebExtension.innerStart]: start');
        if (!appContext.startTimeMs) {
            appContext.startTimeMs = Date.now();
        }
        try {
            const res = await this.configure(config);
            // Start listening for request events.
            RequestEvents.init();
            // Start handle request events.
            WebRequestApi.start();
            // Start $removeparam injection tracking.
            removeParamInjectionService.start();
            // Start handle onRuleMatchedDebug event.
            declarativeFilteringLog.start();
            // Add tabs listeners
            await tabsApi.start();
            // Compute and save matching result for tabs, opened before app initialization.
            await TabsCosmeticInjector.processOpenTabs();
            documentBlockingService.configure(config);
            // Do it only once on first start, because path to assistantUrl can
            // not be changed during runtime.
            Assistant.setAssistantUrl(config.settings.assistantUrl);
            appContext.isAppStarted = true;
            this.isStarted = true;
            this.startPromise = undefined;
            logger.trace('[tsweb.TsWebExtension.innerStart]: started');
            return res;
        }
        catch (e) {
            this.startPromise = undefined;
            logger.error('[tsweb.TsWebExtension.innerStart]: failed: ', e);
            throw new Error('Cannot be started: ', { cause: e });
        }
    }
    /**
     * Synchronize rule set with IDB.
     *
     * @param staticFilterId Static filter id.
     * @param rulesetsPath Path to rule sets.
     *
     * TODO: Find a way to exclude public usage of this method, since we trying
     * to keep only one way to configure tswebextension and all its parts,
     * including rulesets: via passing single configuration file. And this
     * method creates a "dirty" flow, when tswebextension is not received log
     * level from extension and forces us to use static locks for IDB in
     * RulesetsLoaderApi to prevent concurrent access issues between multiple
     * instances.
     */
    static async syncRulesetWithIdbByFilterId(staticFilterId, rulesetsPath) {
        const rulesetsLoaderApi = new RulesetsLoaderApi(rulesetsPath);
        const rulesetId = `${RULESET_NAME_PREFIX}${staticFilterId}`;
        await rulesetsLoaderApi.syncRulesetWithIdb(rulesetId);
    }
    /**
     * Synchronizes multiple rule sets with IDB.
     * This method is used to ensure all rule sets are properly cached for
     * future calls to configure method.
     *
     * @param rulesetsPath Path to rule sets.
     * @param staticFiltersIds Array of static filter IDs to sync.
     */
    static async syncRulesetsWithIdb(rulesetsPath, staticFiltersIds) {
        const rulesetsLoaderApi = new RulesetsLoaderApi(rulesetsPath);
        const syncTasks = staticFiltersIds.map((staticFilterId) => {
            const rulesetId = `${RULESET_NAME_PREFIX}${staticFilterId}`;
            return rulesetsLoaderApi.syncRulesetWithIdb(rulesetId);
        });
        await Promise.all(syncTasks);
    }
    /**
     * Starts filtering along with launching the tab listener, which will record
     * tab urls to work correctly with domain blocking/allowing rules, for
     * example: cosmetic rules in iframes.
     *
     * @param config {@link ConfigurationMV3} Configuration object to start with.
     *
     * @returns Promise resolved with result of configuration {@link ConfigurationResult}.
     */
    async start(config) {
        // Update log level before first log message.
        TsWebExtension.updateLogLevel(config.logLevel);
        logger.trace('[tsweb.TsWebExtension.start]: is started ', this.isStarted);
        if (this.isStarted) {
            throw new Error('Already started');
        }
        if (this.startPromise) {
            logger.trace('[tsweb.TsWebExtension.start]: already called start, waiting');
            const res = await this.startPromise;
            logger.trace('[tsweb.TsWebExtension.start]: awaited start');
            return res;
        }
        // Call and wait for promise for allow multiple calling start
        this.startPromise = this.innerStart(config);
        return this.startPromise;
    }
    /**
     * Removes all static, dynamic and session DNR rules and stops tsurlfilter engine.
     */
    static async removeAllFilteringRules() {
        await DynamicRulesApi.removeAllRules();
        const disableFiltersIds = await FiltersApi.getEnabledRulesets();
        await FiltersApi.updateFiltering(disableFiltersIds);
        await StealthService.clearAll();
        await CspService.clearAll();
        const removedRules = await SessionRulesApi.removeAllRules();
        if (removedRules.length > 0) {
            logger.warn(`[tsweb.TsWebExtension.removeAllFilteringRules]: Found ${removedRules.length} session rule(s) not cleared by services. Rule IDs: [${removedRules.map((rule) => rule.id).join(', ')}]`);
        }
        declarativeFilteringLog.startUpdate();
        declarativeFilteringLog.finishUpdate([], false);
        engineApi.stopEngine();
    }
    /**
     * Stops service, disables all user rules and filters.
     */
    async stop() {
        // Stop handle onRuleMatchedDebug event.
        // It should be stopped before removing rules,
        // otherwise, it may try to log applying of removed rules. AG-36068.
        declarativeFilteringLog.stop();
        await TsWebExtension.removeAllFilteringRules();
        // Stop handle request events.
        WebRequestApi.stop();
        // Stop $removeparam injection tracking.
        removeParamInjectionService.stop();
        // Remove tabs listeners and clear context storage
        tabsApi.stop();
        appContext.isAppStarted = false;
        this.isStarted = false;
    }
    /**
     * Applies new configuration: enables/disables static filters, creates rule
     * sets from provided filters, updates dynamic filters (converts custom
     * filters and user rules on the fly to a single merged rule set), starts
     * declarative filtering log and restarts the engine to reload cosmetic
     * rules.
     *
     * @param config A {@link ConfigurationMV3} to apply.
     *
     * @returns ConfigurationResult {@link ConfigurationResult} which contains:
     * - list of errors for static filters, if any of them has been thrown
     * - converted dynamic rule set with rule set, errors and limitations.
     * Details: {@link ConversionResult}.
     *
     * @throws Error if the filter content is not provided and not already set in the class instance.
     */
    async configure(config) {
        // IMPORTANT: This call should always be made before any other operations for
        // proper logging and error handling.
        TsWebExtension.updateLogLevel(config.logLevel);
        await TsWebExtension.syncRulesetsWithIdb(config.rulesetsPath, config.staticFiltersIds);
        // Exclude binary fields from logged config.
        const binaryFields = [
            'userrules',
            'sourceMap',
            'rawFilterList',
            'filterList',
            'conversionMap',
        ];
        logger.trace('[tsweb.TsWebExtension.configure]: start with ', stringifyObjectWithoutKeys(config, binaryFields));
        const configuration = configurationMV3Validator.parse(config); // error happens here
        const res = {
            staticFiltersStatus: {
                errors: [],
            },
            staticFilters: [],
        };
        // Stop handle onRuleMatchedDebug event.
        // It should be stopped before declarative log update or removing filtering rules,
        // otherwise, it may try to log applying of removed rules. AG-44355.
        declarativeFilteringLog.stop();
        if (configuration.settings.filteringEnabled) {
            declarativeFilteringLog.startUpdate();
            res.stealthResult = await StealthService.applySettings(configuration.settings);
            // Extract filters info from configuration and wrap them into IFilters.
            const { staticFilters, customFilters, filtersIdsToEnable, filtersIdsToDisable, } = await TsWebExtension.getFiltersUpdateInfo(configuration);
            // Update list of enabled static filters
            res.staticFiltersStatus = await FiltersApi.updateFiltering(filtersIdsToDisable, filtersIdsToEnable);
            // Create static rulesets.
            const staticRulesets = await TsWebExtension.loadStaticRulesets(configuration.rulesetsPath, staticFilters);
            // Get enabled static rule sets
            const enabledRulesetsIds = await browser.declarativeNetRequest.getEnabledRulesets();
            const enabledStaticRulesets = staticRulesets.filter((ruleset) => {
                const rulesetId = ruleset.getId();
                return enabledRulesetsIds.includes(rulesetId);
            });
            // Update allowlist settings.
            allowlistApi.configure(configuration);
            // Combine all allowlist rules into one network rule.
            const combinedAllowlistRules = allowlistApi.combineAllowListRulesForDNR();
            const userRulesFilter = new Filter(USER_FILTER_ID, async () => new FilterList(configuration.userrules.content, USER_FILTER_ID, configuration.userrules.conversionData).getContent());
            const allowlistFilter = new Filter(ALLOWLIST_FILTER_ID, 
            // TODO: Generate AST directly for allowlist rules.
            async () => new FilterList(combinedAllowlistRules, ALLOWLIST_FILTER_ID, 
            // Note: this filter list is generated by our library,
            // there is no need to provide any real conversion data.
            FilterList.createEmptyConversionData()).getContent());
            const trustedDomainsExceptionRule = AllowlistApi.getAllowlistRule(configuration.trustedDomains);
            const blockingPageTrustedFilter = new Filter(BLOCKING_TRUSTED_FILTER_ID, async () => new FilterList(trustedDomainsExceptionRule, BLOCKING_TRUSTED_FILTER_ID, 
            // Note: this filter list is generated by our library,
            // there is no need to provide any real conversion data.
            FilterList.createEmptyConversionData()).getContent());
            // Convert quick fixes rules, allowlist, custom filters and user
            // rules into one rule set and apply it.
            res.dynamicRules = await DynamicRulesApi.updateDynamicFiltering(allowlistFilter, blockingPageTrustedFilter, userRulesFilter, customFilters, enabledStaticRulesets, this.webAccessibleResourcesPath);
            await SessionRulesApi.updateSessionRules(enabledStaticRulesets, res.dynamicRules.declarativeRulesToCancel);
            await CspService.addCspReportBlockingRule();
            // Reload engine for cosmetic rules: CSS, script and scriptlets.
            engineApi.waitingForEngine = engineApi.startEngine({
                // Built-in filters.
                localFilters: staticFilters,
                // Filters from remote sources.
                remoteFilters: customFilters,
                // Only rules from built-in filters are allowed to be executed
                // from user rules.
                userRulesFilter,
                allowlistRulesList: allowlistApi.getAllowlistRules(),
                verbose: configuration.verbose,
            });
            await engineApi.waitingForEngine;
            // TODO: Recreate only dynamic ruleset, because static cannot be changed
            const rulesets = [
                ...staticRulesets,
                res.dynamicRules.ruleset,
            ];
            // Update rulesets in declarative filtering log.
            declarativeFilteringLog.finishUpdate(rulesets, configuration.declarativeLogEnabled);
            // TODO (AG-53262): Measure memory impact of keeping metadata (badFilterRules,
            // rulesHashMap) in memory vs. lazy-loading it on demand. The metadata
            // is used only during the conversion phase above, but removing it
            // requires making getBadFilterRules()/getRulesHashMap() async with
            // lazy reload from IDB — a non-trivial change. For now, keep metadata
            // in memory to avoid bugs with stale cached rulesets returning empty
            // metadata on subsequent configure() calls.
            // See: https://bit.int.agrd.dev/projects/ADGUARD-FILTERS/repos/tsurlfilter/pull-requests/1648/overview
            // If declarative log is disabled, also unload content
            // (sourceMap, declarativeRules, filterList) from all rulesets
            // since it is only needed for the filtering log.
            if (!configuration.declarativeLogEnabled) {
                for (const ruleset of rulesets) {
                    ruleset.unloadContent();
                }
            }
            res.staticFilters = staticRulesets;
        }
        else {
            await TsWebExtension.removeAllFilteringRules();
        }
        this.configuration = TsWebExtension.createConfigurationContext(configuration);
        // Update previously opened tabs with new rules - find for each tab
        // new main frame rule.
        await tabsApi.updateCurrentTabsMainFrameRules();
        // Reload request events listeners.
        await WebRequestApi.flushMemoryCache();
        documentBlockingService.configure(config);
        logger.trace('[tsweb.TsWebExtension.configure]: end');
        return res;
    }
    /**
     * Sets prebuild local **script** rules.
     *
     * Should not be used if userScripts API is available.
     *
     * @param localScriptRules Object with pre-build JS rules. @see {@link LocalScriptRulesService}.
     */
    static setLocalScriptRules(localScriptRules) {
        localScriptRulesService.setLocalScriptRules(localScriptRules);
    }
    /**
     * Updates `hideReferrer` stealth config value without re-initialization of engine.
     *
     * @param isHideReferrer `isHideReferrer` stealth config value.
     *
     * @returns True if the value was successfully updated, false otherwise.
     *
     * @throws Error if {@link configuration} not set.
     */
    async setHideReferrer(isHideReferrer) {
        if (!this.configuration) {
            throw new Error('Configuration not set');
        }
        const currentValue = await StealthService.setHideReferrer(isHideReferrer);
        this.configuration.settings.stealth.hideReferrer = currentValue;
        return currentValue;
    }
    /**
     * Updates `blockWebRTC` stealth config value without re-initialization of engine.
     * Also updates webRTC privacy.network settings on demand.
     *
     * @param isBlockWebRTC `blockWebRTC` stealth config value.
     *
     * @returns True if the value was successfully updated, false otherwise.
     *
     * @throws Error if {@link configuration} not set.
     */
    async setBlockWebRTC(isBlockWebRTC) {
        if (!this.configuration) {
            throw new Error('Configuration not set');
        }
        const currentValue = await StealthService.setDisableWebRTC(isBlockWebRTC);
        this.configuration.settings.stealth.blockWebRTC = currentValue;
        return currentValue;
    }
    /**
     * Updates `blockChromeClientData` stealth config value without re-initialization of engine.
     *
     * @param isBlockChromeClientData `blockChromeClientData` stealth config value.
     *
     * @returns True if the value was successfully updated, false otherwise.
     *
     * @throws Error if {@link configuration} not set.
     */
    async setBlockChromeClientData(isBlockChromeClientData) {
        if (!this.configuration) {
            throw new Error('Configuration not set');
        }
        const currentValue = await StealthService.setBlockChromeClientData(isBlockChromeClientData);
        this.configuration.settings.stealth.blockChromeClientData = currentValue;
        return currentValue;
    }
    /**
     * Updates `sendDoNotTrack` stealth config value without re-initialization of engine.
     *
     * @param isSendDoNotTrack `sendDoNotTrack` stealth config value.
     *
     * @returns True if the value was successfully updated, false otherwise.
     *
     * @throws Error if {@link configuration} not set.
     */
    async setSendDoNotTrack(isSendDoNotTrack) {
        if (!this.configuration) {
            throw new Error('Configuration not set');
        }
        const currentValue = await StealthService.setSendDoNotTrack(isSendDoNotTrack, this.configuration.settings.gpcScriptUrl);
        this.configuration.settings.stealth.sendDoNotTrack = currentValue;
        return currentValue;
    }
    /**
     * Updates `hideSearchQueries` stealth config value without re-initialization of engine.
     *
     * @param isHideSearchQueries `hideSearchQueries` stealth config value.
     *
     * @returns True if the value was successfully updated, false otherwise.
     *
     * @throws Error if {@link configuration} not set.
     */
    async setHideSearchQueries(isHideSearchQueries) {
        if (!this.configuration) {
            throw new Error('Configuration not set');
        }
        const currentValue = await StealthService.setHideSearchQueries(isHideSearchQueries, this.configuration.settings.hideDocumentReferrerScriptUrl);
        this.configuration.settings.stealth.hideSearchQueries = currentValue;
        return currentValue;
    }
    /**
     * Opens the AdGuard assistant in the specified tab.
     *
     * @param tabId The ID of the tab where is needed to open
     * the AdGuard assistant.
     */
    // eslint-disable-next-line class-methods-use-this
    async openAssistant(tabId) {
        tabsApi.setAssistantInitTimestamp(tabId);
        await assistant.openAssistant(tabId);
    }
    /**
     * Closes the AdGuard assistant in the specified tab.
     *
     * @param tabId The ID of the tab where is needed to close
     * the AdGuard assistant.
     */
    // eslint-disable-next-line class-methods-use-this
    async closeAssistant(tabId) {
        tabsApi.resetAssistantInitTimestamp(tabId);
        await Assistant.closeAssistant(tabId);
    }
    /**
     * Gets current loaded rules in the filtering engine
     * (except declarative rules).
     *
     * @returns Number of loaded rules in the filtering engine.
     */
    // eslint-disable-next-line class-methods-use-this
    getRulesCount() {
        return engineApi.getRulesCount();
    }
    /**
     * Returns a message handler that will listen to internal messages,
     * for example: get css for content-script, or start/stop declarative
     * filtering log.
     *
     * @returns Messages handler.
     */
    getMessageHandler() {
        // Keep app context when handle message.
        const messagesApi = new MessagesApi(this, tabsApi, defaultFilteringLog);
        return messagesApi.handleMessage;
    }
    /**
     * Extract partial configuration {@link ConfigurationMV3Context} from whole
     * {@link ConfigurationMV3}, excluding heavyweight fields which
     * contains rules.
     *
     * @param configuration Configuration.
     *
     * @returns ConfigurationContext.
     */
    static createConfigurationContext(configuration) {
        const { staticFiltersIds, customFilters, verbose, settings, filtersPath, rulesetsPath, declarativeLogEnabled, } = configuration;
        return {
            staticFiltersIds,
            customFilters: customFilters.map(({ filterId }) => filterId),
            filtersPath,
            rulesetsPath,
            declarativeLogEnabled,
            verbose,
            settings,
        };
    }
    /**
     * Extract configuration update info from already parsed configuration.
     *
     * @param parsedConfiguration Already parsed {@link ConfigurationMV3}.
     *
     * @returns Item of {@link FiltersUpdateInfo}.
     */
    static async getFiltersUpdateInfo(parsedConfiguration) {
        // Wrap filters to tsurlfilter.IFilter
        const staticFilters = FiltersApi.createStaticFilters(parsedConfiguration.staticFiltersIds);
        const customFilters = FiltersApi.createCustomFilters(parsedConfiguration.customFilters);
        const filtersIdsToEnable = staticFilters
            .map((filter) => filter.getId());
        const enabledRulesetsIds = await FiltersApi.getEnabledRulesets();
        const filtersIdsToDisable = enabledRulesetsIds
            .filter((id) => !filtersIdsToEnable.includes(id));
        return {
            staticFilters,
            customFilters,
            filtersIdsToEnable,
            filtersIdsToDisable,
        };
    }
    /**
     * Wraps static filters into rule sets.
     *
     * @param rulesetsPath Path to the rule set metadata.
     * @param staticFilters List of static {@link IFilter}.
     *
     * @returns A list of static {@link IRulesetWithSourceMap}, or an empty list if an error
     * occurred during the rule scanning step.
     */
    static async loadStaticRulesets(rulesetsPath, staticFilters) {
        // Wrap filters into rule sets
        const rulesetsLoaderApi = new RulesetsLoaderApi(rulesetsPath);
        const manifest = browser.runtime.getManifest();
        if (!manifest.declarative_net_request) {
            throw new Error('Cannot find declarative_net_request in manifest');
        }
        // Note: we cannot create rulesets only for enabled filters because we
        // need to get all rulesets' counters for checking limits on the client.
        // Note: we skip metadata ruleset, because it is not a real ruleset.
        const manifestRulesets = manifest.declarative_net_request.rule_resources
            .filter(({ id }) => id !== getRulesetId(METADATA_RULESET_ID));
        const staticRulesetsTasks = manifestRulesets.map(({ id }) => {
            return rulesetsLoaderApi.createRuleset(id, staticFilters);
        });
        try {
            const staticRulesets = await Promise.all(staticRulesetsTasks);
            return staticRulesets;
        }
        catch (e) {
            const filterListIds = staticFilters.map((f) => f.getId());
            logger.error(`[tsweb.TsWebExtension.loadStaticRulesets]: cannot scan rules of filter list with ids ${filterListIds} due to: `, e);
            return [];
        }
    }
    /**
     * Initialize app persistent data.
     * This method called as soon as possible and allows access
     * to the actual context before the app is started.
     */
    // eslint-disable-next-line class-methods-use-this
    async initStorage() {
        await extSessionStorage.init();
        appContext.isStorageInitialized = true;
    }
    /**
     * Sets the debug scriptlets state.
     *
     * @param debug Debug filtering state.
     *
     * @throws Error if {@link configuration} not set.
     */
    setDebugScriptlets(debug) {
        if (!this.configuration) {
            throw new Error('Configuration not set');
        }
        this.configuration.settings.debugScriptlets = debug;
    }
    /**
     * Updates `collectStats` configuration value without re-initialization of engine.
     *
     * @param isCollectStats `collectStats` config value.
     *
     * @throws Error if {@link configuration} not set.
     */
    setCollectHitStats(isCollectStats) {
        if (!this.configuration) {
            throw new Error('Configuration not set');
        }
        this.configuration.settings.collectStats = isCollectStats;
    }
    /**
     * Updates the log level.
     *
     * @param logLevel Log level.
     */
    static updateLogLevel(logLevel) {
        try {
            logger.currentLevel = logLevel || LogLevel.Info;
        }
        catch (e) {
            logger.currentLevel = LogLevel.Info;
        }
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
    // eslint-disable-next-line class-methods-use-this
    retrieveRuleText(filterId, ruleIndex) {
        return engineApi.retrieveRuleText(filterId, ruleIndex);
    }
    /**
     * Retrieves the original rule text by its filter list identifier and rule index.
     *
     * If there's no rule by that index or the rule structure is invalid, it will return null.
     *
     * @param filterId Filter list identifier.
     * @param ruleIndex Rule index.
     *
     * @returns Rule text or `null`.
     */
    // eslint-disable-next-line class-methods-use-this
    retrieveOriginalRuleText(filterId, ruleIndex) {
        return engineApi.retrieveOriginalRuleText(filterId, ruleIndex);
    }
}

export { BACKGROUND_TAB_ID, ContentType, FilteringEventType, MAIN_FRAME_ID, MessageType, StealthActions, TabContext, TsWebExtension, USER_FILTER_ID, companiesDbService, defaultFilteringLog, getDomain, isExtensionUrl, isHttpOrWsRequest, isHttpRequest, tabsApi };
