/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { QuoteUtils } from '../../../utils/quotes.js';
import { BaseParser } from '../../base-parser.js';
import { defaultParserOptions } from '../../options.js';
import { HtmlFilteringBodyParser } from './html-filtering-body-parser.js';

/**
 * `AdgHtmlFilteringBodyParser` is responsible for parsing the body of an AdGuard-style HTML filtering rule.
 *
 * Please note that the parser will parse any HTML filtering rule if it is syntactically correct.
 * For example, it will parse this:.
 * ```adblock
 * example.com$$div[special-attr="value"]
 * ```
 *
 * But it didn't check if the attribute `special-attr` actually supported by any adblocker..
 *
 * @see {@link https://www.w3.org/TR/selectors-4}
 * @see {@link https://adguard.com/kb/general/ad-filtering/create-own-filters/#html-filtering-rules}
 */
class AdgHtmlFilteringBodyParser extends BaseParser {
    /**
     * Parses the body of an AdGuard-style HTML filtering rule.
     *
     * @param raw Raw input to parse.
     * @param options Global parser options.
     * @param baseOffset Starting offset of the input. Node locations are calculated relative to this offset.
     *
     * @returns Node of the parsed HTML filtering rule body.
     *
     * @throws If the body is syntactically incorrect.
     *
     * @example
     * ```
     * div[some_attribute="some_value"]
     * ```
     */
    static parse(raw, options = defaultParserOptions, baseOffset = 0) {
        // Only escape AdGuard's `""` → `\"` when the body will actually be
        // CSS-parsed. When `parseHtmlFilteringRuleBodies` is false the raw
        // string is stored as-is in a Value node; escaping here would cause
        // double-escaping when the converter later re-parses it.
        //
        // Needed for proper `[tag-content]` conversion (to `:contains()`)
        // where `""` must be used to escape `"`:
        // https://adguard.com/kb/general/ad-filtering/create-own-filters/#tag-content
        const input = options.parseHtmlFilteringRuleBodies
            ? QuoteUtils.escapeAttributeDoubleQuotes(raw)
            : raw;
        return HtmlFilteringBodyParser.parse(input, options, baseOffset);
    }
}

export { AdgHtmlFilteringBodyParser };
