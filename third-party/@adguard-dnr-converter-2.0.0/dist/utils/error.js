import { ValiError } from 'valibot';
import { getErrorMessage as getErrorMessage$1 } from '@adguard/logger';
import { extractMessageFromValiError } from './valibot.js';

/**
 * Converts error object to error with message.
 * This method might be helpful to handle thrown errors.
 * If error is instance of {@link ValiError},
 * it will prettify the error messages via {@link extractMessageFromValiError}.
 *
 * @param error Error object.
 *
 * @returns Message of the error.
 */ function getErrorMessage(error) {
    // Special case: pretty print Valibot errors
    if (error instanceof ValiError) {
        return extractMessageFromValiError(error);
    }
    return getErrorMessage$1(error);
}

export { getErrorMessage };
