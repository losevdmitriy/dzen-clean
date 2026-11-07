/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { SPACE } from '../../../utils/constants.js';
import { BaseGenerator } from '../../base-generator.js';

/**
 * Selector combinator generator.
 */
class SelectorCombinatorGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the selector combinator.
     *
     * @param node Selector combinator node.
     *
     * @returns String representation of the selector combinator.
     */
    static generate(node) {
        // For descendant combinator, we don't need to add spaces around it
        if (node.value === ' ') {
            return node.value;
        }
        return SPACE + node.value + SPACE;
    }
}

export { SelectorCombinatorGenerator };
