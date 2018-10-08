module.exports = {
  plugins: {
    'autoprefixer': {},
    'cssnano': process.env.NODE_ENV === 'production' && { preset: 'default' },
    'css-mqpacker': process.env.NODE_ENV === 'production' && { sort: true }
  }
};
