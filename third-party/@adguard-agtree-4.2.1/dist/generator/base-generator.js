/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { NotImplementedError } from '../errors/not-implemented-error.js';

/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @file Base generator class.
 */
/**
 * Base class for generators. Each generator should extend this class.
 */
class BaseGenerator {
    /**
     * Generates a string from the AST node.
     *
     * @param node AST node to generate a string from.
     */
    static generate(node) {
        throw new NotImplementedError();
    }
}

export { BaseGenerator };
