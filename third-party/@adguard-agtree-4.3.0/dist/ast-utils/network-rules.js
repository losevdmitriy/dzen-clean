/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { NetworkRuleType, RuleCategory } from '../nodes/index.js';
import { AdblockSyntax } from '../utils/adblockers.js';
import { clone } from '../utils/clone.js';
import { isUndefined } from '../utils/type-guards.js';

/**
 * @file Utility functions for working with network rule nodes.
 */
/**
 * Creates a network rule node.
 *
 * @param pattern Rule pattern.
 * @param modifiers Rule modifiers (optional, default: undefined).
 * @param exception Exception rule flag (optional, default: false).
 * @param syntax Adblock syntax (optional, default: Common).
 *
 * @returns Network rule node.
 */
function createNetworkRuleNode(pattern, modifiers = undefined, exception = false, syntax = AdblockSyntax.Common) {
    const result = {
        category: RuleCategory.Network,
        type: NetworkRuleType.NetworkRule,
        syntax,
        exception,
        pattern: {
            type: 'Value',
            value: pattern,
        },
    };
    if (!isUndefined(modifiers)) {
        result.modifiers = clone(modifiers);
    }
    return result;
}

export { createNetworkRuleNode };
