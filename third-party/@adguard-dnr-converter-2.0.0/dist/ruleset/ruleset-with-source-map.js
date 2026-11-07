import * as v from 'valibot';
import { Rule } from '../rule/rule.js';
import { getErrorMessage } from '../utils/error.js';
import { LazyLoader } from '../utils/lazy-loader.js';
import { serializeJson } from '../utils/string.js';
import { strictObjectByType } from '../utils/valibot.js';
import { MetadataRules } from './metadata-rule.js';
import { RulesHashMap } from './rules-hash-map.js';
import { SourceMap } from './source-map.js';
import { UnavailableFilterSourceError } from '../errors/unavailable-sources-errors/unavailable-filter-source-error.js';
import { UnavailableRulesetSourceError } from '../errors/unavailable-sources-errors/unavailable-ruleset-source-error.js';
import { DeclarativeRuleValidator } from '../declarative-rule/declarative-rule.js';

/**
 * Valibot validator for {@link SerializedRulesetLazyData}.
 */ const serializedRulesetLazyDataValidator = strictObjectByType({
    sourceMapRaw: v.string(),
    filterIds: v.array(v.number())
});
/**
 * Valibot validator for {@link SerializedRulesetData}.
 */ const serializedRulesetDataValidator = strictObjectByType({
    regexpRulesCount: v.number(),
    unsafeRulesCount: v.number(),
    safeRulesCount: v.number(),
    rulesetHashMapRaw: v.string(),
    badFilterRulesRaw: v.array(v.string()),
    unsafeRules: v.array(DeclarativeRuleValidator)
});
/**
 * Keeps converted declarative rules, counters of rules and source map for them.
 */ class RulesetWithSourceMap {
    /** @inheritdoc */ getUnsafeRules() {
        return Promise.resolve(this.unsafeRules);
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
    /** @inheritdoc */ getMetadataRulesCount() {
        return this.metadataRulesCount;
    }
    /** @inheritdoc */ getId() {
        return this.id;
    }
    /**
     * Returns a list of pairs of source text rules and their filter identifiers
     * for a given declarative rule identifier.
     *
     * @param declarativeRuleId {@link DeclarativeRule|declarative rule} Id.
     *
     * @returns Promise with list of source rules.
     *
     * @throws An error when filter is not found or filter content is unavailable.
     */ async findSourceRules(declarativeRuleId) {
        if (!this.sourceMap) {
            return [];
        }
        const sourcePairs = this.sourceMap.getByDeclarativeRuleId(declarativeRuleId);
        const sourceRules = sourcePairs.map(async ({ filterId, sourceRuleIndex })=>{
            const filter = this.filterList.get(filterId);
            if (!filter) {
                throw new Error(`Not found filter list with id: ${filterId}`);
            }
            // `getRuleByIndex` is optional on IFilter — only filters used in
            // the source-map flow are expected to implement it. A filter
            // without it cannot resolve source rules by index, which is a
            // misconfiguration for this flow.
            if (!filter.getRuleByIndex) {
                // eslint-disable-next-line max-len
                const msg = `Filter with id ${filterId} does not implement getRuleByIndex and cannot be used in the source-map flow`;
                throw new UnavailableFilterSourceError(msg, filterId);
            }
            const sourceRule = await filter.getRuleByIndex(sourceRuleIndex);
            return {
                sourceRule,
                filterId
            };
        });
        return Promise.all(sourceRules);
    }
    /**
     * Run inner lazy deserialization from rule set content provider to load
     * data which is not needed on the creation of rule set:
     * the source map, filter list and declarative rules list.
     *
     * @returns Promise resolving when the content has been loaded.
     */ loadContent() {
        return this.contentLoader.get();
    }
    /** @inheritdoc */ unloadContent() {
        // Nothing to unload if content was never loaded and no load is pending.
        // Both checks are required: if we only checked `isLoaded()` we would
        // enter the clear branch below while a load is in flight and race
        // with the producer writing to `sourceMap`, `filterList`, and
        // `declarativeRules`.
        if (!this.contentLoader.isLoaded() && !this.contentLoader.isLoading()) {
            return;
        }
        // If a load is in flight, defer the full unload until it settles so
        // we don't race with the producer writing to `sourceMap`, `filterList`,
        // and `declarativeRules`.
        //
        // This defer-during-load dance is specific to `RulesetWithSourceMap`
        // because the producer writes to multiple external fields on `this`.
        // `Filter.unloadContent()` does not need it: `LazyLoader.reset()`
        // already handles defer-during-load for its own cached value, and
        // `Filter`'s only extra state (`ruleByOffset`) is rebuilt lazily on
        // the next `getRuleByIndex()` call, so clearing it is always safe.
        //
        // Fire-and-forget is acceptable because the deferred unload has no
        // observable consumers beyond ruleset state, and any producer error
        // is surfaced to the caller of `loadContent()`.
        if (this.contentLoader.isLoading()) {
            this.contentLoader.get().finally(()=>{
                this.unloadContent();
            }).catch(()=>{
            // Empty on purpose. `.finally()` does not swallow
            // rejections — it re-throws the producer error into this
            // chain. Without `.catch()` that duplicate rejection
            // would bubble up as an unhandled rejection, because
            // nothing awaits this chain. The original error is still
            // delivered to whoever awaited `loadContent()`.
            });
            return;
        }
        // Safely unload all filters in the filter list
        this.filterList.forEach((filter)=>filter.unloadContent());
        // Clear loaded resources
        this.sourceMap = undefined;
        this.declarativeRules = [];
        this.filterList.clear();
        // Mark the content as unloaded
        this.contentLoader.reset();
    }
    /** @inheritdoc */ async getRulesById(declarativeRuleId) {
        try {
            await this.loadContent();
            const originalRules = await this.findSourceRules(declarativeRuleId);
            return originalRules;
        } catch (e) {
            const id = this.getId();
            // eslint-disable-next-line max-len
            const msg = `Cannot extract source rule for given declarativeRuleId ${declarativeRuleId} in rule set '${id}', got error: ${getErrorMessage(e)}`;
            throw new UnavailableRulesetSourceError(msg, id, e);
        }
    }
    /** @inheritdoc */ getBadFilterRules() {
        return this.badFilterRules;
    }
    /** @inheritdoc */ getRulesHashMap() {
        return this.rulesHashMap;
    }
    /** @inheritdoc */ async getDeclarativeRulesIdsBySourceRuleIndex(source) {
        await this.loadContent();
        if (!this.sourceMap) {
            const { filterId, sourceRuleIndex } = source;
            // eslint-disable-next-line max-len
            throw new Error(`Cannot find declarative rules for filter id - ${filterId}, rule index - ${sourceRuleIndex} because source map is undefined in ruleset: ${this.getId()}`);
        }
        return this.sourceMap.getBySourceRuleIndex(source);
    }
    /** @inheritdoc */ async getDeclarativeRules() {
        await this.loadContent();
        return this.declarativeRules;
    }
    /**
     * For provided source rule and filter id return network rule.
     * This method is needed for checking the applicability of $badfilter after
     * a fast-check of rules by comparing only hashes. Afterward, we should
     * build the 'full' Network rule from provided source, not just the hash,
     * to determine the applicability of $badfilter.
     *
     * @param source Source rule and filter id.
     *
     * @returns List of {@link Rule | network rules}.
     */ static getRuleBySourceRule(source) {
        const { sourceRule, filterId } = source;
        try {
            return Rule.createFromText(filterId, // We don't need line index because this rule
            // will be used only for matching $badfilter rules.
            0, sourceRule);
        } catch (e) {
            return [];
        }
    }
    /**
     * Deserializes rule set to primitives values with lazy load.
     *
     * @param id Id of rule set.
     * @param rawData An item of {@link SerializedRulesetData} for instant
     * creating ruleset. It contains counters for regular declarative and regexp
     * declarative rules, a map of hashes for all rules, and a list of rules
     * with the `$badfilter` modifier.
     * @param loadLazyData An item of {@link SerializedRulesetLazyData} for lazy
     * loading ruleset data to find and display source rules when declarative
     * filtering log is enabled. It includes a map of sources for all rules,
     * a list of declarative rules, and a list of source filter IDs.
     * @param loadDeclarativeRules Loader for ruleset's declarative rules from
     * raw file as a string.
     * @param filterList List of {@link IFilter}.
     *
     * @returns Deserialized rule set.
     *
     * @throws Error {@link UnavailableRulesetSourceError} if rule set source
     * is not available.
     */ static async deserialize(id, rawData, loadLazyData, loadDeclarativeRules, filterList) {
        const data = RulesetWithSourceMap.parseData(id, ()=>JSON.parse(rawData));
        const rulesetContentProvider = RulesetWithSourceMap.createContentProvider(id, async ()=>JSON.parse(await loadLazyData()), async ()=>JSON.parse(await loadDeclarativeRules()), filterList);
        return {
            id,
            data,
            rulesetContentProvider
        };
    }
    /**
     * Creates a rule set from the content of a compact ruleset file read by
     * {@link parseCompactRuleset}, without serializing its parts back to
     * strings. The metadata is validated at once with the same schema as in
     * {@link RulesetWithSourceMap.deserialize}; the lazy metadata and the
     * declarative rules are validated when the content is first loaded.
     *
     * The rule set keeps references to `content.lazyMetadata` and
     * `content.declarativeRules` for its whole lifetime, so the parsed file
     * stays in memory. Calling {@link RulesetWithSourceMap.unloadContent}
     * releases only the validated copies made on load, not this content. When
     * the content must be released, for example in a long-running extension,
     * keep it in storage and use {@link RulesetWithSourceMap.deserialize} with
     * loaders instead.
     *
     * @param rulesetId Id of rule set.
     * @param content Parsed content of the ruleset file: `metadata`,
     * `lazyMetadata`, ordinary `declarativeRules` and `metadataRulesCount`, as
     * returned by {@link parseCompactRuleset}.
     * @param filterList List of {@link IFilter} the rule set was converted from.
     *
     * @returns Rule set ready to use.
     *
     * @throws Error {@link UnavailableRulesetSourceError} if the metadata does
     * not match {@link SerializedRulesetData}. Errors of
     * {@link RulesetWithSourceMap.fromDeserialized} come unwrapped.
     */ static fromCompact(rulesetId, content, filterList) {
        const data = RulesetWithSourceMap.parseData(rulesetId, ()=>content.metadata);
        const rulesetContentProvider = RulesetWithSourceMap.createContentProvider(rulesetId, async ()=>content.lazyMetadata, async ()=>content.declarativeRules, filterList);
        return RulesetWithSourceMap.fromDeserialized({
            id: rulesetId,
            data,
            rulesetContentProvider
        }, content.metadataRulesCount);
    }
    /**
     * Creates a rule set from the result of
     * {@link RulesetWithSourceMap.deserialize}: builds the `$badfilter` rules
     * and the rules hash map from the serialized data and calls the
     * constructor.
     *
     * @param deserialized Deserialized rule set data and content provider.
     * @param metadataRulesCount Number of metadata rules in the ruleset file
     * the data was read from, `metadataRulesCount` of
     * {@link parseCompactRuleset}.
     *
     * @returns Rule set ready to use.
     *
     * @throws Error if a `$badfilter` rule text cannot be parsed
     * ({@link Rule.createFromText}), and `SyntaxError` if the serialized rules
     * hash map is not valid JSON ({@link RulesHashMap.deserializeSources}).
     * Both come unwrapped: the data is produced by this converter, so such an
     * error is a producer bug, not an unavailable source.
     */ static fromDeserialized(deserialized, metadataRulesCount) {
        const { id, data, rulesetContentProvider } = deserialized;
        // Rules with `$badfilter` are used only for matching, not for source
        // attribution, so filter id and rule index are not needed.
        const badFilterRules = data.badFilterRulesRaw.flatMap((rawRule)=>Rule.createFromText(0, 0, rawRule));
        const rulesHashMap = new RulesHashMap(RulesHashMap.deserializeSources(data.rulesetHashMapRaw));
        return new RulesetWithSourceMap(id, data.safeRulesCount, data.unsafeRulesCount, data.regexpRulesCount, rulesetContentProvider, badFilterRules, rulesHashMap, data.unsafeRules, metadataRulesCount);
    }
    /**
     * Validates serialized rule set data.
     *
     * @param id Id of rule set.
     * @param getData Returns the data to validate; parsing errors thrown by it
     * are wrapped as well.
     *
     * @returns Validated rule set data.
     *
     * @throws Error {@link UnavailableRulesetSourceError} if the data cannot be
     * obtained or does not match {@link SerializedRulesetData}.
     */ static parseData(id, getData) {
        try {
            return v.parse(serializedRulesetDataValidator, getData());
        } catch (e) {
            // eslint-disable-next-line max-len
            const msg = `Cannot parse serialized ruleset's data with id "${id}", got error: ${getErrorMessage(e)}`;
            throw new UnavailableRulesetSourceError(msg, id, e);
        }
    }
    /**
     * Creates a content provider that loads and validates the lazy metadata
     * once and validates declarative rules on each load.
     *
     * @param id Id of rule set.
     * @param loadLazyData Loads the parsed {@link SerializedRulesetLazyData}.
     * @param loadDeclarativeRules Loads the parsed list of declarative rules.
     * @param filterList List of {@link IFilter}.
     *
     * @returns Rule set content provider.
     */ static createContentProvider(id, loadLazyData, loadDeclarativeRules, filterList) {
        /**
         * This variable is used as a singleton for all three functions
         * (`loadSourceMap`, `loadFilterList`, `loadDeclarativeRules`) to load
         * data only once.
         */ let deserializedLazyData;
        const getLazyData = async ()=>{
            if (deserializedLazyData !== undefined) {
                return deserializedLazyData;
            }
            try {
                const parsed = v.parse(serializedRulesetLazyDataValidator, await loadLazyData());
                deserializedLazyData = parsed;
                return parsed;
            } catch (e) {
                // eslint-disable-next-line max-len
                const msg = `Cannot parse or load data for lazy metadata for rule set with id "${id}": ${getErrorMessage(e)}`;
                throw new UnavailableRulesetSourceError(msg, id, e);
            }
        };
        return {
            loadSourceMap: async ()=>{
                const { sourceMapRaw } = await getLazyData();
                const sources = SourceMap.deserializeSources(sourceMapRaw);
                return new SourceMap(sources);
            },
            loadFilterList: async ()=>{
                const { filterIds } = await getLazyData();
                return filterList.filter((filter)=>filterIds.includes(filter.getId()));
            },
            loadDeclarativeRules: async ()=>{
                return v.parse(v.array(DeclarativeRuleValidator), await loadDeclarativeRules());
            }
        };
    }
    /**
     * Helper method to get serialized rule set data.
     *
     * @param unsafeRules List of unsafe rules to add to the serialized output.
     *
     * @returns Serialized rule set data.
     */ getSerializedRulesetData(unsafeRules) {
        return {
            regexpRulesCount: this.regexpRulesCount,
            unsafeRulesCount: this.unsafeRulesCount,
            // `safeRulesCount` in serialized data represents safe declarative
            // rules only — unsafe rules are tracked in `unsafeRulesCount`
            // and stored in the `unsafeRules` array (metadata).
            safeRulesCount: this.safeRulesCount,
            rulesetHashMapRaw: this.rulesHashMap.serialize(),
            badFilterRulesRaw: this.badFilterRules.map((r)=>r.getText()),
            unsafeRules
        };
    }
    /**
     * Helper method to get serialized rule set lazy data.
     *
     * @returns Serialized rule set lazy data.
     */ getSerializedRulesetLazyData() {
        return {
            sourceMapRaw: this.sourceMap?.serialize() || '',
            filterIds: Array.from(this.filterList.keys())
        };
    }
    /** @inheritdoc */ async serializeCompact(unsafeRules, prettyPrint = true) {
        try {
            await this.loadContent();
        } catch (e) {
            const id = this.getId();
            // eslint-disable-next-line max-len
            const msg = `Cannot serialize ruleset '${id}' because of not available source, got error: ${getErrorMessage(e)}`;
            throw new UnavailableRulesetSourceError(msg, id, e);
        }
        // TODO: Improve this code once we introduce multiple filters within a single ruleset.
        // Also, do not forget to change metadata rule's structure to store preprocessed
        // filter lists in an array.
        // Currently, we expect that there is only one filter within a single rule set.
        const filter = this.filterList.values().next().value;
        if (!filter) {
            const id = this.getId();
            const msg = `Cannot serialize ruleset '${id}' because of not available filter list`;
            throw new UnavailableRulesetSourceError(msg, id);
        }
        const content = await filter.getContent();
        // Validate the provided unsafe rules against the stored count.
        //
        // Two valid states are intentionally supported:
        //  - Non-empty `unsafeRules`: used by the unsafe-rule post-pass (see
        //    `@adguard/dnr-rulesets`) which moves unsafe rules out of the
        //    declarative list into metadata. Here the length MUST equal
        //    `unsafeRulesCount`.
        //  - Empty `unsafeRules` (`[]`): used at the initial CLI conversion
        //    stage, where no unsafe rules are excluded yet — the count is still
        //    recorded in `unsafeRulesCount` for capacity tracking, but the
        //    metadata stores an empty set until the post-pass runs.
        //
        // The check therefore only rejects a mismatch when a non-empty array is
        // provided; an empty array is always allowed (initial conversion).
        if (unsafeRules.length > 0 && unsafeRules.length !== this.unsafeRulesCount) {
            const id = this.getId();
            // eslint-disable-next-line max-len
            const msg = `Unsafe rules count is not equal to the length of provided unsafe rules array in rule set '${id}'`;
            throw new Error(msg);
        }
        const envelope = {
            metadata: this.getSerializedRulesetData(unsafeRules),
            lazyMetadata: this.getSerializedRulesetLazyData(),
            filterContent: content
        };
        const unsafeIds = new Set(unsafeRules.map((rule)=>rule.id));
        // Exclude unsafe rules from declarative rules. `filter()` returns a
        // new array, so the internal state of the ruleset is never mutated
        // and repeated calls stay independent.
        const declarativeRules = (await this.getDeclarativeRules()).filter((rule)=>!unsafeIds.has(rule.id));
        // Metadata rules take the smallest ids not used by any rule of the
        // file, including the unsafe rules stored inside the metadata, so
        // no id appears twice anywhere in the ruleset.
        const usedIds = new Set([
            ...unsafeIds,
            ...declarativeRules.map((rule)=>rule.id)
        ]);
        const metadataRules = MetadataRules.create(envelope, usedIds, prettyPrint);
        return serializeJson([
            ...metadataRules,
            ...declarativeRules
        ], prettyPrint);
    }
    /**
     * Constructor of RulesetWithSourceMap.
     *
     * @param id Id of rule set.
     * @param safeRulesCount Number of safe declarative rules
     * (unsafe rules are tracked separately via {@link unsafeRulesCount}).
     * @param unsafeRulesCount Number of unsafe rules.
     * @param regexpRulesCount Number of regexp rules.
     * @param rulesetContentProvider Rule set content provider.
     * @param badFilterRules List of rules with $badfilter modifier.
     * @param rulesHashMap Dictionary with hashes for all source rules.
     * @param unsafeRules List of unsafe DNR rules.
     * @param metadataRulesCount Number of metadata rules in the ruleset file
     * the rule set was read from, 0 if it was not read from a file.
     */ constructor(id, safeRulesCount, unsafeRulesCount, regexpRulesCount, rulesetContentProvider, badFilterRules, rulesHashMap, unsafeRules, metadataRulesCount = 0){
        /**
     * Array of converted declarative rules.
     */ this.declarativeRules = [];
        /**
     * Number of safe declarative rules (unsafe rules are stored separately
     * and not counted here).
     *
     * This is needed for the lazy version of the rule set,
     * when content not loaded.
     */ this.safeRulesCount = 0;
        /**
     * Converted declarative unsafe rules.
     */ this.unsafeRulesCount = 0;
        /**
     * Converted declarative regexp rules.
     */ this.regexpRulesCount = 0;
        /**
     * Keeps array of source filter lists.
     */ this.filterList = new Map();
        this.id = id;
        this.safeRulesCount = safeRulesCount;
        this.unsafeRulesCount = unsafeRulesCount;
        this.regexpRulesCount = regexpRulesCount;
        this.rulesetContentProvider = rulesetContentProvider;
        this.badFilterRules = badFilterRules;
        this.rulesHashMap = rulesHashMap;
        this.unsafeRules = unsafeRules;
        this.metadataRulesCount = metadataRulesCount;
        this.contentLoader = new LazyLoader(async ()=>{
            const { loadSourceMap, loadFilterList, loadDeclarativeRules } = this.rulesetContentProvider;
            this.sourceMap = await loadSourceMap();
            this.declarativeRules = await loadDeclarativeRules();
            // TODO: Find a better method to load filters (AG-42364)
            const filtersList = await loadFilterList();
            filtersList.forEach((filter)=>{
                this.filterList.set(filter.getId(), filter);
            });
        });
    }
}

export { RulesetWithSourceMap };
