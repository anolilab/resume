import { createConfig } from "@anolilab/eslint-config";

/** @type {import("@anolilab/eslint-config").PromiseFlatConfigComposer} */
export default createConfig({
    ignores: [
        "dist",
        "node_modules",
        "coverage",
        "__fixtures__",
        "__docs__",
        "vitest.config.ts",
        "packem.config.ts",
        ".secretlintrc.cjs",
        "commitlint.config.cjs",
        "postcss.config.cjs",
        ".prettierrc.cjs",
        "package.json",
        "src/vite-env.d.ts",
        "assets/style.css",
        "vite.config.ts",
        "verify-node-version.cjs",
        ".lintstagedrc.js",
        "README.md",
        ".github",
    ],
});
