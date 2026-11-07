import { RuleGenerator, CssTokenStream, CosmeticRuleType } from '@adguard/agtree';
import { createAllowlistRuleNode, RuleFactory, conversionDataValidator, RULE_INDEX_NONE, NetworkRuleOption, RequestType as RequestType$1, RemoveParamModifier } from '@adguard/tsurlfilter';
import { A as ALLOWLIST_FILTER_ID, M as MAIN_FRAME_ID, S as SEMICOLON, L as LF, N as NO_PARENT_FRAME_ID } from './constants.js';
import browser from 'webextension-polyfill';
import { M as MessageType, a as MESSAGE_HANDLER_NAME } from './message-constants.js';
import { z } from 'zod';
import { LogLevel } from '@adguard/logger';
import { p as packageJson } from './package.js';
import { l as logger } from './logger.js';
import { nanoid } from 'nanoid/non-secure';
import { RequestType } from '@adguard/tsurlfilter/es/request-type';
import { debounce, cloneDeep, identity, remove } from 'lodash-es';
import Bowser from 'bowser';
import { parse, getHostname, getDomain as getDomain$1 } from 'tldts';
import { r as rawCompaniesDb } from './trackers-min.js';

/**
 * Simple pub-sub implementation.
 */
class EventChannel {
    listeners = [];
    /**
     * Dispatch event.
     *
     * @param data Event data.
     */
    dispatch(data) {
        this.listeners.forEach((listener) => listener(data));
    }
    /**
     * Subscribe to events channel.
     *
     * @param listener Callback to be called on event.
     */
    subscribe(listener) {
        this.listeners.push(listener);
    }
    /**
     * Unsubscribe from events channel.
     *
     * @param listener Callback to be removed from listeners.
     */
    unsubscribe(listener) {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }
}

// TODO: Add 'is' prefix to cssRule, scriptRule and contentRule properties.
/**
 * Types of filtering events that can occur during request processing.
 */
var FilteringEventType;
(function (FilteringEventType) {
    FilteringEventType["SendRequest"] = "sendRequest";
    FilteringEventType["TabReload"] = "tabReload";
    FilteringEventType["ApplyBasicRule"] = "applyBasicRule";
    FilteringEventType["ApplyCosmeticRule"] = "applyCosmeticRule";
    FilteringEventType["ApplyCspRule"] = "applyCspRule";
    FilteringEventType["ApplyPermissionsRule"] = "applyPermissionsRule";
    FilteringEventType["ReceiveResponse"] = "receiveResponse";
    FilteringEventType["Cookie"] = "cookie";
    FilteringEventType["RemoveHeader"] = "removeHeader";
    FilteringEventType["RemoveParam"] = "removeParam";
    FilteringEventType["UrlTransform"] = "urlTransform";
    FilteringEventType["ReplaceRuleApply"] = "replaceRuleApply";
    FilteringEventType["ContentFilteringStart"] = "contentFilteringStart";
    FilteringEventType["ContentFilteringFinish"] = "contentFilteringFinish";
    FilteringEventType["StealthAction"] = "stealthAction";
    FilteringEventType["StealthAllowlistAction"] = "stealthAllowlistAction";
    FilteringEventType["JsInject"] = "jsInject";
    FilteringEventType["CspReportBlocked"] = "cspReportBlocked";
    /**
     * Used only in unpacked MV3.
     */
    FilteringEventType["MatchedDeclarativeRule"] = "matchedDeclarativeRule";
    /**
     * Dispatched when a tab is closed by a `$popup` modifier rule.
     *
     * Carries the real popup tabId so consumers can decide where to attach
     * the entry (e.g. to the background page, since the original tab is
     * being removed immediately after the event is published).
     */
    FilteringEventType["PopupBlocked"] = "popupBlocked";
})(FilteringEventType || (FilteringEventType = {}));
/**
 * {@link FilteringLogInterface} Default implementation.
 */
class FilteringLog {
    onLogEvent = new EventChannel();
    channels = [];
    /**
     * Registers listener for specified {@link FilteringLogEvent}.
     *
     * @param type Filtering log type.
     * @param listener Filtering log listener.
     */
    addEventListener(type, listener) {
        const channel = { type, listener };
        this.channels.push(channel);
    }
    /**
     * Publishes event to attached listeners.
     *
     * @param event Filtering log event.
     */
    publishEvent(event) {
        const listeners = this.channels
            .filter(({ type }) => type === event.type)
            .map(({ listener }) => listener);
        for (const listener of listeners) {
            listener(event);
        }
        this.onLogEvent.dispatch(event);
    }
}
/**
 * Shared {@link FilteringLog} instance.
 */
const defaultFilteringLog = new FilteringLog();

/**
 * The allowlist is used to exclude certain websites from filtering.
 * Blocking rules are not applied to the sites in the list.
 * The allow list can also be inverted.
 * In inverted mode, the application will unblock ads everywhere except for the
 * sites added to this list.
 */
let Allowlist$1 = class Allowlist {
    /**
     * Indicates whether the allowlist is enabled.
     */
    enabled = false;
    /**
     * If true, ads will be blocked only on sites listed in the allowlist,
     * like "blocklist" mode.
     */
    inverted = false;
    /**
     * List of domains which are allowed (by default)
     * or blocked (if the allowlist is inverted).
     */
    domains = [];
    /**
     * Configures allowlist state based on app configuration.
     *
     * @param configuration App configuration.
     */
    configure(configuration) {
        const { allowlist, settings, } = configuration;
        const { allowlistEnabled, allowlistInverted, } = settings;
        this.enabled = allowlistEnabled;
        this.inverted = allowlistInverted;
        this.domains = allowlist.map((hostname) => {
            return hostname.startsWith('www.') ? hostname.substring(4).trim() : hostname.trim();
        });
    }
    /**
     * Returns a list of rules to be loaded into the engine based on allowlist state.
     *
     * @returns List of allowlist rules or null.
     */
    getAllowlistRules() {
        if (!this.enabled || this.inverted) {
            return null;
        }
        const rules = this.domains
            .map((domain) => createAllowlistRuleNode(domain))
            .filter((r) => r !== null)
            .map(RuleGenerator.generate);
        return rules.join('\n');
    }
    /**
     * Creates an allowlist rule for a domain which will be passed to our engine
     * to unblock requests. In MV3 we will pass this rule to TsUrlFilter engine,
     * because it do work with cosmetic rules.
     *
     * @param domain Domain name.
     *
     * @returns Allowlist rule or null.
     */
    static createAllowlistRule(domain) {
        if (!domain) {
            return null;
        }
        return RuleFactory.createAllowlistRule(domain, ALLOWLIST_FILTER_ID);
    }
};

/**
 * @file
 * In the content script, we need access to @adguard/assistant only when
 * the user clicks 'block ad manually'.
 * Therefore, we exclude @adguard/assistant from the bundled content-script code
 * and load it on-demand. We also added a required field to the configuration
 * object to ensure the assistant is bundled inside the final extension,
 * allowing tswebextension to load it on-demand.
 *
 * Schema:
 * - Buildtime:
 *  -- [tswebext]  Script to inject assistant from the URL provided by the extension.
 *  -- [tswebext]  Assistant management script for interacting with the assistant. <--- current file.
 *  -- [extension] Entry point script for injecting the assistant
 * - Runtime:
 *  -- [tswebext] Content script injects into every new tab without the assistant.
 *  -- [tswebext] On-demand content script dynamically injects the assistant and creates a message listener.
 *  -- [tswebext] After injection, the content script interacts with the assistant.
 *
 * Reference code: ASSISTANT_INJECT.
 */
/**
 * Abstract assistant class is the handler of messages and events related
 * to AdGuard assistant.
 * Should be extended by the specific assistant implementation for executing
 * script for injecting assistant.
 */
class CommonAssistant {
    /**
     * Maximum time delay in milliseconds between the assistant frame creation and the assistant initialization.
     */
    static FRAME_CREATION_LIMIT_MS = 200;
    /**
     * Assistant frame URL.
     */
    static FRAME_URL = 'about:blank';
    /**
     * Fires when a rule has been created from the AdGuard assistant.
     */
    static onCreateRule = new EventChannel();
    /**
     * Path to assembled @adguard/assistant module. Necessary for lazy on-demand
     * loading of the assistant.
     */
    static assistantUrl = '';
    /**
     * Sets assistant url to the static variable. This method needs because we
     * currently use extended assistant class in both MV2 and MV3 and via directly set
     * CommonAssistant.assistantUrl it will not set filed inside super class itself.
     *
     * @param url Path to assistant, see {@link CommonAssistant.assistantUrl}.
     */
    static setAssistantUrl(url) {
        CommonAssistant.assistantUrl = url;
    }
    /**
     * Dynamically inject AdGuard assistant to the tab and after it opens it.
     *
     * @param tabId The ID of the tab where is needed to inject and open
     * the AdGuard assistant.
     */
    async openAssistant(tabId) {
        if (!CommonAssistant.assistantUrl) {
            throw new Error('Path to bundled assistant-inject file is not set up.');
        }
        // Inject assistant to the frame, before accessing it.
        await this.injectAssistant(tabId, CommonAssistant.assistantUrl);
        // After injection we can request opening it.
        await browser.tabs.sendMessage(tabId, {
            handlerName: MESSAGE_HANDLER_NAME,
            type: MessageType.InitAssistant,
        });
    }
    /**
     * Closes the AdGuard Assistant frame in the specified tab.
     *
     * @param tabId The ID of the tab where is needed to close
     * the AdGuard assistant.
     */
    static async closeAssistant(tabId) {
        await browser.tabs.sendMessage(tabId, {
            handlerName: MESSAGE_HANDLER_NAME,
            type: MessageType.CloseAssistant,
        });
    }
    /**
     * Checks whether the frame is an assistant frame. Two conditions must be met:
     * 1. The frame was created less than {@link CommonAssistant.FRAME_CREATION_LIMIT_MS}
     *    after the assistant initialization.
     * 2. The frame is a child of the main frame.
     *
     * @see {@link https://github.com/AdguardTeam/AdguardBrowserExtension/issues/1848}
     *
     * @param details Frame details of the onDomContentLoaded event.
     * @param tabContext Tab context.
     *
     * @returns True if the frame is an assistant frame, false otherwise.
     */
    static isAssistantFrame(details, tabContext) {
        if (!tabContext || !tabContext.assistantInitTimestamp) {
            return false;
        }
        const { frameId, url, timeStamp, } = details;
        const frameContext = tabContext.getFrameContext(frameId);
        if (!frameContext) {
            return false;
        }
        const timeSinceFrameCreatedMs = timeStamp - tabContext.assistantInitTimestamp;
        return timeSinceFrameCreatedMs < CommonAssistant.FRAME_CREATION_LIMIT_MS
            && frameContext.parentFrameId === MAIN_FRAME_ID
            && url === CommonAssistant.FRAME_URL;
    }
}

/**
 * Re-export needed to print the library version on the extension About page.
 * NOTE: We are directly re-exporting `version` from `package.json` to prevent
 * environment runtime errors, like call `window.console`, which is not available
 * in the service worker in MV3. And also to avoid bundle size getting larger.
 */
const TSWEBEXTENSION_VERSION = packageJson.version;
/**
 * Stealth mode configuration schema.
 */
const stealthConfigValidator = z.object({
    /**
     * Should the application set a fixed lifetime from
     * {@link StealthConfig.selfDestructFirstPartyCookiesTime} for first-party
     * cookies.
     */
    selfDestructFirstPartyCookies: z.boolean(),
    /**
     * Time in minutes to delete first-party cookies.
     */
    selfDestructFirstPartyCookiesTime: z.number(),
    /**
     * Should the application set a fixed lifetime from
     * {@link StealthConfig.selfDestructThirdPartyCookiesTime} for third-party
     * cookies.
     */
    selfDestructThirdPartyCookies: z.boolean(),
    /**
     * Time in minutes to delete third-party cookies.
     */
    selfDestructThirdPartyCookiesTime: z.number(),
    /**
     * Should the application hide the origin referrer in third-party requests
     * by replacing the referrer url with the request url.
     */
    hideReferrer: z.boolean(),
    /**
     * Should the application hide the original referrer from the search page
     * containing the search query in third-party queries, replacing
     * the referrer url with the request url.
     */
    hideSearchQueries: z.boolean(),
    /**
     * For Google Chrome, it removes the 'X-Client-Data' header from
     * the requests, which contains information about the browser version
     * and modifications.
     */
    blockChromeClientData: z.boolean(),
    /**
     * Includes HTTP headers 'DNT' and 'Sec-GPC' in all requests.
     *
     * @see https://en.wikipedia.org/wiki/Do_Not_Track
     * @see https://globalprivacycontrol.org
     */
    sendDoNotTrack: z.boolean(),
    /**
     * Blocks the possibility of leaking your IP address through WebRTC, even if
     * you use a proxy server or VPN.
     */
    blockWebRTC: z.boolean(),
}).strict();
/**
 * Basic filter list configuration validator.
 */
const basicFilterValidator = z.object({
    /**
     * Filter list text content.
     */
    content: z.string(),
    /**
     * Conversion data.
     */
    conversionData: z.optional(conversionDataValidator),
});
/**
 * Settings configuration schema.
 */
const settingsConfigValidator = z.object({
    /**
     * If this flag is true, the application will work ONLY with domains
     * from the {@link Configuration.allowlist},
     * otherwise it will work everywhere EXCLUDING domains from the list.
     */
    allowlistInverted: z.boolean(),
    /**
     * Flag specifying {@link Configuration.allowlist} enable state.
     * We don't use allowlist array length condition for calculate enable state,
     * because it's not cover case with empty list in inverted mode.
     */
    allowlistEnabled: z.boolean(),
    /**
     * Enables css hits counter if true.
     */
    collectStats: z.boolean(),
    /**
     * Enables verbose scriptlets logging if true.
     */
    debugScriptlets: z.boolean().default(false),
    /**
     * Enables stealth mode if true.
     */
    stealthModeEnabled: z.boolean(),
    /**
     * Enables filtering if true.
     */
    filteringEnabled: z.boolean(),
    /**
     * Redirect url for blocking rules with `$document` modifier.
     */
    documentBlockingPageUrl: z.string().optional(),
    /**
     * Path to the assembled @adguard/assistant module. Necessary for lazy
     * on-demand loading of the assistant.
     */
    assistantUrl: z.string(),
    /**
     * Stealth mode options.
     */
    stealth: stealthConfigValidator,
});
/**
 * Generic app configuration schema.
 */
const configurationValidator = z.object({
    /**
     * List of hostnames or domains of sites, which should be excluded
     * from blocking or which should be included in blocking
     * depending on the value of {@link SettingsConfig.allowlistInverted} setting value.
     */
    allowlist: z.string().array(),
    /**
     * List of rules added by user.
     */
    userrules: basicFilterValidator,
    /**
     * Flag responsible for logging.
     *
     * @deprecated  Will be removed in the next minor version.
     * Use {@link Configuration.logLevel} instead.
     */
    verbose: z.boolean().optional(),
    /**
     * Logging level.
     */
    logLevel: z.enum([
        LogLevel.Error,
        LogLevel.Warn,
        LogLevel.Info,
        LogLevel.Debug,
        LogLevel.Verbose,
    ]).optional(),
    settings: settingsConfigValidator,
    /**
     * For MV2:
     * List of domain names of sites, which should be temporary excluded from document blocking.
     *
     * For MV3:
     * List of blocking rules which should be temporarily badfiltered
     * since user clicked "Proceed anyway" button on the blocking page.
     */
    trustedDomains: z.string().array(),
}).strict();

/**
 * Utility class for detecting CSS feature support in the browser.
 */
class CssCapabilities {
    /**
     * Cache for CSS feature support detection results.
     */
    static cache = new Map();
    /**
     * Detects if the browser supports a specific CSS feature using `CSS.supports()`.
     *
     * @param feature CSS feature to test (e.g., "selector(:has(a))").
     *
     * @returns True if the feature is supported, false otherwise.
     */
    static isCssFeatureSupported(feature) {
        // Check cache first
        const cached = CssCapabilities.cache.get(feature);
        if (cached !== undefined) {
            return cached;
        }
        let result = false;
        // Check if CSS.supports() is available (it should be in all modern browsers)
        if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
            try {
                result = CSS.supports(feature);
            }
            catch (e) {
                // If CSS.supports() throws an error, the feature is not supported
                logger.debug(`[tsweb.CssCapabilities.isCssFeatureSupported]: CSS.supports() failed for feature: ${feature} due to`, e);
                result = false;
            }
        }
        // Cache the result
        CssCapabilities.cache.set(feature, result);
        return result;
    }
    /**
     * Checks if the browser natively supports pseudo-classes
     * that are supported natively now
     * but may be considered extended in older browsers:
     * `:has()`, `:is()`, and `:not()`.
     *
     * @returns True if all native-and-extended pseudo-classes are supported,
     * false otherwise.
     */
    static isNativeHasPseudoClassSupported() {
        // For simplicity, we check :has() as a representative
        // :is() and :not() have been supported for longer than :has().
        // So if :has() is supported, we can safely assume :is() and :not() are too
        return CssCapabilities.isCssFeatureSupported('selector(:has(a))');
    }
    /**
     * Checks if a CSS selector contains any native pseudo-classes
     * that may be considered as extended for older browsers.
     * These are `:has()`, `:is()`, and `:not()`.
     *
     * Note: `:-abp-has()` is always extended and not considered native.
     *
     * @param selector CSS selector string to check.
     *
     * @returns True if the selector is potentially extended for older browsers,
     * false otherwise.
     */
    static isPotentiallyExtendedCss(selector) {
        return CssTokenStream.hasNativeCssPseudoClass(selector);
    }
}

/**
 * Gets rule texts by filterId and ruleIndex using the provided RuleTextProvider.
 * This is used when you only have the rule identifiers (e.g., from CSS content markers)
 * and need to retrieve the full rule texts from the engine.
 *
 * @param filterId - Filter list identifier.
 * @param ruleIndex - Rule index.
 * @param provider - The provider that implements retrieveRuleText and retrieveOriginalRuleText.
 *
 * @returns Object containing appliedRuleText (non-null string with fallback) and originalRuleText (nullable).
 */
function getRuleTextsByIndex(filterId, ruleIndex, provider) {
    // For negative indices (shouldn't happen during normal operation)
    if (ruleIndex < 0) {
        return {
            appliedRuleText: `<could not get rule text> (${filterId}:${ruleIndex})`,
            originalRuleText: null,
        };
    }
    const appliedRuleText = provider.retrieveRuleText(filterId, ruleIndex);
    const originalRuleText = provider.retrieveOriginalRuleText(filterId, ruleIndex);
    return {
        // fallback should never happen during normal operation
        appliedRuleText: appliedRuleText ?? `<rule text is not specified> (${filterId}:${ruleIndex})`,
        originalRuleText,
    };
}
/**
 * Gets rule texts from a rule using the provided RuleTextProvider.
 *
 * Handles both dynamic rules (index -1) and indexed rules.
 *
 * @param rule - The rule to extract texts from.
 * @param provider - The provider that implements retrieveRuleText and retrieveOriginalRuleText.
 *
 * @returns Object containing appliedRuleText (non-null string, empty if not found) and originalRuleText (nullable).
 */
function getRuleTexts(rule, provider) {
    if (!rule) {
        // should never happen during normal operation
        return {
            appliedRuleText: '<rule is not specified>',
            originalRuleText: null,
        };
    }
    const filterId = rule.getFilterListId();
    const ruleIndex = rule.getIndex();
    // For dynamic rules (index -1), use getText() directly
    if (ruleIndex === RULE_INDEX_NONE) {
        const appliedRuleText = rule.getText();
        return {
            // fallback should never happen during normal operation
            appliedRuleText: appliedRuleText ?? `<dynamic rule text is not specified> (${filterId}:${ruleIndex})`,
            originalRuleText: null,
        };
    }
    // For indexed rules, retrieve from provider
    const appliedRuleText = provider.retrieveRuleText(filterId, ruleIndex);
    const originalRuleText = provider.retrieveOriginalRuleText(filterId, ruleIndex);
    return {
        // fallback should never happen during normal operation
        appliedRuleText: appliedRuleText ?? `<rule text is not specified> (${filterId}:${ruleIndex})`,
        originalRuleText,
    };
}

/**
 * Checks if url is http request.
 *
 * @param url Request url.
 *
 * @returns True if url starts with http{s?}.
 */
function isHttpRequest(url) {
    return typeof url === 'string' && !!url && url.startsWith('http');
}
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
 * Extract host from url.
 *
 * @param url Url.
 *
 * @returns Host of the url or null.
 */
function getHost(url) {
    let firstIdx = url.indexOf('//');
    if (firstIdx === -1) {
        /**
         * It's non-hierarchical structured URL (stun: or turn:).
         *
         * @see {@link https://tools.ietf.org/html/rfc4395#section-2.2}
         * @see {@link https://tools.ietf.org/html/draft-nandakumar-rtcweb-stun-uri-08#appendix-B}
         */
        firstIdx = url.indexOf(':');
        if (firstIdx === -1) {
            return null;
        }
        firstIdx -= 1;
    }
    const nextSlashIdx = url.indexOf('/', firstIdx + 2);
    const startParamsIdx = url.indexOf('?', firstIdx + 2);
    let lastIdx = nextSlashIdx;
    if (startParamsIdx > 0 && (startParamsIdx < nextSlashIdx || nextSlashIdx < 0)) {
        lastIdx = startParamsIdx;
    }
    let host = lastIdx === -1 ? url.substring(firstIdx + 2) : url.substring(firstIdx + 2, lastIdx);
    const portIndex = host.indexOf(':');
    host = portIndex === -1 ? host : host.substring(0, portIndex);
    const lastChar = host.charAt(host.length - 1);
    if (lastChar === '.') {
        host = host.slice(0, -1);
    }
    return host;
}
/**
 * Extracts domain name from url.
 *
 * @param url Url.
 *
 * @returns Domain name or null.
 */
function getDomain(url) {
    const host = getHost(url);
    if (!host) {
        return null;
    }
    return host.startsWith('www.') ? host.substring(4) : host;
}
/**
 * If referrer of request contains full url of extension, then this request is considered as extension's own request.
 * Example: request for filter downloading.
 * Related issue: @see {@link https://github.com/AdguardTeam/AdguardBrowserExtension/issues/1437}.
 *
 * @param url Request url.
 *
 * @returns True if request is extension's own.
 */
function isExtensionUrl(url) {
    return url.indexOf(browser.runtime.getURL('')) === 0;
}
/**
 * Checks third party relation.
 *
 * @param requestUrl Request url.
 * @param referrer Referrer url.
 *
 * @returns True if request is third-party.
 */
function isThirdPartyRequest(requestUrl, referrer) {
    const tldResult = parse(requestUrl);
    const sourceTldResult = parse(referrer);
    return tldResult.domain !== sourceTldResult.domain;
}
/**
 * Extracts upper level domain from domain.
 *
 * @param domain Domain.
 *
 * @returns Upper level domain.
 *
 * @example
 * ```
 * getUpperLevelDomain('www.example.com') => `example.com`
 * getUpperLevelDomain('test.pages.dev') => `pages.dev`
 * getUpperLevelDomain('allowlist.test.pages.dev') => `test.pages.dev`
 * ```
 */
function getUpperLevelDomain(domain) {
    const parts = domain.split('.');
    parts.shift();
    return parts.join('.');
}

/**
 * CosmeticApiCommon contains common logic about building css for hiding elements.
 */
class CosmeticApiCommon {
    static LINE_BREAK = '\r\n';
    /**
     * Number of selectors in grouped selector list.
     */
    static CSS_SELECTORS_PER_LINE = 50;
    /**
     * URL-encoded semicolon (`%3B`) used to separate filterId from ruleIndex
     * inside the marker string. A bare `;` cannot be used because the CSS
     * parser would treat it as the end of the marker declaration.
     * The reader decodes it back via `decodeURIComponent` in
     * `ElementUtils.parseInfo`.
     */
    static HIT_SEP = encodeURIComponent(SEMICOLON);
    /**
     * Element hiding declaration block used by `addMarkerToElemhideRule`.
     * Combined with the selector, filterId and ruleIndex it produces the rule below.
     *
     * ```css
     * <selector> { display: none !important; --adguard-hit: 'adguard<id>%3B<idx>' !important; }
     * ```
     */
    static ELEMHIDE_BLOCK_START = ' { display: none !important;';
    static ELEMHIDE_BLOCK_END = ' }';
    /**
     * `@property` registration for `--adguard-hit`. Emitted once at the top
     * of every stylesheet built with hit markers so the property is
     * non-inheriting and initializes to an empty string on every element.
     */
    // eslint-disable-next-line max-len
    static PROPERTY_RULE = "@property --adguard-hit { syntax: '*'; inherits: false; initial-value: ''; }";
    /**
     * Regular expression used by the legacy ExtendedCss marker to detect
     * a user-declared `content:` and skip injection (it would otherwise
     * collide).
     */
    static CONTENT_ATTR_RE = /[{;"(]\s*content\s*:/gi;
    /**
     * Hit-marker emission strategy. The cosmetic emitter has two callers
     * with different transports for the marker:
     *
     *   - Native CSS (`<style>` injection) MUST use a custom property so
     *     pseudo-element rules (`::before` / `::after`) cannot paint the
     *     marker as visible text — see AG-265.
     *   - ExtendedCss reads the marker from the *parsed rule object*, never
     *     from the DOM, and the counter blanks `rule.style.content` before
     *     `setStyleToElement`. The marker therefore must travel as a
     *     `content:` declaration in the rule string passed to ExtendedCss.
     */
    static NATIVE_MARKER = {
        preamble: CosmeticApiCommon.PROPERTY_RULE,
        markerDeclStart: " --adguard-hit: 'adguard",
        markerDeclEnd: "' !important;",
        skipInject: () => false,
    };
    static EXTENDED_MARKER = {
        preamble: '',
        markerDeclStart: " content: 'adguard",
        markerDeclEnd: "' !important;",
        skipInject: (ruleContent) => {
            // Reset lastIndex because the `g` flag preserves state.
            CosmeticApiCommon.CONTENT_ATTR_RE.lastIndex = 0;
            return CosmeticApiCommon.CONTENT_ATTR_RE.test(ruleContent);
        },
    };
    /**
     * Builds stylesheets from rules.
     * If `groupElemhideSelectors` is set,
     * element hiding selector are to be combined into selector lists of {@link CosmeticApi.CSS_SELECTORS_PER_LINE}.
     *
     * @param elemhideRules List of elemhide rules.
     * @param injectRules List of inject css rules.
     * @param groupElemhideSelectors Flag for elemhide selectors grouping.
     *
     * @returns List of stylesheet expressions.
     */
    static buildStyleSheets(elemhideRules, injectRules, groupElemhideSelectors) {
        const styles = [];
        const elemHideStyles = CosmeticApiCommon.buildElemhideStyles(elemhideRules, groupElemhideSelectors);
        if (elemHideStyles.length > 0) {
            if (groupElemhideSelectors) {
                styles.push(elemHideStyles.join(CosmeticApiCommon.LINE_BREAK));
            }
            else {
                styles.push(...elemHideStyles);
            }
        }
        const cssStyles = injectRules.map((x) => x.getContent());
        if (cssStyles.length > 0) {
            if (groupElemhideSelectors) {
                styles.push(cssStyles.join(CosmeticApiCommon.LINE_BREAK));
            }
            else {
                styles.push(...cssStyles);
            }
        }
        return styles;
    }
    /**
     * Builds element hiding stylesheet from rules.
     * If `groupElemhideSelectors` is set,
     * selector are to be combined into selector lists of {@link CosmeticApi.CSS_SELECTORS_PER_LINE}.
     *
     * @param elemhideRules List of elemhide rules.
     * @param groupElemhideSelectors Flag for elemhide selectors grouping.
     *
     * @returns Array of styles.
     */
    static buildElemhideStyles(elemhideRules, groupElemhideSelectors) {
        // TODO: refactor constants as ELEMHIDE_CSS_STYLE and ELEMHIDE_HIT_START are duplicates partly
        const ELEMHIDE_CSS_STYLE = ' { display: none !important; }';
        const elemhideSelectors = [];
        for (const selector of elemhideRules) {
            elemhideSelectors.push(selector.getContent());
        }
        // if selector should not be grouped,
        // add element hiding style to each of them
        if (!groupElemhideSelectors) {
            return elemhideSelectors.map((selector) => {
                return `${selector}${ELEMHIDE_CSS_STYLE}`;
            });
        }
        // otherwise selectors should be grouped into selector lists
        const elemhideStyles = [];
        for (let i = 0; i < elemhideSelectors.length; i += CosmeticApiCommon.CSS_SELECTORS_PER_LINE) {
            const selectorList = elemhideSelectors
                .slice(i, i + CosmeticApiCommon.CSS_SELECTORS_PER_LINE)
                .join(', ');
            elemhideStyles.push(`${selectorList}${ELEMHIDE_CSS_STYLE}`);
        }
        return elemhideStyles;
    }
    /**
     * Wraps an elemhide selector in a hit-marker declaration block.
     *
     * Produces a rule of the form:
     * ```css
     * <selector> { display: none !important; <markerDecl> }
     * ```
     * where `<markerDecl>` is the strategy-specific marker declaration
     * (custom property for native, `content:` for ExtendedCss).
     *
     * @param rule Elemhide cosmetic rule.
     * @param strategy Marker emission strategy.
     *
     * @returns Full CSS rule including marker.
     */
    static addMarkerToElemhideRule(rule, strategy) {
        return [
            rule.getContent(),
            CosmeticApiCommon.ELEMHIDE_BLOCK_START,
            strategy.markerDeclStart,
            String(rule.getFilterListId()),
            CosmeticApiCommon.HIT_SEP,
            String(rule.getIndex()),
            strategy.markerDeclEnd,
            CosmeticApiCommon.ELEMHIDE_BLOCK_END,
        ].join('');
    }
    /**
     * Inserts the strategy's marker declaration into the rule's own
     * declaration block, leaving the selector and any existing
     * declarations untouched.
     *
     * On the native path this is a custom-property declaration that does
     * not collide with anything the rule may already declare. On the
     * ExtendedCss path the marker is `content:`, so a rule that already
     * declares `content:` is emitted unchanged (would otherwise clobber
     * the user declaration).
     *
     * @param rule Inject cosmetic rule.
     * @param strategy Marker emission strategy.
     *
     * @returns Rule string with the marker appended to its block.
     */
    static addMarkerToInjectRule(rule, strategy) {
        const ruleContent = rule.getContent();
        if (strategy.skipInject(ruleContent)) {
            return ruleContent;
        }
        // Strip trailing `}` (and optional trailing whitespace) so we can
        // append the marker declaration; ensure the preceding declaration
        // ends with a `;` to keep the block parseable.
        const ruleTextWithoutCloseBrace = ruleContent.slice(0, -1).trim();
        const ruleTextWithSemicolon = ruleTextWithoutCloseBrace.endsWith(SEMICOLON)
            ? ruleTextWithoutCloseBrace
            : `${ruleTextWithoutCloseBrace}${SEMICOLON}`;
        return [
            ruleTextWithSemicolon,
            strategy.markerDeclStart,
            String(rule.getFilterListId()),
            CosmeticApiCommon.HIT_SEP,
            String(rule.getIndex()),
            strategy.markerDeclEnd,
            CosmeticApiCommon.ELEMHIDE_BLOCK_END,
        ].join('');
    }
    /**
     * Builds stylesheets with hit markers using the given strategy.
     * If the strategy has a non-empty `preamble`, it is prepended once at
     * the top of the returned list.
     *
     * @param elemhideRules Elemhide css rules.
     * @param injectRules Inject css rules.
     * @param strategy Marker emission strategy.
     *
     * @returns List of stylesheet expressions (preamble + one
     * marker-bearing rule per input rule).
     */
    static buildStyleSheetsWithHits(elemhideRules, injectRules, strategy) {
        const elemhideStyles = elemhideRules.map((x) => CosmeticApiCommon.addMarkerToElemhideRule(x, strategy));
        const injectStyles = injectRules.map((x) => CosmeticApiCommon.addMarkerToInjectRule(x, strategy));
        if (elemhideStyles.length === 0 && injectStyles.length === 0) {
            return [];
        }
        return strategy.preamble
            ? [strategy.preamble, ...elemhideStyles, ...injectStyles]
            : [...elemhideStyles, ...injectStyles];
    }
    /**
     * Reclassifies rules containing native-and-ext pseudo-classes,
     * e.g. :has, :is, :not, to extended CSS.
     *
     * @param nativeRules Rules that are marked as native CSS.
     * @param extendedRules Rules that are marked as extended CSS.
     * @param isNativeHasSupported Optional, flag indicating
     * whether the browser natively supports :has/:is/:not pseudo-classes.
     * If not provided, default value is false.
     *
     * @returns Object with reclassified native and extended rules.
     */
    static reclassifyNativeAndExtCssRules(nativeRules, extendedRules, isNativeHasSupported = false) {
        // If browser natively supports :has/:is/:not pseudo-classes,
        // no reclassification needed
        if (isNativeHasSupported) {
            return {
                native: nativeRules,
                extended: extendedRules,
            };
        }
        // Move rules with :has/:is/:not to extended CSS
        // if browser doesn't support them
        const reclassifiedNativeRules = [];
        const reclassifiedExtendedRules = [...extendedRules];
        for (const rule of nativeRules) {
            const content = rule.getContent();
            if (CssCapabilities.isPotentiallyExtendedCss(content)) {
                // Move to extended CSS
                reclassifiedExtendedRules.push(rule);
            }
            else {
                // Keep as native CSS
                reclassifiedNativeRules.push(rule);
            }
        }
        return {
            native: reclassifiedNativeRules,
            extended: reclassifiedExtendedRules,
        };
    }
    /**
     * Extracts individual native CSS element-hiding selectors from the cosmetic result.
     * These are sent to the content script so it can validate and repair grouped CSS
     * injected by the background if any selector in a group is invalid.
     *
     * @param cosmeticResult Cosmetic result.
     * @param options Options for processing cosmetic rules.
     *
     * @returns Array of individual native CSS selectors, or null if none exist.
     */
    static getNativeCssSelectors(cosmeticResult, options = {}) {
        const { elementHiding } = cosmeticResult;
        const { isNativeHasSupported = false } = options;
        const elemhideReclassified = CosmeticApiCommon.reclassifyNativeAndExtCssRules(elementHiding.generic.concat(elementHiding.specific), elementHiding.genericExtCss.concat(elementHiding.specificExtCss), isNativeHasSupported);
        const selectors = elemhideReclassified.native.map((rule) => rule.getContent());
        return selectors.length > 0 ? selectors : null;
    }
    /**
     * Builds extended css rules from cosmetic result.
     *
     * @param cosmeticResult Cosmetic result.
     * @param options Options for processing cosmetic rules.
     *
     * @returns Array of extended css rules or null.
     */
    static getExtCssRules(cosmeticResult, options = {}) {
        const { elementHiding, CSS } = cosmeticResult;
        const { isNativeHasSupported = false, areHitsStatsCollected = false, } = options;
        // Reclassify element hiding rules if needed
        const elemhideReclassified = CosmeticApiCommon.reclassifyNativeAndExtCssRules(elementHiding.generic.concat(elementHiding.specific), elementHiding.genericExtCss.concat(elementHiding.specificExtCss), isNativeHasSupported);
        // Reclassify CSS injection rules if needed
        const cssReclassified = CosmeticApiCommon.reclassifyNativeAndExtCssRules(CSS.generic.concat(CSS.specific), CSS.genericExtCss.concat(CSS.specificExtCss), isNativeHasSupported);
        let extCssRules;
        if (areHitsStatsCollected) {
            extCssRules = CosmeticApiCommon.buildStyleSheetsWithHits(elemhideReclassified.extended, cssReclassified.extended, CosmeticApiCommon.EXTENDED_MARKER);
        }
        else {
            extCssRules = CosmeticApiCommon.buildStyleSheets(elemhideReclassified.extended, cssReclassified.extended, false);
        }
        return extCssRules.length > 0
            ? extCssRules
            : null;
    }
    /**
     * Retrieves CSS styles from the cosmetic result.
     *
     * @param cosmeticResult Cosmetic result.
     * @param options Options for processing cosmetic rules.
     *
     * @returns Css styles as string, or `undefined` if no styles found.
     */
    static getCssText(cosmeticResult, options = {}) {
        const { elementHiding, CSS } = cosmeticResult;
        const { areHitsStatsCollected = false, isNativeHasSupported = false, } = options;
        // Reclassify rules - only native CSS rules should be included in getCssText
        const elemhideReclassified = CosmeticApiCommon.reclassifyNativeAndExtCssRules(elementHiding.generic.concat(elementHiding.specific), elementHiding.genericExtCss.concat(elementHiding.specificExtCss), isNativeHasSupported);
        const cssReclassified = CosmeticApiCommon.reclassifyNativeAndExtCssRules(CSS.generic.concat(CSS.specific), CSS.genericExtCss.concat(CSS.specificExtCss), isNativeHasSupported);
        let styles;
        if (areHitsStatsCollected) {
            styles = CosmeticApiCommon.buildStyleSheetsWithHits(elemhideReclassified.native, cssReclassified.native, CosmeticApiCommon.NATIVE_MARKER);
        }
        else {
            styles = CosmeticApiCommon.buildStyleSheets(elemhideReclassified.native, cssReclassified.native, true);
        }
        if (styles.length > 0) {
            return styles.join(CosmeticApiCommon.LINE_BREAK);
        }
        return undefined;
    }
    /**
     * Wraps the given JavaScript code in a self-invoking function for safe execution
     * and appends a source URL comment for debugging purposes.
     *
     * @param scriptText The JavaScript code to wrap.
     *
     * @returns The wrapped script code, or an empty string if the input is falsy.
     */
    static wrapScriptText(scriptText) {
        if (!scriptText) {
            return '';
        }
        // The "//# sourceURL=ag-scripts.js" line is necessary to ensure the script always has the same URL,
        // making it possible to debug consistently.
        return `
        (function () {
            try {
                ${scriptText}
            } catch (ex) {
                console.error('Error executing AG js: ' + ex);
            }
        })();
        //# sourceURL=ag-scripts.js
        `;
    }
    /**
     * Combines unique script strings into a single script text.
     *
     * Script string is being trimmed and a semicolon is added if it is missing.
     *
     * @param uniqueScriptStrings Set of unique script strings to combine.
     *
     * @returns Combined script string.
     */
    static combineScripts(uniqueScriptStrings) {
        let scriptText = '';
        uniqueScriptStrings.forEach((rawScriptStr) => {
            const script = rawScriptStr.trim();
            scriptText += script.endsWith(SEMICOLON)
                ? `${script}${LF}`
                : `${script}${SEMICOLON}${LF}`;
        });
        return scriptText;
    }
    /**
     * Logs applied script rules for specified frame.
     *
     * @param params Data for js rule logging.
     * @param appliedScriptRules Script rules applied to the frame.
     * @param engineApi Engine API for retrieving rule texts.
     */
    static logScriptRules(params, appliedScriptRules, engineApi) {
        const { tabId, url, contentType, timestamp, } = params;
        for (const scriptRule of appliedScriptRules) {
            const ruleType = scriptRule.getType();
            const { appliedRuleText, originalRuleText } = getRuleTexts(scriptRule, engineApi);
            defaultFilteringLog.publishEvent({
                type: FilteringEventType.JsInject,
                data: {
                    script: true,
                    tabId,
                    // for proper filtering log request info rule displaying
                    // event id should be unique for each event, not copied from request
                    // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2341
                    eventId: nanoid(),
                    requestUrl: url,
                    frameUrl: url,
                    frameDomain: getDomain(url),
                    requestType: contentType,
                    timestamp,
                    filterId: scriptRule.getFilterListId(),
                    ruleIndex: scriptRule.getIndex(),
                    appliedRuleText,
                    originalRuleText,
                    cssRule: ruleType === CosmeticRuleType.ElementHidingRule
                        || ruleType === CosmeticRuleType.CssInjectionRule,
                    scriptRule: ruleType === CosmeticRuleType.ScriptletInjectionRule
                        || ruleType === CosmeticRuleType.JsInjectionRule,
                    contentRule: ruleType === CosmeticRuleType.HtmlFilteringRule,
                },
            });
        }
    }
}

/**
 * Check if the frame URL is about:blank or about:srcdoc.
 *
 * @param frameUrl Frame URL.
 *
 * @returns True if frame URL is about:blank or about:srcdoc, otherwise false.
 */
const isEmptySrcFrame = (frameUrl) => {
    return frameUrl === 'about:blank'
        || frameUrl === 'about:srcdoc';
};

/**
 * Checks if iframe has same source as main frame or if src is about:blank, javascript:, etc.
 * We don't include frames with 'src=data:' because Chrome and Firefox
 * do not allow data to be injected into frames with this type of src,
 * this bug is reported here https://bugs.chromium.org/p/chromium/issues/detail?id=55084.
 *
 * @param frameUrl Frame url.
 * @param frameId Unique id of frame in the tab.
 * @param mainFrameUrl Url of tab where iframe exists.
 *
 * @returns True if frame without src, else returns false.
 */
function isLocalFrame(frameUrl, frameId, mainFrameUrl) {
    return frameId !== MAIN_FRAME_ID
        && (frameUrl === mainFrameUrl
            || isEmptySrcFrame(frameUrl)
            // eslint-disable-next-line no-script-url
            || frameUrl.indexOf('javascript:') > -1);
}

/**
 * Creates match query for frame based on content script data and background tab context.
 * Used in {@link CosmeticApi} and {@link CookieFiltering} to match rules for content scripts.
 *
 * @param frameUrl Frame url. Received from content script.
 * @param frameId Frame id. Received from content script.
 * @param tabContext Tab context. Received from background script.
 *
 * @returns Match query for {@link EngineApi}.
 *
 * @throws Error if tab context url is not defined.
 */
function createFrameMatchQuery(frameUrl, frameId, tabContext) {
    const { info } = tabContext;
    if (!info.url) {
        throw new Error('Tab url is required');
    }
    const mainFrameUrl = info.url;
    const isLocal = isLocalFrame(frameUrl, frameId, mainFrameUrl);
    const requestUrl = isLocal ? mainFrameUrl : frameUrl;
    let requestType;
    // if frame is Local, then apply main frame rules.
    if (isLocal) {
        requestType = RequestType.Document;
    }
    else if (frameId === MAIN_FRAME_ID) {
        requestType = RequestType.Document;
    }
    else {
        requestType = RequestType.SubDocument;
    }
    return {
        requestUrl,
        frameUrl: requestUrl,
        requestType,
        frameRule: tabContext.mainFrameRule,
    };
}

/**
 * API to store a persistent value with debounced synchronization to the specified storage key.
 *
 * After the container is created, we initialize it asynchronously to get the actual value from the storage.
 * The Init method is guarded against multiple initializations to avoid unnecessary reads from the memory.
 * Get/set methods are protected from uninitialized storage to ensure that actual data is used.
 *
 * We declare the sync get/set methods to update the cached value. This allows us to use containers in accessors.
 *
 * Set method updates the cached value and schedules the save operation to the storage via a debounce function to
 * avoid unnecessary writes to the storage.
 *
 * This container saves the data to storage using the specified key to avoid collisions with other instances.
 * It helps to avoid reading the data from the storage that is not related to the current instance.
 */
class PersistentValueContainer {
    static #IS_BACKGROUND_PERSISTENT = PersistentValueContainer.#isBackgroundPersistent();
    #storage; // Using the async StorageInterface
    #key;
    #value;
    #save;
    #isInitialized = false;
    /**
     * Creates {@link PersistentValueContainer} instance.
     *
     * @param key The key to use for storing the data.
     * @param storage The storage interface implementation.
     * @param debounceMs The debounce time in milliseconds to save the data to the storage.
     * Optional. Default is 300ms.
     */
    constructor(key, storage, // Accepts a StorageInterface implementation
    debounceMs = 300) {
        this.#key = key;
        this.#storage = storage;
        // Configure the #save method to decide dynamically between debounce or direct call
        this.#save = PersistentValueContainer.#IS_BACKGROUND_PERSISTENT
            ? () => {
                this.#storage.set(this.#key, this.#value); // Save directly
            }
            : debounce(() => {
                this.#storage.set(this.#key, this.#value); // Save using debounce
            }, debounceMs);
    }
    /**
     * Initializes the value.
     *
     * @param value The initial value.
     *
     * @returns Promise that resolves when the value is initialized.
     *
     * @throws Error, if storage already initialized.
     */
    async init(value) {
        if (this.#isInitialized) {
            throw new Error('Storage already initialized');
        }
        if (PersistentValueContainer.#IS_BACKGROUND_PERSISTENT) {
            this.#value = value;
        }
        else {
            const storedValue = await this.#storage.get(this.#key);
            this.#value = storedValue !== undefined ? storedValue : value; // Use stored value or fallback to default
        }
        this.#isInitialized = true;
    }
    /**
     * Gets the value.
     *
     * @returns The value stored by the specified key.
     *
     * @throws Error, if storage not initialized.
     */
    get() {
        this.#checkIsInitialized();
        return this.#value;
    }
    /**
     * Sets the value.
     *
     * @param value Value to be stored in the specified key.
     *
     * @throws Error, if storage not initialized.
     */
    set(value) {
        this.#checkIsInitialized();
        this.#value = value;
        this.#save();
    }
    /**
     * Checks if the storage is initialized.
     *
     * @throws Error, if storage not initialized.
     */
    #checkIsInitialized() {
        if (!this.#isInitialized) {
            throw new Error('Storage not initialized');
        }
    }
    /**
     * TODO: remove this method after the migration to event-driven background.
     * Checks if the background script is persistent.
     *
     * @returns True if the background script is persistent.
     */
    static #isBackgroundPersistent() {
        const manifest = browser.runtime.getManifest();
        if (manifest.manifest_version === 3) {
            return false;
        }
        if (!manifest.background) {
            return true;
        }
        const background = manifest.background;
        return background.persistent ?? true;
    }
}

/**
 * API for storing persistent key-value data with debounced sync using a specified storage key.
 * Storage synchronization is described in the {@link PersistentValueContainer} class.
 */
class ExtensionStorage {
    /**
     * API for storing persistent value with debounced sync using the specified storage key.
     */
    #container;
    /**
     * Creates {@link ExtensionStorage} instance.
     *
     * @param key The key to use for storing the data.
     * @param storage Storage interface implementation (replacing WebExtension API storage).
     */
    constructor(key, storage) {
        this.#container = new PersistentValueContainer(key, storage);
    }
    /**
     * Initializes the storage.
     *
     * @param data The initial data.
     *
     * @returns Promise that resolves when the storage is initialized.
     *
     * @throws Error, if storage already initialized.
     */
    init(data) {
        return this.#container.init(data);
    }
    /**
     * Gets the value by the specified key.
     *
     * @param key The key to retrieve the value.
     *
     * @returns The data stored by the specified key.
     *
     * @throws Error, if storage not initialized.
     */
    get(key) {
        return this.#container.get()[key];
    }
    /**
     * Sets the value by the specified key.
     *
     * @param key The key for the value to be stored.
     * @param value The new value.
     *
     * @throws Error, if storage not initialized.
     */
    set(key, value) {
        const data = this.#container.get();
        data[key] = value;
        this.#container.set(data);
    }
    /**
     * Deletes the value by the specified key.
     *
     * @param key The key for the value to be deleted.
     *
     * @throws Error, if storage not initialized.
     */
    delete(key) {
        const data = this.#container.get();
        delete data[key];
        this.#container.set(data);
    }
}

/**
 * Creates accessor decorator for the specified storage.
 *
 * @see https://github.com/tc39/proposal-decorators
 *
 * @param storage The extension storage API to use.
 *
 * @returns Accessor decorator for the specified storage.
 */
function createExtensionStorageDecorator(storage) {
    const fields = new Set();
    /**
     * Creates accessor decorator for the specified storage field.
     *
     * NOTE: You should not set the initial value to the accessor via assignment,
     * because the decorator overwrites accessor methods and doesn't use a private property, created on initialization.
     * Use Non-null assertion operator instead.
     *
     * @param field Storage field name.
     *
     * @returns Decorator for access to specified storage {@link field}.
     *
     * @throws Error if the decorator is already registered for {@link field}
     * or the decorator is applied to a class member other than an accessor.
     *
     * @example `@storage('foo') accessor bar!: string`;
     */
    return function createFieldDecorator(field) {
        // Prevent the use of multiple decorators on a single storage field
        if (fields.has(field)) {
            throw new Error(`Decorator for ${String(field)} field is already registered`);
        }
        fields.add(field);
        return function fieldDecorator(_target, context) {
            // Ensure the class member is an accessor
            if (context.kind !== 'accessor') {
                throw new Error('Class member is not an accessor');
            }
            // Provide getter and setter using the ExtensionStorage methods
            return {
                get() {
                    return storage.get(field);
                },
                set(value) {
                    storage.set(field, value);
                },
            };
        };
    };
}

/**
 * Wrapper for StorageArea with dev-friendly interface.
 *
 * @template Data The type of the value stored in the storage.
 */
class BrowserStorage {
    storage;
    /**
     * Constructs an instance of the BrowserStorage class.
     *
     * @param storage The storage area to use.
     */
    constructor(storage) {
        this.storage = storage;
    }
    /**
     * Sets data to storage.
     *
     * @param key Storage key.
     * @param value Storage value.
     */
    async set(key, value) {
        await this.storage.set({ [key]: value });
    }
    /**
     * Returns data from storage.
     *
     * @param key Storage key.
     *
     * @returns Storage value.
     */
    async get(key) {
        return this.storage.get(key).then((data) => data[key]);
    }
    /**
     * Removes data from storage.
     *
     * @param key Storage key.
     */
    async remove(key) {
        await this.storage.remove(key);
    }
    /**
     * Sets multiple key-value pairs in the storage.
     *
     * @param data The key-value pairs to set.
     *
     * @returns True if all operations were successful, false otherwise.
     *
     * @example
     * ```ts
     * const storage = new Storage();
     * await storage.setMultiple({
     *    key1: 'value1',
     *    key2: 'value2',
     * });
     * ```
     */
    // TODO: Implement some kind of transaction to ensure atomicity, if possible
    // Note: We only use this method for Firefox if "Never Remember History" is enabled
    async setMultiple(data) {
        try {
            await this.storage.set(data);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * Removes multiple key-value pairs from the storage.
     *
     * @param keys The keys to remove.
     *
     * @returns True if all operations were successful, false otherwise.
     */
    async removeMultiple(keys) {
        await this.storage.remove(keys);
        return true;
    }
    /**
     * Get the entire contents of the storage.
     *
     * @returns Promise that resolves with the entire contents of the storage.
     */
    async entries() {
        return this.storage.get(null);
    }
    /**
     * Get all keys from the storage.
     *
     * @returns Promise that resolves with all keys from the storage.
     */
    async keys() {
        return Object.keys(await this.entries());
    }
    /**
     * Checks if the storage has a key.
     *
     * @param key The key to check.
     *
     * @returns True if the key exists, false otherwise.
     */
    async has(key) {
        return this.storage.get(key).then((data) => key in data);
    }
    /**
     * Clears the storage.
     */
    async clear() {
        await this.storage.clear();
    }
}

/**
 * @file Memory storage implementation with async operations.
 */
/**
 * Provides a simple in-memory storage implementation.
 * This class implements the ExtendedStorageInterface with asynchronous methods.
 *
 * @template Data The type of the value stored in the storage.
 */
class MemoryStorage {
    /**
     * Internal map to hold the key-value pairs.
     */
    store;
    /**
     * Constructs an instance of the MemoryStorage class.
     */
    constructor() {
        this.store = new Map();
    }
    /**
     * Retrieves a value by key from the storage.
     *
     * @param key The key of the value to retrieve.
     *
     * @returns A promise that resolves with the value associated with the key.
     */
    async get(key) {
        return Promise.resolve(this.store.get(key));
    }
    /**
     * Sets a value in the storage with the specified key.
     *
     * @param key The key under which to store the value.
     * @param value The value to store.
     *
     * @returns A promise that resolves when the operation is complete.
     */
    async set(key, value) {
        this.store.set(key, cloneDeep(value));
        return Promise.resolve();
    }
    /**
     * Removes a value from the storage by key.
     *
     * @param key The key of the value to remove.
     *
     * @returns A promise that resolves when the operation is complete.
     */
    async remove(key) {
        this.store.delete(key);
        return Promise.resolve();
    }
    /**
     * Sets multiple key-value pairs in the storage.
     *
     * @param data The key-value pairs to set.
     *
     * @returns A promise that resolves with true if all operations were successful.
     */
    async setMultiple(data) {
        try {
            // Create a deep copy of each value
            const clonedData = cloneDeep(data);
            // Set each key-value pair into the store using Object.assign
            Object.assign(this.store, Object.entries(clonedData).reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {}));
            return await Promise.resolve(true);
        }
        catch (error) {
            logger.error('[tsweb.MemoryStorage.setMultiple]: error in setMultiple: ', error);
            return Promise.resolve(false);
        }
    }
    /**
     * Removes multiple key-value pairs from the storage.
     *
     * @param keys The keys to remove.
     *
     * @returns A promise that resolves with true if all operations were successful.
     */
    async removeMultiple(keys) {
        try {
            keys.forEach((key) => this.store.delete(key));
            return await Promise.resolve(true);
        }
        catch (error) {
            logger.error('[tsweb.MemoryStorage.removeMultiple]: error in removeMultiple: ', error);
            return Promise.resolve(false);
        }
    }
    /**
     * Retrieves all entries in the storage.
     *
     * @returns A promise that resolves with an object containing all key-value pairs in the storage.
     */
    async entries() {
        return Promise.resolve(Object.fromEntries(this.store.entries()));
    }
    /**
     * Retrieves all keys in the storage.
     *
     * @returns A promise that resolves with an array of all keys in the storage.
     */
    async keys() {
        return Promise.resolve(Array.from(this.store.keys()));
    }
    /**
     * Checks if a key exists in the storage.
     *
     * @param key The key to check.
     *
     * @returns A promise that resolves with true if the key exists, false otherwise.
     */
    async has(key) {
        return Promise.resolve(this.store.has(key));
    }
    /**
     * Clears the storage.
     *
     * @returns A promise that resolves when the storage is cleared.
     */
    async clear() {
        this.store.clear();
        return Promise.resolve();
    }
}

// TODO: consider using common/user-agent from browser-extension instead of bowser
/**
 * BrowserDetector class detects the browser using Bowser library.
 */
class BrowserDetector {
    /**
     * Bowser parser instance.
     */
    browserDetector;
    /**
     * Creates new BrowserDetector instance.
     *
     * @param globalObject Global object — Window or self.
     */
    constructor(
    // eslint-disable-next-line no-restricted-globals
    globalObject) {
        this.browserDetector = Bowser.getParser(globalObject.navigator.userAgent);
    }
    /**
     * Returns the browser.
     *
     * @returns Browser details.
     */
    getBrowserDetails() {
        return this.browserDetector.getBrowser();
    }
    /**
     * Returns the engine.
     *
     * @returns Engine details.
     */
    engineDetails() {
        return this.browserDetector.getEngine();
    }
    /**
     * Checks if the browser is Opera.
     *
     * @returns True if the browser is Opera.
     */
    isOpera() {
        return this.getBrowserDetails().name === 'Opera';
    }
    /**
     * Checks if the browser is Firefox.
     *
     * @returns True if the browser is Firefox.
     */
    isFirefox() {
        return this.getBrowserDetails().name === 'Firefox';
    }
    /**
     * Checks if the browser is Chrome.
     *
     * @returns True if the browser is Chrome.
     */
    isChrome() {
        return this.getBrowserDetails().name === 'Chrome';
    }
    /**
     * Checks if the browser is Chromium.
     *
     * @returns True if the browser is Chromium.
     */
    isChromium() {
        return this.engineDetails().name === 'Blink';
    }
}

/**
 * Wrapper around a map for frames.
 */
class Frames {
    /**
     * A map where the key is the frame ID and the value is the frame object.
     */
    framesMap = new Map();
    /**
     * Sets frame by id.
     *
     * @param frameId Frame id.
     * @param frame Frame to save.
     */
    set(frameId, frame) {
        this.framesMap.set(frameId, frame);
    }
    /**
     * Returns frame by id.
     *
     * @param frameId Frame id.
     *
     * @returns Frame or undefined if frame not found.
     */
    get(frameId) {
        return this.framesMap.get(frameId);
    }
    /**
     * Clears all frames.
     */
    clear() {
        this.framesMap.clear();
    }
    /**
     * Deletes frame by id.
     *
     * @param frameId Frame id.
     */
    delete(frameId) {
        this.framesMap.delete(frameId);
    }
    /**
     * Returns all frames.
     *
     * @returns Array of frames.
     */
    values() {
        return [...this.framesMap.values()];
    }
}

/**
 * Tab context common class.
 */
class TabContextCommon {
    info;
    filteringLog;
    /**
     * Frames context.
     *
     * NOTE: this is temporary storage for frames data.
     * Each frame context is deleted after navigation is complete.
     * Storage is cleared on tab reload.
     * Do not use it as a data source out of request or navigation processing.
     */
    frames = new Frames();
    /**
     * Document IDs map.
     * Used to get frame context by document ID.
     */
    documentIdsMap = new Map();
    /**
     * Blocked request count.
     */
    blockedRequestCount = 0;
    /**
     * Document level rule, applied to the tab.
     */
    mainFrameRule = null;
    // TODO: remove later.
    /**
     * @deprecated
     * This field is used in the extension, and mv2 version uses it,
     * but it is not used anymore in mv3, so it is deprecated here.
     *
     * We mark these tabs as synthetic because they may not actually exist.
     */
    isSyntheticTab = false;
    /**
     * Timestamp of the assistant initialization.
     *
     * Needed to avoid cosmetic rules injection into the assistant frame.
     *
     * @see {@link https://github.com/AdguardTeam/AdguardBrowserExtension/issues/1848}
     */
    assistantInitTimestamp = null;
    /**
     * Tab creation timestamp in milliseconds.
     */
    createdAtMs;
    /**
     * Tab context constructor.
     *
     * @param info Tab info.
     * @param filteringLog Filtering log.
     */
    constructor(info, filteringLog = defaultFilteringLog) {
        this.info = info;
        this.filteringLog = filteringLog;
        this.createdAtMs = Date.now();
    }
    /**
     * Updates tab info.
     *
     * @param tabInfo Tab info.
     */
    updateTabInfo(tabInfo) {
        this.info = tabInfo;
    }
    /**
     * Updates main frame data.
     *
     * Note: this method will be called on tab reload before the first {@link browser.tabs.onUpdated} event
     * and {@link handleTabUpdate} calls.
     *
     * @param tabId Tab ID.
     * @param url Url.
     */
    updateMainFrameData(tabId, url) {
        this.info.url = url;
        this.info.id = tabId;
    }
    /**
     * Increments blocked requests count.
     */
    incrementBlockedRequestCount() {
        this.blockedRequestCount += 1;
    }
    /**
     * Resets blocked requests count.
     */
    resetBlockedRequestsCount() {
        this.blockedRequestCount = 0;
    }
    /**
     * Checks if the tab hosts a content by checking its ID.
     * Non-content tabs can be PWA apps and devtools windows.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/TAB_ID_NONE}.
     *
     * @param tabId Tab ID.
     *
     * @returns True if the tab is a content tab.
     */
    static isTabHostingContent(tabId) {
        return tabId !== browser.tabs.TAB_ID_NONE;
    }
    /**
     * Checks if passed {@link Tabs.Tab} details represent a browser tab.
     *
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/Tab#type
     * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/TAB_ID_NONE
     *
     * @param tab Tab details.
     *
     * @returns True if the tab is a browser tab, otherwise returns false.
     */
    static isBrowserTab(tab) {
        return typeof tab.id === 'number' && TabContextCommon.isTabHostingContent(tab.id);
    }
    /**
     * Get frame context.
     *
     * @param frameId Frame id.
     *
     * @returns Frame context.
     */
    getFrameContext(frameId) {
        return this.frames.get(frameId);
    }
    /**
     * Set frame context.
     *
     * @param frameId Frame id.
     * @param frameContext Frame context.
     */
    setFrameContext(frameId, frameContext) {
        this.frames.set(frameId, frameContext);
    }
    /**
     * Set document id.
     *
     * @param documentId Unique identifier of the frame.
     * @param frameId Frame id.
     */
    setDocumentId(documentId, frameId) {
        // A frame can only have one active document at a time, so any document
        // IDs previously mapped to this frame are now stale. Remove them before
        // adding the new mapping. This is what keeps documentIdsMap bounded for
        // the main frame (frame 0), which is never deleted via deleteFrameContext
        // and would otherwise accumulate one entry per navigation, causing OOM on
        // redirect loops.
        //
        // We intentionally do not call clearStaleDocumentIds() here: it is on the
        // hot path of a redirect loop, and a per-frame delete is allocation-free,
        // whereas clearStaleDocumentIds() builds a throwaway array + Set + spread
        // on every call. Removing only entries for this frame is sufficient because
        // stale IDs of other frames are pruned by deleteFrameContext, and a full
        // sweep still runs via clearStaleFrames -> clearStaleDocumentIds.
        for (const [existingDocumentId, existingFrameId] of this.documentIdsMap) {
            if (existingFrameId === frameId) {
                this.documentIdsMap.delete(existingDocumentId);
            }
        }
        this.documentIdsMap.set(documentId, frameId);
    }
    /**
     * Get frame context by document id.
     *
     * @param documentId Unique identifier of the frame.
     *
     * @returns Frame context.
     */
    getFrameContextByDocumentId(documentId) {
        const frameId = this.documentIdsMap.get(documentId);
        // frameId might be 0, do not use falsy check
        if (frameId !== undefined) {
            return this.frames.get(frameId);
        }
        return undefined;
    }
    /**
     * Deletes the frame context.
     *
     * @param frameId The ID of the frame to delete.
     * @param maxFrameAgeMs The maximum allowed frame age in milliseconds.
     */
    deleteFrameContext(frameId, maxFrameAgeMs) {
        // The main frame should only be deleted when the tab is closed,
        // as it may be needed for sub frames created during the page's lifetime
        // or for retrieving the main frame rule.
        if (frameId === MAIN_FRAME_ID) {
            return;
        }
        const frame = this.frames.get(frameId);
        if (!frame) {
            return;
        }
        // Do not delete frames that are not stale, as they may still be needed.
        if (frame.timeStamp && frame.timeStamp > Date.now() - maxFrameAgeMs) {
            return;
        }
        // Clear the document ID map if the frame has a document ID.
        if (frame.documentId) {
            this.documentIdsMap.delete(frame.documentId);
        }
        this.frames.delete(frameId);
    }
    /**
     * Since document frames are not removed, but rather updated, document IDs can become stale.
     * This method clears stale document IDs.
     */
    clearStaleDocumentIds() {
        const documentIdsLeft = this.frames.values()
            .map((frame) => frame.documentId)
            .filter(identity);
        const documentIdsLeftSet = new Set(documentIdsLeft);
        const documentIds = [...this.documentIdsMap.keys()];
        for (const documentId of documentIds) {
            if (!documentIdsLeftSet.has(documentId)) {
                this.documentIdsMap.delete(documentId);
            }
        }
    }
    /**
     * Clears stale frames.
     *
     * @param maxFrameAgeMs The maximum allowed frame age in milliseconds.
     */
    clearStaleFrames(maxFrameAgeMs) {
        const values = this.frames.values();
        for (const value of values) {
            this.deleteFrameContext(value.frameId, maxFrameAgeMs);
        }
        this.clearStaleDocumentIds();
    }
}

/**
 * Tabs API common class.
 */
class TabsApiCommon {
    documentApi;
    /**
     * Keys of the tab changed info.
     *
     * See {@link Tabs.OnUpdatedChangeInfoType}.
     */
    static TAB_CHANGED_INFO_KEYS = [
        'attention',
        'audible',
        'autoDiscardable',
        'discarded',
        'favIconUrl',
        'hidden',
        'isArticle',
        'mutedInfo',
        'pinned',
        'sharingState',
        'status',
        'title',
        'url',
    ];
    context = new Map();
    onCreate = new EventChannel();
    onUpdate = new EventChannel();
    onDelete = new EventChannel();
    onActivate = new EventChannel();
    onReplace = new EventChannel();
    /**
     * Tabs API constructor.
     *
     * @param documentApi Optional, Document API instance. Needed for MV2.
     */
    constructor(documentApi) {
        this.documentApi = documentApi;
        this.handleTabCreate = this.handleTabCreate.bind(this);
        this.handleTabUpdate = this.handleTabUpdate.bind(this);
        this.handleTabActivate = this.handleTabActivate.bind(this);
        this.handleTabReplace = this.handleTabReplace.bind(this);
        this.handleTabDelete = this.handleTabDelete.bind(this);
        this.onWindowFocusChanged = this.onWindowFocusChanged.bind(this);
        this.getTabContext = this.getTabContext.bind(this);
        this.getTabFrameRule = this.getTabFrameRule.bind(this);
        this.getTabFrame = this.getTabFrame.bind(this);
        this.getTabMainFrame = this.getTabMainFrame.bind(this);
        this.getMainFrameUrl = this.getMainFrameUrl.bind(this);
    }
    /**
     * Starts recording the main frame URLs for the tabs.
     */
    async start() {
        browser.tabs.onCreated.addListener(this.handleTabCreate);
        browser.tabs.onRemoved.addListener(this.handleTabDelete);
        browser.tabs.onUpdated.addListener(this.handleTabUpdate);
        browser.tabs.onActivated.addListener(this.handleTabActivate);
        browser.tabs.onReplaced.addListener(this.handleTabReplace);
        // Firefox for android doesn't support windows API
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows#browser_compatibility
        if (browser.windows) {
            browser.windows.onFocusChanged.addListener(this.onWindowFocusChanged);
        }
    }
    /**
     * Stops recording the main frame URLs for the tabs.
     */
    stop() {
        browser.tabs.onCreated.removeListener(this.handleTabCreate);
        browser.tabs.onRemoved.removeListener(this.handleTabDelete);
        browser.tabs.onUpdated.removeListener(this.handleTabUpdate);
        browser.tabs.onActivated.removeListener(this.handleTabActivate);
        browser.tabs.onReplaced.removeListener(this.handleTabReplace);
        // Firefox for android doesn't support windows API
        if (browser.windows) {
            browser.windows.onFocusChanged.removeListener(this.onWindowFocusChanged);
        }
        this.context.clear();
    }
    /**
     * Creates a new tab context on tab creation.
     *
     * @param tab Tab info.
     * @param tab.id Tab id.
     *
     * @returns Created tab context, or null if tab is not browser tab.
     */
    handleTabCreate(tab) {
        if (!TabContextCommon.isBrowserTab(tab)) {
            return null;
        }
        // Remove favIconUrl to prevent memory leaks
        // Firefox stores favicons as data URLs (e.g., `data:image/x-icon;base64,...`)
        // which can cause memory leaks. Since we don't use favIconUrl, it's safe to remove.
        // See: https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2594#issuecomment-3675433849
        delete tab.favIconUrl;
        /**
         * If tab context already created at this point, it means that
         * context has been created by `createTabContextIfNotExists` method.
         * Instead of re-creating the context and firing `onCreate` event,
         * we just update the existing tab info and fire `onUpdate` event.
         */
        let tabContext = this.context.get(tab.id);
        if (tabContext && tabContext.isSyntheticTab) {
            /**
             * We previously in `createTabContextIfNotExists` marked
             * tab context as synthetic, because Tabs API `onCreated`
             * event is fired, this context no longer synthetic.
             */
            tabContext.isSyntheticTab = false;
            const changedInfo = this.getTabChangedInfo(tabContext, tab);
            this.handleTabUpdate(tab.id, changedInfo, tab);
        }
        else {
            tabContext = this.createTabContext(tab);
            this.context.set(tab.id, tabContext);
            this.onCreate.dispatch(tabContext);
        }
        return tabContext;
    }
    /**
     * Creates and adds a new tab context if it does not exist in the context map,
     * in case if Tabs API does not fire `onCreated` event before point of call.
     *
     * The cases are:
     * - The right side of split screen in Edge does not fire any Tabs API events (see issue link below).
     * - `onCreated` might be fired later than `onBeforeNavigate` and `onBeforeRequest`,
     *   where we precalculate cosmetics and blocking rules.
     *
     * @see {@link https://github.com/microsoft/MicrosoftEdge-Extensions/issues/296 | Edge Split Screen Issue}
     *
     * @param tabId Tab ID.
     * @param url Tab URL.
     *
     * @todo Add removal logic for stale tab contexts. It potentially bloats memory
     *       in case if Tabs API does not fire the `onRemoved` event.
     * @todo Currently, Edge does not fire `onUpdated` and `onActivated` events
     *       for the right side of split screen. When this issue is fixed (see issue link above),
     *       we need to make sure that the tab context is updated and tabs are activated correctly.
     */
    createTabContextIfNotExists(tabId, url) {
        // Do nothing if the tab context already exists.
        if (this.context.has(tabId)) {
            return;
        }
        /**
         * We need to create a synthetic tab info object with minimal properties,
         * to be able to create a tab context. At later point when `onCreated` will be
         * fired, we will update the tab context with full tab info in {@link handleTabCreate}.
         *
         * NOTE: This method doesn't uses `tabs.get(tabId)` to retrieve full tab info,
         * because it requires method to be async, and it is used inside
         * of `webRequest.onBeforeRequest` and `webNavigation.onBeforeNavigate` events
         * which needs to be sync and requires immediate handling. Full tab info
         * will be needed for Filtering Log to show the tab title, etc.
         */
        const syntheticTab = {
            id: tabId,
            url,
            // If we are creating tab manually it means that `onCreated`
            // event was not fired, so we don't know the tab index yet.
            index: -1,
            // This properties required, so we default all of them to `false`.
            highlighted: false,
            active: false,
            pinned: false,
            incognito: false,
        };
        const syntheticTabContext = this.handleTabCreate(syntheticTab);
        /**
         * Mark the tab context as synthetic.
         * This is needed at later point to determine if the tab
         * context was created manually or from Tabs API event.
         */
        if (syntheticTabContext) {
            syntheticTabContext.isSyntheticTab = true;
        }
    }
    /**
     * Returns tab changed info.
     *
     * This method is used to compare the old tab info with the new tab info
     * in case if `onCreated` is fired on synthetic tab context and we need to
     * actualize the tab info by emulating native `onUpdated` event.
     *
     * @param tabContext Existing tab context.
     * @param newTabInfo Tab info to be updated.
     *
     * @returns Tab changed info.
     */
    // eslint-disable-next-line class-methods-use-this
    getTabChangedInfo(tabContext, newTabInfo) {
        const oldTabInfo = tabContext.info;
        const changedInfo = {};
        for (const key of TabsApiCommon.TAB_CHANGED_INFO_KEYS) {
            if (oldTabInfo[key] !== newTabInfo[key]) {
                // @ts-expect-error - Tab info keys always matches with changed info keys
                changedInfo[key] = newTabInfo[key];
            }
        }
        return changedInfo;
    }
    /**
     * Updates tab context data on tab update.
     *
     * If the tab context is not found, creates a new tab context.
     *
     * If the tab context is not found, creates a new tab context.
     *
     * @param tabId Tab ID.
     * @param changeInfo Tab change info.
     * @param tabInfo Tab info.
     */
    handleTabUpdate(tabId, changeInfo, tabInfo) {
        if (!TabContextCommon.isBrowserTab(tabInfo)) {
            return;
        }
        // Ignore favicon-only updates
        if (Object.keys(changeInfo).length === 1 && 'favIconUrl' in changeInfo) {
            return;
        }
        // Remove favIconUrl to prevent memory leaks
        // Firefox stores favicons as data URLs (e.g., `data:image/x-icon;base64,...`)
        // which can cause memory leaks. Since we don't use favIconUrl, it's safe to remove.
        // See: https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2594#issuecomment-3675433849
        delete tabInfo.favIconUrl;
        const tabContext = this.context.get(tabId);
        if (!tabContext) {
            return;
        }
        tabContext.updateTabInfo(tabInfo);
        this.onUpdate.dispatch(tabContext);
    }
    /**
     * Dispatches tab on activated event.
     *
     * @param tab Tab info.
     */
    handleTabActivate(tab) {
        const tabContext = this.context.get(tab.tabId);
        if (!tabContext) {
            return;
        }
        this.onActivate.dispatch(tabContext);
    }
    /**
     * The browser tab may be replaced by another when the discarded tab wakes up.
     * We handle this case on {@link browser.tabs.onReplaced} event.
     * It fires before the tab details are updated,
     * so we just move the existing tab context to the new key.
     *
     * @param addedTabId Id of the new tab context moved to.
     * @param removedTabId Id of removed tab.
     */
    handleTabReplace(addedTabId, removedTabId) {
        const tabContext = this.context.get(removedTabId);
        if (!tabContext) {
            return;
        }
        this.context.delete(removedTabId);
        this.context.set(addedTabId, tabContext);
        this.onReplace.dispatch(tabContext);
    }
    /**
     * Removes tab context by tab ID.
     *
     * @param tabId Tab ID.
     */
    handleTabDelete(tabId) {
        const tabContext = this.context.get(tabId);
        if (!tabContext) {
            return;
        }
        this.context.delete(tabId);
        this.onDelete.dispatch(tabContext);
    }
    /**
     * Called when focus state of window changed.
     *
     * @param windowId Window ID.
     */
    async onWindowFocusChanged(windowId) {
        // If all browser windows have lost focus.
        if (windowId === browser.windows.WINDOW_ID_NONE) {
            return;
        }
        const [activeTab] = await browser.tabs.query({
            active: true,
            windowId,
        });
        if (!activeTab || !activeTab.id) {
            return;
        }
        const tabContext = this.context.get(activeTab.id);
        if (!tabContext) {
            return;
        }
        this.onActivate.dispatch(tabContext);
    }
    /**
     * Retrieves tab context by tab ID.
     *
     * @param tabId Tab ID.
     *
     * @returns Tab context or undefined if not found.
     */
    getTabContext(tabId) {
        return this.context.get(tabId);
    }
    /**
     * Retrieves frame rule for the tab context.
     *
     * @param tabId Tab ID.
     *
     * @returns Frame rule or null if not found.
     */
    getTabFrameRule(tabId) {
        const tabContext = this.context.get(tabId);
        if (!tabContext) {
            return null;
        }
        return tabContext.mainFrameRule;
    }
    /**
     * Retrieves frame data for the frame in the tab context.
     *
     * @param tabId Tab ID.
     * @param frameId Frame ID.
     *
     * @returns Frame data or null if not found.
     */
    getTabFrame(tabId, frameId) {
        const tabContext = this.context.get(tabId);
        if (!tabContext) {
            return null;
        }
        const frame = tabContext.frames.get(frameId);
        if (!frame) {
            return null;
        }
        return frame;
    }
    /**
     * Retrieves main frame data for the tab context.
     *
     * @param tabId Tab ID.
     *
     * @returns Frame data or null if not found.
     */
    getTabMainFrame(tabId) {
        return this.getTabFrame(tabId, MAIN_FRAME_ID);
    }
    /**
     * Returns main frame URL for provided tab ID.
     *
     * @param tabId Tab ID.
     *
     * @returns Main frame URL for provided tab ID.
     */
    getMainFrameUrl(tabId) {
        return this.getTabMainFrame(tabId)?.url;
    }
    /**
     * Checks if the frame is a document-level frame by checking its parent frame ID.
     *
     * @param parentFrameId Parent frame ID.
     *
     * @returns True if the parent frame is a document-level frame.
     */
    static isDocumentLevelFrame(parentFrameId) {
        return parentFrameId === NO_PARENT_FRAME_ID;
    }
    /**
     * Checks whether the tab with the specified ID is open
     * in incognito mode or not.
     *
     * @param tabId Tab ID.
     *
     * @returns True if the tab is open in incognito mode, false otherwise.
     */
    isIncognitoTab(tabId) {
        const tabContext = this.getTabContext(tabId);
        if (!tabContext) {
            return false;
        }
        return tabContext.info.incognito;
    }
    /**
     * Checks whether the tab with the specified ID
     * can display the extension page or not.
     *
     * The tab is not allowed to display the extension page if:
     * - Tab is in incognito mode.
     * - Synthetic tab, because we created it manually,
     *   we can't know for sure if tab is in incognito or not,
     *   so by default extension page is not allowed in those tabs.
     *
     * @param tabId Tab ID.
     *
     * @returns True if extension page is not allowed for tab, false otherwise.
     */
    canShowExtensionPageInTab(tabId) {
        const tabContext = this.getTabContext(tabId);
        if (!tabContext) {
            return false;
        }
        if (tabContext.isSyntheticTab) {
            return true;
        }
        return tabContext.info.incognito;
    }
    /**
     * Checks if the referrer URL belongs to the same domain as the main frame URL.
     *
     * @param mainFrameUrl Main frame URL.
     * @param referrerUrl Referrer URL.
     *
     * @returns True if both URLs share the same domain.
     */
    static isSameDomain(mainFrameUrl, referrerUrl) {
        return !!mainFrameUrl
            && !!referrerUrl
            && getDomain(mainFrameUrl) === getDomain(referrerUrl);
    }
    /**
     * Checks if the top-level frame ancestor's URL domain matches
     * the main frame's URL domain.
     *
     * Used as Firefox fallback when parentDocumentId is not available.
     *
     * @param mainFrameUrl Main frame URL of the tab.
     * @param frameAncestors Frame ancestors from the request (Firefox-specific).
     *
     * @returns True if the top ancestor URL matches the main frame URL domain.
     */
    static isSameDomainByAncestors(mainFrameUrl, frameAncestors) {
        if (!frameAncestors || frameAncestors.length === 0) {
            return false;
        }
        const topAncestor = frameAncestors[frameAncestors.length - 1];
        return TabsApiCommon.isSameDomain(mainFrameUrl, topAncestor.url);
    }
    /**
     * Checks if the given document ID belongs to the current page by walking up
     * the parentDocumentId chain from stored frames until the main frame is reached.
     *
     * @param tabContext Tab context containing frames and document ID mappings.
     * @param startDocumentId The document ID to start the chain walk from.
     *
     * @returns True if the chain leads to the main frame's document ID.
     */
    static isDescendantOfMainFrame(tabContext, startDocumentId) {
        const mainFrame = tabContext.frames.get(MAIN_FRAME_ID);
        const mainDocumentId = mainFrame?.documentId;
        if (!mainDocumentId) {
            return false;
        }
        let currentDocId = startDocumentId;
        const visited = new Set();
        while (currentDocId) {
            if (currentDocId === mainDocumentId) {
                return true;
            }
            if (visited.has(currentDocId)) {
                break;
            }
            visited.add(currentDocId);
            const frame = tabContext.getFrameContextByDocumentId(currentDocId);
            currentDocId = frame?.parentDocumentId;
        }
        return false;
    }
    /**
     * Increments the blocked request count for a tab if the request belongs
     * to the current page. A request is considered part of the current page if:
     * - its referrer URL has the same domain as the tab URL (same-domain check);
     * - its parentDocumentId chain leads to the main frame (Chromium 106+);
     * - the top-level frame ancestor URL matches the tab URL (Firefox fallback).
     *
     * @param params Blocked request parameters.
     * @param params.tabId Tab ID.
     * @param params.referrerUrl Request initiator URL.
     * @param params.parentDocumentId Parent document ID of the request (Chromium 106+).
     * @param params.frameAncestors Frame ancestors of the request (Firefox).
     */
    incrementTabBlockedRequestCount({ tabId, referrerUrl, parentDocumentId, frameAncestors, }) {
        const tabContext = this.context.get(tabId);
        if (!tabContext) {
            return;
        }
        // Use mainFrame.url because the counter is reset in onBeforeRequest
        // (where mainFrame.url is already updated), but tabContext.info.url
        // only updates later via tabs.onUpdated — stale requests from the
        // previous page can slip in between these two events.
        const mainFrame = tabContext.frames.get(MAIN_FRAME_ID);
        if (!mainFrame) {
            return;
        }
        const mainFrameUrl = mainFrame.url;
        if (TabsApiCommon.isSameDomain(mainFrameUrl, referrerUrl)) {
            tabContext.incrementBlockedRequestCount();
            return;
        }
        if (parentDocumentId) {
            // Chromium-based browsers: parentDocumentId is available.
            if (TabsApiCommon.isDescendantOfMainFrame(tabContext, parentDocumentId)) {
                tabContext.incrementBlockedRequestCount();
            }
        }
        else if (TabsApiCommon.isSameDomainByAncestors(mainFrameUrl, frameAncestors)) {
            // Firefox: no parentDocumentId.
            tabContext.incrementBlockedRequestCount();
        }
    }
    /**
     * Resets blocked requests count for the tab.
     *
     * @param tabId Tab ID.
     */
    resetBlockedRequestsCount(tabId) {
        const tabContext = this.getTabContext(tabId);
        if (!tabContext) {
            return;
        }
        tabContext.resetBlockedRequestsCount();
    }
    /**
     * Sets a current timestamp as `assistantInitTimestamp` of the tab context.
     *
     * Needed to determine later if a newly created frame is an assistant frame.
     *
     * @param tabId Tab id.
     */
    setAssistantInitTimestamp(tabId) {
        const tabContext = this.context.get(tabId);
        if (!tabContext) {
            return;
        }
        tabContext.assistantInitTimestamp = Date.now();
    }
    /**
     * Resets tab context's `assistantInitTimestamp` to null.
     *
     * @param tabId Tab id.
     */
    resetAssistantInitTimestamp(tabId) {
        const tabContext = this.context.get(tabId);
        if (!tabContext) {
            return;
        }
        tabContext.assistantInitTimestamp = null;
    }
    /**
     * Checks if the tab context is expected to exist.
     *
     * This method is needed to identify cases when tab context does not exist
     * when it should exist, for example when tab context is not created or created too late.
     *
     * @param tabId Tab ID to check.
     * @param url Tab URL to check.
     *
     * @returns True if tab context is expected to exist, false otherwise.
     *
     * @todo Remove this method when issue above will be fixed.
     */
    static checkIfTabContextExpectedToExist(tabId, url) {
        // Early exit - if tab already does not hosts content,
        // we don't need to perform any additional checks.
        if (!TabContextCommon.isTabHostingContent(tabId)) {
            return false;
        }
        // List of URLs we shouldn't log for about expected tab context.
        const doNotLogForUrls = [
            'devtools://', // Chrome DevTools
            'chrome-extension://', // Chrome extension
            'https://devtools.azureedge.net', // Edge DevTools
        ];
        // We skip only if we are sure that URL is not empty and starts with one of the forbidden URLs.
        if (url && doNotLogForUrls.some((forbiddenUrl) => url.startsWith(forbiddenUrl))) {
            return false;
        }
        return true;
    }
    /**
     * Sets frame context.
     *
     * @param tabId Tab ID.
     * @param frameId Frame ID.
     * @param frameContext Frame context.
     *
     * @throws Error if the tab context is not found, as this should not occur at this point.
     */
    setFrameContext(tabId, frameId, frameContext) {
        const tabContext = this.getTabContext(tabId);
        if (!tabContext) {
            if (TabsApiCommon.checkIfTabContextExpectedToExist(tabId, frameContext.url)) {
                logger.debug(`[tsweb.TabsApiCommon.setFrameContext]: at this point tab#${tabId} context should already exist`);
            }
            return;
        }
        tabContext.setFrameContext(frameId, frameContext);
    }
    /**
     * Returns frame context by tabId and frameId.
     *
     * @param tabId Tab ID.
     * @param frameId Frame ID.
     *
     * @returns Frame context.
     */
    getFrameContext(tabId, frameId) {
        const tabContext = this.getTabContext(tabId);
        const frameContext = tabContext?.getFrameContext(frameId);
        return frameContext;
    }
    /**
     * Updates the frame context with additional data.
     *
     * @param tabId The ID of the tab.
     * @param frameId The ID of the frame.
     * @param partialFrameContext The details to be added to the frame context.
     *
     * @throws Error if the tab context or frame context is not found, as this should not occur at this point.
     */
    updateFrameContext(tabId, frameId, partialFrameContext) {
        const tabContext = this.getTabContext(tabId);
        if (!tabContext) {
            if (TabsApiCommon.checkIfTabContextExpectedToExist(tabId, partialFrameContext.url)) {
                logger.debug(`[tsweb.TabsApiCommon.updateFrameContext]: at this point tab#${tabId} context should already exist`);
            }
            return;
        }
        const frameContext = tabContext?.getFrameContext(frameId);
        if (!frameContext) {
            logger.debug(`[tsweb.TabsApiCommon.updateFrameContext]: at this point frame#${frameId} context should already exist`);
            return;
        }
        Object.assign(frameContext, partialFrameContext);
        if (frameContext.documentId) {
            tabContext.setDocumentId(frameContext.documentId, frameId);
        }
    }
    /**
     * Deletes the frame context.
     * Also clears frames older than the specified maxFrameAgeMs.
     *
     * @param tabId The ID of the tab.
     * @param frameId The ID of the frame.
     * @param maxFrameAgeMs The maximum allowed age for frames, in milliseconds.
     */
    deleteFrameContext(tabId, frameId, maxFrameAgeMs) {
        const tabContext = this.getTabContext(tabId);
        if (!tabContext) {
            return;
        }
        tabContext.deleteFrameContext(frameId, maxFrameAgeMs);
        tabContext.clearStaleFrames(maxFrameAgeMs);
    }
    /**
     * Returns frame context by documentId.
     *
     * @param tabId Tab ID.
     * @param documentId Unique identifier assigned to the frame on onCommitted event.
     *
     * @returns Frame context.
     */
    getByDocumentId(tabId, documentId) {
        const tabContext = this.getTabContext(tabId);
        return tabContext?.getFrameContextByDocumentId(documentId);
    }
    /**
     * Sets main frame rule for the tab context and for the frame context.
     *
     * @param tabId Tab ID.
     * @param frameId Frame ID.
     * @param frameRule Frame rule.
     */
    setMainFrameRule(tabId, frameId, frameRule) {
        const tabContext = this.getTabContext(tabId);
        if (tabContext && frameId === MAIN_FRAME_ID) {
            tabContext.mainFrameRule = frameRule;
        }
        if (frameRule) {
            this.updateFrameContext(tabId, frameId, { frameRule });
        }
        else {
            this.updateFrameContext(tabId, frameId, { frameRule: undefined });
        }
    }
}

/**
 * Frame context data.
 *
 * We store {@link MatchingResult} and {@link CosmeticResult} in the frame context
 * to apply rules that cannot be handled during request processing.
 * The frame data is deleted after the {@link browser.webNavigation.onCompleted} event.
 *
 * @see {@link WebRequestApi.deleteFrameContext}
 *
 * The class is abstract because FrameMV2 and FrameMV3 extend it.
 */
class FrameCommon {
    /**
     * Frame url.
     */
    url;
    /**
     * Main frame url.
     */
    mainFrameUrl;
    /**
     * Tab id.
     */
    tabId;
    /**
     * Frame id.
     */
    frameId;
    /**
     * Parent frame id.
     */
    parentFrameId;
    /**
     * Frame creation time.
     */
    timeStamp;
    /**
     * Frame rule. Needed in the case of allowlist rules for the tab.
     */
    frameRule;
    /**
     * Parent document id.
     */
    parentDocumentId;
    /**
     * The cosmetic result for the frame.
     *
     * This data is stored in the frame because it is required for logging script and scriptlet rules.
     */
    cosmeticResult;
    /**
     * Matching result for the frame.
     *
     * This data is saved in frame, because we need for access it for script rules injection
     * after deleting request context data.
     */
    matchingResult;
    /**
     * Unique identifier for the frame.
     */
    documentId;
    /**
     * Creates frame instance.
     *
     * @param props Frame constructor properties.
     */
    constructor(props) {
        const { url, tabId, parentFrameId, frameId, timeStamp, parentDocumentId, documentId, } = props;
        this.url = url;
        this.tabId = tabId;
        this.frameId = frameId;
        this.parentFrameId = parentFrameId;
        this.timeStamp = timeStamp;
        this.parentDocumentId = parentDocumentId;
        this.documentId = documentId;
    }
}

/**
 * Service for working with companies database.
 */
class CompaniesDbService {
    /**
     * Category name for unknown domains.
     *
     * @see {@link https://github.com/AdguardTeam/companiesdb/blob/6a8fbfc3bff4fdffc4c8bae30756530afc2635bd/dist/trackers.json#L15}
     */
    static UNKNOWN_CATEGORY_NAME = 'unknown';
    /**
     * Dot symbol.
     */
    static DOT = '.';
    /**
     * Companies database.
     */
    companiesDb = rawCompaniesDb;
    /**
     * Returns categories from the companiesdb data where
     * - key — numeric category id
     * - value — category name.
     *
     * @returns Categories from the companiesdb data.
     *
     * @throws Error if companies database is not loaded.
     */
    getCompaniesDbCategories() {
        if (!this.companiesDb) {
            throw new Error('[CompaniesDbService] Companies database is not loaded');
        }
        return this.companiesDb.categories;
    }
    /**
     * Recursively tries to match a company category id for a `domainToCheck`.
     *
     * If the category is not found for an input `domainToCheck`,
     * slices the first subdomain and tries to check a category for a new domain,
     * e.g. `test1.sub.example.com` -> `sub.example.com` -> `example.com`,
     * and returns the category if found.
     *
     * @param domainToCheck Domain to check.
     * @param rootDomain Root domain.
     *
     * @returns Matched company category id or `null` if not found.
     */
    matchCompanyCategoryId(domainToCheck, rootDomain) {
        if (!domainToCheck || !rootDomain) {
            return null;
        }
        if (domainToCheck === rootDomain) {
            return this.companiesDb.trackerDomains[rootDomain] || null;
        }
        const categoryId = this.companiesDb.trackerDomains[domainToCheck];
        if (!categoryId) {
            const firstDotIndex = domainToCheck.indexOf(CompaniesDbService.DOT);
            const nextDomainToCheck = domainToCheck.slice(firstDotIndex + 1);
            return this.matchCompanyCategoryId(nextDomainToCheck, rootDomain);
        }
        return categoryId;
    }
    /**
     * Matches a URL to a tracker category id.
     *
     * List of categories ids can be found in {@link companiesDb.categories}.
     *
     * @param url Request URL to match.
     *
     * @returns Matched company category name,
     * or {@link CompaniesDbService.UNKNOWN_CATEGORY_NAME} if the category is unknown.
     */
    match(url) {
        if (!this.companiesDb || !this.companiesDb.trackerDomains) {
            return CompaniesDbService.UNKNOWN_CATEGORY_NAME;
        }
        const companyCategoryId = this.matchCompanyCategoryId(getHostname(url), 
        // getDomain with no allowPrivateDomains flag set returns root domain,
        // e.g. 'test-public.s3.amazonaws.com' -> 'amazonaws.com'
        getDomain$1(url));
        if (!companyCategoryId) {
            return CompaniesDbService.UNKNOWN_CATEGORY_NAME;
        }
        const companyCategoryName = this.companiesDb.categories[companyCategoryId];
        if (!companyCategoryName) {
            return CompaniesDbService.UNKNOWN_CATEGORY_NAME;
        }
        return companyCategoryName;
    }
}
const companiesDbService = new CompaniesDbService();

/**
 * Synthetic Cookie-like object parsed from headers.
 */
class ParsedCookie {
    /**
     * The request-URI to associate with the setting of the cookie.
     */
    url;
    /**
     * Defines the host to which the cookie will be sent.
     * Only the current domain can be set as the value, or a domain of a higher
     * order, unless it is a public suffix. Setting the domain will make
     * the cookie available to it, as well as to all its subdomains.
     *
     * Can be empty. And actually should be empty for `__Host-` cookies.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#attributes}
     */
    domain;
    /**
     * The name of the cookie.
     */
    name;
    /**
     * The value of the cookie.
     */
    value;
    /**
     * The expiration date of the cookie.
     */
    expires;
    /**
     * The parsed max-age value in seconds.
     */
    maxAge;
    /**
     * True if the cookie is marked as Secure.
     */
    secure;
    /**
     * Whether the cookie should be marked as HttpOnly.
     */
    httpOnly;
    /**
     * Cookie's same-site status.
     */
    sameSite;
    /**
     * Cookies path. Defaults to the path portion of the url parameter.
     */
    path;
    /**
     * Priority chrome only specs.
     * Isn't affected. Let it be here just in case.
     *
     * @see {@link https://bugs.chromium.org/p/chromium/issues/detail?id=232693}
     */
    priority;
    /**
     * Cookie's third-party status.
     */
    thirdParty = false;
    /**
     * Constructor.
     *
     * @param name Cookie name.
     * @param value Cookie value.
     * @param url Url.
     */
    constructor(name, value, url) {
        this.name = name;
        this.value = value;
        this.url = url;
        this.path = new URL(url).pathname;
    }
    /**
     * Creates new {@link ParsedCookie} from provided {@link Cookies.Cookie}.
     *
     * @param cookie Item of {@link Cookies.Cookie}.
     * @param url String URL relative to this cookie.
     *
     * @returns New {@link ParsedCookie}.
     */
    static fromBrowserCookie(cookie, url) {
        const parsedCookie = new ParsedCookie(cookie.name, cookie.value, url);
        parsedCookie.thirdParty = !cookie.firstPartyDomain;
        parsedCookie.httpOnly = cookie.httpOnly;
        parsedCookie.secure = cookie.secure;
        parsedCookie.sameSite = cookie.sameSite;
        // For hostOnly cookie domain should be empty and path should be '/'.
        if (cookie.hostOnly) {
            parsedCookie.path = '/';
        }
        else {
            parsedCookie.domain = cookie.domain;
            parsedCookie.path = cookie.path;
        }
        if (cookie.expirationDate) {
            // cookie.expirationDate is a number of seconds that's why it should be multiplied
            parsedCookie.expires = new Date(cookie.expirationDate * 1000);
        }
        return parsedCookie;
    }
}

/**
 * Splits multiline set-cookie headers into separate headers.
 *
 * @param responseHeaders HTTP response headers.
 */
function splitMultilineCookies(responseHeaders) {
    const SET_COOKIE_HEADER_NAME = 'set-cookie';
    const LINE_FEED = '\n';
    for (let i = responseHeaders.length - 1; i >= 0; i -= 1) {
        const { name, value } = responseHeaders[i];
        if (name.toLowerCase() !== SET_COOKIE_HEADER_NAME || !value || !value.includes(LINE_FEED)) {
            continue;
        }
        const values = value.split(LINE_FEED);
        responseHeaders.splice(i, 1);
        values.forEach((val) => {
            responseHeaders.push({ name: SET_COOKIE_HEADER_NAME, value: val });
        });
    }
}
/**
 * Cookie Utils.
 */
let CookieUtils$1 = class CookieUtils {
    /**
     * RegExp to match field-content in RFC 7230 sec 3.2.
     *
     * Example:
     * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
     * field-vchar   = VCHAR / obs-text
     * obs-text      = %x80-FF.
     */
    // eslint-disable-next-line no-control-regex
    static FIELD_CONTENT_REGEX = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    /**
     * Parses set-cookie header from http response header.
     *
     * @param header HTTP response header.
     * @param url Request URL.
     *
     * @returns Parsed cookie or null if it failed to parse the header.
     */
    static parseSetCookieHeader(header, url) {
        if (!header.name || header.name.toLowerCase() !== 'set-cookie') {
            return null;
        }
        if (!header.value) {
            return null;
        }
        return CookieUtils.parseSetCookie(header.value, url);
    }
    /**
     * Parses set-cookie headers for cookie objects.
     *
     * @param responseHeaders HTTP response headers.
     * @param url Request URL.
     *
     * @returns Array of parsed cookies.
     */
    static parseSetCookieHeaders(responseHeaders, url) {
        const result = [];
        let iResponseHeaders = responseHeaders.length;
        while (iResponseHeaders > 0) {
            iResponseHeaders -= 1;
            const header = responseHeaders[iResponseHeaders];
            const setCookie = CookieUtils.parseSetCookieHeader(header, url);
            if (setCookie) {
                result.push(setCookie);
            }
        }
        return result;
    }
    /**
     * Parse an HTTP Cookie header string and return an object with all cookie name-value pairs.
     *
     * @param cookieValue HTTP Cookie value.
     * @param url Request URL.
     *
     * @returns Array of cookie name-value pairs.
     */
    static parseCookies(cookieValue, url) {
        const cookies = [];
        // Split Cookie values
        const pairs = cookieValue.split(/; */);
        for (let i = 0; i < pairs.length; i += 1) {
            const pair = pairs[i];
            const eqIdx = pair.indexOf('=');
            // skip things that don't look like key=value
            if (eqIdx < 0) {
                continue;
            }
            const key = pair.substring(0, eqIdx).trim();
            const value = pair.substring(eqIdx + 1, pair.length).trim();
            const parsedCookie = new ParsedCookie(key, value, url);
            /**
             * Not obviously there are few special name prefixes.
             *
             * @see {@link https://developer.cdn.mozilla.net/pt-BR/docs/Web/HTTP/Headers/Set-Cookie}
             */
            if (key.startsWith('__Secure-') || key.startsWith('__Host-')) {
                parsedCookie.secure = true;
            }
            cookies.push(parsedCookie);
        }
        return cookies;
    }
    /**
     * Parses "Set-Cookie" header value and returns a cookie object with its properties.
     *
     * @param setCookieValue "Set-Cookie" header value to parse.
     * @param url Request URL.
     *
     * @returns Parsed cookie or null if it failed to parse the value.
     */
    static parseSetCookie(setCookieValue, url) {
        const parts = setCookieValue.split(';').filter((s) => !!s);
        const nameValuePart = parts.shift();
        if (!nameValuePart) {
            logger.debug(`[tsweb.CookieUtils.parseSetCookie]: cannot shift first name-value pair from Set-Cookie header '${setCookieValue}'.`);
            return null;
        }
        const nameValue = nameValuePart.split('=');
        const name = nameValue.shift();
        if (!name) {
            logger.debug(`[tsweb.CookieUtils.parseSetCookie]: cannot extract name from first name-value pair from Set-Cookie header '${setCookieValue}'.`);
            return null;
        }
        // Everything after the first =, joined by a "=" if there was more
        // than one part.
        const value = nameValue.join('=');
        const cookie = new ParsedCookie(name, value, url);
        parts.forEach((part) => {
            const sides = part.split('=');
            const key = sides
                .shift()
                .trimStart()
                .toLowerCase();
            const optionValue = sides.join('=');
            if (key === 'expires') {
                cookie.expires = new Date(optionValue);
            }
            else if (key === 'max-age') {
                cookie.maxAge = parseInt(optionValue, 10);
            }
            else if (key === 'secure') {
                cookie.secure = true;
            }
            else if (key === 'httponly') {
                cookie.httpOnly = true;
            }
            else if (key === 'samesite') {
                cookie.sameSite = optionValue;
            }
            else if (key === 'path') {
                cookie.path = optionValue;
            }
            else if (key === 'domain') {
                cookie.domain = optionValue;
            }
        });
        return cookie;
    }
    /**
     * Updates cookie maxAge value.
     *
     * @param cookie Cookie to modify.
     * @param maxAge New maxAge value.
     *
     * @returns True if cookie was modified.
     */
    static updateCookieMaxAge(cookie, maxAge) {
        const currentTimeSec = Date.now() / 1000;
        let cookieExpiresTimeSec = null;
        if (cookie.maxAge) {
            cookieExpiresTimeSec = currentTimeSec + cookie.maxAge;
        }
        else if (cookie.expires) {
            cookieExpiresTimeSec = cookie.expires.getTime() / 1000;
        }
        const newCookieExpiresTimeSec = currentTimeSec + maxAge;
        if (cookieExpiresTimeSec === null || cookieExpiresTimeSec > newCookieExpiresTimeSec) {
            // eslint-disable-next-line no-param-reassign
            cookie.expires = new Date(newCookieExpiresTimeSec * 1000);
            // eslint-disable-next-line no-param-reassign
            cookie.maxAge = maxAge;
            return true;
        }
        return false;
    }
    /**
     * Serializes cookie data into a string suitable for Set-Cookie header.
     *
     * @param cookie A cookie object.
     *
     * @returns Set-Cookie string or null if it failed to serialize object.
     *
     * @throws `TypeError` if input data is invalid.
     */
    static serializeCookieToResponseHeader(cookie) {
        if (!cookie) {
            throw new TypeError('empty cookie data');
        }
        // 1. Validate fields
        if (!CookieUtils.FIELD_CONTENT_REGEX.test(cookie.name)) {
            throw new TypeError(`Cookie name is invalid: ${cookie.name}`);
        }
        if (cookie.value && !CookieUtils.FIELD_CONTENT_REGEX.test(cookie.value)) {
            throw new TypeError(`Cookie value is invalid: ${cookie.value}`);
        }
        if (cookie.domain && !CookieUtils.FIELD_CONTENT_REGEX.test(cookie.domain)) {
            throw new TypeError(`Cookie domain is invalid: ${cookie.domain}`);
        }
        if (cookie.path && !CookieUtils.FIELD_CONTENT_REGEX.test(cookie.path)) {
            throw new TypeError(`Cookie path is invalid: ${cookie.path}`);
        }
        if (cookie.expires && typeof cookie.expires.toUTCString !== 'function') {
            throw new TypeError(`Cookie expires is invalid: ${cookie.expires}`);
        }
        // 2. Build Set-Cookie header value
        let setCookieValue = `${cookie.name}=${cookie.value}`;
        if (typeof cookie.maxAge === 'number' && !Number.isNaN(cookie.maxAge)) {
            setCookieValue += `; Max-Age=${Math.floor(cookie.maxAge)}`;
        }
        if (cookie.domain) {
            setCookieValue += `; Domain=${cookie.domain}`;
        }
        if (cookie.path) {
            setCookieValue += `; Path=${cookie.path}`;
        }
        if (cookie.expires) {
            setCookieValue += `; Expires=${cookie.expires.toUTCString()}`;
        }
        if (cookie.httpOnly) {
            setCookieValue += '; HttpOnly';
        }
        if (cookie.secure) {
            setCookieValue += '; Secure';
        }
        if (cookie.sameSite) {
            const sameSite = cookie.sameSite.toLowerCase();
            switch (sameSite) {
                case 'lax':
                    setCookieValue += '; SameSite=Lax';
                    break;
                case 'strict':
                    setCookieValue += '; SameSite=Strict';
                    break;
                case 'none':
                    setCookieValue += '; SameSite=None';
                    break;
                default:
                    throw new TypeError(`Cookie sameSite is invalid: ${cookie.sameSite}`);
            }
        }
        // Not affected. Let it be here just in case
        // https://bugs.chromium.org/p/chromium/issues/detail?id=232693
        if (cookie.priority) {
            setCookieValue += `; Priority=${cookie.priority}`;
        }
        return setCookieValue;
    }
    /**
     * Serializes cookie data into a string suitable for Cookie header.
     *
     * @param cookies Array with {@link ParsedCookie}.
     *
     * @returns Cookie string or null if it failed to serialize object.
     */
    static serializeCookieToRequestHeader(cookies) {
        return cookies
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join('; ');
    }
};

/**
 * See {@link https://developer.chrome.com/docs/web-platform/prerender-pages#how_is_a_page_prerendered}.
 */
var DocumentLifecycle;
(function (DocumentLifecycle) {
    DocumentLifecycle["Prerender"] = "prerender";
    DocumentLifecycle["Active"] = "active";
    DocumentLifecycle["Cached"] = "cached";
    DocumentLifecycle["PendingDeletion"] = "pending_deletion";
})(DocumentLifecycle || (DocumentLifecycle = {}));

/**
 * Request content type.
 *
 * NOTE: Do not use `const enum`,
 * because this enum is imported in extension frontend writing in js.
 */
var ContentType;
(function (ContentType) {
    ContentType["Document"] = "document";
    ContentType["Subdocument"] = "subdocument";
    ContentType["Script"] = "script";
    ContentType["Stylesheet"] = "stylesheet";
    ContentType["Object"] = "object";
    ContentType["Image"] = "image";
    ContentType["XmlHttpRequest"] = "xmlHttpRequest";
    ContentType["Media"] = "media";
    ContentType["Font"] = "font";
    ContentType["Websocket"] = "websocket";
    ContentType["WebRtc"] = "webRtc";
    ContentType["Other"] = "other";
    ContentType["Csp"] = "csp";
    ContentType["PermissionsPolicy"] = "permissionsPolicy";
    ContentType["Cookie"] = "cookie";
    ContentType["Ping"] = "ping";
    ContentType["CspReport"] = "cspReport";
})(ContentType || (ContentType = {}));
/**
 * Returns request type and content type by resource type.
 *
 * @param resourceType Resource type.
 *
 * @returns Request type and content type.
 */
function getRequestType(resourceType) {
    switch (resourceType) {
        case 'main_frame':
            return {
                contentType: ContentType.Document,
                requestType: RequestType.Document,
            };
        case 'sub_frame':
            return {
                contentType: ContentType.Subdocument,
                requestType: RequestType.SubDocument,
            };
        case 'stylesheet':
            return {
                contentType: ContentType.Stylesheet,
                requestType: RequestType.Stylesheet,
            };
        case 'script':
            return {
                contentType: ContentType.Script,
                requestType: RequestType.Script,
            };
        case 'image':
        case 'imageset':
            return {
                contentType: ContentType.Image,
                requestType: RequestType.Image,
            };
        case 'object':
            return {
                contentType: ContentType.Object,
                requestType: RequestType.Object,
            };
        case 'xmlhttprequest':
            return {
                contentType: ContentType.XmlHttpRequest,
                requestType: RequestType.XmlHttpRequest,
            };
        case 'ping':
        case 'beacon':
            return {
                contentType: ContentType.Ping,
                requestType: RequestType.Ping,
            };
        case 'font':
            return {
                contentType: ContentType.Font,
                requestType: RequestType.Font,
            };
        case 'media':
            return {
                contentType: ContentType.Media,
                requestType: RequestType.Media,
            };
        case 'websocket':
            return {
                contentType: ContentType.Websocket,
                requestType: RequestType.WebSocket,
            };
        case 'csp_report':
            return {
                contentType: ContentType.CspReport,
                requestType: RequestType.CspReport,
            };
        default:
            return {
                contentType: ContentType.Other,
                requestType: RequestType.Other,
            };
    }
}

/**
 * Finds a header object by its name (case-insensitive).
 *
 * @param headers Headers collection.
 * @param headerName Name of the header.
 *
 * @returns The header object if found, or null otherwise.
 */
function findHeaderByName(headers, headerName) {
    const targetName = headerName.toLowerCase();
    return headers.find((header) => header.name.toLowerCase() === targetName) || null;
}
/**
 * Checks if a header with the given name exists in the headers collection (case-insensitive).
 *
 * @param headers Headers collection.
 * @param headerName Name of the header to search.
 *
 * @returns True if the header exists, false otherwise.
 */
function hasHeaderByName(headers, headerName) {
    return findHeaderByName(headers, headerName) !== null;
}
/**
 * Checks if a specific header (name and value) exists in the headers collection.
 *
 * @param headers Headers collection.
 * @param header The header object to match.
 *
 * @returns True if an exact match for the header exists, false otherwise.
 */
function hasHeader(headers, header) {
    const foundHeader = findHeaderByName(headers, header.name);
    return !!foundHeader && foundHeader.value === header.value;
}
/**
 * Removes a header by name from the headers collection (case-insensitive).
 *
 * @param headers Headers collection.
 * @param headerName Name of the header to remove.
 *
 * @returns True if any headers were removed, false otherwise.
 */
function removeHeader(headers, headerName) {
    const targetName = headerName.toLowerCase();
    return remove(headers, (header) => header.name.toLowerCase() === targetName).length > 0;
}

/**
 * @file
 * This file contains validation schemas and inferred types for message data.
 */
/**
 * Message DTO validation schema.
 */
const messageValidator = z.object({
    handlerName: z.literal(MESSAGE_HANDLER_NAME),
    type: z.nativeEnum(MessageType),
    payload: z.unknown(),
}).strict();
/**
 * {@link MessageType.ProcessShouldCollapse} Message payload validation schema.
 */
const processShouldCollapsePayloadValidator = z.object({
    elementUrl: z.string(),
    documentUrl: z.string(),
    requestType: z.nativeEnum(RequestType),
}).strict();
/**
 * {@link MessageType.GetCosmeticData} Message payload validation schema.
 */
const getExtendedCssPayloadValidator = z.object({
    documentUrl: z.string(),
}).strict();
/**
 * {@link MessageType.GetCosmeticData} Message payload validation schema.
 */
const getCosmeticDataPayloadValidator = z.object({
    documentUrl: z.string(),
}).strict();
/**
 * {@link MessageType.GetCookieRules} Message payload validation schema.
 */
const getCookieRulesPayloadValidator = z.object({
    documentUrl: z.string(),
}).strict();
/**
 * {@link MessageType.SaveCookieLogEvent} Message payload validation schema.
 */
const getSaveCookieLogEventPayloadValidator = z.object({
    cookieName: z.string(),
    cookieDomain: z.string(),
    cookieValue: z.string(),
    filterId: z.number(),
    ruleIndex: z.number(),
    thirdParty: z.boolean(),
    isAllowlist: z.boolean(),
    isImportant: z.boolean(),
    isDocumentLevel: z.boolean(),
    isCsp: z.boolean(),
    isCookie: z.boolean(),
    advancedModifier: z.string().nullable(),
}).strict();
/**
 * {@link MessageType.InitAssistant} Message payload validation schema.
 */
const getAssistantCreateRulePayloadValidator = z.object({
    ruleText: z.string(),
}).strict();

/* eslint-disable class-methods-use-this */
/**
 * Cookie api implementation.
 */
class BrowserCookieApi {
    /**
     * Removes cookie.
     *
     * @param name Cookie name.
     * @param url Request url.
     *
     * @returns True if cookie was removed.
     */
    async removeCookie(name, url) {
        try {
            await browser.cookies.remove({ name, url });
            return true;
        }
        catch (e) {
            logger.error('[tsweb.BrowserCookieApi.removeCookie]: error on removing cookie via browser.cookies.remove: ', e);
        }
        return false;
    }
    /**
     * Updates cookie.
     *
     * @param cookie Cookie for update.
     *
     * @returns Promise resolved with true if cookie was updated, false otherwise.
     */
    async modifyCookie(cookie) {
        try {
            const update = BrowserCookieApi.convertToSetDetailsType(cookie);
            await browser.cookies.set(update);
            return true;
        }
        catch (e) {
            // If `domain` contains the `path` part, the cookie cannot be saved,
            // since `domain` can only contain hostname.
            if (cookie.domain?.includes('/')
                // if url is not matched with domain, cookie cannot be set
                // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/2683
                || (cookie.domain && !BrowserCookieApi.doesDomainMatchUrl(cookie.domain, cookie.url))) {
                logger.info('[tsweb.BrowserCookieApi.modifyCookie]: error on modifying cookie via browser.cookies.set: ', e);
            }
            else {
                logger.error('[tsweb.BrowserCookieApi.modifyCookie]: error on modifying cookie via browser.cookies.set: ', e);
            }
        }
        return false;
    }
    /**
     * Search for cookies that match a given pattern.
     *
     * @param pattern Pattern of cookies to find.
     *
     * @returns List of found cookies.
     */
    async findCookies(pattern) {
        try {
            const found = await browser.cookies.getAll(pattern);
            return found;
        }
        catch (e) {
            logger.error('[tsweb.BrowserCookieApi.findCookies]: error on finding cookies via browser.cookies.getAll: ', e);
        }
        return [];
    }
    /**
     * Checks whether the cookie domain matches the url.
     *
     * @param rawCookieDomain Cookie domain.
     * @param url Request url.
     *
     * @returns True if domain matches the url, false otherwise.
     */
    static doesDomainMatchUrl(rawCookieDomain, url) {
        let cookieDomain = rawCookieDomain;
        // cookie domain can be '.example.com'
        if (cookieDomain.startsWith('.')) {
            cookieDomain = cookieDomain.slice(1);
        }
        const urlDomain = getDomain$1(url);
        return !!urlDomain && cookieDomain.includes(urlDomain);
    }
    /**
     * Converts cookie to SetDetailsType.
     *
     * @param cookie Cookie for convert.
     *
     * @returns SetDetailsType.
     */
    static convertToSetDetailsType(cookie) {
        return {
            /**
             * The request-URI to associate with the setting of the cookie.
             * This value can affect the default domain and path values of the created cookie.
             * If host permissions for this URL are not specified in the manifest file, the API call will fail.
             */
            url: cookie.url,
            /**
             * The name of the cookie. Empty by default if omitted.
             */
            name: cookie.name,
            /**
             * The value of the cookie. Empty by default if omitted.
             */
            value: cookie.value,
            /**
             * The domain of the cookie. If omitted, the cookie becomes a host-only cookie.
             */
            domain: cookie.domain,
            /**
             * Whether the cookie should be marked as Secure. Defaults to false.
             */
            secure: cookie.secure,
            /**
             * Whether the cookie should be marked as HttpOnly. Defaults to false.
             */
            httpOnly: cookie.httpOnly,
            /**
             * The cookie's same-site status.
             */
            sameSite: BrowserCookieApi.getSameSiteStatus(cookie.sameSite),
            /**
             * The expiration date of the cookie as the number of seconds since the UNIX epoch.
             * If omitted, the cookie becomes a session cookie.
             */
            expirationDate: cookie.expires
                ? Math.floor(cookie.expires.getTime() / 1000)
                : undefined,
            /**
             * The path of the cookie. Defaults to the path portion of the url parameter.
             */
            path: cookie.path,
        };
    }
    /**
     * Returns same-site type.
     *
     * @param sameSite Same-site string.
     *
     * @returns Same-site status or undefined if same-site is not specified.
     */
    static getSameSiteStatus(sameSite) {
        if (sameSite) {
            if (sameSite.toLowerCase() === 'lax') {
                return 'lax';
            }
            if (sameSite.toLowerCase() === 'strict') {
                return 'strict';
            }
        }
        return undefined;
    }
}

/**
 * Cookie rules manager class.
 */
class CookieRulesFinder {
    /**
     * Filters blocking rules.
     * Used in content scripts.
     *
     * @param url Request url.
     * @param rules List of rules.
     *
     * @returns Blocking rules.
     */
    static getBlockingRules(url, rules) {
        return rules.filter((rule) => !CookieRulesFinder.isModifyingRule(rule));
    }
    /**
     * Finds a rule that doesn't modify cookie:
     *  i.e.: this rule cancels cookie or if it's an allowlist rule.
     *
     * @param cookieName Cookie name.
     * @param rules List of network rules.
     * @param isThirdPartyCookie Flag that indicates if cookie is third-party.
     *
     * @returns Found rule or null.
     */
    static lookupNotModifyingRule(cookieName, rules, isThirdPartyCookie) {
        const blockingRules = [];
        const allowlistRules = [];
        for (let i = 0; i < rules.length; i += 1) {
            const rule = rules[i];
            if (!CookieRulesFinder.matchThirdParty(rule, isThirdPartyCookie)) {
                continue;
            }
            const cookieModifier = rule.getAdvancedModifier();
            if (cookieModifier.matches(cookieName) && !CookieRulesFinder.isModifyingRule(rule)) {
                if (rule.isAllowlist()) {
                    allowlistRules.push(rule);
                }
                else {
                    blockingRules.push(rule);
                }
            }
        }
        if (allowlistRules.length > 0) {
            return allowlistRules[0];
        }
        if (blockingRules.length > 0) {
            return blockingRules[0];
        }
        return null;
    }
    /**
     * Finds rules that modify cookie.
     *
     * @param cookieName Cookie name.
     * @param rules Matching rules.
     * @param isThirdPartyCookie Flag that indicates if cookie is third-party.
     *
     * @returns Modifying rules.
     */
    static lookupModifyingRules(cookieName, rules, isThirdPartyCookie) {
        const result = [];
        const allowlistRules = [];
        if (rules && rules.length > 0) {
            for (let i = 0; i < rules.length; i += 1) {
                const rule = rules[i];
                if (!CookieRulesFinder.matchThirdParty(rule, isThirdPartyCookie)) {
                    continue;
                }
                const cookieModifier = rule.getAdvancedModifier();
                if (!cookieModifier.matches(cookieName)) {
                    continue;
                }
                if (!rule.isAllowlist() && !CookieRulesFinder.isModifyingRule(rule)) {
                    return [];
                }
                if (rule.isAllowlist()) {
                    allowlistRules.push(rule);
                }
                else {
                    result.push(rule);
                }
            }
        }
        if (allowlistRules.length > 0) {
            return allowlistRules;
        }
        return result;
    }
    /**
     * Checks if rule and third party flag matches.
     *
     * @param rule Rule.
     * @param isThirdParty Flag that indicates if cookie is third-party.
     *
     * @returns True if rule and third party flag matches.
     */
    static matchThirdParty(rule, isThirdParty) {
        if (!rule.isOptionEnabled(NetworkRuleOption.ThirdParty)) {
            return true;
        }
        return isThirdParty === rule.isOptionEnabled(NetworkRuleOption.ThirdParty);
    }
    /**
     * Checks if $cookie rule is modifying.
     *
     * @param rule $cookie rule.
     *
     * @returns True if rule is modifying.
     */
    static isModifyingRule(rule) {
        const cookieModifier = rule.getAdvancedModifier();
        return cookieModifier.getSameSite() !== null
            || (cookieModifier.getMaxAge() !== null && cookieModifier.getMaxAge() > 0);
    }
}

/**
 * Common service for document blocking.
 */
class DocumentBlockingServiceCommon {
    tabsApi;
    engineApi;
    browserDetector;
    /**
     * Text for unknown rule.
     */
    static UNKNOWN_RULE_TEXT = '<Could not retrieve rule text>';
    /**
     * Query parameter for document blocking page URL which contains a blocked request URL.
     */
    static BLOCKING_PAGE_URL_PARAM = 'url';
    /**
     * Query parameter for document blocking page URL which contains an applied rule.
     */
    static BLOCKING_PAGE_RULE_PARAM = 'rule';
    /**
     * Query parameter for document blocking page URL which contains a filter list id of the applied rule.
     */
    static BLOCKING_PAGE_FILTER_ID_PARAM = 'filterId';
    /**
     * Base url of document blocking page.
     */
    documentBlockingPageUrl;
    /**
     * Creates instance of {@link DocumentBlockingService}.
     *
     * @param tabsApi Wrapper around browser.tabs API.
     * @param engineApi Engine API.
     * @param browserDetector Browser detector.
     */
    constructor(tabsApi, engineApi, browserDetector) {
        this.tabsApi = tabsApi;
        this.engineApi = engineApi;
        this.browserDetector = browserDetector;
    }
    /**
     * Logs document blocking event.
     *
     * @param data Data for document request processing.
     */
    logEvent(data) {
        const { tabId, eventId, requestId, requestUrl, referrerUrl, rule, } = data;
        // public filtering log event
        const { appliedRuleText, originalRuleText } = getRuleTexts(rule, this.engineApi);
        defaultFilteringLog.publishEvent({
            type: FilteringEventType.ApplyBasicRule,
            data: {
                tabId,
                eventId,
                requestId,
                requestUrl,
                requestType: ContentType.Document,
                frameUrl: referrerUrl,
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
            },
        });
    }
    /**
     * Updates tab with document blocking page url.
     *
     * @param tabId Tab id.
     * @param url Blocking page url.
     */
    reloadTabWithBlockingPage(tabId, url) {
        const tabContext = this.tabsApi.getTabContext(tabId);
        if (!tabContext) {
            return;
        }
        browser.tabs.update(tabId, { url });
    }
    /**
     * Returns rule text from the engine.
     *
     * @param rule Network rule.
     *
     * @returns Rule text or "no-rule" placeholder if rule is not found.
     */
    getRuleText(rule) {
        const ruleText = this.engineApi.retrieveRuleText(rule.getFilterListId(), rule.getIndex());
        // Practically, we should always have a rule text, but just in case we have a fallback.
        return ruleText ?? DocumentBlockingServiceCommon.UNKNOWN_RULE_TEXT;
    }
    /**
     * Sets required url and rule query params to document-blocking page url.
     *
     * @param documentBlockingPageUrl Url of document-blocking page.
     * @param requestUrl Processed request url.
     * @param rule Network rule.
     * @param filterListId Filter list id.
     *
     * @returns Document blocking page url with required params.
     */
    createBlockingUrl(documentBlockingPageUrl, requestUrl, rule, filterListId) {
        const url = new URL(documentBlockingPageUrl);
        const ruleText = this.getRuleText(rule);
        url.searchParams.set(DocumentBlockingServiceCommon.BLOCKING_PAGE_URL_PARAM, requestUrl);
        url.searchParams.set(DocumentBlockingServiceCommon.BLOCKING_PAGE_RULE_PARAM, ruleText);
        url.searchParams.set(DocumentBlockingServiceCommon.BLOCKING_PAGE_FILTER_ID_PARAM, filterListId.toString());
        return url.toString();
    }
    /**
     * Redirects to document blocking page.
     *
     * @param redirectData Data for redirecting to document blocking page.
     */
    redirectToBlockingUrl(redirectData) {
        const { tabId, documentBlockingPageUrl, requestUrl, rule, } = redirectData;
        // get document blocking url with required params
        const blockingUrl = this.createBlockingUrl(documentBlockingPageUrl, requestUrl, rule, rule.getFilterListId());
        const isChrome = this.browserDetector.isChrome();
        const isChromium = this.browserDetector.isChromium();
        // Chrome does not allow to show extension pages in incognito mode
        if ((isChrome || isChromium)
            && this.tabsApi.canShowExtensionPageInTab(tabId)) {
            // Closing tab before opening a new one may lead to browser crash (Chromium)
            browser.tabs.create({ url: blockingUrl })
                .then(() => {
                browser.tabs.remove(tabId);
            })
                .catch((e) => {
                logger.warn('[tsweb.DocumentBlockingServiceCommon.redirectToBlockingUrl]: cannot open info page about blocked domain: ', e);
            });
        }
        else {
            // Browser doesn't allow redirects to extension pages which are not listed in web
            // accessible resources. We set blocking page url via browser.tabs
            // api for bypassing this limitation.
            this.reloadTabWithBlockingPage(tabId, blockingUrl);
        }
    }
}

/**
 * Computes $removeparam rule descriptors for a given document URL by querying
 * the engine API.
 *
 * @param params Parameters for descriptor computation.
 *
 * @returns Object with descriptors and rules, or null if no rules match.
 */
function getRemoveParamDescriptors(params) {
    const { requestUrl, frameUrl, frameRule, engineApi, } = params;
    const matchingResult = engineApi.matchRequest({
        requestUrl,
        frameUrl,
        requestType: RequestType$1.Document,
        frameRule,
    });
    if (!matchingResult) {
        return null;
    }
    const removeParamRules = matchingResult.getRemoveParamRules();
    if (removeParamRules.length === 0) {
        return null;
    }
    const descriptors = removeParamRules.map((rule) => {
        const { appliedRuleText } = getRuleTexts(rule, engineApi);
        const modifierValue = rule.getAdvancedModifierValue();
        return {
            value: modifierValue || '',
            isAllowlist: rule.isAllowlist(),
            isImportant: rule.isOptionEnabled(NetworkRuleOption.Important),
            filterId: rule.getFilterListId(),
            ruleIndex: rule.getIndex(),
            ruleText: appliedRuleText,
        };
    });
    return { descriptors, rules: removeParamRules };
}
/**
 * Filters $removeparam rules to only those that would actually modify the URL.
 * Excludes allowlist rules and rules whose targeted parameter is not present.
 *
 * @param url The request URL to check against.
 * @param rules Array of NetworkRule instances with $removeparam modifier.
 *
 * @returns Subset of rules that would effectively remove at least one parameter.
 */
function filterEffectiveRemoveParamRules(url, rules) {
    return rules.filter((rule) => {
        if (rule.isAllowlist()) {
            return false;
        }
        const modifier = rule.getAdvancedModifier();
        if (!modifier || !RemoveParamModifier.isRemoveParamModifier(modifier)) {
            return false;
        }
        return modifier.removeParameters(url) !== url;
    });
}

/**
 * Abstract base class for the $removeparam injection service, encapsulating
 * logic shared between the MV2 and MV3 implementations.
 *
 * Subclasses provide platform-specific script injection, event listener
 * registration, and dependency access.
 */
class AbstractRemoveParamInjectionService {
    tabsApi;
    engineApi;
    filteringLog;
    /**
     * Tracks tabs that have an active $removeparam injection, mapping
     * tabId to the nonce and secret used for that injection. Used to send
     * descriptor updates without full re-injection on SPA navigations.
     */
    removeParamInjections = new Map();
    /**
     * Constructs the abstract remove param injection service.
     *
     * @param tabsApi Tabs API for accessing tab context.
     * @param tabsApi.getTabContext Returns the tab context for a given tab ID.
     * @param engineApi Engine API for matching requests.
     * @param filteringLog Filtering log for publishing events.
     */
    constructor(tabsApi, engineApi, filteringLog) {
        this.tabsApi = tabsApi;
        this.engineApi = engineApi;
        this.filteringLog = filteringLog;
    }
    /**
     * Registers browser event listeners for $removeparam injection tracking.
     */
    start() {
        this.registerListeners();
    }
    /**
     * Removes browser event listeners and clears injection tracking state.
     */
    stop() {
        this.unregisterListeners();
        this.removeParamInjections.clear();
    }
    /**
     * Invalidates any existing $removeparam injection tracking for a given tab.
     * Called when a new navigation replaces the page context.
     *
     * @param tabId The tab ID to invalidate.
     */
    invalidateTab(tabId) {
        this.removeParamInjections.delete(tabId);
    }
    /**
     * Injects $removeparam History API patches into the main world if matching
     * rules exist for the frame's document URL.
     *
     * @param tabId Tab id.
     * @param frameId Frame id.
     * @param url Document URL of the committed frame.
     */
    injectRemoveParam(tabId, frameId, url) {
        if (frameId !== MAIN_FRAME_ID) {
            return;
        }
        const result = this.resolveDescriptors(tabId, url);
        if (result.status !== "match" /* ResolveDescriptorsStatus.Match */) {
            return;
        }
        const nonce = crypto.randomUUID();
        const secret = crypto.randomUUID();
        this.removeParamInjections.set(tabId, { nonce, secret });
        this.executeInjection(tabId, frameId, result.data.descriptors, nonce, secret);
        this.logEffectiveRules(tabId, url, result.data.rules);
    }
    /**
     * Handles SPA navigation via History API. If the tab already has an
     * active injection, sends a lightweight descriptor update; otherwise
     * performs a full injection.
     *
     * @param tabId Tab identifier.
     * @param frameId Frame identifier.
     * @param url Current URL after the navigation.
     */
    onHistoryStateUpdated(tabId, frameId, url) {
        if (frameId !== MAIN_FRAME_ID) {
            return;
        }
        const existing = this.removeParamInjections.get(tabId);
        if (existing) {
            this.sendDescriptorUpdate(tabId, frameId, url, existing);
        }
        else {
            this.injectRemoveParam(tabId, frameId, url);
        }
    }
    /**
     * Cleans up $removeparam injection tracking when a tab is closed.
     *
     * @param tabId The id of the closed tab.
     */
    onTabRemoved(tabId) {
        this.removeParamInjections.delete(tabId);
    }
    /**
     * Sends updated $removeparam descriptors to an already-injected tab,
     * avoiding full script re-injection.
     *
     * @param tabId Tab id.
     * @param frameId Frame id.
     * @param url Current URL after the History API navigation.
     * @param injection The nonce and secret of the existing injection.
     * @param injection.nonce The injection nonce.
     * @param injection.secret The secret token.
     */
    sendDescriptorUpdate(tabId, frameId, url, injection) {
        const result = this.resolveDescriptors(tabId, url);
        if (result.status === "abort" /* ResolveDescriptorsStatus.Abort */) {
            return;
        }
        const descriptors = result.status === "match" /* ResolveDescriptorsStatus.Match */ ? result.data.descriptors : [];
        this.executeUpdate(tabId, frameId, injection.secret, descriptors, injection.nonce);
        if (result.status === "match" /* ResolveDescriptorsStatus.Match */) {
            this.logEffectiveRules(tabId, url, result.data.rules);
        }
    }
    /**
     * Validates the URL, resolves tab context, and computes $removeparam
     * descriptors.
     *
     * @param tabId Tab identifier.
     * @param url URL to resolve descriptors for.
     *
     * @returns A {@link ResolveDescriptorsResult} discriminated union:
     * `abort` when the URL/tab is invalid, `clear` when no rules match,
     * or `match` with the resolved descriptors.
     */
    resolveDescriptors(tabId, url) {
        if (!url || !url.startsWith('http')) {
            return { status: "abort" /* ResolveDescriptorsStatus.Abort */ };
        }
        const tabContext = this.tabsApi.getTabContext(tabId);
        if (!tabContext || !tabContext.info.url) {
            return { status: "abort" /* ResolveDescriptorsStatus.Abort */ };
        }
        const result = getRemoveParamDescriptors({
            requestUrl: url,
            frameUrl: tabContext.info.url,
            frameRule: tabContext.mainFrameRule,
            engineApi: this.engineApi,
        });
        return result
            ? { status: "match" /* ResolveDescriptorsStatus.Match */, data: result }
            : { status: "clear" /* ResolveDescriptorsStatus.Clear */ };
    }
    /**
     * Filters rules to those that actually modify the URL and logs them.
     *
     * @param tabId Tab identifier.
     * @param url Request URL.
     * @param rules Rules returned by descriptor resolution.
     */
    logEffectiveRules(tabId, url, rules) {
        const effectiveRules = filterEffectiveRemoveParamRules(url, rules);
        if (effectiveRules.length > 0) {
            this.logAppliedRules(tabId, url, effectiveRules);
        }
    }
    /**
     * Publishes filtering log events for each applied $removeparam rule.
     *
     * @param tabId Tab identifier.
     * @param url Request URL that matched the rules.
     * @param rules Network rules that matched.
     */
    logAppliedRules(tabId, url, rules) {
        for (const rule of rules) {
            const { appliedRuleText, originalRuleText } = getRuleTexts(rule, this.engineApi);
            this.filteringLog.publishEvent({
                type: FilteringEventType.RemoveParam,
                data: {
                    removeParam: true,
                    eventId: nanoid(),
                    tabId,
                    requestUrl: url,
                    frameUrl: url,
                    frameDomain: getDomain(url) || '',
                    requestType: ContentType.Document,
                    filterId: rule.getFilterListId(),
                    ruleIndex: rule.getIndex(),
                    appliedRuleText,
                    originalRuleText,
                    timestamp: Date.now(),
                    isAllowlist: rule.isAllowlist(),
                    isImportant: rule.isOptionEnabled(NetworkRuleOption.Important),
                    isDocumentLevel: false,
                    isCsp: false,
                    isCookie: false,
                    advancedModifier: rule.getAdvancedModifierValue(),
                },
            });
        }
    }
}

/**
 * @file
 * Self-contained function that patches `history.pushState` and
 * `history.replaceState` in the **main world** to support `$removeparam`
 * rules applied via the History API.
 *
 * Descriptors are passed directly as a function argument from the background
 * (MV3 via `chrome.scripting.executeScript({ args })`, MV2 via JSON embed
 * in the serialized function body).
 *
 * This function has **no module imports** so that it can be serialized via
 * `.toString()` for inline `<script>` injection in MV2.
 */
/**
 * Patches `history.pushState` and `history.replaceState` so that every
 * History API navigation has `$removeparam` rules applied locally using
 * pre-loaded rule descriptors.
 *
 * The patched methods work as follows:
 * 1. Call the original method immediately (SPA behaviour is preserved).
 * 2. If the URL contains query parameters, apply parameter removal synchronously.
 * 3. If the URL changed, call `replaceState` to update the address bar.
 *
 * **Important**: every constant and helper referenced inside the function
 * body is declared as a local variable so that
 * `Function.prototype.toString()` produces a self-contained IIFE for MV2
 * injection.
 *
 * @param rawDescriptors Array of serialized rule descriptors to apply.
 * Passed directly from the background (MV3 via `args`, MV2 via JSON embed).
 * @param nonce Random token used as the window property name for the
 * updater function, making it unguessable by page scripts.
 * @param secret Secret token that must be passed to the updater on every
 * call.  Prevents page scripts that discover the property name from
 * tampering with the descriptor list.
 */
function patchHistoryForRemoveParam(rawDescriptors, nonce, secret) {
    /**
     * Escapes characters with special meaning inside a regular expression.
     *
     * @param str The string to escape.
     *
     * @returns The escaped string.
     */
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    /**
     * Parses a modifier value string into a RegExp, following the same logic
     * as `RemoveParamModifier` in `@adguard/tsurlfilter`.
     *
     * @param value The modifier value.
     *
     * @returns Object with the compiled regex (or null for bare removeparam)
     * and whether the match is negated.
     */
    function parseValue(value) {
        if (!value) {
            return { regex: null, isNegated: false };
        }
        let rawValue = value;
        let isNegated = false;
        if (value.startsWith('~')) {
            rawValue = value.substring(1);
            isNegated = true;
        }
        if (rawValue.startsWith('/')) {
            // Regex literal: /pattern/flags
            const lastSlash = rawValue.lastIndexOf('/');
            if (lastSlash > 0) {
                const pattern = rawValue.substring(1, lastSlash);
                const flags = rawValue.substring(lastSlash + 1);
                return { regex: new RegExp(pattern, flags), isNegated };
            }
            // Fallback: treat as literal
            return {
                regex: new RegExp(`^${escapeRegex(rawValue)}=[^&#]*$`),
                isNegated,
            };
        }
        return {
            regex: new RegExp(`^${escapeRegex(rawValue)}=[^&#]*$`),
            isNegated,
        };
    }
    let descriptors = rawDescriptors.map((d) => {
        const { regex, isNegated } = parseValue(d.value);
        return {
            valueRegExp: regex,
            isAllowlist: d.isAllowlist,
            isNegated,
        };
    });
    const proto = History.prototype;
    const pushStateDesc = Object.getOwnPropertyDescriptor(proto, 'pushState');
    const replaceStateDesc = Object.getOwnPropertyDescriptor(proto, 'replaceState');
    if (!pushStateDesc?.value || !replaceStateDesc?.value) {
        return;
    }
    const originalPushState = pushStateDesc.value;
    const originalReplaceState = replaceStateDesc.value;
    /**
     * Removes query parameters from a URL using a regex.
     *
     * @param url The URL to process.
     * @param regExp The regex to match parameters against.
     * @param invert If true, keep only matching parameters.
     *
     * @returns The URL with parameters removed.
     */
    function cleanUrlParams(url, regExp, invert) {
        const qIndex = url.indexOf('?');
        if (qIndex === -1) {
            return url;
        }
        let hashPart = '';
        const hashIndex = url.indexOf('#');
        let urlWithoutHash = url;
        if (hashIndex >= 0) {
            hashPart = url.slice(hashIndex);
            urlWithoutHash = url.slice(0, hashIndex);
        }
        const pathPart = urlWithoutHash.slice(0, qIndex);
        const queryPart = urlWithoutHash.slice(qIndex + 1);
        let modifiedQuery;
        if (invert) {
            modifiedQuery = queryPart
                .split('&')
                .filter((x) => {
                if (!x) {
                    return false;
                }
                const match = regExp.test(x);
                if (match) {
                    return true;
                }
                try {
                    const decoded = decodeURIComponent(x);
                    return regExp.test(decoded);
                }
                catch {
                    return false;
                }
            })
                .join('&');
        }
        else {
            modifiedQuery = queryPart
                .split('&')
                .filter((x) => {
                const test = x.includes('=') ? x : `${x}=`;
                if (regExp.test(test)) {
                    return false;
                }
                try {
                    const decoded = decodeURIComponent(test);
                    return !regExp.test(decoded);
                }
                catch {
                    return true;
                }
            })
                .join('&');
        }
        if (modifiedQuery === queryPart) {
            return url;
        }
        // Normalize: remove leading '&' and empty '=' entries
        modifiedQuery = modifiedQuery
            .split('&')
            .filter((x) => x && !x.startsWith('='))
            .join('&');
        while (modifiedQuery.charAt(0) === '&') {
            modifiedQuery = modifiedQuery.slice(1);
        }
        let result = pathPart;
        if (modifiedQuery) {
            result += `?${modifiedQuery}`;
        }
        return result + hashPart;
    }
    /**
     * Applies all loaded descriptors to a URL, returning the cleaned URL
     * and the list of descriptors that actually modified it.
     *
     * @param url The URL to process.
     *
     * @returns Object with cleaned URL and applied descriptors, or null if
     * no changes were made.
     */
    function applyDescriptors(url) {
        if (!descriptors || descriptors.length === 0) {
            return null;
        }
        let purgedUrl = url;
        const applied = [];
        for (const desc of descriptors) {
            if (desc.isAllowlist) {
                // Allowlist rules are handled by MatchingResult in the
                // background — if an allowlist rule is present, the
                // corresponding blocking rule should have been filtered out.
                continue;
            }
            if (desc.valueRegExp === null) {
                // Bare removeparam: remove all query parameters, preserve hash
                const queryIndex = purgedUrl.indexOf('?');
                if (queryIndex >= 0) {
                    let hashSuffix = '';
                    const hashIdx = purgedUrl.indexOf('#');
                    if (hashIdx >= 0) {
                        hashSuffix = purgedUrl.substring(hashIdx);
                    }
                    const newUrl = purgedUrl.substring(0, queryIndex) + hashSuffix;
                    if (newUrl !== purgedUrl) {
                        applied.push(desc);
                        purgedUrl = newUrl;
                    }
                }
                continue;
            }
            const modifiedUrl = cleanUrlParams(purgedUrl, desc.valueRegExp, desc.isNegated);
            if (modifiedUrl !== purgedUrl) {
                applied.push(desc);
                purgedUrl = modifiedUrl;
            }
        }
        if (purgedUrl === url) {
            return null;
        }
        return { cleanedUrl: purgedUrl, applied };
    }
    /**
     * Processes a URL: applies parameter removal and updates the address bar.
     *
     * @param state History state.
     * @param title Page title.
     * @param absoluteUrl Absolute URL to process.
     */
    function processUrl(state, title, absoluteUrl) {
        const result = applyDescriptors(absoluteUrl);
        if (!result) {
            return;
        }
        if (result.cleanedUrl !== absoluteUrl && window.location.href === absoluteUrl) {
            originalReplaceState.call(window.history, state, title, result.cleanedUrl);
        }
    }
    /**
     * Creates a patched version of a History API method that preserves the
     * native method's observable properties (name, length, toString) to
     * reduce detectability.
     *
     * @param originalMethod The original `pushState` or `replaceState`.
     * @param methodName The name of the method being patched.
     *
     * @returns A replacement function with the same signature.
     */
    function createPatchedMethod(originalMethod, methodName) {
        const patched = function patchedHistoryMethod(state, title, url) {
            // Always call the original method first to preserve SPA behaviour.
            originalMethod.call(this, state, title, url);
            if (!url) {
                return;
            }
            const absoluteUrl = new URL(url.toString(), document.baseURI).href;
            // Skip non-HTTP URLs and URLs without query parameters.
            if (!absoluteUrl.startsWith('http') || !absoluteUrl.includes('?')) {
                return;
            }
            processUrl(state, title, absoluteUrl);
        };
        // Match the native method's observable properties.
        Object.defineProperty(patched, 'name', { value: methodName, configurable: true });
        Object.defineProperty(patched, 'length', {
            value: originalMethod.length,
            configurable: true,
        });
        return patched;
    }
    // Patch immediately so we capture all navigations
    Object.defineProperty(proto, 'pushState', {
        ...pushStateDesc,
        value: createPatchedMethod(originalPushState, 'pushState'),
    });
    Object.defineProperty(proto, 'replaceState', {
        ...replaceStateDesc,
        value: createPatchedMethod(originalReplaceState, 'replaceState'),
    });
    processUrl(window.history.state, document.title, window.location.href);
    // Expose a non-enumerable updater function on `window` keyed by the
    // injection nonce.  The background calls this directly via
    // `chrome.scripting.executeScript({ world: 'MAIN' })` (MV3) or
    // `<script>` element injection (MV2), so no broadcasting through
    // `window.postMessage` or extension messaging is needed.
    Object.defineProperty(window, nonce, {
        value: (token, rawDescs) => {
            if (token !== secret) {
                return;
            }
            if (!rawDescs || rawDescs.length === 0) {
                descriptors = null;
                return;
            }
            descriptors = rawDescs.map((d) => {
                const { regex, isNegated } = parseValue(d.value);
                return {
                    valueRegExp: regex,
                    isAllowlist: d.isAllowlist,
                    isNegated,
                };
            });
            // Apply newly loaded descriptors to the current URL immediately.
            // This handles the case where the page navigated (via pushState)
            // before descriptors were available — the SPA navigation that
            // triggered onHistoryStateUpdated may have already placed
            // tracking params in the address bar.
            const currentUrl = window.location.href;
            if (currentUrl.startsWith('http') && currentUrl.includes('?')) {
                processUrl(window.history.state, '', currentUrl);
            }
        },
        configurable: false,
        enumerable: false,
        writable: false,
    });
}

/**
 * Stealth action bitwise masks used on the background page and on the filtering log page.
 */
var StealthActions;
(function (StealthActions) {
    StealthActions[StealthActions["None"] = 0] = "None";
    StealthActions[StealthActions["HideReferrer"] = 1] = "HideReferrer";
    StealthActions[StealthActions["HideSearchQueries"] = 2] = "HideSearchQueries";
    StealthActions[StealthActions["BlockChromeClientData"] = 4] = "BlockChromeClientData";
    StealthActions[StealthActions["SendDoNotTrack"] = 8] = "SendDoNotTrack";
    // TODO check where this enums are used, and add comments
    StealthActions[StealthActions["FirstPartyCookies"] = 16] = "FirstPartyCookies";
    StealthActions[StealthActions["ThirdPartyCookies"] = 32] = "ThirdPartyCookies";
})(StealthActions || (StealthActions = {}));

export { PersistentValueContainer as $, Allowlist$1 as A, BrowserStorage as B, CommonAssistant as C, DocumentLifecycle as D, ExtensionStorage as E, FrameCommon as F, getExtendedCssPayloadValidator as G, getCookieRulesPayloadValidator as H, getSaveCookieLogEventPayloadValidator as I, getRuleTextsByIndex as J, getAssistantCreateRulePayloadValidator as K, CookieUtils$1 as L, MemoryStorage as M, BrowserCookieApi as N, CookieRulesFinder as O, ParsedCookie as P, DocumentBlockingServiceCommon as Q, AbstractRemoveParamInjectionService as R, patchHistoryForRemoveParam as S, TabContextCommon as T, StealthActions as U, EventChannel as V, TSWEBEXTENSION_VERSION as W, stealthConfigValidator as X, settingsConfigValidator as Y, getCosmeticDataPayloadValidator as Z, FilteringLog as _, createExtensionStorageDecorator as a, isEmptySrcFrame as a0, hasHeaderByName as a1, hasHeader as a2, basicFilterValidator as b, configurationValidator as c, BrowserDetector as d, defaultFilteringLog as e, TabsApiCommon as f, CosmeticApiCommon as g, createFrameMatchQuery as h, isHttpOrWsRequest as i, CssCapabilities as j, companiesDbService as k, getRuleTexts as l, FilteringEventType as m, isHttpRequest as n, getRequestType as o, isThirdPartyRequest as p, isExtensionUrl as q, removeHeader as r, splitMultilineCookies as s, ContentType as t, getDomain as u, findHeaderByName as v, getUpperLevelDomain as w, getHost as x, messageValidator as y, processShouldCollapsePayloadValidator as z };
