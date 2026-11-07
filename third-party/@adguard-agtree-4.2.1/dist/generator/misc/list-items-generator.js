/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { NEGATION_MARKER, EMPTY } from '../../utils/constants.js';

/**
 * Utility class for generating string representations of list items.
 */
class ListItemsGenerator {
    /**
     * Generates a string representation of a list item.
     *
     * @template T Type of the list item.
     *
     * @param item List item to generate.
     *
     * @returns String representation of the list item.
     */
    static generateListItem = (item) => {
        return `${item.exception ? NEGATION_MARKER : EMPTY}${item.value}`;
    };
    /**
     * Generates a string representation of a list of items.
     *
     * @template T Type of the list items.
     *
     * @param items List of items to generate.
     * @param separator Separator character.
     *
     * @returns String representation of the list of items.
     */
    static generate = (items, separator) => {
        return items.map(ListItemsGenerator.generateListItem)
            .join(separator);
    };
}

export { ListItemsGenerator };
