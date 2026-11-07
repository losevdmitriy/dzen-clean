/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { sprintf } from 'sprintf-js';
import { getFormattedTokenName } from '@adguard/css-tokenizer';
import { AdblockSyntaxError } from '../../../../errors/adblock-syntax-error.js';
import { GREATER_THAN, PLUS, TILDE, COMMA, SPACE } from '../../../../utils/constants.js';

/**
 * Handles compound selector parsing in selector list.
 */
class CompoundSelectorHandler {
    /**
     * Set of allowed symbols between selectors (combinators + comma, except <space> combinator).
     *
     * @see {@link SelectorCombinatorValue}
     */
    static ALLOWED_SYMBOLS_BETWEEN_SELECTORS = new Set([
        // div > span
        GREATER_THAN,
        // div + div
        PLUS,
        // div ~ div
        TILDE,
        // div, span
        COMMA,
    ]);
    /**
     * Finishes the current compound selector by:
     * 1. Validating current compound selector node,
     * 2. Constructing selector combinator node (if provided),
     * 3. Appending selector combinator node to the complex selector (if provided).
     *
     * @param context Selector list parser context.
     * @param combinator Optional combinator string.
     *
     * @throws If the current compound selector has no simple selectors.
     */
    static handle(context, combinator) {
        const { raw, options, baseOffset, stream, token, complexSelector, } = context;
        // Get current compound selector end token
        const currentEndToken = stream.lookbehindForNonWs();
        // Throw error if current compound selector has no simple selectors (empty)
        if (
        // Combinator shouldn't be the first token in the complex selector
        !currentEndToken
            || complexSelector.children.length === 0
            // And the last token in the complex selector shouldn't be a combinator
            || complexSelector.children[complexSelector.children.length - 1].type === 'SelectorCombinator') {
            throw new AdblockSyntaxError(sprintf("Unexpected token '%s' with value '%s'", getFormattedTokenName(token.type), raw.slice(token.start, token.end)), baseOffset + token.start, baseOffset + token.end);
        }
        // Handle edge case for descendant combinator
        if (combinator === SPACE) {
            // Skip whitespaces before checking next token
            stream.skipWhitespace();
            // EOF - just skip, we shouldn't consider it as descendant combinator
            if (!stream.get()) {
                return;
            }
            // Combinator or Comma - just skip, we shouldn't consider it as descendant combinator
            if (CompoundSelectorHandler.ALLOWED_SYMBOLS_BETWEEN_SELECTORS.has(stream.fragment())) {
                return;
            }
        }
        else {
            // Advance selector combinator token
            stream.advance();
            // Skip whitespaces after selector combinator token
            stream.skipWhitespace();
        }
        // If no combinator is provided, just return, as we don't need to create and append selector combinator node
        if (!combinator) {
            return;
        }
        // Next compound selector token should be defined
        stream.getOrFail();
        // Construct selector combinator node
        const result = {
            type: 'SelectorCombinator',
            value: combinator,
        };
        // Include selector combinator node locations if needed
        if (options.isLocIncluded) {
            result.start = baseOffset + token.start;
            result.end = baseOffset + token.start + combinator.length;
        }
        // Append selector combinator node to the current complex selector node
        complexSelector.children.push(result);
        // Reset type selector set tracker for next compound selector
        context.isTypeSelectorSet = false;
    }
}

export { CompoundSelectorHandler };
