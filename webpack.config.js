const path = require('path');

const demoConfig = {
  entry: './src/pages/demo.js',
  mode: 'development',
  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'dist')
  }
};

const carrouselConfig = {
  entry: './src/pages/carrousel.js',
  mode: 'development',
  output: {
    filename: 'carrousel.js',
    path: path.resolve(__dirname, 'dist')
  }
};

const testConfig = {
  entry: './spec/suite.js',
  mode: 'development',
  output: {
    filename: 'test.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = [demoConfig, carrouselConfig, testConfig];