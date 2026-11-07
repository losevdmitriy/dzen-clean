/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { deepFreeze } from '../utils/deep-freeze.js';
import { CompatibilityTableBase } from './base.js';
import { scriptletsCompatibilityTableData } from './compatibility-table-data.js';

/**
 * @file Compatibility tables for scriptlets.
 */
/**
 * Compatibility table for scriptlets.
 */
class ScriptletsCompatibilityTable extends CompatibilityTableBase {
}
/**
 * Deep freeze the compatibility table data to avoid accidental modifications.
 */
deepFreeze(scriptletsCompatibilityTableData);
/**
 * Compatibility table instance for scriptlets.
 */
const scriptletsCompatibilityTable = new ScriptletsCompatibilityTable(scriptletsCompatibilityTableData);

export { scriptletsCompatibilityTable };
