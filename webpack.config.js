const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};

module.exports = {
  module: {
    loaders: [
      {
        test: /plugin\.css$/,
        loaders: [
          'style-loader', 'css',
        ],
      },
    ],
  },
};
