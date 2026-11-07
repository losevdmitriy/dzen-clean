/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { MODIFIER_ASSIGN_OPERATOR, EMPTY, NEGATION_MARKER } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';

/**
 * Generator for modifier nodes.
 */
class ModifierGenerator extends BaseGenerator {
    /**
     * Converts a modifier AST node to a string.
     *
     * @param modifier Modifier AST node to convert.
     *
     * @returns String representation of the modifier.
     */
    static generate(modifier) {
        let result = EMPTY;
        if (modifier.exception) {
            result += NEGATION_MARKER;
        }
        result += modifier.name.value;
        if (modifier.value !== undefined) {
            result += MODIFIER_ASSIGN_OPERATOR;
            result += modifier.value.value;
        }
        return result;
    }
}

export { ModifierGenerator };
