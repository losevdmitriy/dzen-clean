/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { UboPseudoName } from '../../common/ubo-selector-common.js';
import { CosmeticRuleType } from '../../nodes/index.js';
import { AdblockSyntax } from '../../utils/adblockers.js';
import { UBO_HTML_MASK, CLOSE_PARENTHESIS, SPACE, COLON, OPEN_PARENTHESIS, EMPTY } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';
import { AdgCssInjectionGenerator } from '../css/adg-css-injection-generator.js';
import { AdgHtmlFilteringBodyGenerator } from './html-filtering-body/adg-html-filtering-body-generator.js';
import { UboHtmlFilteringBodyGenerator } from './html-filtering-body/ubo-html-filtering-body-generator.js';
import { AbpSnippetInjectionBodyGenerator } from './scriptlet-body/abp-snippet-injection-body-generator.js';
import { AdgScriptletInjectionBodyGenerator } from './scriptlet-body/adg-scriptlet-injection-body-generator.js';
import { UboScriptletInjectionBodyGenerator } from './scriptlet-body/ubo-scriptlet-injection-body-generator.js';

/**
 * Cosmetic rule body generator.
 */
class CosmeticRuleBodyGenerator extends BaseGenerator {
    /**
     * Generates the rule body from the node.
     *
     * @param node Cosmetic rule node.
     *
     * @returns Raw rule body.
     *
     * @throws Error if the rule type is unknown.
     *
     * @example
     * - '##.foo' → '.foo'
     * - 'example.com,example.org##.foo' → '.foo'
     * - 'example.com#%#//scriptlet('foo')' → '//scriptlet('foo')'
     */
    static generate(node) {
        let result = EMPTY;
        switch (node.type) {
            case CosmeticRuleType.ElementHidingRule:
                result = node.body.selectorList.value;
                break;
            case CosmeticRuleType.CssInjectionRule:
                if (node.syntax === AdblockSyntax.Adg || node.syntax === AdblockSyntax.Abp) {
                    result = AdgCssInjectionGenerator.generate(node.body);
                }
                else if (node.syntax === AdblockSyntax.Ubo) {
                    if (node.body.mediaQueryList) {
                        result += COLON;
                        result += UboPseudoName.MatchesMedia;
                        result += OPEN_PARENTHESIS;
                        result += node.body.mediaQueryList.value;
                        result += CLOSE_PARENTHESIS;
                        result += SPACE;
                    }
                    result += node.body.selectorList.value;
                    if (node.body.remove) {
                        result += COLON;
                        result += UboPseudoName.Remove;
                        result += OPEN_PARENTHESIS;
                        result += CLOSE_PARENTHESIS;
                    }
                    else if (node.body.declarationList) {
                        result += COLON;
                        result += UboPseudoName.Style;
                        result += OPEN_PARENTHESIS;
                        result += node.body.declarationList.value;
                        result += CLOSE_PARENTHESIS;
                    }
                }
                break;
            case CosmeticRuleType.HtmlFilteringRule:
                switch (node.syntax) {
                    case AdblockSyntax.Adg:
                        result = AdgHtmlFilteringBodyGenerator.generate(node.body);
                        break;
                    case AdblockSyntax.Ubo:
                        result = UBO_HTML_MASK + UboHtmlFilteringBodyGenerator.generate(node.body);
                        break;
                    case AdblockSyntax.Abp:
                        throw new Error('ABP does not support HTML filtering rules');
                    default:
                        throw new Error('HTML filtering rule should have an explicit syntax');
                }
                break;
            case CosmeticRuleType.JsInjectionRule:
                result = node.body.value;
                break;
            case CosmeticRuleType.ScriptletInjectionRule:
                switch (node.syntax) {
                    case AdblockSyntax.Adg:
                        result = AdgScriptletInjectionBodyGenerator.generate(node.body);
                        break;
                    case AdblockSyntax.Abp:
                        result = AbpSnippetInjectionBodyGenerator.generate(node.body);
                        break;
                    case AdblockSyntax.Ubo:
                        result = UboScriptletInjectionBodyGenerator.generate(node.body);
                        break;
                    default:
                        throw new Error('Scriptlet rule should have an explicit syntax');
                }
                break;
            default:
                throw new Error('Unknown cosmetic rule type');
        }
        return result;
    }
}

export { CosmeticRuleBodyGenerator };
