import * as v from 'valibot';
import { strictObjectByType } from '../utils/valibot.js';

/**
 * Validator for {@link HeaderInfo}.
 */ const HeaderInfoValidator = strictObjectByType({
    values: v.optional(v.array(v.string())),
    excludedValues: v.optional(v.array(v.string())),
    header: v.string()
});

export { HeaderInfoValidator };
