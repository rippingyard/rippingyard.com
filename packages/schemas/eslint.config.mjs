import baseConfig from '../../eslint.config.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // schemas固有のルール
      'no-console': 'error', // schemasでは console を完全に禁止
      '@typescript-eslint/no-explicit-any': 'off', // DocumentReferenceなどのために any を許容
    },
  },
];