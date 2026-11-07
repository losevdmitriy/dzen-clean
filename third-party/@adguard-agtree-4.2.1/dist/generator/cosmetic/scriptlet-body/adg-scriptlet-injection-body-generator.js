/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { CLOSE_PARENTHESIS, EMPTY, ADG_SCRIPTLET_MASK, OPEN_PARENTHESIS } from '../../../utils/constants.js';
import { BaseGenerator } from '../../base-generator.js';
import { ParameterListGenerator } from '../../misc/parameter-list-generator.js';

/**
 * AdGuard scriptlet injection body generator.
 */
class AdgScriptletInjectionBodyGenerator extends BaseGenerator {
    /**
     * Error messages used by the generator.
     */
    static ERROR_MESSAGES = {
        NO_MULTIPLE_SCRIPTLET_CALLS: 'ADG syntaxes does not support multiple scriptlet calls within one single rule',
    };
    /**
     * Generates a string representation of the AdGuard scriptlet call body.
     *
     * @param node Scriptlet injection rule body.
     *
     * @returns String representation of the rule body.
     *
     * @throws Error if the scriptlet call has multiple parameters.
     */
    static generate(node) {
        const result = [];
        if (node.children.length > 1) {
            throw new Error(AdgScriptletInjectionBodyGenerator.ERROR_MESSAGES.NO_MULTIPLE_SCRIPTLET_CALLS);
        }
        result.push(ADG_SCRIPTLET_MASK);
        result.push(OPEN_PARENTHESIS);
        if (node.children.length > 0) {
            result.push(ParameterListGenerator.generate(node.children[0]));
        }
        result.push(CLOSE_PARENTHESIS);
        return result.join(EMPTY);
    }
}

export { AdgScriptletInjectionBodyGenerator };
