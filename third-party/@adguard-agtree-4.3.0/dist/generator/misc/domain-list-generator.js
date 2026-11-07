/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { BaseGenerator } from '../base-generator.js';
import { ListItemsGenerator } from './list-items-generator.js';

/**
 * Domain list generator.
 */
class DomainListGenerator extends BaseGenerator {
    /**
     * Converts a domain list node to a string.
     *
     * @param node Domain list node.
     *
     * @returns Raw string.
     */
    static generate(node) {
        return ListItemsGenerator.generate(node.children, node.separator);
    }
}

export { DomainListGenerator };
