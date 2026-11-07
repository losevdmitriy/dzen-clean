import * as v from 'valibot';
import { strictObjectByType } from '../utils/valibot.js';
import { RuleActionValidator } from './rule-action.js';
import { RuleConditionValidator } from './rule-condition.js';

/**
 * Validator for {@link DeclarativeRule}.
 */ const DeclarativeRuleValidator = strictObjectByType({
    action: RuleActionValidator,
    condition: RuleConditionValidator,
    id: v.pipe(v.number(), v.integer(), v.minValue(1)),
    priority: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)))
});

export { DeclarativeRuleValidator };
