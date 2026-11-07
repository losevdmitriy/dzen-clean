/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
/**
 * Common class for the ABP snippet injection body.
 * This class contains shared constants and utilities for handling ABP snippet injection bodies.
 */
class AbpSnippetInjectionBodyCommon {
    /**
     * Error messages used by the parser and generator.
     */
    static ERROR_MESSAGES = {
        /**
         * Error message indicating that an ABP snippet call is empty.
         */
        EMPTY_SCRIPTLET_CALL: 'Empty ABP snippet call',
    };
}

export { AbpSnippetInjectionBodyCommon };
