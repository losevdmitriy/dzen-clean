import { InvalidDeclarativeRuleError } from './invalid-declarative-rule-error.js';

/**
 * Describes error when converted rule contains empty list of resources types.
 *
 * @see {@link InvalidDeclarativeRuleError} parent class.
 */ class EmptyResourcesError extends InvalidDeclarativeRuleError {
    /**
     * Describes error when converted rule contains empty list of resources types.
     *
     * @param message Message of error.
     * @param rule {@link Rule}.
     * @param declarativeRule {@link DeclarativeRule}.
     */ constructor(message, rule, declarativeRule){
        super(message, rule, declarativeRule);
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, EmptyResourcesError.prototype);
        // Set the error name to the class name only after setting the prototype
        // to avoid issues with name being overwritten in some environments
        this.name = this.constructor.name;
    }
}

export { EmptyResourcesError };
