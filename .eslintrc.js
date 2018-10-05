module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
    commonjs: true,
    es6: true
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': ['error', { allow: ['warn', 'error', 'clear'] }],
    'react/prop-types': ['warn']
  },
  settings: {
    react: {
      version: '16.0'
    }
  }
};
