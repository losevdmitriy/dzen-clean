/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { AbpSnippetInjectionBodyCommon } from '../../../common/abp-snippet-injection-body-common.js';
import { SPACE, SEMICOLON } from '../../../utils/constants.js';
import { BaseGenerator } from '../../base-generator.js';
import { ParameterListGenerator } from '../../misc/parameter-list-generator.js';

/**
 * Adblock Plus snippet injection body generator.
 */
class AbpSnippetInjectionBodyGenerator extends BaseGenerator {
    /**
     * Generates a string representation of the Adblock Plus-style snippet call body.
     *
     * @param node Scriptlet injection rule body.
     *
     * @returns String representation of the rule body.
     *
     * @throws Error if the scriptlet call is empty.
     */
    static generate(node) {
        const result = [];
        if (node.children.length === 0) {
            throw new Error(AbpSnippetInjectionBodyCommon.ERROR_MESSAGES.EMPTY_SCRIPTLET_CALL);
        }
        for (const scriptletCall of node.children) {
            if (scriptletCall.children.length === 0) {
                throw new Error(AbpSnippetInjectionBodyCommon.ERROR_MESSAGES.EMPTY_SCRIPTLET_CALL);
            }
            result.push(ParameterListGenerator.generate(scriptletCall, SPACE));
        }
        return result.join(SEMICOLON + SPACE);
    }
}

export { AbpSnippetInjectionBodyGenerator };
