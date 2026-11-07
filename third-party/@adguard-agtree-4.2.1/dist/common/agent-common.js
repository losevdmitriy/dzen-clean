/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { AdblockSyntax } from '../utils/adblockers.js';

/**
 * Possible AdGuard agent markers.
 */
const ADG_NAME_MARKERS = new Set([
    'adguard',
    'adg',
]);
/**
 * Possible uBlock Origin agent markers.
 */
const UBO_NAME_MARKERS = new Set([
    'ublock',
    'ublock origin',
    'ubo',
]);
/**
 * Possible Adblock Plus agent markers.
 */
const ABP_NAME_MARKERS = new Set([
    'adblock',
    'adblock plus',
    'adblockplus',
    'abp',
]);
/**
 * Returns the adblock syntax based on the adblock name parsed from the agent type comment.
 * Needed for modifiers validation of network rules by AGLint.
 *
 * @param name Adblock name.
 *
 * @returns Adblock syntax.
 */
const getAdblockSyntax = (name) => {
    let syntax = AdblockSyntax.Common;
    const lowerCaseName = name.toLowerCase();
    if (ADG_NAME_MARKERS.has(lowerCaseName)) {
        syntax = AdblockSyntax.Adg;
    }
    else if (UBO_NAME_MARKERS.has(lowerCaseName)) {
        syntax = AdblockSyntax.Ubo;
    }
    else if (ABP_NAME_MARKERS.has(lowerCaseName)) {
        syntax = AdblockSyntax.Abp;
    }
    return syntax;
};

export { getAdblockSyntax };
