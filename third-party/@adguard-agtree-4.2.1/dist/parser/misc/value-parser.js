/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { BaseParser } from '../base-parser.js';
import { defaultParserOptions } from '../options.js';

/**
 * Value parser.
 * This parser is very simple, it just exists to provide a consistent interface for parsing.
 */
class ValueParser extends BaseParser {
    /**
     * Parses a value.
     *
     * @param raw Raw input to parse.
     * @param options Global parser options.
     * @param baseOffset Starting offset of the input. Node locations are calculated relative to this offset.
     *
     * @returns Value node.
     */
    static parse(raw, options = defaultParserOptions, baseOffset = 0) {
        const result = {
            type: 'Value',
            value: raw,
        };
        if (options.isLocIncluded) {
            result.start = baseOffset;
            result.end = baseOffset + raw.length;
        }
        return result;
    }
}

export { ValueParser };
