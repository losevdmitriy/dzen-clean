/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { TokenType } from '@adguard/css-tokenizer';

/**
 * Handles class selector parsing in selector list.
 */
class ClassSelectorHandler {
    /**
     * Handles class selector parsing by creating a class selector node
     * and appending it to the current complex selector node.
     *
     * @param context Selector list parser context.
     *
     * @throws If the class selector is syntactically incorrect.
     */
    static handle(context) {
        const { options, baseOffset, stream, complexSelector, } = context;
        // Get class selector dot token
        const token = stream.getOrFail();
        // Advance class selector dot token
        stream.advance();
        // Expect next token to be an identifier (class selector value)
        stream.expect(TokenType.Ident);
        // Extract class selector value (without dot)
        const value = stream.fragment();
        // Construct class selector node
        const result = {
            type: 'ClassSelector',
            value,
        };
        // Include class selector node locations if needed
        if (options.isLocIncluded) {
            result.start = baseOffset + token.start;
            result.end = baseOffset + token.end + value.length;
        }
        // Append class selector node to the current complex selector node
        complexSelector.children.push(result);
        // Advance class selector value token
        stream.advance();
    }
}

export { ClassSelectorHandler };
