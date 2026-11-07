import { EventChannel, defaultFilteringLog, FilteringEventType, TsWebExtension, FilterList, LF } from '@adguard/tswebextension/mv3';
export { MESSAGE_HANDLER_NAME } from '@adguard/tswebextension/mv3';
import zod from 'zod';

/**
 * {@link AdguardApi} configuration runtime validator.
 */ const configurationValidator = zod.object({
    /**
     * An array of filter identifiers.
     *
     * You can find possible filter identifiers in the @adguard/dnr-rulesets README file.
     *
     * @see https://www.npmjs.com/package/@adguard/dnr-rulesets#included-filter-lists
     */ filters: zod.number().array(),
    /**
     * Indicates whether filtering is enabled.
     */ filteringEnabled: zod.boolean(),
    /**
     * Path to the directory with filters.
     */ assetsPath: zod.string(),
    /**
     * An array of domains for which AdGuard won't work.
     */ allowlist: zod.string().array().optional(),
    /**
     * This property completely changes AdGuard's behavior.
     *
     * If defined, AdGuard will work only for domains in the {@link blocklist}.
     *
     * All other domains will be ignored. If {@link blocklist} is defined, {@link allowlist} will be ignored.
     */ blocklist: zod.string().array().optional(),
    /**
     * An array of custom filtering rules.
     *
     * These custom rules might be created by a user via the AdGuard Assistant UI.
     *
     * @see https://adguard.com/kb/general/ad-filtering/create-own-filters/
     */ rules: zod.string().array().optional(),
    /**
     * Optional redirect url for blocking rules with `$document` modifier.
     * If not specified, default browser page will be shown.
     *
     * Page will receive following query parameters:
     * - url - blocked url;
     * - rule - blocking rule, that triggered on this url;
     * - filterId - id of the filter, that contains this rule (0 for user rules).
     *
     * @example
     * // Address format:
     * `chrome-extension://<extension_id>/blocking-page.html`
     *
     * @example
     * // Full URL example after redirect:
     * `chrome-extension://<extension_id>/blocking-page.html?url=https%3A%2F%2Fexample.net%2F&rule=example.net%24document&filterId=0`
     */ documentBlockingPageUrl: zod.string().optional()
});

/**
 * API for adding and removing listeners for request blocking events.
 * Wraps {@link defaultFilteringLog} {@link EventChannel} for {@link ApplyBasicRuleEvent}.
 */ class RequestBlockingLogger {
    /**
     * Create instance of {@link RequestBlockingLogger}.
     */ constructor(){
        this.channel = new EventChannel();
        this.onBasicRuleApply = this.onBasicRuleApply.bind(this);
        defaultFilteringLog.addEventListener(FilteringEventType.ApplyBasicRule, this.onBasicRuleApply);
    }
    // map public API to event channel
    /**
     * Register listener for {@link RequestBlockingEvent}.
     *
     * @param listener Function to be called when {@link RequestBlockingEvent} is dispatched.
     */ addListener(listener) {
        this.channel.subscribe(listener);
    }
    /**
     * Unregister listener for {@link RequestBlockingEvent}.
     *
     * @param listener Function to be called when {@link RequestBlockingEvent} is dispatched.
     */ removeListener(listener) {
        this.channel.unsubscribe(listener);
    }
    /**
     * Handles {@link ApplyBasicRuleEvent}, gets extra data for {@link requestContextStorage}
     * and dispatch new {@link RequestBlockingEvent}.
     *
     * @param event {@link ApplyBasicRuleEvent}.
     */ onBasicRuleApply(event) {
        const { tabId, requestId, requestUrl, requestType, frameUrl, filterId, ruleIndex, isAllowlist, companyCategoryName, isAssuredlyBlocked } = event.data;
        // exclude allowlist rules
        if (isAllowlist) {
            return;
        }
        // exclude events that are not marked as definitely blocked
        if (!isAssuredlyBlocked) {
            return;
        }
        const resData = {
            tabId,
            requestId,
            requestUrl,
            referrerUrl: frameUrl,
            requestType
        };
        // add optional fields only if they are provided
        if (companyCategoryName) {
            resData.companyCategoryName = companyCategoryName;
        }
        if (filterId !== null && ruleIndex !== null) {
            resData.assumedFilterId = filterId;
            resData.assumedRuleIndex = ruleIndex;
        }
        this.channel.dispatch(resData);
    }
}

/**
 * AdGuard API is filtering library, provided following features:
 * - request and content filtering, using {@link TsWebExtension}
 * - content blocking via AdGuard Assistant UI, provided by {@link TsWebExtension}.
 */ class AdguardApi {
    static{
        this.WEB_ACCESSIBLE_RESOURCES_PATH = '/web-accessible-resources/redirects';
    }
    static{
        this.DECLARATIVE_RULES_PATH = '/declarative';
    }
    /**
     * Creates new AdguardApi instance.
     * @param tswebextension Instance of {@link TsWebExtension}.
     * @param params Optional {@link AdguardApiParams} for AdguardApi.
     */ constructor(tswebextension, params){
        this.tswebextension = tswebextension;
        this.onAssistantCreateRule = this.tswebextension.onAssistantCreateRule;
        this.onRequestBlocked = new RequestBlockingLogger();
        this.openAssistant = this.openAssistant.bind(this);
        if (params?.localScriptRulesJs) {
            TsWebExtension.setLocalScriptRules(params.localScriptRulesJs);
        }
    }
    /**
     * Returns a message handler that will listen to internal messages,
     * for example, message for get computed css for content-script.
     * @returns Message handler.
     */ getMessageHandler() {
        return this.tswebextension.getMessageHandler();
    }
    /**
     * Initializes AdGuard with specified {@link Configuration} and starts it immediately.
     *
     * @param configuration Api {@link Configuration}.
     *
     * @throws Error if Adguard is not started.
     *
     * @returns Applied {@link Configuration} promise.
     */ async start(configuration) {
        this.configuration = configurationValidator.parse(configuration);
        const tsWebExtensionConfiguration = await this.createTsWebExtensionConfiguration();
        const result = await this.tswebextension.start(tsWebExtensionConfiguration);
        // Throw error if static filters failed to enable
        if (result.staticFiltersStatus.errors.length > 0) {
            throw new Error(`Failed to enable rulesets: ${result.staticFiltersStatus.errors.map((e)=>e.message).join(', ')}`);
        }
        // Log dynamic rules errors and limitations
        if (result.dynamicRules) {
            if (result.dynamicRules.errors.length > 0) {
                // eslint-disable-next-line no-console
                console.debug('Dynamic rules conversion errors:', result.dynamicRules.errors);
            }
            if (result.dynamicRules.limitations.length > 0) {
                // eslint-disable-next-line no-console
                console.debug('Dynamic rules were truncated:', result.dynamicRules.limitations);
            }
        }
        return this.configuration;
    }
    /**
     * Completely stops AdGuard.
     */ async stop() {
        await this.tswebextension.stop();
    }
    /**
     * Modifies AdGuard {@link Configuration}. Please note, that Adguard must be already started.
     *
     * @param configuration Api {@link Configuration}.
     *
     * @throws Error if Adguard is not started.
     *
     * @returns Applied {@link Configuration} promise.
     */ async configure(configuration) {
        this.configuration = configurationValidator.parse(configuration);
        const tsWebExtensionConfiguration = await this.createTsWebExtensionConfiguration();
        const result = await this.tswebextension.configure(tsWebExtensionConfiguration);
        // Throw error if static filters failed to enable
        if (result.staticFiltersStatus.errors.length > 0) {
            throw new Error(`Failed to enable rulesets: ${result.staticFiltersStatus.errors.map((e)=>e.message).join(', ')}`);
        }
        // Log dynamic rules errors and limitations
        if (result.dynamicRules) {
            if (result.dynamicRules.errors.length > 0) {
                // eslint-disable-next-line no-console
                console.debug('Dynamic rules conversion errors:', result.dynamicRules.errors);
            }
            if (result.dynamicRules.limitations.length > 0) {
                // eslint-disable-next-line no-console
                console.debug('Dynamic rules were truncated:', result.dynamicRules.limitations);
            }
        }
        return this.configuration;
    }
    /**
     * Opens the AdGuard assistant UI in the specified tab.
     * You should also subscribe on {@link onAssistantCreateRule} event channel for applying rules,
     * which are created by the Adguard assistant.
     *
     * @param tabId - {@link browser.tabs.Tab } id. @see https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab.
     */ async openAssistant(tabId) {
        await this.tswebextension.openAssistant(tabId);
    }
    /**
     * Closes AdGuard assistant in the specified tab.
     *
     * @param tabId - {@link browser.tabs.Tab } id. @see https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab.
     */ async closeAssistant(tabId) {
        await this.tswebextension.closeAssistant(tabId);
    }
    /**
     * Gets current loaded rules count.
     *
     * @returns Rules count number.
     */ getRulesCount() {
        return this.tswebextension.getRulesCount();
    }
    /**
     * Creates {@link TsWebExtension} configuration based on current API {@link configuration}.
     *
     * @returns - {@link TsWebExtension} configuration.
     */ async createTsWebExtensionConfiguration() {
        if (!this.configuration) {
            throw new Error('Api configuration is not set');
        }
        let allowlistInverted = false;
        let allowlist = [];
        if (this.configuration.blocklist) {
            allowlist = this.configuration.blocklist;
            allowlistInverted = true;
        } else if (this.configuration.allowlist) {
            allowlist = this.configuration.allowlist;
        }
        let list;
        if (this.configuration.rules) {
            list = new FilterList(this.configuration.rules.join(LF));
        } else {
            list = FilterList.createEmpty();
        }
        const userrules = {
            content: list.getContent(),
            conversionData: list.getConversionData()
        };
        return {
            filtersPath: this.configuration.assetsPath,
            rulesetsPath: `${this.configuration.assetsPath}${AdguardApi.DECLARATIVE_RULES_PATH}`,
            customFilters: [],
            trustedDomains: [],
            // This is needed only for filters developers.
            declarativeLogEnabled: false,
            staticFiltersIds: this.configuration.filters,
            allowlist,
            userrules,
            settings: {
                assistantUrl: 'adguard-assistant.js',
                // Related stealth option is disabled
                gpcScriptUrl: 'whatever',
                // Related stealth option is disabled
                hideDocumentReferrerScriptUrl: 'whatever',
                filteringEnabled: this.configuration.filteringEnabled,
                documentBlockingPageUrl: this.configuration.documentBlockingPageUrl,
                debugScriptlets: false,
                stealthModeEnabled: true,
                collectStats: false,
                allowlistInverted,
                allowlistEnabled: true,
                stealth: {
                    blockChromeClientData: false,
                    hideReferrer: false,
                    hideSearchQueries: false,
                    sendDoNotTrack: false,
                    blockWebRTC: false,
                    selfDestructThirdPartyCookies: true,
                    selfDestructThirdPartyCookiesTime: 3600,
                    selfDestructFirstPartyCookies: true,
                    selfDestructFirstPartyCookiesTime: 3600
                }
            }
        };
    }
    /**
     * Creates new adguardApi instance.
     *
     * @param params Optional {@link AdguardApiParams} for AdguardApi.
     *
     * @returns AdguardApi instance.
     */ static async create(params) {
        const tswebextension = new TsWebExtension(AdguardApi.WEB_ACCESSIBLE_RESOURCES_PATH);
        await tswebextension.initStorage();
        return new AdguardApi(tswebextension, params);
    }
}

export { AdguardApi };
//# sourceMappingURL=adguard-api.js.map
