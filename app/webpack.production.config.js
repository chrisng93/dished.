/**
 * Created by chrisng on 4/5/17.
 */
const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./src/constants/config.js');
const mainPath = path.resolve(__dirname, 'src', 'index.jsx');
const buildPath = path.resolve(__dirname, 'public', 'build');

module.exports = {
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders,
  },
  eslint: {
    configFile: './.eslintrc',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      { from: './public/index.html' },
    ]),
    new webpack.ProvidePlugin({
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(config.NODE_ENV),
        HOST: JSON.stringify(config.HOST),
        PORT: JSON.stringify(config.PORT),
        API_URL: JSON.stringify(config.API_URL),
        GOOGLE_API_KEY: JSON.stringify(config.GOOGLE_API_KEY),
      },
    }),
  ],
};
