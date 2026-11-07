/**
 * @adguard/extended-css - v2.2.0 - Thu Apr 30 2026
 * https://github.com/AdguardTeam/ExtendedCss#homepage
 * Copyright (c) 2026 AdGuard. Licensed GPL-3.0
 */
var version = "2.2.0";

/**
 * @file Extended CSS version.
 */
// Don't export version from package.json directly, because if you run
// `tsc` in the root directory, it will generate `dist/types/src/version.d.ts`
// with wrong relative path to `package.json`. So we need this little "hack"

const EXTENDED_CSS_VERSION = version;

export { EXTENDED_CSS_VERSION };
