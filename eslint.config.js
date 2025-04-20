import js from "@eslint/js";
import globals from "globals";

export default [
  // Apply ESLint's recommended rules
  js.configs.recommended,

  // Custom project configuration
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        chrome: "readonly",
      },
    },
    rules: {
      // Custom rule overrides here if needed
    },
    ignores: ["node_modules/"],
  },
];
