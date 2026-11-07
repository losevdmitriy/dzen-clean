/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
/**
 * @file Conversion result interface and helper functions.
 */
/**
 * Helper function to create a generic conversion result.
 *
 * @template T Type of the item to convert.
 * @template U Type of the conversion result (defaults to `T`, but can be `T[]` as well).
 *
 * @param result Conversion result.
 * @param isConverted Indicates whether the input item was converted.
 *
 * @returns Generic conversion result.
 */
// eslint-disable-next-line max-len
function createConversionResult(result, isConverted) {
    return {
        result,
        isConverted,
    };
}
/**
 * Helper function to create a node conversion result.
 *
 * @template T Type of the node (extends `Node`).
 *
 * @param nodes Array of nodes.
 * @param isConverted Indicates whether the input item was converted.
 *
 * @returns Node conversion result.
 */
function createNodeConversionResult(nodes, isConverted) {
    return createConversionResult(nodes, isConverted);
}

export { createConversionResult, createNodeConversionResult };
