import { RuleActionType } from '../declarative-rule/rule-action.js';

/**
 * List of declarative rule actions which are considered safe.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#safe_rules}
 */ const SAFE_RULE_ACTIONS = new Set([
    RuleActionType.Block,
    RuleActionType.Allow,
    RuleActionType.AllowAllRequests,
    RuleActionType.UpgradeScheme
]);
/**
 * Checks whether the declarative rule is safe.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest#safe_rules}
 *
 * @param rule Declarative rule to check.
 *
 * @returns True if the rule is safe, otherwise false.
 */ function isSafeRule(rule) {
    return SAFE_RULE_ACTIONS.has(rule.action.type);
}

export { isSafeRule };
