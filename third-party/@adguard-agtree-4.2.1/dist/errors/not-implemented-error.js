/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
/**
 * @file Customized error class for not implemented features.
 */
const ERROR_NAME = 'NotImplementedError';
const BASE_MESSAGE = 'Not implemented';
/**
 * Customized error class for not implemented features.
 */
class NotImplementedError extends Error {
    /**
     * Constructs a new `NotImplementedError` instance.
     *
     * @param message Additional error message (optional).
     */
    constructor(message = undefined) {
        // Prepare the full error message
        const fullMessage = message
            ? `${BASE_MESSAGE}: ${message}`
            : BASE_MESSAGE;
        super(fullMessage);
        this.name = ERROR_NAME;
    }
}

export { NotImplementedError };
