/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
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
