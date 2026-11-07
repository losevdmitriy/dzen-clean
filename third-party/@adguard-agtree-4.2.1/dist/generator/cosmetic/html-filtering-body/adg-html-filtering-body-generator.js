/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { BaseGenerator } from '../../base-generator.js';
import { HtmlFilteringBodyGenerator } from './html-filtering-body-generator.js';
import { QuoteUtils } from '../../../utils/quotes.js';

/**
 * AdGuard HTML Filtering body generator.
 */
class AdgHtmlFilteringBodyGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the AdGuard HTML filtering rule body.
     *
     * @param node HTML filtering rule body.
     *
     * @returns String representation of the rule body.
     *
     * @throws Error if the rule body is invalid.
     */
    static generate(node) {
        const raw = HtmlFilteringBodyGenerator.generate(node);
        return QuoteUtils.unescapeAttributeDoubleQuotes(raw);
    }
}

export { AdgHtmlFilteringBodyGenerator };
