/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import camelCaseKeys from 'camelcase-keys';

/**
 * @file Zod camelCase utility.
 */
/**
 * Transforms Zod schema to camelCase.
 *
 * @see {@link https://github.com/colinhacks/zod/issues/486#issuecomment-1501097361}
 *
 * @param zod Zod schema.
 *
 * @returns Zod schema with camelCase properties.
 */
const zodToCamelCase = (zod) => {
    return zod.transform((val) => camelCaseKeys(val));
};

export { zodToCamelCase };
