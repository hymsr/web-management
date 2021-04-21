module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:react/recommended',
    'plugin:jest/recommended',
    '@tencent/eslint-config-tencent',
  ],
  rules: {
    'react/prop-types': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: ['**/node_modules/', '**/dist/', '**/build/'],
};
