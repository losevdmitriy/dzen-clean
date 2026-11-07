/**
 * Name of the Content-Security-Policy header.
 */ const CSP_HEADER_NAME = 'Content-Security-Policy';
/**
 * Name of the Permissions-Policy header.
 */ const PERMISSIONS_POLICY_HEADER_NAME = 'Permissions-Policy';
/**
 * Enclose regex in two backslashes to mark a regex rule.
 *
 * @see {@link https://kb.adguard.com/en/general/how-to-create-your-own-ad-filters#regular-expressions-support}
 */ const MASK_REGEX_RULE = '/';
/**
 * Negation character used in modifier values (e.g. `$removeparam=~param`).
 */ const MASK_NEGATE_CHARACTER = '~';
/**
 * This is a wildcard character. It is used to represent "any set of characters".
 * This can also be an empty string or a string of any length.
 */ const MASK_ANY_CHARACTER = '*';
/**
 * Dot character, used as a domain label separator.
 */ const DOT = '.';
/**
 * Space character.
 */ const SPACE_CHARACTER = ' ';

export { CSP_HEADER_NAME, DOT, MASK_ANY_CHARACTER, MASK_NEGATE_CHARACTER, MASK_REGEX_RULE, PERMISSIONS_POLICY_HEADER_NAME, SPACE_CHARACTER };
