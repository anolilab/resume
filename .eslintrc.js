/** @ts-check */
const globals = require("@anolilab/eslint-config/globals");
const { defineConfig } = require("@anolilab/eslint-config/define-config");

module.exports = defineConfig({
    env: {
        // Your environments (which contains several predefined global variables)
        // Most environments are loaded automatically if our rules are added
    },
    extends: ["@anolilab/eslint-config", "@anolilab/eslint-config/typescript-type-checking"],
    globals: {
        ...globals.es2021,
        // Your global variables (setting to false means it's not allowed to be reassigned)
        // myGlobal: false
    },
    ignorePatterns: ["!**/*"],
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.mts", "*.cts", "*.js", "*.jsx"],
            // Set parserOptions.project for the project to allow TypeScript to create the type-checker behind the scenes when we run linting
            parserOptions: {},
            rules: {},
        },
        {
            files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
            // Set parserOptions.project for the project to allow TypeScript to create the type-checker behind the scenes when we run linting
            parserOptions: {},
            rules: {
                "import/no-cycle": "off",
                "no-use-before-define": "off",
            },
            settings: {
                tailwindcss: {
                    config: "./tailwind.config.js",
                    whitelist: [],
                },
            },
        },
        {
            files: ["*.js", "*.jsx"],
            rules: {
                "global-require": "off",
            },
        },
        {
            files: ["*.mdx"],
            rules: {
                "jsx-a11y/anchor-has-content": "off",
                // @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/917
                "jsx-a11y/heading-has-content": "off",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 2021,
        project: "./tsconfig.json",
        sourceType: "module",
    },
    root: true,
    rules: {
        // Customize your rules
    },
});
