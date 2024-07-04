require('@hmg-fe/eslint-config-itsd/patch');

module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  env: {browser: true, es2020: true},
  extends: ['@hmg-fe/eslint-config-itsd'],
  settings: {
    react: {
      version: '18.3.1',
    },
  },
  parserOptions: {
    project: false,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.cjs']
};