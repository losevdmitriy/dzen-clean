/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { RuleCategory, NetworkRuleType } from '../nodes/index.js';
import { EMPTY } from '../utils/constants.js';
import { BaseGenerator } from './base-generator.js';
import { CommentRuleGenerator } from './comment/comment-rule-generator.js';
import { CosmeticRuleGenerator } from './cosmetic/cosmetic-rule-generator.js';
import { HostRuleGenerator } from './network/host-rule-generator.js';
import { NetworkRuleGenerator } from './network/network-rule-generator.js';

/**
 * RuleGenerator is responsible for converting adblock rule ASTs to their string representation.
 */
class RuleGenerator extends BaseGenerator {
    /**
     * Converts a rule AST to a string.
     *
     * @param ast Adblock rule AST.
     *
     * @returns Raw string.
     *
     * @example
     * Take a look at the following example:
     * ```js
     * // Parse the rule to the AST
     * const ast = RuleParser.parse("example.org##.banner");
     * // Generate the rule from the AST
     * const raw = RuleParser.generate(ast);
     * // Print the generated rule
     * console.log(raw); // "example.org##.banner"
     * ```
     */
    static generate(ast) {
        switch (ast.category) {
            // Empty lines
            case RuleCategory.Empty:
                return EMPTY;
            // Invalid rules
            case RuleCategory.Invalid:
                return ast.raw;
            // Comment rules
            case RuleCategory.Comment:
                return CommentRuleGenerator.generate(ast);
            // Cosmetic / non-basic rules
            case RuleCategory.Cosmetic:
                return CosmeticRuleGenerator.generate(ast);
            // Network / basic rules
            case RuleCategory.Network:
                switch (ast.type) {
                    case NetworkRuleType.HostRule:
                        return HostRuleGenerator.generate(ast);
                    case NetworkRuleType.NetworkRule:
                        return NetworkRuleGenerator.generate(ast);
                    default:
                        throw new Error('Unknown network rule type');
                }
            default:
                throw new Error('Unknown rule category');
        }
    }
}

export { RuleGenerator };
