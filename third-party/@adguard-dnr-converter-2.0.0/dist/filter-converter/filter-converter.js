import { EmptyOrNegativeNumberOfRulesError } from '../errors/converter-options-errors/empty-or-negative-number-of-rules-error.js';
import { NegativeNumberOfRulesError } from '../errors/converter-options-errors/negative-number-of-rules-error.js';
import { ResourcesPathError } from '../errors/converter-options-errors/resources-path-error.js';
import { RulesConverter } from '../rule-converters/rules-converter.js';
import { RulesHashMap } from '../ruleset/rules-hash-map.js';
import { Ruleset } from '../ruleset/ruleset.js';
import { RulesetWithSourceMap } from '../ruleset/ruleset-with-source-map.js';
import { SourceMap } from '../ruleset/source-map.js';
import { getErrorMessage } from '../utils/error.js';
import { isSafeRule } from '../utils/is-safe-rule.js';
import { getRulesetId } from '../utils/ruleset-utils.js';
import { RulesScanner } from '../rules-scanner/rules-scanner.js';

/**
 * Unified filter-to-rules converter. Converts adblock filter lists into
 * declarative rule sets.
 *
 * Supports two conversion modes controlled by the
 * {@link FilterConverterOptions.withSourceMap} flag:
 *
 * - **Simple mode** (`withSourceMap` omitted or `false`): produces
 *   {@link IRuleset} with synchronous access to declarative rules.
 *
 * - **Source-map mode** (`withSourceMap: true`): produces
 *   {@link IRulesetWithSourceMap} with source maps, hash maps, lazy loading,
 *   and full `$badfilter` cross-filter support.
 */ class FilterConverter {
    /**
     * Returns the rule set ID for a given filter ID.
     *
     * @param filterId Filter ID.
     *
     * @returns Rule set ID string.
     */ static getRulesetId(filterId) {
        return getRulesetId(filterId);
    }
    /**
     * Converts the provided list of filters into declarative rule sets.
     *
     * By default returns one {@link ConversionResult} per filter. When
     * `options.combine` is `true`, all filters are merged into a single result.
     * When `options.withSourceMap` is `true`, the returned rulesets include
     * source maps, hash maps, and lazy loading.
     *
     * @param filters List of {@link IFilter} to convert.
     * @param options Options from {@link FilterConverterOptions}.
     *
     * @returns Array of {@link ConversionResult} items.
     *
     * @throws Some of {@link ResourcesPathError},
     * {@link EmptyOrNegativeNumberOfRulesError},
     * {@link NegativeNumberOfRulesError}.
     */ // eslint-disable-next-line class-methods-use-this
    async convert(filters, options) {
        if (options) {
            FilterConverter.checkConverterOptions(options);
        }
        if (options?.withSourceMap) {
            return FilterConverter.convertWithSourceMap(filters, options);
        }
        return FilterConverter.convertSimple(filters, options);
    }
    /**
     * Applies `$badfilter` rules from dynamic rulesets to static rulesets and
     * returns the list of declarative rule IDs that should be disabled.
     *
     * This handles the **dynamic → static** direction of cross-ruleset
     * `$badfilter` application. The reverse direction (static → dynamic) is
     * handled via `options.badFilterRules` during `convert()`.
     *
     * @param dynamicRulesets Converted dynamic rulesets containing potential
     * `$badfilter` rules.
     * @param staticRulesets Already-built static rulesets to match against.
     *
     * @returns Array of {@link UpdateStaticRulesOptions} describing which
     * static ruleset IDs should have which declarative rule IDs disabled.
     */ // eslint-disable-next-line class-methods-use-this
    async computeRulesToDisable(dynamicRulesets, staticRulesets) {
        const dynamicBadFilterRules = dynamicRulesets.flatMap((rs)=>rs.getBadFilterRules());
        const { declarativeRulesToCancel = [] } = await FilterConverter.collectDeclarativeRulesToCancel(staticRulesets, dynamicBadFilterRules);
        return declarativeRulesToCancel;
    }
    /**
     * Runs the simple conversion flow: scans, converts, wraps in {@link Ruleset}.
     *
     * @param filters Filters to convert.
     * @param options Converter options.
     *
     * @returns Array of simple conversion results.
     */ static async convertSimple(filters, options) {
        const scannedLimit = options?.maxNumberOfRules ? Math.ceil(options.maxNumberOfRules * FilterConverter.SCANNED_RULES_MULTIPLICATOR) : undefined;
        if (options?.combine) {
            const result = await FilterConverter.convertFiltersSimple(filters, FilterConverter.COMBINED_RULESET_ID, options, scannedLimit);
            return [
                result
            ];
        }
        const conversionTasks = filters.map((filter)=>FilterConverter.convertFiltersSimple([
                filter
            ], FilterConverter.getRulesetId(filter.getId()), options, scannedLimit));
        return Promise.all(conversionTasks);
    }
    /**
     * Scans and converts the given filters into a single simple
     * {@link ConversionResult} identified by `rulesetId`.
     *
     * @param filters Filters to scan and convert.
     * @param rulesetId ID to assign to the produced {@link Ruleset}.
     * @param options Converter options.
     * @param scannedLimit Optional limit on the number of scanned rules.
     *
     * @returns Conversion result for the given filters.
     */ static async convertFiltersSimple(filters, rulesetId, options, scannedLimit) {
        const { errors: scanErrors, filters: scannedFilters } = await RulesScanner.scanFilters(filters, undefined, scannedLimit);
        const convertedRules = await RulesConverter.convert(scannedFilters, options);
        const { declarativeRules, errors: convertErrors, limitations = [] } = convertedRules;
        const ruleset = new Ruleset(rulesetId, declarativeRules);
        return {
            ruleset,
            errors: scanErrors.concat(convertErrors),
            limitations
        };
    }
    /**
     * Runs the advanced conversion flow: scans with optional `$badfilter`
     * pre-filtering, converts, wraps in {@link RulesetWithSourceMap}.
     *
     * @param filters Filters to convert.
     * @param options Converter options.
     *
     * @returns Array of source-map conversion results.
     */ static async convertWithSourceMap(filters, options) {
        let skipNegatedRulesFn;
        if (options?.badFilterRules && options.badFilterRules.length > 0) {
            const badFilterHashMap = FilterConverter.buildRulesBadFilterHashMap(options.badFilterRules);
            skipNegatedRulesFn = (r)=>{
                const fastMatched = badFilterHashMap.get(r.hash);
                if (!fastMatched) {
                    return true;
                }
                for(let i = 0; i < fastMatched.length; i += 1){
                    if (fastMatched[i].negatesBadfilter(r)) {
                        return false;
                    }
                }
                return true;
            };
        }
        const scannedLimit = options?.maxNumberOfRules ? Math.ceil(options.maxNumberOfRules * FilterConverter.SCANNED_RULES_MULTIPLICATOR) : undefined;
        if (options?.combine) {
            const { errors: scanErrors, filters: scannedFilters } = await RulesScanner.scanFilters(filters, skipNegatedRulesFn, scannedLimit);
            const convertedRules = await RulesConverter.convert(scannedFilters, options);
            const badFilterRules = scannedFilters.flatMap(({ badFilterRules: rules })=>rules);
            const result = FilterConverter.collectConvertedResult(FilterConverter.COMBINED_RULESET_ID, filters, scannedFilters, convertedRules, badFilterRules);
            result.errors = scanErrors.concat(result.errors);
            return [
                result
            ];
        }
        const results = await Promise.all(filters.map(async (filter)=>{
            const { errors: scanErrors, filters: [scannedFilter] } = await RulesScanner.scanFilters([
                filter
            ], skipNegatedRulesFn, scannedLimit);
            const convertedRules = await RulesConverter.convert([
                scannedFilter
            ], options);
            const result = FilterConverter.collectConvertedResult(FilterConverter.getRulesetId(scannedFilter.id), [
                filter
            ], [
                scannedFilter
            ], convertedRules, scannedFilter.badFilterRules);
            result.errors = scanErrors.concat(result.errors);
            return result;
        }));
        return results;
    }
    /**
     * Collects {@link ConversionResult} from provided list of raw filters,
     * scanned filters, converted rules and bad filter rules.
     * Creates new {@link RulesetWithSourceMap} and wraps all data for
     * {@link RulesetContentProvider}.
     *
     * @param rulesetId Rule set id.
     * @param filterList List of raw filters.
     * @param scannedFilters Already scanned filters.
     * @param convertedRules Converted rules.
     * @param badFilterRules List of rules with $badfilter modifier.
     *
     * @returns Item of {@link ConversionResult}.
     */ static collectConvertedResult(rulesetId, filterList, scannedFilters, convertedRules, badFilterRules) {
        const { sourceMapValues, declarativeRules, errors, limitations = [] } = convertedRules;
        const rulesetContent = {
            loadSourceMap: async ()=>new SourceMap(sourceMapValues),
            loadFilterList: async ()=>filterList,
            loadDeclarativeRules: async ()=>declarativeRules
        };
        const listOfRulesWithHash = scannedFilters.flatMap(({ id, rules })=>{
            return rules.map((r)=>({
                    hash: r.hash,
                    source: {
                        sourceRuleIndex: r.index,
                        filterId: id
                    }
                }));
        });
        const rulesHashMap = new RulesHashMap(listOfRulesWithHash);
        const unsafeRulesCount = declarativeRules.filter((r)=>!isSafeRule(r)).length;
        const safeRulesCount = declarativeRules.length - unsafeRulesCount;
        const regexRulesCount = declarativeRules.filter((r)=>RulesConverter.isRegexRule(r)).length;
        const ruleset = new RulesetWithSourceMap(rulesetId, safeRulesCount, unsafeRulesCount, regexRulesCount, rulesetContent, badFilterRules, rulesHashMap, // Freshly-converted rulesets have no metadata-stored unsafe rules yet;
        // unsafe-rule exclusion is performed later by the serializeCompact() caller.
        []);
        return {
            ruleset,
            errors,
            limitations
        };
    }
    /**
     * Creates dictionary where key is hash of network rule and value is array
     * of rules with this hash.
     *
     * @param badFilterRules A flat list of `$badfilter` network rules.
     *
     * @returns Dictionary with all $badfilter rules indexed by hash.
     */ static buildRulesBadFilterHashMap(badFilterRules) {
        const result = new Map();
        badFilterRules.forEach((r)=>{
            const { hash } = r;
            const existing = result.get(hash);
            if (existing) {
                existing.push(r);
            } else {
                result.set(hash, [
                    r
                ]);
            }
        });
        return result;
    }
    /**
     * Checks if some rules (fastMatchedRulesByHash) from the staticRuleset,
     * which have been fast matched by hash, can be negated with the provided
     * badFilterRule via the `$badfilter` option.
     *
     * @param badFilterRule Network rule with `$badfilter` option.
     * @param staticRuleset Static rule set which contains fast matched rules.
     * @param fastMatchedRulesByHash Rules that have been fast matched by hash
     * for potential negation.
     *
     * @returns List of declarative rule IDs that have been canceled by
     * the provided badFilterRule.
     */ static async checkFastMatchedRulesCanBeCancelled(badFilterRule, staticRuleset, fastMatchedRulesByHash) {
        const fastMatchedDeclarativeRulesIds = [];
        try {
            const promises = fastMatchedRulesByHash.map(async (source)=>{
                return staticRuleset.getDeclarativeRulesIdsBySourceRuleIndex(source);
            });
            const ids = await Promise.all(promises);
            fastMatchedDeclarativeRulesIds.push(...ids.flat());
        } catch (e) {
            // eslint-disable-next-line max-len
            throw new Error(`Not found declarative rule ids for sources: ${JSON.stringify(fastMatchedRulesByHash)}: ${getErrorMessage(e)}`);
        }
        const disableRuleIds = [];
        for(let i = 0; i < fastMatchedDeclarativeRulesIds.length; i += 1){
            const id = fastMatchedDeclarativeRulesIds[i];
            let matchedSourceRules = [];
            try {
                // eslint-disable-next-line no-await-in-loop
                matchedSourceRules = await staticRuleset.getRulesById(id);
            } catch (e) {
                throw new Error(`Not found sources for declarative rule with id "${id}": ${getErrorMessage(e)}`);
            }
            const rules = matchedSourceRules.flatMap((source)=>{
                return RulesetWithSourceMap.getRuleBySourceRule(source);
            });
            // NOTE: Here we use .some but not .every to simplify first
            // version of applying $badfilter rules.
            const someRulesMatched = rules.flat().some((rule)=>badFilterRule.negatesBadfilter(rule));
            if (someRulesMatched) {
                disableRuleIds.push(id);
            }
        }
        return disableRuleIds;
    }
    /**
     * Applies rules with $badfilter modifier from dynamic rulesets to all rules
     * from static rulesets and returns list of ids of declarative rules to
     * disable them.
     *
     * @param staticRulesets List of converted static rulesets.
     * @param dynamicBadFilterRules List of rules with $badfilter.
     *
     * @returns List of ids of declarative rules to disable them.
     */ static async collectDeclarativeRulesToCancel(staticRulesets, dynamicBadFilterRules) {
        const declarativeRulesToCancel = [];
        const errors = [];
        for(let i = 0; i < staticRulesets.length; i += 1){
            const staticRuleset = staticRulesets[i];
            const disableRuleIds = [];
            for(let j = 0; j < dynamicBadFilterRules.length; j += 1){
                const badFilterRule = dynamicBadFilterRules[j];
                const hashMap = staticRuleset.getRulesHashMap();
                const fastMatchedRulesByHash = hashMap.findRules(badFilterRule.hash);
                if (fastMatchedRulesByHash.length === 0) {
                    continue;
                }
                try {
                    // eslint-disable-next-line no-await-in-loop
                    const ids = await FilterConverter.checkFastMatchedRulesCanBeCancelled(badFilterRule, staticRuleset, fastMatchedRulesByHash);
                    disableRuleIds.push(...ids);
                } catch (e) {
                    errors.push(new Error(`Cannot apply badfilter: ${getErrorMessage(e)}`));
                }
            }
            if (disableRuleIds.length > 0) {
                declarativeRulesToCancel.push({
                    rulesetId: staticRuleset.getId(),
                    disableRuleIds
                });
            }
        }
        return {
            errors,
            declarativeRulesToCancel
        };
    }
    // -------------------------------------------------------------------------
    // Option validation
    // -------------------------------------------------------------------------
    /**
     * Checks that provided converter options are correct.
     *
     * @param options Contains path to web accessible resources,
     * maximum number of converter rules and regexp rules. @see
     * {@link FilterConverterOptions} for details.
     *
     * @throws An {@link ResourcesPathError} if the resources path does not
     * start with a slash or it ends with a slash
     * OR an {@link EmptyOrNegativeNumberOfRulesError} if maximum number of
     * rules is equal or less than 0.
     * OR an {@link NegativeNumberOfRulesError} if maximum number of
     * regexp rules is less than 0.
     */ static checkConverterOptions(options) {
        const { resourcesPath, maxNumberOfRules, maxNumberOfUnsafeRules, maxNumberOfRegexpRules } = options;
        if (resourcesPath !== undefined) {
            const firstChar = 0;
            const lastChar = resourcesPath.length > 0 ? resourcesPath.length - 1 : 0;
            if (resourcesPath[firstChar] !== '/') {
                const msg = 'Path to web accessible resources should ' + `start with a leading slash: ${resourcesPath}`;
                throw new ResourcesPathError(msg);
            }
            if (resourcesPath[lastChar] === '/') {
                const msg = 'Path to web accessible resources should ' + `not end with a slash: ${resourcesPath}`;
                throw new ResourcesPathError(msg);
            }
        }
        if (maxNumberOfRules !== undefined && maxNumberOfRules <= 0) {
            const msg = 'Maximum number of rules cannot be equal or less than 0';
            throw new EmptyOrNegativeNumberOfRulesError(msg);
        }
        if (maxNumberOfUnsafeRules !== undefined && maxNumberOfUnsafeRules < 0) {
            const msg = 'Maximum number of unsafe rules cannot be less than 0';
            throw new NegativeNumberOfRulesError(msg);
        }
        if (maxNumberOfRegexpRules !== undefined && maxNumberOfRegexpRules < 0) {
            const msg = 'Maximum number of regexp rules cannot be less than 0';
            throw new NegativeNumberOfRulesError(msg);
        }
    }
}
/**
     * Same as chrome.declarativeNetRequest.DYNAMIC_RULESET_ID.
     * Used as the combined ruleset ID when `combine: true`.
     */ FilterConverter.COMBINED_RULESET_ID = '_dynamic';
/**
     * Number of scanned rules can be limited via converter options. In this
     * case we increase the limit by 10% to scan more rules in case of some
     * network rules will be combined into one declarative rule. It is safe,
     * because we have double check for maxNumberOfRules on the converted DNR
     * rules.
     */ FilterConverter.SCANNED_RULES_MULTIPLICATOR = 1.1;

export { FilterConverter };
