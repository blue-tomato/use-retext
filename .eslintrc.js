module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: '@blue-tomato/react',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  }
};
