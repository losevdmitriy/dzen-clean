import { EmptyDomainsError } from './empty-domains-error.js';
import { EmptyResourcesError } from './empty-resources-error.js';
import { InvalidDeclarativeRuleError } from './invalid-declarative-rule-error.js';
import { UnsupportedModifierError } from './unsupported-modifier-error.js';
import { UnsupportedRegexpError } from './unsupported-regexp-error.js';

/**
 * Type guard for {@link ConversionError}.
 *
 * @param error The error to check.
 *
 * @returns `true` if the error is a {@link ConversionError}, `false` otherwise.
 */ function isConversionError(error) {
    return error instanceof EmptyDomainsError || error instanceof EmptyResourcesError || error instanceof InvalidDeclarativeRuleError || error instanceof UnsupportedModifierError || error instanceof UnsupportedRegexpError;
}

export { EmptyDomainsError, EmptyResourcesError, InvalidDeclarativeRuleError, UnsupportedModifierError, UnsupportedRegexpError, isConversionError };
