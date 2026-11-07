/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { BaseGenerator } from '../../base-generator.js';
import { ValueGenerator } from '../../misc/value-generator.js';
import { SelectorListGenerator } from '../selector/selector-list-generator.js';

/**
 * HTML Filtering body generator.
 */
class HtmlFilteringBodyGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the HTML filtering rule body.
     *
     * @param node HTML filtering rule body.
     *
     * @returns String representation of the rule body.
     *
     * @throws Error if the rule body is invalid.
     */
    static generate(node) {
        if (node.type === 'Value') {
            return ValueGenerator.generate(node);
        }
        return SelectorListGenerator.generate(node.selectorList);
    }
}

export { HtmlFilteringBodyGenerator };
