/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
/**
 * @file Common options for all parsers.
 */
/**
 * Default parser options.
 */
const defaultParserOptions = Object.freeze({
    tolerant: false,
    isLocIncluded: true,
    parseAbpSpecificRules: true,
    parseUboSpecificRules: true,
    includeRaws: true,
    ignoreComments: false,
    parseHostRules: false,
    parseHtmlFilteringRuleBodies: false,
});

export { defaultParserOptions };
