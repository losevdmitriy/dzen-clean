/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { SPACE, HINT_MARKER } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';
import { HintGenerator } from './hint-generator.js';

/**
 * Hint comment generator.
 */
class HintCommentGenerator extends BaseGenerator {
    /**
     * Converts a hint rule node to a raw string.
     *
     * @param node Hint rule node.
     *
     * @returns Raw string.
     */
    static generate(node) {
        let result = HINT_MARKER + SPACE;
        result += node.children.map(HintGenerator.generate).join(SPACE);
        return result;
    }
}

export { HintCommentGenerator };
