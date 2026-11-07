/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { sprintf } from 'sprintf-js';
import { TokenType, getFormattedTokenName } from '@adguard/css-tokenizer';
import { AdblockSyntaxError } from '../../../../errors/adblock-syntax-error.js';
import { TILDE, CARET, DOLLAR_SIGN, ASTERISK, PIPE, EQUALS } from '../../../../utils/constants.js';
import { QuoteUtils } from '../../../../utils/quotes.js';
import { ValueParser } from '../../../misc/value-parser.js';

/**
 * Handles attribute selector parsing in selector list.
 */
class AttributeSelectorHandler {
    /**
     * Set of attribute equality prefixes.
     *
     * @see {@link AttributeSelectorOperatorValue}
     */
    static ATTR_EQUALITY_PREFIXES = new Set([
        // [attr~="value"]
        TILDE,
        // [attr^="value"]
        CARET,
        // [attr$="value"]
        DOLLAR_SIGN,
        // [attr*="value"]
        ASTERISK,
        // [attr|="value"]
        PIPE,
    ]);
    /**
     * Set of valid flags for attribute selector values.
     *
     * @see {@link AttributeSelectorFlagValue}
     */
    static ALLOWED_ATTRIBUTE_FLAGS = new Set([
        'i',
        's',
    ]);
    /**
     * Handles attribute selector parsing by creating an attribute selector node
     * and appending it to the current complex selector node.
     *
     * @param context Selector list parser context.
     *
     * @throws If the attribute selector is syntactically incorrect.
     */
    static handle(context) {
        const { options, baseOffset, stream, complexSelector, } = context;
        // Get open square bracket token
        let token = stream.getOrFail();
        // Save attribute selector node start position
        const { start } = token;
        // Advance open square bracket token
        stream.advance();
        // Skip whitespaces after open square bracket
        stream.skipWhitespace();
        // Expect next token to be an identifier (attribute selector name)
        stream.expect(TokenType.Ident);
        // Get attribute selector name token
        token = stream.getOrFail();
        // Extract attribute selector name raw value
        const nameRaw = stream.fragment();
        // Construct attribute selector node and attribute selector name node
        const result = {
            type: 'AttributeSelector',
            name: ValueParser.parse(nameRaw, options, baseOffset + token.start),
        };
        // Include attribute selector node start location if needed
        if (options.isLocIncluded) {
            result.start = baseOffset + start;
        }
        // Advance attribute selector name token
        stream.advance();
        // Skip whitespaces after attribute selector name
        stream.skipWhitespace();
        // Get closing square bracket or equality sign/prefix token
        token = stream.getOrFail();
        // Check if there is an any value
        if (token.type !== TokenType.CloseSquareBracket) {
            // Expect next token to be a delimiter (equality sign/prefix)
            stream.expect(TokenType.Delim);
            // Extract operator raw value
            let operatorRaw = stream.fragment();
            // Check if it's prefix operator
            if (AttributeSelectorHandler.ATTR_EQUALITY_PREFIXES.has(operatorRaw)) {
                // Advance prefix operator token
                stream.advance();
                // Expect equal sign token
                stream.expect(TokenType.Delim, { value: EQUALS });
                // Append equal sign to prefix value
                operatorRaw += EQUALS;
            }
            else if (operatorRaw !== EQUALS) {
                // Throw error if it's not equal sign either
                throw new AdblockSyntaxError(sprintf("Invalid attribute selector operator '%s'", operatorRaw), baseOffset + token.start, baseOffset + token.end);
            }
            // Save operator node start position
            const operatorStart = token.start;
            // Advance equal sign token
            stream.advance();
            // Skip whitespaces after equal sign
            stream.skipWhitespace();
            // Get attribute selector value token
            token = stream.getOrFail();
            // It should be a string or identifier
            const isValueString = token.type === TokenType.String;
            if (!isValueString && token.type !== TokenType.Ident) {
                throw new AdblockSyntaxError(sprintf(
                // eslint-disable-next-line max-len
                `Expected '${getFormattedTokenName(TokenType.Ident)}' or '${getFormattedTokenName(TokenType.String)}' as attribute selector value, but got '%s' with value '%s'`, getFormattedTokenName(token.type), stream.fragment()), baseOffset + token.start, baseOffset + token.end);
            }
            // Save attribute selector value node start position
            const valueStart = token.start + (isValueString ? 1 : 0);
            // Save attribute selector value node end position
            const valueEnd = token.end - (isValueString ? 1 : 0);
            // Extract attribute selector value raw value
            const valueRaw = stream.fragment();
            // We should unescape respective quotes inside of the string value
            const valueUnquotedAndUnescaped = QuoteUtils.removeQuotesAndUnescape(valueRaw);
            // Construct attribute selector operator node
            const operatorNode = {
                type: 'Value',
                value: operatorRaw,
            };
            // Construct attribute selector value node
            const valueNode = {
                type: 'Value',
                value: valueUnquotedAndUnescaped,
            };
            // Set attribute selector operator and value nodes to result node
            result.operator = operatorNode;
            result.value = valueNode;
            // Include attribute selector operator and value nodes locations if needed
            if (options.isLocIncluded) {
                operatorNode.start = baseOffset + operatorStart;
                operatorNode.end = baseOffset + operatorStart + operatorRaw.length;
                valueNode.start = baseOffset + valueStart;
                valueNode.end = baseOffset + valueEnd;
            }
            // Advance attribute selector value token
            stream.advance();
            // Skip whitespaces after attribute selector value
            stream.skipWhitespace();
            // Get close square bracket or attribute selector value flag token
            token = stream.getOrFail();
            // Check if there is an any flag part
            if (token.type !== TokenType.CloseSquareBracket) {
                // Expect a identifier (attribute selector value flag)
                stream.expect(TokenType.Ident);
                // Extract attribute selector value flag raw value
                const flagRaw = stream.fragment();
                // Validate attribute selector value flag
                if (!AttributeSelectorHandler.isValidFlag(flagRaw)) {
                    throw new AdblockSyntaxError(sprintf("Unexpected token '%s' with value '%s'", getFormattedTokenName(token.type), flagRaw), baseOffset + token.start, baseOffset + token.end);
                }
                // Save flag node start position
                const flagStart = token.start;
                // Construct attribute selector flag node
                const flagNode = {
                    type: 'Value',
                    value: flagRaw,
                };
                // Set attribute selector flag node to result node
                result.flag = flagNode;
                // Include attribute selector flag node locations if needed
                if (options.isLocIncluded) {
                    flagNode.start = baseOffset + flagStart;
                    flagNode.end = baseOffset + flagStart + flagRaw.length;
                }
                // Advance attribute selector value flag token
                stream.advance();
                // Skip whitespaces after attribute selector value flag
                stream.skipWhitespace();
                // Get close square bracket token
                token = stream.getOrFail();
            }
        }
        // Expect close square bracket token
        stream.expect(TokenType.CloseSquareBracket);
        // Include attribute selector node end location if needed
        if (options.isLocIncluded) {
            result.end = baseOffset + token.end;
        }
        // Append attribute selector node to the current complex selector node
        complexSelector.children.push(result);
        // Advance close square bracket token
        stream.advance();
    }
    /**
     * Validates attribute selector flag.
     *
     * @param flag Attribute selector flag.
     *
     * @returns `true` if the flag is valid, otherwise `false`.
     */
    static isValidFlag(flag) {
        return AttributeSelectorHandler.ALLOWED_ATTRIBUTE_FLAGS.has(flag);
    }
}

export { AttributeSelectorHandler };
