/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { AdblockSyntax } from '../../utils/adblockers.js';
import { COLON, CSS_NOT_PSEUDO, OPEN_PARENTHESIS, CLOSE_PARENTHESIS, SPACE, EMPTY } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';
import { CosmeticRuleBodyGenerator } from './cosmetic-rule-body-generator.js';
import { CosmeticRulePatternGenerator } from './cosmetic-rule-pattern-generator.js';

/**
 * `CosmeticRuleGenerator` is responsible for generating cosmetic rules from their AST representation.
 *
 * This class takes a parsed cosmetic rule Abstract Syntax Tree (AST) and converts it back into a raw string format.
 * It handles the generation of the pattern, separator, uBO rule modifiers, and the rule body.
 */
class CosmeticRuleGenerator extends BaseGenerator {
    /**
     * Converts a cosmetic rule AST into a string.
     *
     * @param node Cosmetic rule AST.
     *
     * @returns Raw string.
     */
    static generate(node) {
        let result = EMPTY;
        // Pattern
        result += CosmeticRulePatternGenerator.generate(node);
        // Separator
        result += node.separator.value;
        // uBO rule modifiers
        if (node.syntax === AdblockSyntax.Ubo && node.modifiers) {
            node.modifiers.children.forEach((modifier) => {
                if (modifier.exception) {
                    result += COLON;
                    result += CSS_NOT_PSEUDO;
                    result += OPEN_PARENTHESIS;
                }
                result += COLON;
                result += modifier.name.value;
                if (modifier.value) {
                    result += OPEN_PARENTHESIS;
                    result += modifier.value.value;
                    result += CLOSE_PARENTHESIS;
                }
                if (modifier.exception) {
                    result += CLOSE_PARENTHESIS;
                }
            });
            // If there are at least one modifier, add a space
            if (node.modifiers.children.some((modifier) => modifier?.name.value)) {
                result += SPACE;
            }
        }
        // Body
        result += CosmeticRuleBodyGenerator.generate(node);
        return result;
    }
}

export { CosmeticRuleGenerator };
