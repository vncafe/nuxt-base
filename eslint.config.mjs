// @ts-check

import eslintComments from 'eslint-plugin-eslint-comments'
import prettierPlugin from 'eslint-plugin-prettier'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['**/dist', '**/build', '**/node_modules'],

  files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.js', '**/*.mjs', '**/*.cjs'],

  plugins: {
    'eslint-comments': eslintComments,
    'unused-imports': unusedImports,
    prettier: prettierPlugin,
    sonarjs,
    unicorn,
  },

  languageOptions: {
    parser: vueParser,
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',

      // Vue parser sẽ chuyển <script> sang ts-eslint parser
      parser: tseslint.parser,

      project: ['./tsconfig.eslint.json'],
      tsconfigRootDir: import.meta.dirname,

      extraFileExtensions: ['.vue'],
    },

    globals: {
      window: 'readonly',
      document: 'readonly',
    },
  },

  rules: {
    // --- Prettier ---
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],

    // --- TypeScript Strict ---
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',

    // --- Unused Imports ---
    'unused-imports/no-unused-imports': 'error',

    // --- import/order ---
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // --- SonarJS ---
    ...sonarjs.configs.recommended.rules,
    'sonarjs/no-duplicate-string': ['error', { threshold: 2 }],
    'sonarjs/no-all-duplicated-branches': 'error',
    'sonarjs/no-implicit-dependencies': 'error',

    // --- Security ---
    ...unicorn.configs.recommended.rules,

    // --- ESLint Comments ---
    'eslint-comments/no-unused-disable': 'error',
  },
})
