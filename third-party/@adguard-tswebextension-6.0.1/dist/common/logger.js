import { Logger } from '@adguard/logger';

/**
 * Export logger implementation.
 */
const logger = new Logger(console);
/**
 * Stringify object via JSON.stringify without specified keys.
 *
 * @param obj Object to stringify.
 * @param excludedKeys Keys to exclude.
 *
 * @returns Stringified object without excludedKeys (checking nested keys too).
 */
const stringifyObjectWithoutKeys = (obj, excludedKeys) => {
    return JSON.stringify(obj, (key, value) => (excludedKeys.includes(key) ? undefined : value), 2);
};

export { logger as l, stringifyObjectWithoutKeys as s };
