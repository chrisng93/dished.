/**
 * Handle bundling for development work
 */

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const path = require('path');
const fs = require('fs');
const webpackConfig = require('../webpack.config.js');
const config = require('../src/constants/config.js');

const HOST = (config.HOST.indexOf('localhost') === -1 && config.HOST) ? config.HOST : '127.0.0.1';
const PORT = config.PORT || 3001;

module.exports = () => {
  let bundleStart;
  const compiler = webpack(webpackConfig);

  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', () => {
    console.log(`Bundled in ${(Date.now() - bundleStart)} ms!`);
  });

  const bundler = new webpackDevServer(compiler, {
    publicPath: '/build/',
    hot: true,
    quiet: false,
    noInfo: true,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
  });

  bundler.listen(PORT, HOST, () => {
    console.log('Bundling project, please wait...');
  })
};
