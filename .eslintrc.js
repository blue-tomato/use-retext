const defaultConfig = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['@blue-tomato/react', 'plugin:jest/recommended'],
  plugins: ['jest'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};

module.exports = {
  ...defaultConfig,
  root: true,
  overrides: [
    {
      ...defaultConfig,
      files: ['*.ts', '*.tsx'],
      extends: [
        ...defaultConfig.extends,
        'prettier/@typescript-eslint',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ...defaultConfig.parserOptions,
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      },
    },
  ],
};
