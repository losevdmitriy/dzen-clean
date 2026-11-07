/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
/**
 * Checks if error has message.
 *
 * @param error Error object.
 *
 * @returns If param is error.
 */
function isErrorWithMessage(error) {
    return (typeof error === 'object'
        && error !== null
        && 'message' in error
        && typeof error.message === 'string');
}
/**
 * Converts error to the error with message.
 *
 * @param maybeError Possible error.
 *
 * @returns Error with message.
 */
function toErrorWithMessage(maybeError) {
    if (isErrorWithMessage(maybeError)) {
        return maybeError;
    }
    try {
        return new Error(JSON.stringify(maybeError));
    }
    catch {
        // fallback in case there's an error stringifying the maybeError
        // like with circular references for example.
        return new Error(String(maybeError));
    }
}
/**
 * Converts error object to error with message. This method might be helpful to handle thrown errors.
 *
 * @param error Error object.
 *
 * @returns Message of the error.
 */
function getErrorMessage(error) {
    return toErrorWithMessage(error).message;
}

export { getErrorMessage };
