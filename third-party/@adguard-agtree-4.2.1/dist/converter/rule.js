/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { RuleConversionError } from '../errors/rule-conversion-error.js';
import { RuleCategory, NetworkRuleType } from '../nodes/index.js';
import { createConversionResult } from './base-interfaces/conversion-result.js';
import { RuleConverterBase } from './base-interfaces/rule-converter-base.js';
import { CommentRuleConverter } from './comment/index.js';
import { CosmeticRuleConverter } from './cosmetic/index.js';
import { NetworkRuleConverter } from './network/index.js';

/**
 * @file Adblock rule converter.
 *
 * This file is the entry point for all rule converters
 * which automatically detects the rule type and calls
 * the corresponding "sub-converter".
 */
/**
 * Adblock filtering rule converter class.
 *
 * @todo Implement `convertToUbo` and `convertToAbp`.
 */
class RuleConverter extends RuleConverterBase {
    /**
     * Converts an adblock filtering rule to AdGuard format, if possible.
     *
     * @param rule Rule node to convert.
     *
     * @returns An object which follows the {@link NodeConversionResult} interface. Its `result` property contains
     * the array of converted rule nodes, and its `isConverted` flag indicates whether the original rule was converted.
     * If the rule was not converted, the result array will contain the original node with the same object reference.
     *
     * @throws If the rule is invalid or cannot be converted.
     */
    static convertToAdg(rule) {
        // Delegate conversion to the corresponding sub-converter
        // based on the rule category
        switch (rule.category) {
            case RuleCategory.Comment:
                return CommentRuleConverter.convertToAdg(rule);
            case RuleCategory.Cosmetic:
                return CosmeticRuleConverter.convertToAdg(rule);
            case RuleCategory.Network:
                // TODO: Handle hosts rules later
                if (rule.type === NetworkRuleType.HostRule) {
                    return createConversionResult([rule], false);
                }
                return NetworkRuleConverter.convertToAdg(rule);
            case RuleCategory.Invalid:
            case RuleCategory.Empty:
                // Just forward the rule as is
                return createConversionResult([rule], false);
            default:
                // Never happens during normal operation
                throw new RuleConversionError('Unknown rule category');
        }
    }
    /**
     * Converts an adblock filtering rule to uBlock Origin format, if possible.
     *
     * @param rule Rule node to convert.
     *
     * @returns An object which follows the {@link NodeConversionResult} interface. Its `result` property contains
     * the array of converted rule nodes, and its `isConverted` flag indicates whether the original rule was converted.
     * If the rule was not converted, the result array will contain the original node with the same object reference.
     *
     * @throws If the rule is invalid or cannot be converted.
     */
    // TODO: Add support for other rule types
    static convertToUbo(rule) {
        if (rule.category === RuleCategory.Cosmetic) {
            return CosmeticRuleConverter.convertToUbo(rule);
        }
        if (rule.category === RuleCategory.Network) {
            return NetworkRuleConverter.convertToUbo(rule);
        }
        return createConversionResult([rule], false);
    }
}

export { RuleConverter };
