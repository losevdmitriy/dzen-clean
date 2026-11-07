import * as v from 'valibot';
import { strictObjectByType } from '../utils/valibot.js';
import { QueryKeyValueValidator } from './query-key-value.js';

/**
 * Validator for {@link QueryTransform}.
 */ const QueryTransformValidator = strictObjectByType({
    addOrReplaceParams: v.optional(v.array(QueryKeyValueValidator)),
    removeParams: v.optional(v.array(v.string()))
});

export { QueryTransformValidator };
