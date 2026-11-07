/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { MODIFIERS_SEPARATOR } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';
import { ModifierGenerator } from './modifier-generator.js';

/**
 * Generator for modifier list nodes.
 */
class ModifierListGenerator extends BaseGenerator {
    /**
     * Converts a modifier list AST to a string.
     *
     * @param ast Modifier list AST.
     *
     * @returns Raw string.
     */
    static generate(ast) {
        const result = ast.children
            .map(ModifierGenerator.generate)
            .join(MODIFIERS_SEPARATOR);
        return result;
    }
}

export { ModifierListGenerator };
