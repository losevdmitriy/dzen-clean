import packageJson from './package.json.js';

if (!('version' in packageJson) || "string" !== 'string' || packageJson.version.length === 0) {
    throw new Error('Package version is missing. Run scripts/inject-package-versions.mjs before building.');
}
/**
 * Version of the `@adguard/dnr-converter` package.
 *
 * Annotated as `string` (not inferred from `packageJson.version`) because the
 * committed manifest is versionless: before injection TypeScript narrows
 * `packageJson.version` to `never`, which would leak an unstable `never` type
 * into the public API (`never` is assignable to `string`, and the runtime guard
 * above still enforces non-emptyness in both states).
 */ const DNR_CONVERTER_VERSION = packageJson.version;

export { DNR_CONVERTER_VERSION };
