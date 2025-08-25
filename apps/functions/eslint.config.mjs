import baseConfig from '../../eslint.config.mjs';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,js}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    env: {
      node: true,
      jest: true,
    },
    rules: {
      // Hono/Functions固有のルール
      '@typescript-eslint/no-explicit-any': 'off', // Functions では any を許容
      'no-console': 'off', // サーバーサイドなので console を許可
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: [
      '.eslintrc.js',
      'dist/**',
      'lib/**',
    ],
  },
];