/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { EMPTY } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';
import { ValueGenerator } from '../misc/value-generator.js';

/**
 * Simple comment generator.
 */
class SimpleCommentGenerator extends BaseGenerator {
    /**
     * Converts a comment rule node to a string.
     *
     * @param node Comment rule node.
     *
     * @returns Raw string.
     */
    static generate(node) {
        let result = EMPTY;
        result += ValueGenerator.generate(node.marker);
        result += ValueGenerator.generate(node.text);
        return result;
    }
}

export { SimpleCommentGenerator };
