const path = require('path');

module.exports = {
  extends: ['eslint-config-madhouselabs'],
  plugins: ['jest'],
  env: {
    jest: true,
    node: true,
    es6: true,
    'jest/globals': true,
  },
  settings: {
    webpack: {
      config: path.resolve(__dirname, 'webpack.config.js'),
    },
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'assert'] }],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': [
      1,
      {
        custom: 'ignore',
      },
    ],
  },
};
