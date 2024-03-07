module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    requireConfigFile: false,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'prettier/prettier': 1, // 错误
    'no-extra-semi': 2, // 禁止不必要的分号
    quotes: ['error', 'single'], // 强制使用单引号
    'no-unused-vars': 0, // 不允许未定义的变量
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: 'off',
  },
}
