/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { UBO_RESPONSEHEADER_FN } from '../utils/constants.js';

/**
 * Checks whether the given HTML filtering rule body represents a uBlock-style response header removal rule.
 *
 * @param node Potential response header removal rule node.
 *
 * @returns `true` if the node is a response header removal rule, `false` otherwise.
 *
 * @note This method checks `HtmlFilteringRuleBody` because, response header
 * removal rule syntax is same as uBlock-style HTML filtering rule syntax.
 */
function isUboResponseHeaderRemovalRuleBody(node) {
    const { selectorList } = node;
    // Must have exactly one complex selector
    if (selectorList.children.length !== 1) {
        return false;
    }
    const complexSelector = selectorList.children[0];
    // Must have exactly one simple selector
    if (complexSelector.children.length !== 1) {
        return false;
    }
    const simpleSelector = complexSelector.children[0];
    return (
    // Should be a pseudo-class selector
    simpleSelector.type === 'PseudoClassSelector'
        // Pseudo-class selector name should match `UBO_RESPONSEHEADER_FN`
        && simpleSelector.name.value === UBO_RESPONSEHEADER_FN
        // Should have argument
        && simpleSelector.argument !== undefined);
}

export { isUboResponseHeaderRemovalRuleBody };
