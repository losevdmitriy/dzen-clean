import * as v from 'valibot';
import { strictObjectByType } from '../utils/valibot.js';
import { URLTransformValidator } from './url-transform.js';

/**
 * Validator for {@link Redirect}.
 */ const RedirectValidator = strictObjectByType({
    extensionPath: v.optional(v.string()),
    regexSubstitution: v.optional(v.string()),
    transform: v.optional(URLTransformValidator),
    url: v.optional(v.string())
});

export { RedirectValidator };
