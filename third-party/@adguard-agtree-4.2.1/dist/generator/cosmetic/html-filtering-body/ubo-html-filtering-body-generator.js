/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { isUboResponseHeaderRemovalRuleBody } from '../../../common/ubo-html-filtering-body-common.js';
import { EMPTY, UBO_RESPONSEHEADER_FN, OPEN_PARENTHESIS, CLOSE_PARENTHESIS } from '../../../utils/constants.js';
import { BaseGenerator } from '../../base-generator.js';
import { ValueGenerator } from '../../misc/value-generator.js';
import { HtmlFilteringBodyGenerator } from './html-filtering-body-generator.js';

/**
 * UBlock HTML Filtering body generator.
 */
class UboHtmlFilteringBodyGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the uBlock HTML filtering rule body
     * and also uBlock-style response header removal rules.
     *
     * @param node HTML filtering rule body.
     *
     * @returns String representation of the rule body.
     *
     * @throws Error if the rule body is invalid.
     */
    static generate(node) {
        // First, check if it's a response header removal rule and return if so
        const responseHeaderBody = UboHtmlFilteringBodyGenerator.generateResponseHeaderRule(node);
        if (responseHeaderBody !== null) {
            return responseHeaderBody;
        }
        return HtmlFilteringBodyGenerator.generate(node);
    }
    /**
     * Generates a string representation of the uBlock-style response header removal rule.
     *
     * @param node Potential response header removal rule node.
     *
     * @returns String representation of the response header removal rule,
     * or `null` if the node is not a response header removal rule.
     *
     * @note This method accepts `HtmlFilteringRuleBody` as `node` because,
     * response header removal rule syntax is same as uBlock-style HTML filtering rule syntax.
     */
    static generateResponseHeaderRule(node) {
        if (node.type !== 'HtmlFilteringRuleBody' || !isUboResponseHeaderRemovalRuleBody(node)) {
            return null;
        }
        // Length of AST nodes, types of nodes, non-null argument
        // check are already done in `isUboResponseHeaderRemovalRuleBody()`
        const { selectorList } = node;
        const complexSelector = selectorList.children[0];
        const pseudoClass = complexSelector.children[0];
        const headerName = ValueGenerator.generate(pseudoClass.argument);
        const result = [];
        result.push(UBO_RESPONSEHEADER_FN);
        result.push(OPEN_PARENTHESIS);
        result.push(headerName);
        result.push(CLOSE_PARENTHESIS);
        return result.join(EMPTY);
    }
}

export { UboHtmlFilteringBodyGenerator };
