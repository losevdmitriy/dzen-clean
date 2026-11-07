/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { EMPTY, COMMA, SPACE } from '../../../utils/constants.js';
import { BaseGenerator } from '../../base-generator.js';
import { ComplexSelectorGenerator } from './complex-selector-generator.js';

/**
 * Selector list generator.
 */
class SelectorListGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the selector list.
     *
     * @param node Selector list node.
     *
     * @returns String representation of the selector list.
     *
     * @throws Error if the `node` is invalid.
     */
    static generate(node) {
        if (node.children.length === 0) {
            throw new Error('Selector list cannot be empty');
        }
        const result = [];
        for (let i = 0; i < node.children.length; i += 1) {
            const complexSelector = node.children[i];
            if (i > 0) {
                result.push(COMMA);
                result.push(SPACE);
            }
            result.push(ComplexSelectorGenerator.generate(complexSelector));
        }
        return result.join(EMPTY);
    }
}

export { SelectorListGenerator };
