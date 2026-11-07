/**
 * @file Contains the RulesHashMap class for fast rule matching
 * by hash, used for $badfilter checking.
 */ /**
 * Contains a dictionary where the key is the hash of the rule and the value is
 * a list of sources for the rule. Storing this dictionary is necessary for fast
 * rule matching, which can be negated by $badfilter.
 */ class RulesHashMap {
    /** @inheritdoc */ findRules(hash) {
        return this.map.get(hash) || [];
    }
    /**
     * Deserializes dictionary from raw string.
     *
     * @param rawString The original dictionary that was serialized into a string.
     *
     * @returns Deserialized dictionary.
     */ static deserializeSources(rawString) {
        const plainArray = JSON.parse(rawString);
        const allPairs = plainArray.flatMap(([hash, sources])=>{
            return sources.map(([filterId, sourceRuleIndex])=>{
                return {
                    hash,
                    source: {
                        filterId,
                        sourceRuleIndex
                    }
                };
            });
        });
        return allPairs;
    }
    /** @inheritdoc */ serialize() {
        const arr = Array.from(this.map);
        const serializedValues = arr.map(([hash, source])=>{
            const sources = source.map((s)=>{
                return [
                    s.filterId,
                    s.sourceRuleIndex
                ];
            });
            return [
                hash,
                sources
            ];
        });
        return JSON.stringify(serializedValues);
    }
    /**
     * Creates new {@link RulesHashMap}.
     *
     * @param listOfRulesWithHash List of rules hashes and rules sources:
     * filter id with rule index.
     */ constructor(listOfRulesWithHash){
        /**
     * Map of rule hashes to their sources.
     */ this.map = new Map();
        listOfRulesWithHash.forEach(({ hash, source })=>{
            const existingValue = this.map.get(hash);
            if (existingValue) {
                existingValue.push(source);
            } else {
                this.map.set(hash, [
                    source
                ]);
            }
        });
    }
}

export { RulesHashMap };
