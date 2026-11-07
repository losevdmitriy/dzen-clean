/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
/**
 * @file Known CSS elements and attributes.
 * TODO: Implement a compatibility table for Extended CSS.
 */
/**
 * Legacy Extended CSS attribute prefix.
 *
 * @example
 * ```css
 * [-ext-<name>=...]
 * ```
 */
const LEGACY_EXT_CSS_ATTRIBUTE_PREFIX = '-ext-';
/**
 * ABP Extended CSS prefix.
 *
 * @example
 * ```css
 * [-abp-<name>=...]
 * -abp-<name>(...)
 * ```
 */
const ABP_EXT_CSS_PREFIX = '-abp';
/**
 * Known CSS pseudo-classes that are supported by all browsers natively,
 * but can also be applied as extended.
 */
const NATIVE_CSS_PSEUDO_CLASSES = new Set([
    /**
     * Https://developer.mozilla.org/en-US/docs/Web/CSS/:has
     * https://github.com/AdguardTeam/ExtendedCss#extended-css-has.
     */
    'has',
    /**
     * Https://developer.mozilla.org/en-US/docs/Web/CSS/:is
     * https://github.com/AdguardTeam/ExtendedCss#extended-css-is.
     */
    'is',
    /**
     * Https://developer.mozilla.org/en-US/docs/Web/CSS/:not
     * https://github.com/AdguardTeam/ExtendedCss#extended-css-not.
     */
    'not',
]);
/**
 * Known _strict_ Extended CSS pseudo-classes. Please, keep this list sorted.
 * Strict means that these pseudo-classes are not supported by any browser natively,
 * and they always require Extended CSS libraries to work.
 */
const EXT_CSS_PSEUDO_CLASSES_STRICT = new Set([
    // AdGuard
    // https://github.com/AdguardTeam/ExtendedCss
    'contains',
    'if-not',
    'matches-attr',
    'matches-css',
    'matches-property',
    'nth-ancestor',
    'remove',
    'upward',
    'xpath',
    // uBlock Origin
    // https://github.com/gorhill/uBlock/wiki/Static-filter-syntax#procedural-cosmetic-filters
    'has-text',
    'matches-css-after',
    'matches-css-before',
    'matches-path',
    'min-text-length',
    'watch-attr',
    // Adblock Plus
    // https://help.eyeo.com/adblockplus/how-to-write-filters#elemhide-emulation
    '-abp-contains',
    '-abp-has',
    '-abp-properties',
]);
/**
 * _ALL_ known Extended CSS pseudo-classes. Please, keep this list sorted.
 * It includes strict pseudo-classes and additional pseudo-classes that may be
 * supported by some browsers natively.
 */
const EXT_CSS_PSEUDO_CLASSES = new Set([
    ...EXT_CSS_PSEUDO_CLASSES_STRICT,
    ...NATIVE_CSS_PSEUDO_CLASSES,
]);
/**
 * Known extended CSS property that is used to remove elements.
 *
 * @see {@link https://github.com/AdguardTeam/ExtendedCss#remove-pseudos}
 */
const REMOVE_PROPERTY = 'remove';
/**
 * Known extended CSS value for {@link REMOVE_PROPERTY} property to remove elements.
 *
 * @see {@link https://github.com/AdguardTeam/ExtendedCss#remove-pseudos}
 */
const REMOVE_VALUE = 'true';

export { ABP_EXT_CSS_PREFIX, EXT_CSS_PSEUDO_CLASSES, EXT_CSS_PSEUDO_CLASSES_STRICT, LEGACY_EXT_CSS_ATTRIBUTE_PREFIX, NATIVE_CSS_PSEUDO_CLASSES, REMOVE_PROPERTY, REMOVE_VALUE };
