import * as v from 'valibot';
import { getRulesetId } from '../utils/ruleset-utils.js';
import { serializeJson } from '../utils/string.js';
import { MetadataRules } from './metadata-rule.js';

/**
 * Metadata ruleset ID.
 */ const METADATA_RULESET_ID = 0;
/**
 * Checksum map validator.
 */ const checksumMapValidator = v.record(v.string(), v.string());
/**
 * Metadata validator. Uses `v.strictObject` so unknown payload keys are
 * rejected at deserialization time.
 */ const metadataValidator = v.strictObject({
    /**
     * Checksums for all rulesets.
     */ checksums: checksumMapValidator,
    /**
     * Additional properties.
     * This field stores any extra information not covered by the other fields.
     * The content of this field is not validated, but it must be JSON serializable.
     * Validation should be performed by users.
     */ additionalProperties: v.record(v.string(), v.unknown())
});
/**
 * Represents a specialized metadata ruleset for managing and validating
 * metadata associated with various rulesets.
 *
 * This class handles checksums and additional properties, providing methods
 * to manipulate and query this metadata.
 */ class MetadataRuleset {
    /**
     * Returns rule set id.
     *
     * @returns Rule set id.
     */ // Note: we prefer `instance.getId()` over `MetadataRuleset.getId(instance)` for consistency.
    // eslint-disable-next-line class-methods-use-this
    getId() {
        return getRulesetId(METADATA_RULESET_ID);
    }
    /**
     * Sets checksum for the specified rule set.
     *
     * @param rulesetId Rule set id.
     * @param checksum Checksum.
     */ setChecksum(rulesetId, checksum) {
        this.metadata.checksums[rulesetId] = checksum;
    }
    /**
     * Returns checksum for the specified rule set.
     *
     * @param rulesetId Rule set id.
     *
     * @returns Checksum or undefined if not found.
     */ getChecksum(rulesetId) {
        return this.metadata.checksums[rulesetId];
    }
    /**
     * Returns all rule set ids in the metadata.
     *
     * @returns Rule set ids.
     */ getRulesetIds() {
        return Object.keys(this.metadata.checksums);
    }
    /**
     * Gets additional property.
     *
     * @param key Property key.
     *
     * @returns Property value or undefined if not found.
     */ getAdditionalProperty(key) {
        return this.metadata.additionalProperties[key];
    }
    /**
     * Sets additional property.
     *
     * @param key Property key.
     * @param value Property value. The class does not validate that the value is
     * JSON-serializable; callers are responsible for ensuring serializability.
     */ setAdditionalProperty(key, value) {
        this.metadata.additionalProperties[key] = value;
    }
    /**
     * Checks whether additional property exists.
     *
     * @param key Property key.
     *
     * @returns Whether the property exists.
     */ hasAdditionalProperty(key) {
        return Object.hasOwn(this.metadata.additionalProperties, key);
    }
    /**
     * Removes additional property.
     *
     * @param key Property key.
     */ removeAdditionalProperty(key) {
        delete this.metadata.additionalProperties[key];
    }
    /**
     * Serializes the ruleset to a string: a JSON array of metadata rules
     * carrying the payload in `metadata.chunk` fragments.
     *
     * @param pretty Whether to prettify the output.
     *
     * @returns Serialized ruleset.
     */ serialize(pretty = false) {
        // The metadata ruleset has no ordinary rules, so no ids are taken.
        const rules = MetadataRules.create(this.metadata, new Set(), pretty);
        return serializeJson(rules, pretty);
    }
    /**
     * Deserializes the ruleset from a string.
     *
     * @param rawJson Serialized ruleset.
     *
     * @returns Deserialized ruleset.
     *
     * @throws {SyntaxError} If `rawJson` is not valid JSON.
     * @throws {InvalidMetadataChunksError} If the metadata rules are missing
     * or malformed.
     * @throws {ValiError} If the payload fails schema validation.
     */ static deserialize(rawJson) {
        const rulesetId = getRulesetId(METADATA_RULESET_ID);
        const { payload } = MetadataRules.read(rulesetId, JSON.parse(rawJson));
        const { checksums, additionalProperties } = v.parse(metadataValidator, payload);
        return new MetadataRuleset(checksums, additionalProperties);
    }
    /**
     * Creates an instance of the MetadataRuleset class.
     *
     * @param checksums A map of checksums, where each key corresponds to a
     * rule set ID and each value is the checksum for that ruleset.
     * Defaults to an empty object.
     * @param additionalProperties A collection of additional properties, where
     * keys are property names and values are their associated data. These
     * properties are JSON serializable but not validated by the class.
     * Defaults to an empty object.
     *
     * @note
     * Inputs are shallow-cloned so the instance owns its internal state.
     */ constructor(checksums = {}, additionalProperties = {}){
        this.metadata = {
            checksums: {
                ...checksums
            },
            additionalProperties: {
                ...additionalProperties
            }
        };
    }
}

export { METADATA_RULESET_ID, MetadataRuleset };
