import { Logger } from '@adguard/logger';

var ErrorStatusCodes;
(function (ErrorStatusCodes) {
    ErrorStatusCodes[ErrorStatusCodes["ComplexRegex"] = 1001] = "ComplexRegex";
    ErrorStatusCodes[ErrorStatusCodes["RuleLimit"] = 1002] = "RuleLimit";
    ErrorStatusCodes[ErrorStatusCodes["RegexpRuleLimit"] = 1003] = "RegexpRuleLimit";
    ErrorStatusCodes[ErrorStatusCodes["RemoveparamRegexpIsNotSupported"] = 1004] = "RemoveparamRegexpIsNotSupported";
    ErrorStatusCodes[ErrorStatusCodes["RemoveparamInversionIsNotSupported"] = 1005] = "RemoveparamInversionIsNotSupported";
})(ErrorStatusCodes || (ErrorStatusCodes = {}));
const EMPTY_STRING = '';
const SEPARATOR = '|';
const SPACE = ' ';
const WILDCARD = '*';
const COMMA = ',';
const LF = '\n';
const CR = '\r';
const FF = '\f';
const TAB = '\t';
const ESCAPE = '\\';
const OPEN_SQUARE = '[';
const CLOSE_SQUARE = ']';

/**
 * Export logger implementation.
 */
const logger = new Logger(console);

/**
 * Splits the string by the delimiter, ignoring escaped delimiters
 * and without tokenizing.
 * Works for plain strings that don't include string representation of
 * complex entities, e.g $replace modifier values.
 *
 * @param string String to split.
 * @param delimiter Delimiter.
 * @param escapeCharacter Escape character.
 * @param preserveEmptyTokens If true, preserve empty parts.
 * @param shouldUnescape If true, unescape characters.
 *
 * @returns Array of string parts.
 */
function splitByDelimiterWithEscapeCharacter(string, delimiter, escapeCharacter, preserveEmptyTokens, shouldUnescape = true) {
    if (!string) {
        return [];
    }
    if (string.startsWith(delimiter)) {
        // eslint-disable-next-line no-param-reassign
        string = string.substring(1);
    }
    let words = [];
    if (!string.includes(escapeCharacter)) {
        words = string.split(delimiter);
        if (!preserveEmptyTokens) {
            words = words.filter((word) => !!word);
        }
        return words;
    }
    let chars = [];
    const makeWord = () => {
        const word = chars.join('');
        words.push(word);
        chars = [];
    };
    for (let i = 0; i < string.length; i += 1) {
        const char = string.charAt(i);
        const isLastChar = i === (string.length - 1);
        if (char === delimiter) {
            const isEscapedChar = i > 0 && string[i - 1] === escapeCharacter;
            if (isEscapedChar) {
                if (shouldUnescape) {
                    chars.splice(chars.length - 1, 1);
                }
                chars.push(char);
            }
            else {
                makeWord();
            }
            if (isLastChar) {
                makeWord();
            }
        }
        else if (isLastChar) {
            chars.push(char);
            makeWord();
        }
        else {
            chars.push(char);
        }
    }
    if (!preserveEmptyTokens) {
        words = words.filter((word) => !!word);
    }
    return words;
}
/**
 * Checks if the specified string starts with a substr at the specified index.
 *
 * @param str String to check.
 * @param startIndex Index to start checking from.
 * @param substr Substring to check.
 *
 * @returns Boolean true if it does start.
 */
function startsAtIndexWith(str, startIndex, substr) {
    if (str.length - startIndex < substr.length) {
        return false;
    }
    for (let i = 0; i < substr.length; i += 1) {
        if (str.charAt(startIndex + i) !== substr.charAt(i)) {
            return false;
        }
    }
    return true;
}
/**
 * Checks if `str` has unquoted `substr`.
 *
 * @param str String to check.
 * @param substr Substring to check.
 *
 * @returns True if str has unquoted substr.
 */
function hasUnquotedSubstring(str, substr) {
    const quotes = ['"', "'", '/'];
    if (!str.includes(substr)) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (indexOfAny(str, quotes) === -1) {
        return true;
    }
    const stack = [];
    for (let i = 0; i < str.length; i += 1) {
        const cursor = str[i];
        if (stack.length === 0) {
            if (startsAtIndexWith(str, i, substr)) {
                return true;
            }
        }
        if (quotes.indexOf(cursor) >= 0
            && (i === 0 || str[i - 1] !== '\\')) {
            const last = stack.pop();
            if (!last) {
                stack.push(cursor);
            }
            else if (last !== cursor) {
                stack.push(last);
                stack.push(cursor);
            }
        }
    }
    return false;
}
/**
 * `djb2` hash algorithm.
 *
 * NOTE: This version uses some bit operands to exclude overflow MAX_SAFE_INTEGER
 * (and moreover, exclude overflow 2^32).
 *
 * @see {@link https://gist.github.com/eplawless/52813b1d8ad9af510d85?permalink_comment_id=3367765#gistcomment-3367765}
 *
 * @param str String to get hash.
 *
 * @returns Hash.
 */
function fastHash(str) {
    if (str.length === 0) {
        return 0;
    }
    // A magic constant that gives good distribution.
    let hash = 5381;
    for (let i = 0; i < str.length; i += 1) {
        hash = hash * 33 ^ str.charCodeAt(i);
    }
    return hash >>> 0;
}
/**
 * `djb2` hash algorithm with sign bit masked off to fit 31 bits.
 *
 * @param str String to get hash.
 *
 * @returns Hash from 0 to 2^31-1.
 */
function fastHash31(str) {
    // Mask off sign bit to keep value in range [0, ..., 2^31‑1].
    return fastHash(str) & 0x7fffffff;
}
/**
 * Look for any symbol from "chars" array starting at "start" index or from the start of the string.
 *
 * @param str   String to search.
 * @param chars Chars to search for.
 * @param start Start index (optional, inclusive).
 *
 * @returns Int Index of the element found or -1 if not.
 */
function indexOfAny(str, chars, start = 0) {
    if (str.length <= start) {
        return -1;
    }
    for (let i = start; i < str.length; i += 1) {
        const c = str.charAt(i);
        if (chars.indexOf(c) > -1) {
            return i;
        }
    }
    return -1;
}
/**
 * Replaces all occurrences of find with replace in str.
 *
 * @param str The string in which to replace all occurrences of the find string.
 * @param find The substring to find in the string.
 * @param replace The substring to replace the find string with.
 *
 * @returns The string with all occurrences of find replaced by replace.
 */
function replaceAll(str, find, replace) {
    if (!str) {
        return str;
    }
    return str.split(find).join(replace);
}
/**
 * Checks if arrays are equal.
 *
 * @param left Array.
 * @param right Array.
 *
 * @returns True on equality.
 */
function stringArraysEquals(left, right) {
    if (!left || !right) {
        return !left && !right;
    }
    if (left.length !== right.length) {
        return false;
    }
    for (let i = 0; i < left.length; i += 1) {
        if (left[i] !== right[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Checks if arrays have an intersection.
 *
 * @param left Array.
 * @param right Array.
 *
 * @returns True on intersection.
 */
function stringArraysHaveIntersection(left, right) {
    if (!left || !right) {
        return true;
    }
    for (let i = 0; i < left.length; i += 1) {
        if (right.includes(left[i])) {
            return true;
        }
    }
    return false;
}
/**
 * Checks if string contains spaces.
 *
 * @param str String to check.
 *
 * @returns `true` if string contains spaces, `false` otherwise.
 */
function hasSpaces(str) {
    return str.includes(SPACE);
}
/**
 * Check if the given value is a string.
 *
 * @param value Value to check.
 *
 * @returns `true` if value is a string, `false` otherwise.
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * Unescapes all occurrences of the specified character in the string.
 *
 * @param str String to unescape.
 * @param char Character to unescape.
 *
 * @returns The string with all occurrences of the specified character unescaped.
 */
function unescapeChar(str, char) {
    return replaceAll(str, `\\${char}`, char);
}
/**
 * Finds the next line break index in the string starting from the specified index.
 * Supports LF, CR, FF and CRLF line breaks.
 *
 * @param str String to search in.
 * @param startIndex  Start index. Default is 0.
 *
 * @returns A tuple with the line break index and the line break length.
 * If the line break is not found, returns the string length and 0.
 */
function findNextLineBreakIndex(str, startIndex = 0) {
    const { length } = str;
    let offset = startIndex;
    while (offset < length) {
        const char = str[offset];
        if (char === LF || char === FF) {
            return [offset, 1];
        }
        if (char === CR) {
            return str[offset + 1] === LF ? [offset, 2] : [offset, 1];
        }
        offset += 1;
    }
    return [length, 0];
}
/**
 * Finds the next occurrence of a specified character in a string that is not preceded by an escape (`\`).
 *
 * @param str The input string to search within.
 * @param char The character to find in the string.
 * @param [startIndex] The index to start searching from.
 *
 * @returns The index of the next unescaped occurrence of the character, or the length of the string if not found.
 */
const findNextUnescapedIndex = (str, char, startIndex = 0) => {
    let i = str.indexOf(char, startIndex);
    while (i !== -1 && str[i - 1] === '\\') {
        i = str.indexOf(char, i + 1);
    }
    return i === -1 ? str.length : i;
};
/**
 * Determines whether a given Unicode code point corresponds to a numeric digit (0-9).
 *
 * @param codePoint The Unicode code point to check.
 *
 * @returns `true` if the code point represents a numeric character (0-9), otherwise `false`.
 */
const isNumber = (codePoint) => {
    return codePoint >= 48 && codePoint <= 57;
};
/**
 * Determines whether a given Unicode code point corresponds to an alphabetical letter (a-z, A-Z).
 *
 * @param codePoint The Unicode code point to check.
 *
 * @returns `true` if the code point represents an alphabetic character, otherwise `false`.
 */
const isAlpha = (codePoint) => {
    const codePointLower = codePoint | 0x20;
    return codePointLower >= 97 && codePointLower <= 122;
};
/**
 * Determines whether a given Unicode code point corresponds to an alphanumeric character (a-z, A-Z, 0-9).
 *
 * @param codePoint The Unicode code point to check.
 *
 * @returns `true` if the code point represents an alphanumeric character, otherwise `false`.
 */
const isAlphaNumeric = (codePoint) => {
    return isAlpha(codePoint) || isNumber(codePoint);
};
/**
 * Checks if a string contains whitespace characters (spaces or tabs).
 *
 * @param str The string to check.
 * @param start The start index to check from.
 * @param end The end index to check to (exclusive).
 *
 * @returns True if the string contains whitespace, false otherwise.
 *
 * @note This function looks only for space and tab, because we split lines earlier.
 */
const hasWhitespace = (str, start, end) => {
    for (let i = start; i < end; i += 1) {
        const ch = str[i];
        if (ch === SPACE || ch === TAB) {
            return true;
        }
    }
    return false;
};
/**
 * Finds the next non-whitespace character in a string.
 *
 * @param str The string to search.
 * @param start The starting index.
 * @param len The length of the string.
 *
 * @returns The index of the next non-whitespace character or the length of the string if not found.
 *
 * @note This function looks only for space and tab, because we split lines earlier.
 */
const findNextNonWhitespace = (str, start, len) => {
    let i = start;
    while (i < len && (str[i] === SPACE || str[i] === TAB)) {
        i += 1;
    }
    return i;
};
/**
 * Finds the previous non-whitespace character in a string.
 *
 * @param str The string to search.
 * @param start The starting index.
 *
 * @returns The index of the previous non-whitespace character or `0` if not found.
 *
 * @note This function looks only for space and tab, because we split lines earlier.
 */
const findPrevNonWhitespace = (str, start) => {
    let i = start;
    while (i > 0 && (str[i - 1] === SPACE || str[i - 1] === TAB)) {
        i -= 1;
    }
    return i;
};
/**
 * Finds the next whitespace character in a string.
 *
 * @param str The string to search.
 * @param start The starting index.
 *
 * @returns The index of the next whitespace character or the length of the string if not found.
 *
 * @note This function looks only for space and tab, because we split lines earlier.
 */
const findNextWhitespace = (str, start) => {
    let i = str.indexOf(SPACE, start);
    if (i !== -1) {
        return i;
    }
    i = str.indexOf(TAB, start);
    if (i !== -1) {
        return i;
    }
    return str.length;
};

/* eslint-disable prefer-regex-literals */
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
// should be escaped . * + ? ^ $ { } ( ) | [ ] / \
// except of * | ^
const specialCharacters = ['.', '+', '?', '$', '{', '}', '(', ')', '[', ']', '/', '\\'];
const reSpecialCharacters = new RegExp(`[${specialCharacters.join('\\')}]`, 'g');
const reSpecialCharactersFull = /[.*+?^${}()|[\]\\]/g;
const reEscapedSpecialCharactersFull = /\\[.*+?^${}()|[\]\\]/g;
const protocolMarker = String.raw `:\/\/`;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#using_special_characters_in_strings
const escapeSequence = {
    n: '\n',
    r: '\r',
    t: '\t',
    b: '\b',
    f: '\f',
    v: '\v',
};
/**
 * Class with static helper methods for working with basic filtering rules patterns.
 *
 * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#basic-rules}
 *
 * @returns The escaped string.
 */
class SimpleRegex {
    /**
     * Matching the beginning of an address. With this character you don't
     * have to specify a particular protocol and subdomain in address mask.
     * It means, `||` stands for `http://*.`, `https://*.`, `ws://*.`, `wss://*.` at once.
     */
    static MASK_START_URL = '||';
    /**
     * REGEX_START_URL corresponds to MASK_START_URL.
     */
    static REGEX_START_URL = '^(http|https|ws|wss)://([a-z0-9-_.]+\\.)?';
    /**
     * A pointer to the beginning or the end of address. The value depends on the
     * character placement in the mask. For example, a rule `swf|` corresponds
     * to `http://example.com/annoyingflash.swf`, but not to `http://example.com/swf/index.html`.
     * `|http://example.org` corresponds to `http://example.org`,
     * but not to `http://domain.com?url=http://example.org`.
     */
    static MASK_PIPE = '|';
    /**
     * REGEX_END_STRING corresponds to MASK_PIPE if it is in the end of a pattern.
     */
    static REGEX_END_STRING = '$';
    /**
     * REGEX_START_STRING corresponds to MASK_PIPE if it is in the beginning of a pattern.
     */
    static REGEX_START_STRING = '^';
    /**
     * Separator character mark. Separator character is any character,
     * but a letter, a digit, or one of the following: _ - .
     */
    static MASK_SEPARATOR = '^';
    /**
     * REGEX_SEPARATOR corresponds to MASK_SEPARATOR.
     */
    static REGEX_SEPARATOR = '([^ a-zA-Z0-9.%_-]|$)';
    /**
     * This is a wildcard character. It is used to represent "any set of characters".
     * This can also be an empty string or a string of any length.
     */
    static MASK_ANY_CHARACTER = '*';
    /**
     * Path separator.
     */
    static MASK_BACKSLASH = '/';
    /**
     * REGEX_ANY_CHARACTER corresponds to MASK_ANY_CHARACTER.
     */
    static REGEX_ANY_CHARACTER = '.*';
    /**
     * Enclose regex in two backslashes to mark a regex rule.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#regular-expressions-support}
     */
    static MASK_REGEX_RULE = '/';
    /**
     *  Regex for matching special characters in modifier regex pattern.
     */
    static reModifierPatternSpecialCharacters = /[[\],\\]/g;
    /**
     * Regex for matching escaped special characters in modifier regex pattern.
     */
    static reModifierPatternEscapedSpecialCharacters = /\\[[\],\\]/g;
    /**
     * If string starts with exclamation mark "!" we consider it as comment.
     */
    static MASK_COMMENT = '!';
    /**
     * Min length of rule shortcut
     * This value has been picked as a result of performance experiments.
     */
    static MIN_SHORTCUT_LENGTH = 3;
    /**
     * Min length of generic rule shortcut.
     */
    static MIN_GENERIC_RULE_LENGTH = 4;
    /**
     * Regex with basic matching pattern special characters.
     */
    static rePatternSpecialCharacters = new RegExp('[*^|]');
    /**
     * Extracts the shortcut from the rule's pattern.
     * Shortcut is the longest substring of the pattern that does not contain
     * any special characters.
     *
     * Please note, that the shortcut is always lower-case!
     *
     * @param pattern Network rule's pattern.
     *
     * @returns The shortcut or the empty string if we could not extract any.
     */
    static extractShortcut(pattern) {
        if (pattern.startsWith(this.MASK_REGEX_RULE) && pattern.endsWith(this.MASK_REGEX_RULE)) {
            return this.extractRegexpShortcut(pattern);
        }
        return this.extractBasicShortcut(pattern);
    }
    /**
     * Searches for the longest substring of the pattern that
     * does not contain any special characters: `*`, `^`, `|`.
     *
     * @param pattern Network rule's pattern.
     *
     * @returns The shortcut or the empty string.
     */
    static extractBasicShortcut(pattern) {
        let longest = '';
        const parts = pattern.split(this.rePatternSpecialCharacters);
        for (const part of parts) {
            if (part.length > longest.length) {
                longest = part;
            }
        }
        return (longest || '').toLowerCase();
    }
    /**
     * Extracts the longest substring from the provided regex pattern that does not
     * contain any special regex symbols or constructs that invalidate it for use
     * as a quick match shortcut.
     * The pattern is expected to be enclosed in forward slashes (e.g., `/example/`),
     * and may optionally contain a protocol marker (`://`),
     * which is ignored to prevent trivial matches like "http".
     *
     * This method discards many complex regex features (e.g., groups, character
     * classes, certain escaped sequences) when forming the shortcut, and always
     * returns the result in lower-case. If no valid substring is found, it returns
     * an empty string.
     *
     * @param pattern The input regex pattern, including the enclosing slashes.
     * For example: `/https?:\\/\\/example\\.com/`.
     *
     * @returns The longest valid substring usable as a shortcut, or an empty string if none is found.
     */
    static extractRegexpShortcut(pattern) {
        const { length } = pattern;
        if (!pattern
            // length should be at least 3: "/x/", "//" does not make sense
            || length < 3
            // regex pattern should start and end with '/'
            || pattern[0] !== '/'
            || pattern[length - 1] !== '/') {
            return '';
        }
        const protocolIndex = pattern.indexOf(protocolMarker);
        /**
         * `i` is our primary index into the pattern;
         * we skip the initial `/` or jump after the protocol marker `://`.
         */
        let i = protocolIndex !== -1
            ? protocolIndex + protocolMarker.length
            : 1;
        let longestToken = '';
        let longestTokenInGroup = '';
        let currentToken = '';
        /**
         * Resets `currentToken` and updates `longestTokenInGroup` if `currentToken` is longer.
         */
        const resetCurrentToken = () => {
            if (currentToken.length > longestTokenInGroup.length) {
                longestTokenInGroup = currentToken;
            }
            currentToken = '';
        };
        /**
         * Resets `longestTokenInGroup` and updates `longestToken` if `longestTokenInGroup` is longer.
         */
        const resetGroupToken = () => {
            if (longestTokenInGroup.length > longestToken.length) {
                longestToken = longestTokenInGroup;
            }
            longestTokenInGroup = '';
        };
        /**
         * Track parenthesis group nesting.
         */
        let groupBalance = 0;
        /**
         * Skip everything up to the closing parenthesis for the current group
         * (including nested groups).
         * This method moves `i` to the position of the closing parenthesis.
         */
        const ignoreCurrentGroup = () => {
            // Ignoring group means we should drop the current token
            currentToken = '';
            longestTokenInGroup = '';
            const startBalance = groupBalance;
            while (i < length) {
                // If `(` is not escaped, increment group count
                if (pattern[i] === '(' && pattern[i - 1] !== '\\') {
                    groupBalance += 1;
                }
                // If `)` is not escaped, decrement group count
                if (pattern[i] === ')' && pattern[i - 1] !== '\\') {
                    groupBalance -= 1;
                    // Once we return to the level before this group started, stop
                    if (groupBalance < startBalance) {
                        break;
                    }
                }
                i += 1;
            }
        };
        while (i < length) {
            const char = pattern[i];
            // 1) Handle escaped sequences
            if (char === '\\') {
                // Skip the backslash
                i += 1;
                const escaped = pattern[i];
                switch (escaped) {
                    // Ignore predefined character classes: \d, \D, \s, \S, \w, \W
                    case 'd':
                    case 'D':
                    case 's':
                    case 'S':
                    case 'w':
                    case 'W':
                    // Ignore special characters: \t, \r, \n, \v, \f, \b, \0
                    // eslint-disable-next-line no-fallthrough
                    case 't':
                    case 'r':
                    case 'n':
                    case 'v':
                    case 'f':
                    case 'b':
                    case '0':
                        resetCurrentToken();
                        i += 1;
                        continue;
                    // Ignore control characters: \cX — control character X
                    case 'c':
                        resetCurrentToken();
                        // skip 'c' and the following character
                        i += 2;
                        continue;
                    // Ignore \xhh
                    case 'x':
                        resetCurrentToken();
                        // skip 'x' and the following 2 characters
                        i += 3;
                        continue;
                    // Ignore \uhhhh
                    case 'u':
                        resetCurrentToken();
                        // skip 'u' and the following 4 characters
                        i += 5;
                        continue;
                    // Ignore named backreference: \k<...>
                    case 'k':
                        resetCurrentToken();
                        // skip 'k'
                        i += 1;
                        if (pattern[i] === '<') {
                            // Skip until the closing '>'
                            i = findNextUnescapedIndex(pattern, '>', i) + 1;
                        }
                        continue;
                    // Special case: add escaped '.' or '/' to the current token
                    case '.':
                    case '/':
                        currentToken += escaped;
                        i += 1;
                        continue;
                    default:
                        resetCurrentToken();
                        i += 1;
                        continue;
                }
            }
            // 2) Handle "regular" characters (i.e., not after a backslash)
            switch (char) {
                // Ignore custom character classes, like [xyz], [^xyz], [\b], [a-z], etc.
                case '[':
                    resetCurrentToken();
                    i = findNextUnescapedIndex(pattern, ']', i) + 1;
                    continue;
                // Ignore disjunctions (alternations), like a|b|c
                // Note: shortcut should be present in all possible tested strings,
                // this is why we ignore disjunctions
                case '|':
                    ignoreCurrentGroup();
                    continue;
                // Ignore specific quantifiers, like x{n}, x{n,}, x{n,m}
                case '{':
                    resetCurrentToken();
                    i = findNextUnescapedIndex(pattern, '}', i) + 1;
                    continue;
                // Handle group open
                case '(':
                    resetCurrentToken();
                    resetGroupToken();
                    groupBalance += 1;
                    // Skip `(`
                    i += 1;
                    // Ignore negative lookahead: (?!...) and negative lookbehind: (?<!...)
                    // Negative lookbehind and lookahead contain data that should not be present in the tested strings,
                    // this is why we ignore them
                    if (pattern.indexOf('?!', i) === i || pattern.indexOf('?<!', i) === i) {
                        ignoreCurrentGroup();
                    }
                    // Ignore name section from named groups: (?<...>
                    if (pattern.indexOf('?<', i) === i) {
                        // Skip until the closing '>'
                        i = findNextUnescapedIndex(pattern, '>', i + 2) + 1;
                    }
                    continue;
                // Handle group close
                case ')':
                    resetCurrentToken();
                    resetGroupToken();
                    groupBalance -= 1;
                    // Skip `)`
                    i += 1;
                    continue;
                // Handle special regex symbols: . * + ? ^ $ /
                case '.':
                case '*':
                case '+':
                case '?':
                case '^':
                case '$':
                case '/':
                    resetCurrentToken();
                    i += 1;
                    continue;
                default:
                    // For performance, let's check if it's a valid token char
                    // Note: isValidRegexpShortcutChar checks for alphanumeric or
                    // escaped '.' or '/'
                    if (isAlphaNumeric(char.charCodeAt(0))) {
                        currentToken += char;
                    }
                    else {
                        // If it's not a valid char for a shortcut, reset
                        resetCurrentToken();
                    }
                    i += 1;
                    break;
            }
        }
        // Finalize the last token
        resetCurrentToken();
        resetGroupToken();
        return longestToken.toLowerCase();
    }
    /**
     * PatternToRegexp is a helper method for creating regular expressions from the simple
     * wildcard-based syntax which is used in basic filters.
     *
     * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#basic-rules}
     *
     * @param pattern Basic rule pattern.
     *
     * @returns Regular expression.
     */
    static patternToRegexp(pattern) {
        if (pattern === this.MASK_START_URL
            || pattern === this.MASK_PIPE
            || pattern === this.MASK_ANY_CHARACTER
            || pattern === '') {
            return this.REGEX_ANY_CHARACTER;
        }
        if (pattern.startsWith(this.MASK_REGEX_RULE) && pattern.endsWith(this.MASK_REGEX_RULE)) {
            // This is a regex rule, just remove the regex markers
            return pattern.substring(this.MASK_REGEX_RULE.length, pattern.length - this.MASK_REGEX_RULE.length);
        }
        // Escape special characters except of * | ^
        let regex = pattern.replace(reSpecialCharacters, '\\$&');
        // Now escape "|" characters but avoid escaping them in the special places
        if (regex.startsWith(this.MASK_START_URL)) {
            regex = regex.substring(0, this.MASK_START_URL.length)
                + replaceAll(regex.substring(this.MASK_START_URL.length, regex.length - this.MASK_PIPE.length), this.MASK_PIPE, `\\${this.MASK_PIPE}`)
                + regex.substring(regex.length - this.MASK_PIPE.length);
        }
        else {
            regex = regex.substring(0, this.MASK_PIPE.length)
                + replaceAll(regex.substring(this.MASK_PIPE.length, regex.length - this.MASK_PIPE.length), this.MASK_PIPE, `\\${this.MASK_PIPE}`)
                + regex.substring(regex.length - this.MASK_PIPE.length);
        }
        // Replace special URL masks
        regex = replaceAll(regex, this.MASK_ANY_CHARACTER, this.REGEX_ANY_CHARACTER);
        regex = replaceAll(regex, this.MASK_SEPARATOR, this.REGEX_SEPARATOR);
        // Replace start URL and pipes
        if (regex.startsWith(this.MASK_START_URL)) {
            regex = this.REGEX_START_URL + regex.substring(this.MASK_START_URL.length);
        }
        else if (regex.startsWith(this.MASK_PIPE)) {
            regex = this.REGEX_START_STRING + regex.substring(this.MASK_PIPE.length);
        }
        if (regex.endsWith(this.MASK_PIPE)) {
            regex = regex.substring(0, regex.length - this.MASK_PIPE.length) + this.REGEX_END_STRING;
        }
        return regex;
    }
    /**
     * Creates RegExp object from string in '/reg_exp/gi' format.
     *
     * @param str The string to escape.
     *
     * @returns The created RegExp object.
     */
    static patternFromString(str) {
        const parts = splitByDelimiterWithEscapeCharacter(str, '/', '\\', true);
        let modifiers = (parts[1] || '');
        if (modifiers.indexOf('g') < 0) {
            modifiers += 'g';
        }
        return new RegExp(parts[0], modifiers);
    }
    /**
     * Converts a string representation of a regular expression into a RegExp object.
     *
     * @param literal String representation of the regular expression.
     *
     * @returns A RegExp object if the input is a valid regular expression literal, otherwise the original string.
     */
    static fromLiteral(literal) {
        // Early check for regexp marker
        if (literal.length < 2 || !literal.startsWith('/')) {
            return literal;
        }
        let pattern = '';
        let flags = '';
        let inCharClass = false;
        for (let i = 1; i < literal.length; i += 1) {
            const char = literal.charAt(i);
            if (char === '[' && literal[i - 1] !== '\\') {
                inCharClass = true;
            }
            else if (char === ']' && literal[i - 1] !== '\\') {
                inCharClass = false;
            }
            else if (literal[i] === '/' && literal[i - 1] !== '\\' && !inCharClass) {
                pattern = literal.slice(1, i);
                flags = literal.slice(i + 1);
                break;
            }
        }
        // Didn't find the ending slash
        if (!pattern) {
            return literal;
        }
        try {
            return new RegExp(pattern, flags);
        }
        catch (e) {
            logger.warn(`[tsurl.SimpleRegex.fromLiteral]: Invalid regular expression literal: ${literal}:`, e);
            return literal;
        }
    }
    /**
     * Escapes characters with special meaning inside a regular expression.
     *
     * @param str The string to escape.
     * @param searchPattern Pattern for detecting special characters. Optional.
     *
     * @returns The escaped string.
     */
    static escapeRegexSpecials(str, searchPattern = reSpecialCharactersFull) {
        return str.replace(searchPattern, '\\$&');
    }
    /**
     * Unescapes characters with special meaning inside a regular expression.
     *
     * @param str The string to unescape.
     * @param searchPattern Pattern for detecting special characters. Optional.
     *
     * @returns The unescaped string.
     */
    static unescapeRegexSpecials(str, searchPattern = reEscapedSpecialCharactersFull) {
        return str.replace(searchPattern, (match) => match.substring(1));
    }
    /**
     * Check if pattern is Regex.
     *
     * @param str The string to check.
     *
     * @returns True if the string is a regex pattern, false otherwise.
     */
    static isRegexPattern(str) {
        return str.startsWith('/') && str.endsWith('/');
    }
    /**
     * Unescapes special characters in a string.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#using_special_characters_in_strings}
     *
     * @param str The string to unescape.
     *
     * @returns The unescaped string.
     */
    static unescapeSpecials(str) {
        const keys = Object.keys(escapeSequence).join('|');
        const regex = new RegExp(`\\\\(${keys})`, 'g');
        return str.replace(regex, (match, group) => {
            return escapeSequence[group];
        });
    }
}

export { isAlphaNumeric as A, CR as C, EMPTY_STRING as E, LF as L, OPEN_SQUARE as O, SimpleRegex as S, TAB as T, WILDCARD as W, SEPARATOR as a, stringArraysEquals as b, stringArraysHaveIntersection as c, findNextLineBreakIndex as d, findNextNonWhitespace as e, fastHash as f, findPrevNonWhitespace as g, hasSpaces as h, isString as i, hasWhitespace as j, SPACE as k, logger as l, CLOSE_SQUARE as m, ESCAPE as n, findNextWhitespace as o, COMMA as p, startsAtIndexWith as q, hasUnquotedSubstring as r, splitByDelimiterWithEscapeCharacter as s, fastHash31 as t, unescapeChar as u, indexOfAny as v, replaceAll as w, findNextUnescapedIndex as x, isNumber as y, isAlpha as z };
