/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { BaseGenerator } from '../base-generator.js';

/**
 * Generator for value nodes.
 */
class ValueGenerator extends BaseGenerator {
    /**
     * Converts a value node to a string.
     *
     * @param node Value node.
     *
     * @returns Raw string.
     */
    static generate(node) {
        return node.value;
    }
}

export { ValueGenerator };
