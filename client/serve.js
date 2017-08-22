// start webpack
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const config = require('./webpack.config.js');

const app = express();

// get the environment
const isProduction = process.env.NODE_ENV === 'production';
console.log('Production? ', isProduction);

// setup hot reload
config.plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    API_HOST: JSON.stringify(process.env.API_HOST || 'http://localhost:8080'),
  }),
];

if (!isProduction) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

// override entry for hot reload
if (!isProduction) {
  config.entry = [
    'webpack-hot-middleware/client',
    config.entry,
  ];
}

if (isProduction) {
  const extractCSS = new ExtractTextPlugin({ filename: 'main.css', disable: false, allChunks: true });
  config.plugins.push(extractCSS);
  config.module.rules[0].use = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: {
        modules: true,
        minimize: true,
      },
    }, 'sass-loader'],
  });

  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
  config.plugins.push(new LodashModuleReplacementPlugin());
}
const compiler = webpack(config);

const statsConf = {
  colors: true,
  hash: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  modules: false,
};

if (!isProduction) {
  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: statsConf,
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  compiler.run((err, stats) => {
    if (err) {
      console.error('Error compiling with webpack', err);
      process.exit(1);
    }

    console.log(stats.toString(statsConf));
  });
}

// server statics
app.use(express.static(__dirname));
app.use(express.static('dist'));

app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('===> Listening on port 3000');
});
