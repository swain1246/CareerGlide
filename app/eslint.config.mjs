import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 👇 Ignore patterns
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/coverage/**',
      '**/*.config.js',
      '**/*.config.cjs',
      '**/*.stories.*',
      '**/__tests__/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/storybook-static/**',
      '**/.env*',
    ],
  },

  // 👇 Your base Next.js + TypeScript setup
  ...compat.extends('next/core-web-vitals', 'next'),

  // 👇 Prettier setup for Flat Config
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];

export default eslintConfig;
