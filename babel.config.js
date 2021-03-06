module.exports = function (api) {
  api.cache(true);
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const isTesting = process.env.NODE_ENV === 'testing';
  const presets = [
    ['@babel/env', {
      'modules': isTesting ? 'commonjs' : false
    }],
    '@babel/react'
  ];
  const plugins = [
    'react-hot-loader/babel',
    ['react-css-modules',{
      'generateScopedName': isDevelopment ? '[local]_[hash:base64:5]' : '[hash:base64:5]',
      'filetypes': {
        '.less': {
          'syntax': 'postcss-less'
        }
      }
    }],
    '@babel/syntax-dynamic-import',
    '@babel/proposal-object-rest-spread'
  ];

  return {
    presets,
    plugins
  };
};
