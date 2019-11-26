module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['@blue-tomato/react', 'plugin:jest/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['jest'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  }
};
