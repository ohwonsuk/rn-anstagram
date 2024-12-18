import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslint from '@eslint/js';


/** @type {import('eslint').Linter.Config[]} */
export default [
  eslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      react: pluginReact
    },
    settings: {
      react: {
        version: "18.3.1"
      }
    },
    rules: {
      "react/prop-types": "off"
    }
  },
  {
    files: ["**/*.js"], languageOptions: { sourceType: "commonjs" }
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ignores: ["babel.config.js"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];