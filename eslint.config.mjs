import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";

// normalize imports to handle CJS <-> ESM default export differences
const _ = (mod) => mod && (mod.default ?? mod);
const jsPkg = _(js);
const tsPlugin = _(tseslint);
const reactPlugin = _(react);
const reactHooksPlugin = _(reactHooks);
const reactRefreshPlugin = _(reactRefresh);
const unicornPlugin = _(unicorn);

export default [
  {
    ignores: [
      ".node_modules/",
      ".storybook/",
      "dist/",
      "build/",
      "coverage/",
      "*.js",
      "*.jsx",
      "*.json",
      "*.md",
      "*.stories.*",
      "**/node_modules/*",
    ],
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
      "@typescript-eslint": tsPlugin,
      unicorn: unicornPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...jsPkg.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off",
      "require-await": "error",
      "@typescript-eslint/require-await": "error",
      "no-nested-ternary": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "warn",
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];
