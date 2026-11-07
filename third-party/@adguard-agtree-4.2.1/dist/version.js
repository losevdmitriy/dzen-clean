/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import { version } from './package.json.js';

/**
 * @file AGTree version.
 */
// ! Notice:
// Don't export version from package.json directly, because if you run
// `tsc` in the root directory, it will generate `dist/types/src/version.d.ts`
// with wrong relative path to `package.json`. So we need this little "hack"
const AGTREE_VERSION = version;

export { AGTREE_VERSION };
