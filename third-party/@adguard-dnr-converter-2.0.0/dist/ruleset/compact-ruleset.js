import { MetadataRules } from './metadata-rule.js';

/**
 * Reads a parsed filter ruleset file: joins the leading metadata rules,
 * parses the metadata once and returns it with the ordinary rules and the
 * number of metadata rules. The payload is taken as the envelope written by
 * {@link RulesetWithSourceMap.serializeCompact} without further checks, and
 * ordinary rules are returned as parsed; both are validated later by
 * {@link RulesetWithSourceMap.fromCompact} or
 * {@link RulesetWithSourceMap.deserialize} and the ruleset content provider.
 *
 * @param rulesetId Rule set id, used in error messages.
 * @param parsedRuleset Parsed JSON content of a `ruleset_N.json` file.
 *
 * @returns Envelope fields, ordinary rules and metadata rule count.
 *
 * @throws {InvalidMetadataChunksError} If `parsedRuleset` is not an array,
 * has no leading metadata rule, has a metadata rule without a string `chunk`,
 * or if the joined fragments are not valid JSON.
 */ function parseCompactRuleset(rulesetId, parsedRuleset) {
    const { payload, declarativeRules, metadataRulesCount } = MetadataRules.read(rulesetId, parsedRuleset);
    const { metadata, lazyMetadata, filterContent } = payload;
    return {
        metadata,
        lazyMetadata,
        filterContent,
        declarativeRules,
        metadataRulesCount
    };
}

export { parseCompactRuleset };
