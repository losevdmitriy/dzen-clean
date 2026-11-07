/**
 * @typedef {import('../../ruleset/source-map').Source} Source
 */ /**
 * Describes an error when the maximum number of something is reached.
 *
 * Note: This class is intended to be extended by more specific error classes.
 */ class TooManyError extends Error {
    /**
     * Describes an error when the maximum number of something is reached.
     *
     * @param message Message of error.
     * @param excludedRulesIds List of excluded source (important!) {@link Source} rules ids.
     * @param numberOfMaximumRules Number of maximum rules.
     * @param numberOfExcludedDeclarativeRules Number of excluded declarative rules.
     */ constructor(message, excludedRulesIds, numberOfMaximumRules, numberOfExcludedDeclarativeRules){
        super(message);
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, TooManyError.prototype);
        // Set the error name to the class name only after setting the prototype
        // to avoid issues with name being overwritten in some environments
        this.name = this.constructor.name;
        this.excludedRulesIds = excludedRulesIds;
        this.numberOfMaximumRules = numberOfMaximumRules;
        this.numberOfExcludedDeclarativeRules = numberOfExcludedDeclarativeRules;
    }
}

export { TooManyError };
