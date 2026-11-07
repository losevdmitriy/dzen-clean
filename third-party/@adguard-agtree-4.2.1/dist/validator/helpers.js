/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { VALIDATION_ERROR_PREFIX } from './constants.js';

/**
 * Returns invalid validation result with given error message.
 *
 * @param error Error message.
 *
 * @returns Validation result `{ valid: false, error }`.
 */
const getInvalidValidationResult = (error) => {
    return {
        valid: false,
        error,
    };
};
/**
 * Returns invalid validation result which uses {@link VALIDATION_ERROR_PREFIX.VALUE_REQUIRED} as prefix
 * and specifies the given `modifierName` in the error message.
 *
 * @param modifierName Modifier name.
 *
 * @returns Validation result `{ valid: false, error }`.
 */
const getValueRequiredValidationResult = (modifierName) => {
    return getInvalidValidationResult(`${VALIDATION_ERROR_PREFIX.VALUE_REQUIRED}: '${modifierName}'`);
};

export { getInvalidValidationResult, getValueRequiredValidationResult };
