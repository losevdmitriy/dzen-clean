import { C as CookieController$1, v as validateSelectors } from './common/selector-validator.js';
import { s as sendAppMessage } from './common/send-app-message.js';
import { M as MessageType } from './common/message-constants.js';
import { ExtendedCss } from '@adguard/extended-css';
import { CssHitsCounter } from './css-hits-counter.js';
import { H as HIDING_STYLE } from './common/hidden-style.js';
import './common/logger.js';
import '@adguard/logger';
import 'webextension-polyfill';
import './common/constants.js';

/**
 * This class applies cookie rules in page context.
 *
 * Steps:
 * - content script requests matching cookie rules for the frame
 *   (in which this script is executed)
 * - service returns matching set of rules data to content script
 * - the rules are applied with {@link CookieController}
 * - filtering log receives callback with applied rules data.
 *
 * The important point is: there is no way to run cookie controller script via
 * browser.tabs.executeScript cause one only could be executed for all frames or
 * main frame only. But it's not correct cause there should be different rules
 * for each frame.
 */
class CookieController {
    /**
     * Retry timeout for {@link MessageType.GetCookieRules} request to background in milliseconds.
     */
    static GET_COOKIE_RULES_RETRY_TIMEOUT_MS = 100;
    /**
     * Max {@link MessageType.GetCookieRules} request limit.
     */
    static MAX_GET_COOKIE_RULES_TRIES = 200;
    /**
     * Number of {@link MessageType.GetCookieRules} requests.
     */
    tries = 0;
    /**
     * Creates new {@link CookieController} instance.
     */
    constructor() {
        this.process = this.process.bind(this);
    }
    /**
     * Init cookie rules processing.
     */
    init() {
        this.process();
    }
    /**
     * Sends {@link MessageType.GetCosmeticData} message to background and process response.
     */
    async process() {
        const response = await sendAppMessage({
            type: MessageType.GetCookieRules,
            payload: {
                documentUrl: document.location.href,
            },
        });
        if (response) {
            this.applyCookieRules(response);
        }
    }
    /**
     * Process {@link MessageType.ContentScriptCookieRulesData} response from background.
     *
     * If {@link response.isAppStarted} is false, retry
     * request after {@link GET_COOKIE_RULES_RETRY_TIMEOUT_MS} milliseconds.
     * Else apply cookie rules from {@link response.cookieRules}.
     *
     * @param response Response cookie rules data from background.
     */
    applyCookieRules = async (response) => {
        const { isAppStarted, cookieRules } = response;
        if (!isAppStarted && this.tries <= CookieController.MAX_GET_COOKIE_RULES_TRIES) {
            this.tries += 1;
            setTimeout(this.process, CookieController.GET_COOKIE_RULES_RETRY_TIMEOUT_MS);
            return;
        }
        if (!response || cookieRules === undefined || cookieRules.length === 0) {
            return;
        }
        try {
            const onRuleApplied = (data) => {
                sendAppMessage({
                    type: MessageType.SaveCookieLogEvent,
                    payload: data,
                });
            };
            const cookieController = new CookieController$1(onRuleApplied);
            cookieController.apply(cookieRules);
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            /**
             * Content script injected on in every frame, but document cookie API in
             * iframes can be blocked by website CSP policy. We ignore this cases.
             * Content script matching defined in browser extension.
             * TODO: move error handling to it.
             */
        }
    };
}

/**
 * This class applies cosmetic rules in page context.
 */
class CosmeticController {
    /**
     * Retry timeout for {@link MessageType.GetCosmeticData} request to background in milliseconds.
     */
    static GET_COSMETIC_DATA_RETRY_TIMEOUT_MS = 100;
    /**
     * Max {@link MessageType.GetCosmeticData} request limit.
     */
    static MAX_GET_COSMETIC_DATA_TRIES = 200;
    /**
     * Number of {@link MessageType.GetCosmeticData} requests.
     */
    tries = 0;
    /**
     * Module that collects statistics about the usage of CSS rules.
     */
    cssHitsCounter;
    /**
     * Creates new {@link CosmeticController} instance.
     */
    constructor() {
        this.process = this.process.bind(this);
        this.beforeStyleApplied = this.beforeStyleApplied.bind(this);
    }
    /**
     * Init cosmetic processing.
     */
    init() {
        this.process();
    }
    /**
     * Sends {@link MessageType.GetCosmeticData} message to background and process response.
     */
    async process() {
        const res = await sendAppMessage({
            type: MessageType.GetCosmeticData,
            payload: {
                documentUrl: window.location.href,
            },
        });
        if (res) {
            this.applyExtendedCss(res);
        }
    }
    /**
     * Process {@link MessageType.GetCosmeticData} response from background.
     *
     * If {@link cosmeticData.isAppStarted} is false, retry
     * request after {@link GET_COSMETIC_DATA_RETRY_TIMEOUT_MS} milliseconds.
     * Else apply extended css rules from {@link cosmeticData.extCssText}
     * and enable {@link CssHitsCounter} if {@link cosmeticData.areHitsStatsCollected} is true.
     *
     * @param cosmeticData Response cosmetic data from background.
     */
    applyExtendedCss(cosmeticData) {
        const { isAppStarted, extCssRules, areHitsStatsCollected, nativeCssSelectors, } = cosmeticData;
        if (!isAppStarted
            && this.tries <= CosmeticController.MAX_GET_COSMETIC_DATA_TRIES) {
            this.tries += 1;
            setTimeout(this.process, CosmeticController.GET_COSMETIC_DATA_RETRY_TIMEOUT_MS);
            return;
        }
        if (areHitsStatsCollected) {
            this.cssHitsCounter = CosmeticController.createCssHitsCounter();
        }
        CosmeticController.repairNativeCss(nativeCssSelectors);
        if (!extCssRules || extCssRules.length === 0) {
            return;
        }
        const extendedCssConfig = {
            cssRules: extCssRules,
        };
        if (areHitsStatsCollected) {
            extendedCssConfig.beforeStyleApplied = this.beforeStyleApplied;
        }
        const extendedCss = new ExtendedCss(extendedCssConfig);
        extendedCss.apply();
    }
    /**
     * Validates native CSS element-hiding selectors and injects a corrective
     * `<style>` element containing only the valid ones if any invalid selectors
     * are found.
     *
     * The background already injected grouped native CSS via the browser API.
     * When any selector in a group is invalid, the browser drops the entire
     * group. This method validates all selectors and, if any are invalid,
     * re-injects only the valid selectors individually to restore correct filtering.
     *
     * @param selectors Individual native CSS element-hiding selectors.
     */
    static repairNativeCss(selectors) {
        if (!selectors || selectors.length === 0) {
            return;
        }
        const { valid, invalid } = validateSelectors(selectors);
        if (invalid.length === 0) {
            return;
        }
        if (valid.length === 0) {
            return;
        }
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.textContent = valid
            .map((sel) => `${sel} ${HIDING_STYLE}`)
            .join('\n');
        (document.head || document.documentElement).appendChild(style);
    }
    /**
     * Preprocess {@link IAffectedElement} for {@link ExtendedCss} instance.
     *
     * @param el Record with required 'content' style property in rules.
     *
     * @returns Affected element record.
     */
    beforeStyleApplied(el) {
        if (!this.cssHitsCounter) {
            return el;
        }
        return this.cssHitsCounter.countAffectedByExtendedCss(el);
    }
    /**
     * Create new {@link CssHitsCounter} instance.
     *
     * @returns CssHitsCounter instance.
     */
    static createCssHitsCounter() {
        return new CssHitsCounter((stats) => {
            sendAppMessage({
                type: MessageType.SaveCssHitsStats,
                payload: stats,
            });
        });
    }
}

const cosmeticController = new CosmeticController();
cosmeticController.init();
const cookieController = new CookieController();
cookieController.init();
