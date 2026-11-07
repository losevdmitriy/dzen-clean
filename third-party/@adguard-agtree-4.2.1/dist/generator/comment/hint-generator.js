/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { OPEN_PARENTHESIS, COMMA, CLOSE_PARENTHESIS, EMPTY } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';
import { ParameterListGenerator } from '../misc/parameter-list-generator.js';

/**
 * Hint generator.
 */
class HintGenerator extends BaseGenerator {
    /**
     * Generates a string representation of a hint.
     *
     * @param hint Hint AST node.
     *
     * @returns String representation of the hint.
     */
    static generate(hint) {
        let result = EMPTY;
        result += hint.name.value;
        if (hint.params && hint.params.children.length > 0) {
            result += OPEN_PARENTHESIS;
            result += ParameterListGenerator.generate(hint.params, COMMA);
            result += CLOSE_PARENTHESIS;
        }
        return result;
    }
}

export { HintGenerator };
