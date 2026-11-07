/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
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
