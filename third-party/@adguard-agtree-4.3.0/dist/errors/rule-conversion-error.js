/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
/**
 * @file Customized error class for conversion errors.
 */
const ERROR_NAME = 'RuleConversionError';
/**
 * Customized error class for conversion errors.
 */
class RuleConversionError extends Error {
    /**
     * Constructs a new `RuleConversionError` instance.
     *
     * @param message Error message.
     */
    constructor(message) {
        super(message);
        this.name = ERROR_NAME;
    }
}

export { RuleConversionError };
