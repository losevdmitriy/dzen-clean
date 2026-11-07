import * as v from 'valibot';
import { strictObjectByType } from '../utils/valibot.js';

/**
 * Validator for {@link QueryKeyValue}.
 */ const QueryKeyValueValidator = strictObjectByType({
    key: v.string(),
    replaceOnly: v.optional(v.boolean()),
    value: v.string()
});

export { QueryKeyValueValidator };
