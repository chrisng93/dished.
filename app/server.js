/**
 * Set up server for hosting static assets
 */

const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const config = require('./src/constants/config.js');

const proxy = httpProxy.createProxyServer();
const app = express();

const isProduction = config.NODE_ENV === 'production';
const PORT = isProduction ? config.PORT : 3001;
const publicPath = path.resolve(__dirname, 'public');

// point to our static assets
app.use(express.static(publicPath));

if (!isProduction) {
  const bundle = require('./server/bundle.js');
  bundle();
}

app.all('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

proxy.on('error', (err) => console.log(`Could not connect to proxy: ${err}`));

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
