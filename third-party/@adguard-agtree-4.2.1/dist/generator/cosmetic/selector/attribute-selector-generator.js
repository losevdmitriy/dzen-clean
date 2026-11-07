/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { SPACE, CLOSE_SQUARE_BRACKET, EMPTY, OPEN_SQUARE_BRACKET } from '../../../utils/constants.js';
import { QuoteUtils, QuoteType } from '../../../utils/quotes.js';
import { BaseGenerator } from '../../base-generator.js';
import { ValueGenerator } from '../../misc/value-generator.js';

/**
 * Attribute selector generator.
 */
class AttributeSelectorGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the attribute selector.
     *
     * @param node Attribute selector node.
     *
     * @returns String representation of the attribute selector.
     */
    static generate(node) {
        const result = [];
        result.push(OPEN_SQUARE_BRACKET);
        result.push(ValueGenerator.generate(node.name));
        if ('value' in node) {
            result.push(ValueGenerator.generate(node.operator));
            const generatedValue = ValueGenerator.generate(node.value);
            const quotedValue = QuoteUtils.setStringQuoteType(generatedValue, QuoteType.Double);
            result.push(quotedValue);
            if (node.flag) {
                result.push(SPACE);
                result.push(ValueGenerator.generate(node.flag));
            }
        }
        result.push(CLOSE_SQUARE_BRACKET);
        return result.join(EMPTY);
    }
}

export { AttributeSelectorGenerator };
