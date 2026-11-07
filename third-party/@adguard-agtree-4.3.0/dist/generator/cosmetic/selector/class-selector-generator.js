/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { DOT } from '../../../utils/constants.js';
import { BaseGenerator } from '../../base-generator.js';

/**
 * Class selector generator.
 */
class ClassSelectorGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the class selector.
     *
     * @param node Class selector node.
     *
     * @returns String representation of the class selector.
     */
    static generate(node) {
        return DOT + node.value;
    }
}

export { ClassSelectorGenerator };
