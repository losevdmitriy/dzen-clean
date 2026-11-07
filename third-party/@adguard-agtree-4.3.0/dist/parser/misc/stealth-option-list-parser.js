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

const STEALTH_OPTION_LIST_SEPARATOR = PIPE;
/**
 * `StealthOptionListParser` is responsible for parsing a list of stealth options.
 *
 * @see {@link https://adguard.app/kb/general/ad-filtering/create-own-filters/#stealth-modifier}
 */
class StealthOptionListParser extends BaseParser {
    /**
     * Parses a stealth option list which items are separated by `|`,
     * e.g. `dpi|ip`.
     *
     * @param raw Raw input to parse.
     * @param options Global parser options.
     * @param baseOffset Starting offset of the input. Node locations are calculated relative to this offset.
     *
     * @returns Stealth option list AST.
     *
     * @throws An {@link AdblockSyntaxError} if the stealth option list is syntactically invalid.
     * @throws An {@link Error} if the options are invalid.
     */
    static parse(raw, options = defaultParserOptions, baseOffset = 0) {
        const result = {
            type: ListNodeType.StealthOptionList,
            separator: STEALTH_OPTION_LIST_SEPARATOR,
            children: ListItemsParser.parse(raw, options, baseOffset, STEALTH_OPTION_LIST_SEPARATOR, ListItemNodeType.StealthOption),
        };
        if (options.isLocIncluded) {
            result.start = baseOffset;
            result.end = baseOffset + raw.length;
        }
        return result;
    }
}

export { StealthOptionListParser };
