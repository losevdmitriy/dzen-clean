import * as v from 'valibot';
import { isSafeRule } from '../utils/is-safe-rule.js';
import { DeclarativeRuleValidator } from '../declarative-rule/declarative-rule.js';

/**
 * Rule set that holds converted declarative rules in memory without
 * source maps, hash maps, or lazy loading. Implements {@link IRuleset}
 * and is returned by the simple conversion flow ({@link FilterConverter}).
 */ class Ruleset {
    /** @inheritdoc */ getId() {
        return this.id;
    }
    /** @inheritdoc */ getSafeRulesCount() {
        return this.safeRulesCount;
    }
    /** @inheritdoc */ getUnsafeRulesCount() {
        return this.unsafeRulesCount;
    }
    /** @inheritdoc */ getRegexpRulesCount() {
        return this.regexpRulesCount;
    }
    /** @inheritdoc */ getDeclarativeRules() {
        return this.declarativeRules;
    }
    /** @inheritdoc */ serialize() {
        return JSON.stringify(this.declarativeRules);
    }
    /**
     * Reconstructs a {@link Ruleset} from a JSON string produced by
     * {@link serialize}.
     *
     * @param id Rule set identifier.
     * @param json JSON string produced by {@link serialize}.
     *
     * @returns Reconstructed {@link Ruleset}.
     */ static deserialize(id, json) {
        const rules = v.parse(v.array(DeclarativeRuleValidator), JSON.parse(json));
        return new Ruleset(id, rules);
    }
    /**
     * Creates a new {@link Ruleset}.
     *
     * @param id Rule set identifier.
     * @param declarativeRules All converted declarative rules.
     */ constructor(id, declarativeRules){
        this.id = id;
        this.declarativeRules = declarativeRules;
        this.safeRulesCount = declarativeRules.filter((r)=>isSafeRule(r)).length;
        this.unsafeRulesCount = declarativeRules.filter((r)=>!isSafeRule(r)).length;
        this.regexpRulesCount = declarativeRules.filter(({ condition: { regexFilter } })=>regexFilter !== undefined).length;
    }
}

export { Ruleset };
