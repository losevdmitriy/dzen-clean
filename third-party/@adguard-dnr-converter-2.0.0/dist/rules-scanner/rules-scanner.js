import { RuleCategory } from '@adguard/agtree';
import { FilterListParser } from '@adguard/agtree/parser';
import { MaxScannedRulesError } from '../errors/limitation-errors/max-scanned-rules-error.js';
import { OPTION_NAMES } from '../rule/option-names.js';
import { Rule } from '../rule/rule.js';

/**
 * Class that responsible for scanning filter rules and converting them into {@link Rule}.
 */ class RulesScanner {
    /**
     * Scans the list of filters for network rules.
     *
     * @param filters List of {@link IFilter}.
     * @param filterFn If this function is specified, it will be applied to each
     * rule after it has been parsed and transformed. This function is needed
     * for example to apply `$badfilter`: to exclude negated rules from the array
     * of rules that will be returned.
     * @param maxScannedRules Maximum number of network rules to
     * scan, all other rules will be ignored. It will be applied to each filter
     * separately, not for cumulative scope of rules from all filters, because
     * it looks simpler and more predictable solution to prevent too long scan.
     *
     * @returns Result object of {@link ScannedFiltersWithErrors}.
     */ static async scanFilters(filters, filterFn, maxScannedRules) {
        const result = {
            errors: [],
            filters: []
        };
        for(let i = 0; i < filters.length; i += 1){
            const filter = filters[i];
            // eslint-disable-next-line no-await-in-loop
            const { errors, rules } = await RulesScanner.scanRules(filter, filterFn, maxScannedRules);
            const badFilterRules = rules.filter(RulesScanner.isBadFilterRule);
            result.errors = result.errors.concat(errors);
            result.filters.push({
                id: filter.getId(),
                rules,
                badFilterRules
            });
        }
        return result;
    }
    /**
     * Extracts only the network rules (ignore cosmetic and host rules)
     * and tries to convert each line into {@link Rule}.
     *
     * @param filter From which filter the rules should be scanned.
     * @param filterFn If this function is specified, it will be applied to each
     * rule after it has been parsed and transformed. This function is needed
     * for example to apply `$badfilter`: to exclude negated rules from the array
     * of rules that will be returned.
     * @param maxScannedRules Maximum number of network rules to
     * scan, all other rules will be ignored and an error {@link MaxScannedRulesError}
     * will be added to the list of result errors.
     *
     * @returns Result object of {@link ScannedRulesWithErrors}.
     */ static async scanRules(filter, filterFn, maxScannedRules) {
        const id = filter.getId();
        const content = await filter.getContent();
        // Parse filter content into AST
        const ast = FilterListParser.parse(content, RulesScanner.PARSER_OPTIONS);
        // Build result object
        let scannedRulesCount = 0;
        const result = {
            errors: [],
            rules: []
        };
        for(let i = 0; i < ast.children.length; i += 1){
            /**
             * We use `!` because location info and raw rule is always included in our parser options.
             *
             * @see {@link RulesScanner.PARSER_OPTIONS}
             */ const node = ast.children[i];
            const index = node.start;
            const raw = node.raws.text;
            if (node.category === RuleCategory.Invalid) {
                const { name, message } = node.error;
                const msg = `[${name}] ${message}: filter id - ${id}, line index - ${index}, line - ${raw}`;
                result.errors.push(new Error(msg));
                continue;
            }
            try {
                const rules = Rule.parseFromNode(id, index, node);
                const filteredRules = filterFn ? rules.filter(filterFn) : rules;
                result.rules.push(...filteredRules);
                scannedRulesCount += filteredRules.length;
                if (maxScannedRules !== undefined && scannedRulesCount >= maxScannedRules) {
                    const lastRuleLineIndex = rules[rules.length - 1].index;
                    // This error needed for future improvements, for example
                    // to show in the UI which rules were skipped.
                    const msg = `Maximum number of scanned network rules reached at line index ${lastRuleLineIndex}.`;
                    result.errors.push(new MaxScannedRulesError(msg, lastRuleLineIndex));
                    break;
                }
            } catch (e) {
                if (e instanceof Error) {
                    result.errors.push(e);
                } else {
                    // eslint-disable-next-line max-len
                    const msg = `Unknown error during creating network rule from raw string: filter id - ${id}, line index - ${index}, line - ${raw}`;
                    result.errors.push(new Error(msg));
                }
                continue;
            }
        }
        return result;
    }
    /**
     * Checks whether the given rule is a bad filter rule.
     *
     * @param rule {@link Rule} to check.
     *
     * @returns `true` if the rule is a bad filter rule, `false` otherwise.
     */ static isBadFilterRule(rule) {
        return rule.isModifierEnabled(OPTION_NAMES.BADFILTER);
    }
}
/**
     * Parser options for filter scanning.
     */ RulesScanner.PARSER_OPTIONS = {
    // We don't want parser to throw errors, so we can collect them all in the result object
    tolerant: true,
    // Location info is needed for source mapping
    isLocIncluded: true,
    // All syntaxes (abp, ubo) should be parsed
    parseAbpSpecificRules: true,
    parseUboSpecificRules: true,
    // Raw text is needed for error reporting
    includeRaws: true,
    // We don't need to process comments
    ignoreComments: true,
    // We only need to process network rules
    parseHostRules: false
};

export { RulesScanner };
