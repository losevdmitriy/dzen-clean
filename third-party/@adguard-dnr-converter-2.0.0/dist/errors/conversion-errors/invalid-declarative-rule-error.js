/**
 * Describes abstract error when declarative rule is invalid.
 */ class InvalidDeclarativeRuleError extends Error {
    /**
     * Describes abstract error when declarative rule is invalid.
     *
     * @param message Message of error.
     * @param rule {@link Rule}.
     * @param declarativeRule {@link DeclarativeRule}.
     */ constructor(message, rule, declarativeRule){
        super(message);
        // For proper work of the "instanceof" operator
        Object.setPrototypeOf(this, InvalidDeclarativeRuleError.prototype);
        // Set the error name to the class name only after setting the prototype
        // to avoid issues with name being overwritten in some environments
        this.name = this.constructor.name;
        this.declarativeRule = declarativeRule;
        this.rule = rule;
    }
}

export { InvalidDeclarativeRuleError };
