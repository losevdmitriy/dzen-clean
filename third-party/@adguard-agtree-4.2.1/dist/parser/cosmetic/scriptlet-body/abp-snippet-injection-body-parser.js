/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { AbpSnippetInjectionBodyCommon } from '../../../common/abp-snippet-injection-body-common.js';
import { AdblockSyntaxError } from '../../../errors/adblock-syntax-error.js';
import { SEMICOLON, SPACE } from '../../../utils/constants.js';
import { StringUtils } from '../../../utils/string.js';
import { BaseParser } from '../../base-parser.js';
import { ParameterListParser } from '../../misc/parameter-list-parser.js';
import { defaultParserOptions } from '../../options.js';

/**
 * @file UBlock scriptlet injection body parser.
 */
/**
 * `AbpSnippetInjectionBodyParser` is responsible for parsing the body of an Adblock Plus-style snippet rule.
 *
 * Please note that the parser will parse any scriptlet rule if it is syntactically correct.
 * For example, it will parse this:.
 * ```adblock
 * example.com#$#snippet0 arg0
 * ```
 *
 * But it didn't check if the scriptlet `snippet0` actually supported by any adblocker..
 *
 * @see {@link https://help.eyeo.com/adblockplus/snippet-filters-tutorial}
 */
class AbpSnippetInjectionBodyParser extends BaseParser {
    /**
     * Parses the body of an Adblock Plus-style snippet rule.
     *
     * @param raw Raw input to parse.
     * @param options Global parser options.
     * @param baseOffset Starting offset of the input. Node locations are calculated relative to this offset.
     *
     * @returns Node of the parsed scriptlet call body.
     *
     * @throws If the body is syntactically incorrect.
     *
     * @example
     * ```
     * #$#snippet0 arg0
     * ```
     */
    static parse(raw, options = defaultParserOptions, baseOffset = 0) {
        const result = {
            type: 'ScriptletInjectionRuleBody',
            children: [],
        };
        if (options.isLocIncluded) {
            result.start = baseOffset;
            result.end = baseOffset + raw.length;
        }
        let offset = 0;
        // Skip leading spaces
        offset = StringUtils.skipWS(raw, offset);
        while (offset < raw.length) {
            offset = StringUtils.skipWS(raw, offset);
            const scriptletCallStart = offset;
            // Find the next semicolon or the end of the string
            let semicolonIndex = StringUtils.findUnescapedNonStringNonRegexChar(raw, SEMICOLON, offset);
            if (semicolonIndex === -1) {
                semicolonIndex = raw.length;
            }
            const scriptletCallEnd = Math.max(StringUtils.skipWSBack(raw, semicolonIndex - 1) + 1, scriptletCallStart);
            const params = ParameterListParser.parse(raw.slice(scriptletCallStart, scriptletCallEnd), options, baseOffset + scriptletCallStart, SPACE);
            // Parse the scriptlet call
            result.children.push(params);
            // Skip the semicolon
            offset = semicolonIndex + 1;
        }
        if (result.children.length === 0) {
            throw new AdblockSyntaxError(AbpSnippetInjectionBodyCommon.ERROR_MESSAGES.EMPTY_SCRIPTLET_CALL, baseOffset, baseOffset + raw.length);
        }
        return result;
    }
}

export { AbpSnippetInjectionBodyParser };
