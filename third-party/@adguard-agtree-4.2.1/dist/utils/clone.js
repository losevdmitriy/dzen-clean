/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import cloneDeep from 'clone-deep';

/**
 * @file Clone related utilities.
 *
 * We should keep clone related functions in this file. Thus, we just provide
 * a simple interface for cloning values, we use it across the AGTree project,
 * and the implementation "under the hood" can be improved later, if needed.
 */
/**
 * Clones an input value to avoid side effects. Use it only in justified cases,
 * because it can impact performance negatively.
 *
 * @param value Value to clone.
 *
 * @returns Cloned value.
 */
function clone(value) {
    // TODO: Replace cloneDeep with a more efficient implementation
    return cloneDeep(value);
}

export { clone };
