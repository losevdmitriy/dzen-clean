import { regexValidatorExtension } from './regex-validator-extension.js';

/**
 * Class to manage regex validation using a customizable validator function.
 * By default, it uses the Chrome validator, but a custom validator can be set.
 */ class Re2Validator {
    /**
     * Set a custom validator function.
     *
     * @param validator The custom validator function to use.
     */ setValidator(validator) {
        this.validator = validator;
    }
    /**
     * Check if the regex is supported using the current validator function.
     *
     * @param regexFilter The regex pattern to validate.
     *
     * @returns A promise that resolves to true if the regex is supported.
     *
     * @throws Error if the regex is unsupported.
     */ async isRegexSupported(regexFilter) {
        return this.validator(regexFilter);
    }
    constructor(){
        /**
     * The default validator function.
     * By default, it uses the builtin browser validator.
     */ this.validator = regexValidatorExtension;
    }
}
/**
 * Singleton instance of the {@link Re2Validator} class.
 * Provides a single point of access to manage regex validation.
 */ const re2Validator = new Re2Validator();

export { re2Validator };
