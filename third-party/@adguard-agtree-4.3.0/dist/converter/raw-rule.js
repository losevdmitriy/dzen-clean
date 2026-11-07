/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { RuleParser } from '../parser/rule-parser.js';
import { BaseConverter } from './base-interfaces/base-converter.js';
import { createConversionResult } from './base-interfaces/conversion-result.js';
import { RuleConverter } from './rule.js';
import { RuleGenerator } from '../generator/rule-generator.js';

/**
 * @file Rule converter for raw rules.
 *
 * Technically, this is a wrapper around `RuleConverter` that works with nodes instead of strings.
 */
/**
 * Adblock filtering rule converter class.
 *
 * You can use this class to convert string-based adblock rules, since most of the converters work with nodes.
 * This class just provides an extra layer on top of the {@link RuleConverter} and calls the parser/serializer
 * before/after the conversion internally.
 *
 * @todo Implement `convertToUbo` and `convertToAbp`.
 */
class RawRuleConverter extends BaseConverter {
    /**
     * Converts an adblock filtering rule to AdGuard format, if possible.
     *
     * @param rawRule Raw rule text to convert.
     *
     * @returns An object which follows the {@link ConversionResult} interface. Its `result` property contains
     * the array of converted rule texts, and its `isConverted` flag indicates whether the original rule was converted.
     * If the rule was not converted, the original rule text will be returned.
     *
     * @throws If the rule is invalid or cannot be converted.
     */
    static convertToAdg(rawRule) {
        const conversionResult = RuleConverter.convertToAdg(RuleParser.parse(rawRule));
        // If the rule was not converted, return the original rule text
        if (!conversionResult.isConverted) {
            return createConversionResult([rawRule], false);
        }
        // Otherwise, serialize the converted rule nodes
        return createConversionResult(conversionResult.result.map(RuleGenerator.generate), true);
    }
}

export { RawRuleConverter };
