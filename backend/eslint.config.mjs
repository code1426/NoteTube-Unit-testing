import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

// avoid console.log
export default tseslint.config(
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  { ignores: ["dist"] },
  {
    extends: [
      pluginJs.configs.recommended,
      eslintConfigPrettier,
      ...tseslint.configs.recommended,
    ],
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-console": "warn",
    },
  },
);
