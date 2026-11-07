/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { NotImplementedError } from '../errors/not-implemented-error.js';

/**
 * @file Base parser class.
 */
/**
 * Base class for parsers. Each parser should extend this class.
 */
class BaseParser {
    /**
     * Parses the input string and returns the AST node.
     *
     * @param input Input string to parse.
     * @param options Parser options, see {@link ParserOptions}.
     * @param baseOffset Base offset. Locations in the AST node will be relative to this offset.
     * @param args Additional, parser-specific arguments, if needed.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static parse(input, options, baseOffset, ...args) {
        throw new NotImplementedError();
    }
}

export { BaseParser };
