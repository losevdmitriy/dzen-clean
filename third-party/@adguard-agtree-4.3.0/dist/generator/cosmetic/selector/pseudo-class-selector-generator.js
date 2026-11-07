/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { OPEN_PARENTHESIS, CLOSE_PARENTHESIS, EMPTY, COLON } from '../../../utils/constants.js';
import { BaseGenerator } from '../../base-generator.js';
import { ValueGenerator } from '../../misc/value-generator.js';

/**
 * Pseudo-class selector generator.
 */
class PseudoClassSelectorGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the pseudo-class selector.
     *
     * @param node Pseudo-class selector node.
     *
     * @returns String representation of the pseudo-class selector.
     */
    static generate(node) {
        const result = [];
        result.push(COLON);
        result.push(ValueGenerator.generate(node.name));
        if (node.argument) {
            result.push(OPEN_PARENTHESIS);
            result.push(ValueGenerator.generate(node.argument));
            result.push(CLOSE_PARENTHESIS);
        }
        return result.join(EMPTY);
    }
}

export { PseudoClassSelectorGenerator };
