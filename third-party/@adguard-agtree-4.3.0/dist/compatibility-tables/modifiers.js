/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { UNDERSCORE } from '../utils/constants.js';
import { deepFreeze } from '../utils/deep-freeze.js';
import { isValidNoopModifier } from '../utils/noop-modifier.js';
import { CompatibilityTableBase } from './base.js';
import { modifiersCompatibilityTableData } from './compatibility-table-data.js';

/**
 * @file Compatibility tables for modifiers.
 */
/**
 * Transforms the name of the modifier to a normalized form.
 * This is a special case: the noop modifier normally '_', but it can consist of any number of characters,
 * e.g. '____' is also valid. In this case, we need to normalize the name to '_'.
 *
 * @param name Modifier name to normalize.
 *
 * @returns Normalized modifier name.
 */
const noopModifierNameNormalizer = (name) => {
    if (name.startsWith(UNDERSCORE)) {
        if (isValidNoopModifier(name)) {
            // in compatibility tables, we just store '_', so we need to reduce the number of underscores to 1
            // before checking the existence of the noop modifier
            return UNDERSCORE;
        }
    }
    return name;
};
/**
 * Compatibility table for modifiers.
 */
class ModifiersCompatibilityTable extends CompatibilityTableBase {
    /**
     * Creates a new instance of the compatibility table for modifiers.
     *
     * @param data Compatibility table data.
     */
    constructor(data) {
        super(data, noopModifierNameNormalizer);
    }
}
/**
 * Deep freeze the compatibility table data to avoid accidental modifications.
 */
deepFreeze(modifiersCompatibilityTableData);
/**
 * Compatibility table instance for modifiers.
 */
const modifiersCompatibilityTable = new ModifiersCompatibilityTable(modifiersCompatibilityTableData);

export { modifiersCompatibilityTable };
