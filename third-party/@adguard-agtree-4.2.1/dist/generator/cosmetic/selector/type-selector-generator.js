/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { BaseGenerator } from '../../base-generator.js';

/**
 * Type selector generator.
 */
class TypeSelectorGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the type selector.
     *
     * @param node Type selector node.
     *
     * @returns String representation of the type selector.
     */
    static generate(node) {
        return node.value;
    }
}

export { TypeSelectorGenerator };
