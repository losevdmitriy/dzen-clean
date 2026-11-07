/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { createModifierListNode, createModifierNode } from '../../ast-utils/modifiers.js';
import { createNetworkRuleNode } from '../../ast-utils/network-rules.js';
import { isUboResponseHeaderRemovalRuleBody } from '../../common/ubo-html-filtering-body-common.js';
import { RuleConversionError } from '../../errors/rule-conversion-error.js';
import { RuleCategory, CosmeticRuleType } from '../../nodes/index.js';
import { UboHtmlFilteringBodyParser } from '../../parser/cosmetic/html-filtering-body/ubo-html-filtering-body-parser.js';
import { AdblockSyntax } from '../../utils/adblockers.js';
import { EMPTY } from '../../utils/constants.js';
import { ADBLOCK_URL_START, ADBLOCK_URL_SEPARATOR } from '../../utils/regexp.js';
import { createNodeConversionResult } from '../base-interfaces/conversion-result.js';
import { RuleConverterBase } from '../base-interfaces/rule-converter-base.js';

/**
 * @file Converter for request header removal rules.
 */
const ADG_REMOVEHEADER_MODIFIER = 'removeheader';
const ERROR_MESSAGES = {
    MULTIPLE_DOMAINS_NOT_SUPPORTED: 'Multiple domains are not supported yet',
};
/**
 * Converter for request header removal rules.
 *
 * @todo Implement `convertToUbo` (ABP currently doesn't support header removal rules).
 */
class HeaderRemovalRuleConverter extends RuleConverterBase {
    /**
     * Converts a header removal rule to AdGuard syntax, if possible.
     *
     * @param rule Rule node to convert.
     *
     * @returns An object which follows the {@link NodeConversionResult} interface. Its `result` property contains
     * the array of converted rule nodes, and its `isConverted` flag indicates whether the original rule was converted.
     * If the rule was not converted, the result array will contain the original node with the same object reference.
     *
     * @throws If the rule is invalid or cannot be converted.
     *
     * @example
     * If the input rule is:
     * ```adblock
     * example.com##^responseheader(header-name)
     * ```
     * The output will be:
     * ```adblock
     * ||example.com^$removeheader=header-name
     * ```
     */
    static convertToAdg(rule) {
        // TODO: Add support for ABP syntax once it starts supporting header removal rules
        // Leave the rule as is if it's not a header removal rule
        if (rule.category !== RuleCategory.Cosmetic || rule.type !== CosmeticRuleType.HtmlFilteringRule) {
            return createNodeConversionResult([rule], false);
        }
        // Handle case when body is raw value string.
        // If so, parse it first as we need to work with AST nodes.
        let body = null;
        if (rule.body.type === 'Value') {
            body = UboHtmlFilteringBodyParser.parseResponseHeaderRule(rule.body.value, {
                isLocIncluded: false,
                parseHtmlFilteringRuleBodies: true,
            });
        }
        else {
            body = rule.body;
        }
        // Check if the rule body is a uBO responseheader(...) function
        if (!body || !isUboResponseHeaderRemovalRuleBody(body)) {
            return createNodeConversionResult([rule], false);
        }
        // Length of AST nodes, types of nodes, non-null argument
        // check are already done in `isUboResponseHeaderRemovalRuleBody()`
        const { selectorList } = body;
        const complexSelector = selectorList.children[0];
        const pseudoClassSelector = complexSelector.children[0];
        const headerName = pseudoClassSelector.argument.value;
        // Prepare network rule pattern
        const pattern = [];
        if (rule.domains.children.length === 1) {
            // If the rule has only one domain, we can use a simple network rule pattern:
            // ||single-domain-from-the-rule^
            pattern.push(ADBLOCK_URL_START, rule.domains.children[0].value, ADBLOCK_URL_SEPARATOR);
        }
        else if (rule.domains.children.length > 1) {
            // TODO: Add support for multiple domains, for example:
            // example.com,example.org,example.net##^responseheader(header-name)
            // We should consider allowing $domain with $removeheader modifier,
            // for example:
            // $removeheader=header-name,domain=example.com|example.org|example.net
            throw new RuleConversionError(ERROR_MESSAGES.MULTIPLE_DOMAINS_NOT_SUPPORTED);
        }
        // Prepare network rule modifiers
        const modifiers = createModifierListNode();
        modifiers.children.push(createModifierNode(ADG_REMOVEHEADER_MODIFIER, headerName));
        // Construct the network rule
        return createNodeConversionResult([
            createNetworkRuleNode(pattern.join(EMPTY), modifiers, 
            // Copy the exception flag
            rule.exception, AdblockSyntax.Adg),
        ], true);
    }
}

export { ERROR_MESSAGES, HeaderRemovalRuleConverter };
