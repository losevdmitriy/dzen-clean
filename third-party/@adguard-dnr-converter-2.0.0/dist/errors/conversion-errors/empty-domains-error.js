import { InvalidDeclarativeRuleError } from './invalid-declarative-rule-error.js';

/**
 * Describes error when converted rule contains an empty list of domains, but original contains.
 *
 * @see {@link InvalidDeclarativeRuleError} parent class.
 */ class EmptyDomainsError extends InvalidDeclarativeRuleError {
    /**
     * Describes error when converted rule contains an empty list of domains, but original contains.
     *
     * @param message Message of error.
     * @param rule {@link Rule}.
     * @param declarativeRule {@link DeclarativeRule}.
     */ constructor(message, rule, declarativeRule){
        super(message, rule, declarativeRule);
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, EmptyDomainsError.prototype);
        // Set the error name to the class name only after setting the prototype
        // to avoid issues with name being overwritten in some environments
        this.name = this.constructor.name;
    }
}

export { EmptyDomainsError };
