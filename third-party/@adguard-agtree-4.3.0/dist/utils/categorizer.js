/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { CosmeticRuleParser } from '../parser/cosmetic/cosmetic-rule-parser.js';
import { defaultParserOptions } from '../parser/options.js';
import { isNull } from './type-guards.js';

/**
 * Utility functions for categorizing rules.
 */
// TODO: Optimize functions to avoid produce unnecessary data (currently, most of node data is not used).
// TODO: Add support for other rule categories, like network rules (when needed).
class RuleCategorizer {
    /**
     * Determines the type of a given raw cosmetic rule.
     *
     * @param rawRule Raw rule to check.
     *
     * @returns Type of the cosmetic rule or `null` if the rule is cannot be parsed as a cosmetic rule.
     */
    static getCosmeticRuleType(rawRule) {
        try {
            const node = CosmeticRuleParser.parse(rawRule, {
                ...defaultParserOptions,
                isLocIncluded: false,
                includeRaws: false,
            });
            // If rule cannot be recognized as a cosmetic rule, return null.
            if (isNull(node)) {
                return null;
            }
            return node.type;
        }
        catch {
            // Be tolerant to parsing errors and simply return null.
            return null;
        }
    }
}

export { RuleCategorizer };
