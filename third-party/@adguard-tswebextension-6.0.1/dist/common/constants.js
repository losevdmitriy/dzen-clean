/**
 * Filter ID which is used for User rules.
 */
const USER_FILTER_ID = 0;
/**
 * Filter ID which is used for Allowlist.
 */
const ALLOWLIST_FILTER_ID = 100;
/**
 * Custom filters identifiers starts from this number.
 */
const CUSTOM_FILTERS_START_ID = 1000;
/**
 * Filter ID which is used for temporarily disabled rules (as trusted)
 * for the blocking page triggered by rules.
 */
const BLOCKING_TRUSTED_FILTER_ID = -10;
/**
 * Tab ID for background page.
 */
const BACKGROUND_TAB_ID = -1;
/**
 * Line feed character.
 */
const LF = '\n';
/**
 * Semicolon character.
 */
const SEMICOLON = ';';
/**
 * Timeout used for deletion of request context data and frame context data from the storage.
 */
const FRAME_DELETION_TIMEOUT_MS = 3000;
/**
 * Document level frame id.
 */
const MAIN_FRAME_ID = 0;
/**
 * Value of the parent frame id if no parent frame exists.
 *
 * @see {@link https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest#parentframeid}
 */
const NO_PARENT_FRAME_ID = -1;

export { ALLOWLIST_FILTER_ID as A, BACKGROUND_TAB_ID as B, CUSTOM_FILTERS_START_ID as C, FRAME_DELETION_TIMEOUT_MS as F, LF as L, MAIN_FRAME_ID as M, NO_PARENT_FRAME_ID as N, SEMICOLON as S, USER_FILTER_ID as U, BLOCKING_TRUSTED_FILTER_ID as a };
