import { EmptyOrNegativeNumberOfRulesError } from './empty-or-negative-number-of-rules-error.js';
import { NegativeNumberOfRulesError } from './negative-number-of-rules-error.js';
import { ResourcesPathError } from './resources-path-error.js';

/**
 * Type guard for {@link ConverterOptionsError}.
 *
 * @param error The error to check.
 *
 * @returns `true` if the error is a {@link ConverterOptionsError}, `false` otherwise.
 */ function isConverterOptionsError(error) {
    return error instanceof EmptyOrNegativeNumberOfRulesError || error instanceof NegativeNumberOfRulesError || error instanceof ResourcesPathError;
}

export { EmptyOrNegativeNumberOfRulesError, NegativeNumberOfRulesError, ResourcesPathError, isConverterOptionsError };
