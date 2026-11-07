/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { SPACE, EMPTY } from '../../utils/constants.js';
import { isUndefined } from '../../utils/type-guards.js';
import { BaseGenerator } from '../base-generator.js';

/**
 * Generator for adblock agent nodes.
 * This class is responsible for converting adblock agent nodes into their string representation.
 */
class AgentGenerator extends BaseGenerator {
    /**
     * Converts an adblock agent node to a string.
     *
     * @param value Agent node.
     *
     * @returns Raw string.
     */
    static generate(value) {
        let result = EMPTY;
        // Agent adblock name
        result += value.adblock.value;
        // Agent adblock version (if present)
        if (!isUndefined(value.version)) {
            // Add a space between the name and the version
            result += SPACE;
            result += value.version.value;
        }
        return result;
    }
}

export { AgentGenerator };
