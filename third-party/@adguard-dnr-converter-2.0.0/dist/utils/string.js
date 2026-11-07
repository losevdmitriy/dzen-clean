import punycode from 'punycode/punycode.js';
import { SPACE_CHARACTER, MASK_REGEX_RULE } from '../constants.js';
import { getErrorMessage } from './error.js';

/**
 * `djb2` hash algorithm.
 *
 * NOTE: This version uses some bit operands to exclude overflow MAX_SAFE_INTEGER (and moreover, exclude overflow 2^32).
 *
 * @see {@link https://gist.github.com/eplawless/52813b1d8ad9af510d85?permalink_comment_id=3367765#gistcomment-3367765}
 *
 * @param str String to get hash.
 *
 * @returns Hash.
 */ function fastHash(str) {
    if (str.length === 0) {
        return 0;
    }
    // A magic constant that gives good distribution.
    let hash = 5381;
    for(let i = 0; i < str.length; i += 1){
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
 */ function fastHash31(str) {
    // Mask off sign bit to keep value in range [0, ..., 2^31‑1].
    return fastHash(str) & 0x7fffffff;
}
/**
 * Checks if the string contains only ASCII characters.
 *
 * @param str String to test.
 *
 * @returns True if string contains only ASCII characters.
 */ function isASCII(str) {
    // eslint-disable-next-line no-control-regex
    return /^[\x00-\x7F]+$/.test(str);
}
/**
 * Converts to ASCII characters only if `str` contains non-ASCII characters.
 *
 * @param str String to convert.
 *
 * @returns A transformed string containing only ASCII characters or
 * the original string.
 *
 * @throws Error if conversion into ASCII fails.
 */ function prepareASCII(str) {
    let res = str;
    try {
        if (!isASCII(res)) {
            // for cyrillic domains we need to convert them by isASCII()
            res = punycode.toASCII(res);
        }
        // after toASCII() some characters can be still non-ASCII
        // e.g. `abc“@` with non-ASCII `“`
        if (!isASCII(res)) {
            res = punycode.encode(res);
        }
    } catch (e) {
        throw new Error(`Error converting to ASCII: "${str}" due to ${getErrorMessage(e)}`);
    }
    return res;
}
/**
 * Converts a list of strings into strings containing only ASCII characters.
 *
 * @param strings List of strings.
 *
 * @returns List of string containing only ASCII characters.
 */ function toASCII(strings) {
    return strings.map(prepareASCII);
}
/**
 * Removes slashes from the beginning and end of the string.
 *
 * @param str String to remove slashes.
 *
 * @returns String without slashes.
 */ function removeSlashes(str) {
    if (str.startsWith(MASK_REGEX_RULE) && str.endsWith(MASK_REGEX_RULE)) {
        return str.substring(1, str.length - 1);
    }
    return str;
}
/**
 * Check if pattern is Regex.
 *
 * @param str The string to check.
 *
 * @returns True if the string is a regex pattern, false otherwise.
 */ function isRegexPattern(str) {
    return str.startsWith(MASK_REGEX_RULE) && str.endsWith(MASK_REGEX_RULE);
}
/**
 * Checks if string contains spaces.
 *
 * @param str String to check.
 *
 * @returns `true` if string contains spaces, `false` otherwise.
 */ function hasSpaces(str) {
    return str.includes(SPACE_CHARACTER);
}
/**
 * Tab character used for pretty printing.
 */ const TAB = '\t';
/**
 * Serializes data to a JSON string.
 *
 * @param data Data to serialize.
 * @param pretty Whether to pretty print the output.
 *
 * @returns JSON string.
 */ function serializeJson(data, pretty) {
    return JSON.stringify(data, null, pretty ? TAB : undefined);
}
/**
 * Splits the string by the delimiter, ignoring escaped delimiters
 * and without tokenizing.
 *
 * @param string String to split.
 * @param delimiter Delimiter.
 * @param escapeCharacter Escape character.
 * @param preserveEmptyTokens If true, preserve empty parts.
 * @param shouldUnescape If true, unescape characters.
 *
 * @returns Array of string parts.
 */ function splitByDelimiterWithEscapeCharacter(string, delimiter, escapeCharacter, preserveEmptyTokens, shouldUnescape = true) {
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
        return words;
    }
    let chars = [];
    const makeWord = ()=>{
        const word = chars.join('');
        words.push(word);
        chars = [];
    };
    for(let i = 0; i < string.length; i += 1){
        const char = string.charAt(i);
        const isLastChar = i === string.length - 1;
        if (char === delimiter) {
            const isEscapedChar = i > 0 && string[i - 1] === escapeCharacter;
            if (isEscapedChar) {
                if (shouldUnescape) {
                    chars.splice(chars.length - 1, 1);
                }
                chars.push(char);
            } else {
                makeWord();
            }
            if (isLastChar) {
                makeWord();
            }
        } else if (isLastChar) {
            chars.push(char);
            makeWord();
        } else {
            chars.push(char);
        }
    }
    return words;
}

export { TAB, fastHash, fastHash31, hasSpaces, isASCII, isRegexPattern, prepareASCII, removeSlashes, serializeJson, splitByDelimiterWithEscapeCharacter, toASCII };
