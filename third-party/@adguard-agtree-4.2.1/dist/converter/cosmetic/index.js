/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { RuleConversionError } from '../../errors/rule-conversion-error.js';
import { CosmeticRuleType, RuleCategory, CosmeticRuleSeparator } from '../../nodes/index.js';
import { AdblockSyntax } from '../../utils/adblockers.js';
import { clone } from '../../utils/clone.js';
import { createNodeConversionResult } from '../base-interfaces/conversion-result.js';
import { RuleConverterBase } from '../base-interfaces/rule-converter-base.js';
import { CssInjectionRuleConverter } from './css.js';
import { ElementHidingRuleConverter } from './element-hiding.js';
import { HeaderRemovalRuleConverter } from './header-removal.js';
import { HtmlRuleConverter } from './html.js';
import { convertPathInDomainToModifier } from './path-converter.js';
import { AdgCosmeticRuleModifierConverter } from './rule-modifiers/adg.js';
import { UboCosmeticRuleModifierConverter } from './rule-modifiers/ubo.js';
import { ScriptletRuleConverter } from './scriptlet.js';
import { COMMA } from '../../utils/constants.js';

/**
 * @file Cosmetic rule converter.
 */
/**
 * Cosmetic rule converter class (also known as "non-basic rule converter").
 *
 * @todo Implement `convertToUbo` and `convertToAbp`.
 */
class CosmeticRuleConverter extends RuleConverterBase {
    /**
     * Converts a cosmetic rule to AdGuard syntax, if possible.
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
        let subconverterResult;
        // Convert cosmetic rule based on its type
        switch (rule.type) {
            case CosmeticRuleType.ElementHidingRule:
                subconverterResult = ElementHidingRuleConverter.convertToAdg(rule);
                break;
            case CosmeticRuleType.ScriptletInjectionRule:
                subconverterResult = ScriptletRuleConverter.convertToAdg(rule);
                break;
            case CosmeticRuleType.CssInjectionRule:
                subconverterResult = CssInjectionRuleConverter.convertToAdg(rule);
                break;
            case CosmeticRuleType.HtmlFilteringRule:
                // Handle special case: uBO response header filtering rule
                // TODO: Optimize double CSS tokenization here
                subconverterResult = HeaderRemovalRuleConverter.convertToAdg(rule);
                if (subconverterResult.isConverted) {
                    break;
                }
                subconverterResult = HtmlRuleConverter.convertToAdg(rule);
                break;
            // Note: Currently, only ADG supports JS injection rules, so we don't need to convert them
            case CosmeticRuleType.JsInjectionRule:
                subconverterResult = createNodeConversionResult([rule], false);
                break;
            default:
                throw new RuleConversionError('Unsupported cosmetic rule type');
        }
        let convertedModifiers;
        // Convert cosmetic rule modifiers, if any
        if (rule.modifiers) {
            if (rule.syntax === AdblockSyntax.Ubo) {
                // uBO doesn't support this rule:
                // example.com##+js(set-constant.js, foo, bar):matches-path(/baz)
                if (rule.type === CosmeticRuleType.ScriptletInjectionRule) {
                    throw new RuleConversionError('uBO scriptlet injection rules don\'t support cosmetic rule modifiers');
                }
                convertedModifiers = AdgCosmeticRuleModifierConverter.convertFromUbo(rule.modifiers);
            }
            else if (rule.syntax === AdblockSyntax.Abp) {
                // TODO: Implement once ABP starts supporting cosmetic rule modifiers
                throw new RuleConversionError('ABP don\'t support cosmetic rule modifiers');
            }
        }
        // Track if any conversion happened
        const wasConverted = subconverterResult.result.length > 1
            || subconverterResult.isConverted
            || (convertedModifiers && convertedModifiers.isConverted);
        if (wasConverted) {
            // Add modifier list to the subconverter result rules
            subconverterResult.result.forEach((subconverterRule) => {
                if (convertedModifiers && subconverterRule.category === RuleCategory.Cosmetic) {
                    // eslint-disable-next-line no-param-reassign
                    subconverterRule.modifiers = convertedModifiers.result;
                }
            });
        }
        // Apply path-in-domain conversion to all rules
        const rulesToProcess = wasConverted ? subconverterResult.result : [rule];
        const finalRules = [];
        let pathConversionHappened = false;
        for (const ruleToProcess of rulesToProcess) {
            if (ruleToProcess.category === RuleCategory.Cosmetic) {
                const pathConversionResult = convertPathInDomainToModifier(ruleToProcess);
                if (pathConversionResult) {
                    finalRules.push(...pathConversionResult.result);
                    pathConversionHappened = true;
                }
                else {
                    finalRules.push(ruleToProcess);
                }
            }
            else {
                finalRules.push(ruleToProcess);
            }
        }
        // Return result with combined conversion status
        if (wasConverted || pathConversionHappened) {
            return createNodeConversionResult(finalRules, true);
        }
        return createNodeConversionResult([rule], false);
    }
    /**
     * Converts a cosmetic rule to uBlock Origin syntax, if possible.
     *
     * @param rule Rule node to convert.
     *
     * @returns An object which follows the {@link NodeConversionResult} interface. Its `result` property contains
     * the array of converted rule nodes, and its `isConverted` flag indicates whether the original rule was converted.
     * If the rule was not converted, the result array will contain the original node with the same object reference.
     *
     * @throws If the rule is invalid or cannot be converted.
     */
    static convertToUbo(rule) {
        // Skip conversation if the rule is already in uBO format
        if (rule.syntax === AdblockSyntax.Ubo) {
            return createNodeConversionResult([rule], false);
        }
        // TODO: Add support for other cosmetic rule types
        switch (rule.type) {
            case CosmeticRuleType.HtmlFilteringRule:
                return HtmlRuleConverter.convertToUbo(rule);
            case CosmeticRuleType.ElementHidingRule: {
                // Check if the rule is a simple hiding rule
                // TODO: Handle elemhide rules with extended CSS pseudos even if type is not marked explicitly
                const isElementHidingRule = (rule.separator.value === CosmeticRuleSeparator.ElementHidingException
                    || rule.separator.value === CosmeticRuleSeparator.ElementHiding);
                if (isElementHidingRule && !rule.modifiers) {
                    return createNodeConversionResult([rule], false);
                }
                break;
            }
            case CosmeticRuleType.ScriptletInjectionRule:
                return ScriptletRuleConverter.convertToUbo(rule);
            case CosmeticRuleType.JsInjectionRule:
                throw new RuleConversionError('uBO does not support JS injection rules');
        }
        let convertedModifiers;
        // Convert cosmetic rule modifiers, if any
        if (rule.modifiers) {
            if (rule.syntax === AdblockSyntax.Abp) {
                // TODO: Implement once ABP starts supporting cosmetic rule modifiers
                throw new RuleConversionError('ABP does not support cosmetic rule modifiers');
            }
            else if (rule.syntax === AdblockSyntax.Adg) {
                convertedModifiers = UboCosmeticRuleModifierConverter.convertFromAdg(rule.modifiers);
            }
        }
        const result = clone(rule);
        result.syntax = AdblockSyntax.Ubo;
        if (convertedModifiers && convertedModifiers.isConverted) {
            result.modifiers = convertedModifiers.result.modifierList;
            if (convertedModifiers.result.domains) {
                result.domains = convertedModifiers.result.domains;
                result.domains.separator = COMMA;
            }
        }
        // Handle separator to uBO format
        let convertedSeparator = result.separator.value;
        convertedSeparator = rule.exception
            ? CosmeticRuleSeparator.ElementHidingException
            : CosmeticRuleSeparator.ElementHiding;
        result.separator.value = convertedSeparator;
        return createNodeConversionResult([result], true);
    }
}

export { CosmeticRuleConverter };
