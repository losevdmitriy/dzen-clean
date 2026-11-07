import { OPTION_NAMES } from '../rule/option-names.js';

/**
 * Rule groups for declarative rules.
 */ var RulesGroup = /*#__PURE__*/ function(RulesGroup) {
    /**
     * Regular rules (also handles `$removeparam` — no longer merged,
     * each rule produces its own DNR rule with a param-aware urlFilter
     * for multi-hop redirect chaining).
     */ RulesGroup[RulesGroup["Regular"] = 0] = "Regular";
    /**
     * `$removeheader` rules.
     */ RulesGroup[RulesGroup["RemoveHeader"] = 1] = "RemoveHeader";
    /**
     * `$csp` rules.
     */ RulesGroup[RulesGroup["Csp"] = 2] = "Csp";
    /**
     * `$badfilter` rules.
     *
     * These rules are not converted to declarative rules, but are used
     * to negate other rules during the conversion process.
     */ RulesGroup[RulesGroup["BadFilter"] = 3] = "BadFilter";
    /**
     * `$urltransform` rules.
     */ RulesGroup[RulesGroup["UrlTransform"] = 4] = "UrlTransform";
    return RulesGroup;
}({});
/**
 * Utility class to group list of {@link Rule} into {@link GroupedRules}.
 */ class RulesGrouper {
    /**
     * Returns group for provided `rule`.
     *
     * @param rule {@link Rule} to get group for.
     *
     * @returns Rule group ({@link RulesGroup}).
     */ static getRuleGroup(rule) {
        if (rule.isModifierEnabled(OPTION_NAMES.REMOVEHEADER)) {
            return 1;
        }
        if (rule.isModifierEnabled(OPTION_NAMES.CSP)) {
            return 2;
        }
        if (rule.isModifierEnabled(OPTION_NAMES.BADFILTER)) {
            return 3;
        }
        if (rule.isModifierEnabled(OPTION_NAMES.URLTRANSFORM)) {
            return 4;
        }
        return 0;
    }
    /**
     * Groups the list of {@link Rule} into {@link GroupedRules}.
     *
     * @param rules List of {@link Rule} to group.
     *
     * @returns Grouped result of {@link GroupedRules}.
     */ static groupRules(rules) {
        const groupedRules = {
            [1]: [],
            [3]: [],
            [0]: [],
            [2]: [],
            [4]: []
        };
        for(let i = 0; i < rules.length; i += 1){
            const rule = rules[i];
            const group = RulesGrouper.getRuleGroup(rule);
            groupedRules[group].push(rule);
        }
        return groupedRules;
    }
}

export { RulesGroup, RulesGrouper };
