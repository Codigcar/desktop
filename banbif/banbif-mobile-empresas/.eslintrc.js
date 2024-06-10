module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'testing-library'],
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: {
        'testing-library/await-async-query': 'warn',
        'testing-library/no-node-access': 'warn',
        'testing-library/prefer-screen-queries': 'off',
      },
    },
  ],
  rules: {
    'no-extra-boolean-cast': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        groups: [
          ['builtin', 'external'],
          'internal',
          ['index', 'sibling'],
          'parent',
          'type',
        ],
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
  },
}
