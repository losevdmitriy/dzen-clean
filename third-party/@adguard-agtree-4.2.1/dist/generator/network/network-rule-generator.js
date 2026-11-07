/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { NETWORK_RULE_SEPARATOR, EMPTY, NETWORK_RULE_EXCEPTION_MARKER } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';
import { ModifierListGenerator } from '../misc/modifier-list-generator.js';

/**
 * Generator for network rule nodes.
 */
class NetworkRuleGenerator extends BaseGenerator {
    /**
     * Generates a string from a network rule AST node.
     *
     * @param node Network rule node to generate a string from.
     *
     * @returns Generated string representation of the network rule.
     */
    static generate(node) {
        let result = EMPTY;
        // If the rule is an exception, add the exception marker: `@@||example.org`
        if (node.exception) {
            result += NETWORK_RULE_EXCEPTION_MARKER;
        }
        // Add the pattern: `||example.org`
        result += node.pattern.value;
        // If there are modifiers, add a separator and the modifiers: `||example.org$important`
        if (node.modifiers && node.modifiers.children.length > 0) {
            result += NETWORK_RULE_SEPARATOR;
            result += ModifierListGenerator.generate(node.modifiers);
        }
        return result;
    }
}

export { NetworkRuleGenerator };
