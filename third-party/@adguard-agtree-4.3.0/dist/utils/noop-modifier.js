/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { UNDERSCORE } from './constants.js';

/**
 * Validates the noop modifier (i.e. only underscores).
 *
 * @param value Value of the modifier.
 *
 * @returns True if the modifier is valid, false otherwise.
 */
const isValidNoopModifier = (value) => {
    const { length } = value;
    if (length === 0) {
        return false;
    }
    for (let i = 0; i < length; i += 1) {
        if (value[i] !== UNDERSCORE) {
            return false;
        }
    }
    return true;
};

export { isValidNoopModifier };
