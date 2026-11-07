/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { HASHMARK } from '../../../utils/constants.js';
import { BaseGenerator } from '../../base-generator.js';

/**
 * ID selector generator.
 */
class IdSelectorGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the ID selector.
     *
     * @param node ID selector node.
     *
     * @returns String representation of the ID selector.
     */
    static generate(node) {
        return HASHMARK + node.value;
    }
}

export { IdSelectorGenerator };
