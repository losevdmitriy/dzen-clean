/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { SPACE, COLON, EMPTY } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';
import { ValueGenerator } from '../misc/value-generator.js';

/**
 * Metadata comment generator.
 */
class MetadataCommentGenerator extends BaseGenerator {
    /**
     * Converts a metadata comment rule node to a string.
     *
     * @param node Metadata comment rule node.
     *
     * @returns Raw string.
     */
    static generate(node) {
        let result = EMPTY;
        result += ValueGenerator.generate(node.marker);
        result += SPACE;
        result += ValueGenerator.generate(node.header);
        result += COLON;
        result += SPACE;
        result += ValueGenerator.generate(node.value);
        return result;
    }
}

export { MetadataCommentGenerator };
