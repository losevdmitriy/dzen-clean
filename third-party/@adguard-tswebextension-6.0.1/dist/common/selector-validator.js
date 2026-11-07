import { l as logger } from './logger.js';

/**
 * This class applies cookie rules in page context.
 *
 * - Removes cookies matching rules
 * - Listens to new cookies, then tries to apply rules to them.
 */
let CookieController$1 = class CookieController {
    /**
     * Default cookie polling interval.
     */
    DEFAULT_COOKIE_POLLING_INTERVAL_MS = 1000;
    /**
     * On rule applied callback.
     */
    onRuleAppliedCallback;
    /**
     * Is current context third-party.
     */
    isThirdPartyContext = false;
    /**
     * Constructor.
     *
     * @param callback On rule applied callback.
     */
    constructor(callback) {
        this.onRuleAppliedCallback = callback;
        this.isThirdPartyContext = this.isThirdPartyFrame();
    }
    /**
     * Applies rules.
     *
     * @param rules Rules to apply.
     */
    apply(rules) {
        this.applyRules(rules);
        let lastCookie = document.cookie;
        this.listenCookieChange((oldValue, newValue) => {
            if (newValue === lastCookie) {
                // Skip changes made by this class
                return;
            }
            this.applyRules(rules);
            lastCookie = document.cookie;
        });
        window.addEventListener('beforeunload', () => {
            this.applyRules(rules);
        });
    }
    /**
     * Polling document cookie.
     *
     * @param callback Callback to be called periodically.
     * @param interval Polling interval.
     */
    listenCookieChange(callback, interval = this.DEFAULT_COOKIE_POLLING_INTERVAL_MS) {
        let lastCookie = document.cookie;
        setInterval(() => {
            const { cookie } = document;
            if (cookie !== lastCookie) {
                try {
                    callback(lastCookie, cookie);
                }
                finally {
                    lastCookie = cookie;
                }
            }
        }, interval);
    }
    /**
     * Checks if current context is third-party.
     *
     * @returns True if current context is third-party.
     */
    // eslint-disable-next-line class-methods-use-this
    isThirdPartyFrame() {
        try {
            return window.self !== window.top && document.location.hostname !== window.parent.location.hostname;
        }
        catch (e) {
            return true;
        }
    }
    /**
     * Applies rules to document cookies.
     *
     * Inspired by remove-cookie scriptlet.
     *
     * @see {@link https://github.com/AdguardTeam/Scriptlets/blob/master/src/scriptlets/remove-cookie.js}
     *
     * @param rules Rules to apply.
     */
    applyRules(rules) {
        document.cookie.split(';').forEach((cookieStr) => {
            const pos = cookieStr.indexOf('=');
            if (pos === -1) {
                return;
            }
            const cookieName = cookieStr.slice(0, pos).trim();
            const cookieValue = cookieStr.slice(pos + 1).trim();
            const matchingRules = rules.filter((r) => {
                if (this.isThirdPartyContext !== r.isThirdParty) {
                    return false;
                }
                const regex = r.match ? CookieController.toRegExp(r.match) : CookieController.toRegExp('/.?/');
                return regex.test(cookieName);
            });
            const importantRules = matchingRules.filter((r) => r.isImportant);
            if (importantRules.length > 0) {
                importantRules.forEach((rule) => {
                    this.applyRule(rule, cookieName, cookieValue);
                });
            }
            else {
                const allowlistRules = matchingRules.filter((r) => r.isAllowlist);
                if (allowlistRules.length > 0) {
                    allowlistRules.forEach((rule) => {
                        this.applyRule(rule, cookieName, cookieValue);
                    });
                }
                else {
                    matchingRules.forEach((rule) => {
                        this.applyRule(rule, cookieName, cookieValue);
                    });
                }
            }
        });
    }
    /**
     * Applies rule.
     *
     * @param rule Rule to apply.
     * @param cookieName Cookie name.
     * @param cookieValue Cookie value.
     */
    applyRule(rule, cookieName, cookieValue) {
        if (!rule.isAllowlist) {
            const hostParts = document.location.hostname.split('.');
            for (let i = 0; i <= hostParts.length - 1; i += 1) {
                const hostName = hostParts.slice(i).join('.');
                if (hostName) {
                    CookieController.removeCookieFromHost(cookieName, hostName);
                }
            }
        }
        this.onRuleAppliedCallback({
            cookieName,
            cookieValue,
            cookieDomain: document.location.hostname,
            thirdParty: rule.isThirdParty,
            filterId: rule.filterId,
            ruleIndex: rule.ruleIndex,
            isAllowlist: rule.isAllowlist,
            isImportant: rule.isImportant,
            isDocumentLevel: rule.isDocumentLevel,
            isCsp: false,
            isCookie: true,
            advancedModifier: null,
        });
    }
    /**
     * Removes cookie for host.
     *
     * @param cookieName Cookie name.
     * @param hostName Host name.
     */
    static removeCookieFromHost(cookieName, hostName) {
        const cookieSpec = `${cookieName}=`;
        const domain1 = `; domain=${hostName}`;
        const domain2 = `; domain=.${hostName}`;
        const path = '; path=/';
        const expiration = '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = cookieSpec + expiration;
        document.cookie = cookieSpec + domain1 + expiration;
        document.cookie = cookieSpec + domain2 + expiration;
        document.cookie = cookieSpec + path + expiration;
        document.cookie = cookieSpec + domain1 + path + expiration;
        document.cookie = cookieSpec + domain2 + path + expiration;
    }
    /**
     * Converts cookie rule match to regular expression.
     *
     * @param str String to convert.
     *
     * @returns Regular expression.
     */
    static toRegExp(str) {
        if (str[0] === '/' && str[str.length - 1] === '/') {
            return new RegExp(str.slice(1, -1));
        }
        const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`^${escaped}$`);
    }
};

/**
 * CSS.supports() function name for selector validation.
 */
const SELECTOR_FUNCTION = 'selector';
/**
 * Splits a CSS selector list at top-level commas, respecting quoted strings
 * and parenthesized/bracketed groups.
 *
 * "Top-level" means a comma that is NOT inside:
 * - Quotes (single or double).
 * - Parentheses (e.g., `:is(...)`, `:has(...)`).
 * - Square brackets (e.g., `[attr="..."]`).
 *
 * We use a hand-written parser instead of `@adguard/css-tokenizer` because
 * this code runs in content scripts where the tokenizer is not bundled.
 *
 * @param selectorList A single selector or comma-separated selector list.
 *
 * @returns Array of trimmed individual selector strings.
 */
function splitSelectorList(selectorList) {
    const parts = [];
    let current = 0;
    let parenDepth = 0;
    let bracketDepth = 0;
    let inDoubleQuote = false;
    let inSingleQuote = false;
    let lastSplit = 0;
    while (current < selectorList.length) {
        const ch = selectorList[current];
        if (ch === '\\') {
            // Skip escaped character
            current += 2;
            continue;
        }
        if (inDoubleQuote) {
            if (ch === '"') {
                inDoubleQuote = false;
            }
        }
        else if (inSingleQuote) {
            if (ch === "'") {
                inSingleQuote = false;
            }
        }
        else {
            switch (ch) {
                case '"':
                    inDoubleQuote = true;
                    break;
                case "'":
                    inSingleQuote = true;
                    break;
                case '(':
                    parenDepth += 1;
                    break;
                case ')':
                    parenDepth -= 1;
                    break;
                case '[':
                    bracketDepth += 1;
                    break;
                case ']':
                    bracketDepth -= 1;
                    break;
                case ',':
                    if (parenDepth === 0 && bracketDepth === 0) {
                        parts.push(selectorList.slice(lastSplit, current).trim());
                        lastSplit = current + 1;
                    }
                    break;
            }
        }
        current += 1;
    }
    parts.push(selectorList.slice(lastSplit).trim());
    return parts;
}
/**
 * Tests whether a CSS selector (or space-joined group) is valid via CSS.supports().
 * Returns false on any exception or invalid syntax.
 *
 * @param selector Selector string to validate.
 *
 * @returns True if the browser considers the selector valid.
 */
function isSelectorSupported(selector) {
    try {
        return CSS.supports(`${SELECTOR_FUNCTION}(${selector})`);
    }
    catch (e) {
        logger.debug(`[tsweb.selector-validator]: CSS.supports threw for "${selector}":`, e);
        return false;
    }
}
/**
 * Validates a single selector that may be a comma-separated list.
 * Splits at top-level commas and validates each part individually because
 * `CSS.supports('selector(A, B)')` fails due to comma ambiguity.
 *
 * @param selector A possibly comma-containing selector string.
 *
 * @returns True if the selector (or all parts of the list) is valid.
 */
function validateCommaSelector(selector) {
    const parts = splitSelectorList(selector);
    if (parts.length > 1) {
        // True comma-separated list — ALL parts must be valid (matches browser behavior).
        return parts.every((part) => part.length > 0 && isSelectorSupported(part));
    }
    // Contains comma but not at top level (e.g., `[attr="a,b"]`) — validate as-is.
    return isSelectorSupported(selector);
}
/**
 * Validates a batch of CSS selectors using a two-tier approach:
 * - Fast path: validates all selectors joined as a selector list at once.
 * - Slow path: if the batch is invalid, validates each selector individually
 *   to identify and exclude the broken ones.
 *
 * For selectors that are comma-separated lists (e.g., `.a, .b`), each part
 * is validated individually because `CSS.supports('selector(A, B)')` fails
 * in browsers due to comma ambiguity.
 *
 * Must be called in page/content script context — `CSS.supports()` is not
 * available in service workers or background pages.
 *
 * @param selectors Array of individual CSS selectors.
 *
 * @returns Object with `valid` and `invalid` selector arrays.
 */
function validateSelectors(selectors) {
    if (selectors.length === 0) {
        return { valid: [], invalid: [] };
    }
    // Fast path: try batch validation first.
    // Joining selectors with spaces creates a valid compound selector argument
    // for CSS.supports('selector(A B C)'). Commas inside pseudo-classes like
    // `:is(.a, .b)` do NOT break this because browsers parse them as part of
    // the balanced parentheses within the `selector()` function argument.
    // Only TRUE top-level commas (e.g., `.a, .b`) cause CSS.supports to fail
    // because they are ambiguous with CSS.supports' own argument separators.
    // Since ~99% of real filter selectors have no top-level commas, this single
    // call handles the vast majority of page loads with zero overhead.
    if (isSelectorSupported(selectors.join(' '))) {
        return { valid: selectors, invalid: [] };
    }
    // Batch failed — either a selector is genuinely invalid, or a selector
    // contains a top-level comma which made CSS.supports reject the batch.
    // Strategy: partition selectors into "has comma" vs "no comma" groups.
    // If a comma-containing selector caused the failure, re-batching the
    // non-comma group will pass and we avoid O(n) individual checks for them.
    const noCommaSelectors = [];
    let hasCommaSelector = false;
    for (const selector of selectors) {
        if (selector.includes(',')) {
            hasCommaSelector = true;
        }
        else {
            noCommaSelectors.push(selector);
        }
    }
    // Re-batch the non-comma group. If this passes, all non-comma selectors
    // are valid and we only need individual checks for comma-containing ones.
    // We skip this when there are no comma selectors because in that case the
    // initial batch failure means at least one non-comma selector is invalid
    // and we must check them individually anyway.
    const allNoCommaValid = hasCommaSelector
        && noCommaSelectors.length > 0
        && isSelectorSupported(noCommaSelectors.join(' '));
    // Build result arrays preserving original order.
    const valid = [];
    const invalid = [];
    for (const selector of selectors) {
        let isValid;
        if (!selector.includes(',')) {
            isValid = allNoCommaValid || isSelectorSupported(selector);
        }
        else {
            isValid = validateCommaSelector(selector);
        }
        if (isValid) {
            valid.push(selector);
        }
        else {
            invalid.push(selector);
            logger.warn(`[tsweb.selector-validator]: Invalid CSS selector skipped: "${selector}"`);
        }
    }
    return { valid, invalid };
}

export { CookieController$1 as C, validateSelectors as v };
