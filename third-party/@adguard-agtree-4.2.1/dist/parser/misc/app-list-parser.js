/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { ListItemNodeType, ListNodeType } from '../../nodes/index.js';
import { PIPE } from '../../utils/constants.js';
import { BaseParser } from '../base-parser.js';
import { defaultParserOptions } from '../options.js';
import { ListItemsParser } from './list-items-parser.js';

/**
 * `AppListParser` is responsible for parsing an app list.
 *
 * @see {@link https://adguard.app/kb/general/ad-filtering/create-own-filters/#app-modifier}
 */
class AppListParser extends BaseParser {
    /**
     * Parses an app list which items are separated by `|`,
     * e.g. `Example.exe|com.example.osx`.
     *
     * @param raw Raw input to parse.
     * @param options Global parser options.
     * @param baseOffset Starting offset of the input. Node locations are calculated relative to this offset.
     *
     * @returns App list AST.
     *
     * @throws An {@link AdblockSyntaxError} if the app list is syntactically invalid.
     * @throws An {@link Error} if the options are invalid.
     */
    static parse(raw, options = defaultParserOptions, baseOffset = 0) {
        const result = {
            type: ListNodeType.AppList,
            separator: PIPE,
            children: ListItemsParser.parse(raw, options, baseOffset, PIPE, ListItemNodeType.App),
        };
        if (options.isLocIncluded) {
            result.start = baseOffset;
            result.end = baseOffset + raw.length;
        }
        return result;
    }
}

export { AppListParser };
