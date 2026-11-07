var name = "@adguard/dnr-converter";
var description = "A converter that transforms adblock-style filtering rules into rules compatible with the Declarative Net Request (DNR) API.";
var main = "dist/index.js";
var module$1 = "dist/index.js";
var types = "dist/types/src/index.d.ts";
var type = "module";
var sideEffects = false;
var files = [
    "dist"
];
var exports$1 = {
    ".": {
        "import": "./dist/index.js",
        types: "./dist/types/src/index.d.ts"
    },
    "./cli": {
        types: "./dist/types/cli/index.d.ts",
        "default": "./dist/cli.cjs"
    }
};
var bin = {
    "dnr-converter": "dist/cli.cjs"
};
var typesVersions = {
    "*": {
        "*": [
            "dist/types/src/index.d.ts"
        ],
        cli: [
            "dist/types/cli/index.d.ts"
        ]
    }
};
var author = "Adguard Software Ltd.";
var repository = {
    type: "git",
    url: "git+https://github.com/AdGuardSoftwareLimited/ext-tsurlfilter.git",
    directory: "packages/dnr-converter"
};
var license = "GPL-3.0-only";
var engines = {
    node: ">=22"
};
var bugs = {
    url: "https://github.com/AdguardTeam/tsurlfilter/issues"
};
var homepage = "https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/dnr-converter#readme";
var scripts = {
    lint: "pnpm lint:code && pnpm lint:types && pnpm lint:md",
    "lint:code": "eslint --cache --ignore-path .gitignore .",
    "lint:types": "tsc",
    "lint:md": "markdownlint .",
    start: "rollup -c rollup.config.ts --configPlugin typescript -w",
    build: "rimraf dist && rollup -c rollup.config.ts --configPlugin typescript",
    "docs:examples": "tsx tasks/generate-examples.ts",
    test: "vitest run",
    "test:light": "vitest run --exclude \"**/*benchmark*.test.ts\"",
    "test:watch": "vitest run --watch",
    "test:ci": "vitest run --no-cache --reporter default --reporter junit --outputFile=./tests-reports/dnr-converter.xml",
    "test:coverage": "vitest run --coverage",
    "test:smoke": "(cd test/smoke/esm && pnpm test) && (cd test/smoke/exports && pnpm test)",
    "test:prod": "pnpm lint && pnpm test:smoke && pnpm test -- --no-cache",
    "test:debug": "vitest run --inspect --no-file-parallelism --watch",
    precommit: "lint-staged",
    prepublishOnly: "pnpm build",
    tgz: "pnpm pack --out dnr-converter.tgz"
};
var peerDependencies = {
    "@adguard/re2-wasm": "1.2.0"
};
var dependencies = {
    "@adguard/agtree": "workspace:^",
    "@adguard/logger": "workspace:^",
    "@adguard/scriptlets": "catalog:",
    commander: "catalog:",
    punycode: "catalog:",
    valibot: "catalog:"
};
var devDependencies = {
    "@adguard/eslint-plugin-logger-context": "workspace:^",
    "@adguard/tsurlfilter": "workspace:^",
    "@rollup/plugin-commonjs": "catalog:",
    "@rollup/plugin-json": "catalog:",
    "@rollup/plugin-node-resolve": "catalog:",
    "@rollup/plugin-swc": "catalog:",
    "@rollup/plugin-typescript": "catalog:",
    "@types/chrome": "catalog:",
    "@types/node": "catalog:",
    "@types/punycode": "catalog:",
    "@typescript-eslint/eslint-plugin": "catalog:",
    "@typescript-eslint/parser": "catalog:",
    "@vitest/coverage-v8": "catalog:",
    eslint: "catalog:",
    "eslint-config-airbnb-base": "catalog:",
    "eslint-config-airbnb-typescript": "catalog:",
    "eslint-plugin-boundaries": "catalog:",
    "eslint-plugin-import": "catalog:",
    "eslint-plugin-import-newlines": "catalog:",
    "eslint-plugin-jsdoc": "catalog:",
    "eslint-plugin-n": "catalog:",
    "lint-staged": "catalog:",
    markdownlint: "catalog:",
    "markdownlint-cli": "catalog:",
    rimraf: "catalog:",
    rollup: "catalog:",
    "rollup-plugin-copy": "catalog:",
    "rollup-plugin-dts": "catalog:",
    "rollup-plugin-node-externals": "catalog:",
    tsd: "catalog:",
    tsx: "catalog:",
    typescript: "catalog:",
    vitest: "catalog:"
};
var version = "2.0.0";
var packageJson = {
    name: name,
    description: description,
    main: main,
    module: module$1,
    types: types,
    type: type,
    sideEffects: sideEffects,
    files: files,
    exports: exports$1,
    bin: bin,
    typesVersions: typesVersions,
    author: author,
    repository: repository,
    license: license,
    engines: engines,
    bugs: bugs,
    homepage: homepage,
    scripts: scripts,
    "lint-staged": {
        "{src,cli,test,tasks}/**/*.ts": [
            "eslint"
        ]
    },
    peerDependencies: peerDependencies,
    dependencies: dependencies,
    devDependencies: devDependencies,
    version: version
};

export { author, bin, bugs, packageJson as default, dependencies, description, devDependencies, engines, exports$1 as exports, files, homepage, license, main, module$1 as module, name, peerDependencies, repository, scripts, sideEffects, type, types, typesVersions, version };
