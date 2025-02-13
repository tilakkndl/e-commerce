import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    ignores: ["node_modules", "dist", "build", "coverage"],
  },
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      // Ignore unused variables for req, res, next
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^(req|res|next)$', // Ignore specific parameters
        },
      ],
    },
  },
];