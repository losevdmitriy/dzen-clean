/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { CommentMarker, CommentRuleType, RuleCategory } from '../../nodes/index.js';
import { AdblockSyntax } from '../../utils/adblockers.js';
import { CosmeticRuleSeparatorUtils } from '../../utils/cosmetic-rule-separator.js';
import { StringUtils } from '../../utils/string.js';
import { BaseParser } from '../base-parser.js';
import { ValueParser } from '../misc/value-parser.js';
import { defaultParserOptions } from '../options.js';

/**
 * `SimpleCommentParser` is responsible for parsing simple comments.
 * Some comments have a special meaning in adblock syntax, like agent comments or hints,
 * but this parser is only responsible for parsing regular comments,
 * whose only purpose is to provide some human-readable information.
 *
 * @example
 * ```adblock
 * ! This is a simple comment
 * # This is a simple comment, but in host-like syntax
 * ```
 */
class SimpleCommentParser extends BaseParser {
    /**
     * Checks if the raw rule is a simple comment.
     *
     * @param raw Raw input to check.
     *
     * @returns `true` if the input is a simple comment, `false` otherwise.
     *
     * @note This method does not check for adblock agent comments.
     */
    static isSimpleComment(raw) {
        const trimmed = raw.trim();
        // Exclamation mark based comments
        if (trimmed.startsWith(CommentMarker.Regular)) {
            return true;
        }
        // Hashmark based comments
        // Note: in this case, we must be sure that we do not mistakenly parse a cosmetic rule as a #-like comment,
        // since most cosmetic rule separators also start with #
        if (trimmed.startsWith(CommentMarker.Hashmark)) {
            const result = CosmeticRuleSeparatorUtils.find(trimmed);
            // If we cannot find a separator, it means that the rule is definitely a comment
            if (result === null) {
                return true;
            }
            // Otherwise, we must check if the separator is followed by a valid selector
            const { end } = result;
            // No valid selector
            if (!trimmed[end]
                || StringUtils.isWhitespace(trimmed[end])
                || (trimmed[end] === CommentMarker.Hashmark
                    && trimmed[end + 1] === CommentMarker.Hashmark)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Parses a raw rule as a simple comment.
     *
     * @param raw Raw input to parse.
     * @param options Global parser options.
     * @param baseOffset Starting offset of the input. Node locations are calculated relative to this offset.
     *
     * @returns Comment rule node or null (if the raw rule cannot be parsed as a simple comment).
     */
    static parse(raw, options = defaultParserOptions, baseOffset = 0) {
        // Ignore non-comment rules
        if (!this.isSimpleComment(raw)) {
            return null;
        }
        // If we are here, it means that the rule is a regular comment
        let offset = 0;
        // Skip leading whitespace (if any)
        offset = StringUtils.skipWS(raw, offset);
        // Get comment marker
        const marker = ValueParser.parse(raw[offset], options, baseOffset + offset);
        // Skip marker
        offset += 1;
        // Get comment text
        const text = ValueParser.parse(raw.slice(offset), options, baseOffset + offset);
        // Regular comment rule
        const result = {
            category: RuleCategory.Comment,
            type: CommentRuleType.CommentRule,
            // TODO: Change syntax when hashmark is used
            syntax: AdblockSyntax.Common,
            marker,
            text,
        };
        if (options.includeRaws) {
            result.raws = {
                text: raw,
            };
        }
        if (options.isLocIncluded) {
            result.start = baseOffset;
            result.end = baseOffset + raw.length;
        }
        return result;
    }
}

export { SimpleCommentParser };
