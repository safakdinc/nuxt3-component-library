import pluginVue from "eslint-plugin-vue";
import { withNuxt } from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,vue}"],

  ...pluginVue.configs["flat/recommended"],
  rules: {
    ...typescript.configs["recommended"].rules,
    // Formatting rules based on Prettier settings
    // Additional rules can be added here
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
  languageOptions: {
    parser: parser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    globals: {
      browser: true,
      node: true,
    },
  },
});
