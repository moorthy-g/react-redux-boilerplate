module.exports = {
  setupFiles: ['<rootDir>/test/setup.js'],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest'
  }
};
