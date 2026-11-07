/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { SAFARI_CB_AFFINITY, SPACE, OPEN_PARENTHESIS, COMMA, CLOSE_PARENTHESIS, EMPTY, PREPROCESSOR_MARKER } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';
import { LogicalExpressionGenerator } from '../misc/logical-expression-generator.js';
import { ParameterListGenerator } from '../misc/parameter-list-generator.js';
import { ValueGenerator } from '../misc/value-generator.js';

/**
 * Pre-processor comment generator.
 */
class PreProcessorCommentGenerator extends BaseGenerator {
    /**
     * Converts a pre-processor comment node to a string.
     *
     * @param node Pre-processor comment node.
     *
     * @returns Raw string.
     */
    static generate(node) {
        let result = EMPTY;
        result += PREPROCESSOR_MARKER;
        result += node.name.value;
        if (node.params) {
            let allowSpaceBetweenParams = true;
            // Space between cb is not allowed for "safari_cb_affinity" directive.
            if (node.name.value === SAFARI_CB_AFFINITY) {
                allowSpaceBetweenParams = false;
            }
            // Space is not allowed after "safari_cb_affinity" directive, so we need to handle it separately.
            if (node.name.value !== SAFARI_CB_AFFINITY) {
                result += SPACE;
            }
            if (node.params.type === 'Value') {
                result += ValueGenerator.generate(node.params);
            }
            else if (node.params.type === 'ParameterList') {
                result += OPEN_PARENTHESIS;
                result += ParameterListGenerator.generate(node.params, COMMA, allowSpaceBetweenParams);
                result += CLOSE_PARENTHESIS;
            }
            else {
                result += LogicalExpressionGenerator.generate(node.params);
            }
        }
        return result;
    }
}

export { PreProcessorCommentGenerator };
