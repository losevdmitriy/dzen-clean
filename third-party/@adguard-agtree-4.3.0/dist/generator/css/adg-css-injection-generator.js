/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { CSS_MEDIA_MARKER, SPACE, OPEN_CURLY_BRACKET, CLOSE_CURLY_BRACKET, EMPTY } from '../../utils/constants.js';
import { BaseGenerator } from '../base-generator.js';

/**
 * AdGuard CSS injection generator.
 */
class AdgCssInjectionGenerator extends BaseGenerator {
    /**
     * CSS declaration for removing elements.
     */
    static REMOVE_DECLARATION = 'remove: true;';
    /**
     * Serializes an AdGuard CSS injection node into a raw string.
     *
     * @param node Node to serialize.
     *
     * @returns Raw string.
     */
    static generate(node) {
        const result = [];
        if (node.mediaQueryList) {
            result.push(CSS_MEDIA_MARKER, SPACE, node.mediaQueryList.value, SPACE, OPEN_CURLY_BRACKET, SPACE);
        }
        result.push(node.selectorList.value, SPACE, OPEN_CURLY_BRACKET, SPACE);
        if (node.remove) {
            result.push(AdgCssInjectionGenerator.REMOVE_DECLARATION);
        }
        else if (node.declarationList?.value) {
            result.push(node.declarationList.value);
        }
        result.push(SPACE, CLOSE_CURLY_BRACKET);
        if (node.mediaQueryList) {
            result.push(SPACE, CLOSE_CURLY_BRACKET);
        }
        return result.join(EMPTY);
    }
}

export { AdgCssInjectionGenerator };
