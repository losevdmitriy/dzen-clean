import { MaxScannedRulesError } from './max-scanned-rules-error.js';
import { TooManyError } from './too-many-error.js';
import { TooManyRegexpRulesError } from './too-many-regexp-rules-error.js';
import { TooManyRulesError } from './too-many-rules-error.js';
import { TooManyUnsafeRulesError } from './too-many-unsafe-rules-error.js';

/**
 * Type guard for {@link LimitationError}.
 *
 * @param error The error to check.
 *
 * @returns `true` if the error is a {@link LimitationError}, `false` otherwise.
 */ function isLimitationError(error) {
    return error instanceof MaxScannedRulesError || error instanceof TooManyError || error instanceof TooManyRegexpRulesError || error instanceof TooManyRulesError || error instanceof TooManyUnsafeRulesError;
}

export { MaxScannedRulesError, TooManyError, TooManyRegexpRulesError, TooManyRulesError, TooManyUnsafeRulesError, isLimitationError };
