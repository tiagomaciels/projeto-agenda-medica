const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginTypeScript = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', '.vscode/**'], // Ignora pastas específicas
  },
  {
    files: ['src/**/*.{ts,tsx}'], // Inclui apenas arquivos dentro da pasta src
    languageOptions: {
      parser: tsParser, // Define o parser como TypeScript
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypeScript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintPluginPrettier.configs.recommended.rules,
      ...eslintPluginTypeScript.configs.recommended.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
