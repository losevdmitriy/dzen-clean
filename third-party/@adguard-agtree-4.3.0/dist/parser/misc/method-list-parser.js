/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { ListItemNodeType, ListNodeType } from '../../nodes/index.js';
import { PIPE } from '../../utils/constants.js';
import { BaseParser } from '../base-parser.js';
import { defaultParserOptions } from '../options.js';
import { ListItemsParser } from './list-items-parser.js';

const METHOD_LIST_SEPARATOR = PIPE;
/**
 * `MethodListParser` is responsible for parsing a method list.
 *
 * @see {@link https://adguard.app/kb/general/ad-filtering/create-own-filters/#method-modifier}
 */
class MethodListParser extends BaseParser {
    /**
     * Parses a method list which items are separated by `|`,
     * e.g. `get|post|put`.
     *
     * @param raw Raw input to parse.
     * @param options Global parser options.
     * @param baseOffset Starting offset of the input. Node locations are calculated relative to this offset.
     *
     * @returns Method list AST.
     *
     * @throws An {@link AdblockSyntaxError} if the method list is syntactically invalid.
     * @throws An {@link Error} if the options are invalid.
     */
    static parse(raw, options = defaultParserOptions, baseOffset = 0) {
        const result = {
            type: ListNodeType.MethodList,
            separator: METHOD_LIST_SEPARATOR,
            children: ListItemsParser.parse(raw, options, baseOffset, METHOD_LIST_SEPARATOR, ListItemNodeType.Method),
        };
        if (options.isLocIncluded) {
            result.start = baseOffset;
            result.end = baseOffset + raw.length;
        }
        return result;
    }
}

export { MethodListParser };
