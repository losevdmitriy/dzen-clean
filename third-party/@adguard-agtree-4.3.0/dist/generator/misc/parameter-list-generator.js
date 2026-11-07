/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { COMMA, EMPTY, SPACE } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';
import { ValueGenerator } from './value-generator.js';

/**
 * Generator for parameter list nodes.
 */
class ParameterListGenerator extends BaseGenerator {
    /**
     * Converts a parameter list AST to a string.
     *
     * @param params Parameter list AST.
     * @param separator Separator character (default: comma).
     * @param allowSpace Allow space between parameters (default: true).
     *
     * @returns String representation of the parameter list.
     */
    static generate(params, separator = COMMA, allowSpace = true) {
        const collection = [];
        let i = 0;
        for (; i < params.children.length; i += 1) {
            const param = params.children[i];
            if (param === null) {
                collection.push(EMPTY);
            }
            else {
                collection.push(ValueGenerator.generate(param));
            }
        }
        let result = EMPTY;
        // if allowSpace is true, join with a single separator
        // without space
        if (!allowSpace && separator !== SPACE) {
            result = collection.join(separator);
        }
        else {
            // join parameters with separator
            // if the separator is a space, join with a single space
            result = collection.join(separator === SPACE ? separator : `${separator}${SPACE}`);
        }
        return result;
    }
}

export { ParameterListGenerator };
