// start webpack
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const app = express();

// setup hot reload
config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];
// override entry for hot reload
config.entry = [
  'webpack-hot-middleware/client',
  config.entry,
];
const compiler = webpack(config);

const statsConf = {
  colors: true,
  hash: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  modules: false,
};

app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: statsConf,
}));
app.use(webpackHotMiddleware(compiler));

// server statics
app.use(express.static(__dirname));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('===> Listening on port 3000');
});
