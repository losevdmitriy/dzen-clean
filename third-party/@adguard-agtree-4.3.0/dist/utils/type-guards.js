/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
/**
 * Checks whether the given value is undefined.
 *
 * @param value Value to check.
 *
 * @returns `true` if the value is 'undefined', `false` otherwise.
 */
const isUndefined = (value) => {
    return typeof value === 'undefined';
};
/**
 * Checks whether the given value is null.
 *
 * @param value Value to check.
 *
 * @returns `true` if the value is 'null', `false` otherwise.
 */
const isNull = (value) => {
    return value === null;
};
/**
 * Checks whether the given value is a string.
 *
 * @param value Value to check.
 *
 * @returns `true` if the value is a string, `false` otherwise.
 */
const isString = (value) => {
    return typeof value === 'string';
};

export { isNull, isString, isUndefined };
