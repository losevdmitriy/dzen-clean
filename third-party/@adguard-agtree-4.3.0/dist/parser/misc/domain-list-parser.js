/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { ListItemNodeType, ListNodeType } from '../../nodes/index.js';
import { COMMA, PIPE } from '../../utils/constants.js';
import { BaseParser } from '../base-parser.js';
import { defaultParserOptions } from '../options.js';
import { ListItemsParser } from './list-items-parser.js';

/**
 * `DomainListParser` is responsible for parsing a domain list.
 *
 * @see {@link https://help.eyeo.com/adblockplus/how-to-write-filters#elemhide_domains}
 *
 * @example
 * - If the rule is `example.com,~example.net##.ads`, the domain list is `example.com,~example.net`.
 * - If the rule is `ads.js^$script,domains=example.com|~example.org`, the domain list is `example.com|~example.org`.
 * This parser is responsible for parsing these domain lists.
 */
class DomainListParser extends BaseParser {
    /**
     * Parses a domain list, eg. `example.com,example.org,~example.org`.
     *
     * @param raw Raw input to parse.
     * @param options Global parser options.
     * @param baseOffset Starting offset of the input. Node locations are calculated relative to this offset.
     * @param separator Separator character (default: comma).
     *
     * @returns Domain list AST.
     *
     * @throws An {@link AdblockSyntaxError} if the domain list is syntactically invalid.
     * @throws An {@link Error} if the options are invalid.
     */
    static parse(raw, options = defaultParserOptions, baseOffset = 0, separator = COMMA) {
        if (separator !== COMMA && separator !== PIPE) {
            throw new Error(`Invalid separator: ${separator}`);
        }
        const result = {
            type: ListNodeType.DomainList,
            separator,
            children: ListItemsParser.parse(raw, options, baseOffset, separator, ListItemNodeType.Domain),
        };
        if (options.isLocIncluded) {
            result.start = baseOffset;
            result.end = baseOffset + raw.length;
        }
        return result;
    }
}

export { DomainListParser };
