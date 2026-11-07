/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { EMPTY, LF, CR, CRLF } from '../utils/constants.js';
import { BaseGenerator } from './base-generator.js';
import { RuleGenerator } from './rule-generator.js';

/**
 * Generates a serialized filter list.
 */
class FilterListGenerator extends BaseGenerator {
    /**
     * Serializes a whole adblock filter list (list of rules).
     *
     * @param ast AST to generate.
     * @param preferRaw If `true`, then the parser will use `raws.text` property of each rule
     * if it is available. Default is `false`.
     * @param tolerant If `true`, errors during rule generation will be logged to the console and invalid rules
     * will be skipped. If `false`, an error will be thrown on the first invalid rule. Default is `true`.
     *
     * @returns Serialized filter list.
     */
    static generate(ast, preferRaw = false, tolerant = true) {
        let result = EMPTY;
        for (let i = 0; i < ast.children.length; i += 1) {
            const rule = ast.children[i];
            if (preferRaw && rule.raws?.text) {
                result += rule.raws.text;
            }
            else {
                try {
                    result += RuleGenerator.generate(rule);
                }
                catch (error) {
                    if (tolerant) {
                        // eslint-disable-next-line no-console
                        console.error(`Error when generating: ${error}`);
                    }
                    else {
                        throw new Error(String(error));
                    }
                }
            }
            switch (rule.raws?.nl) {
                case 'crlf':
                    result += CRLF;
                    break;
                case 'cr':
                    result += CR;
                    break;
                case 'lf':
                    result += LF;
                    break;
                default:
                    if (i !== ast.children.length - 1) {
                        result += LF;
                    }
                    break;
            }
        }
        return result;
    }
}

export { FilterListGenerator };
