const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  context: path.resolve(__dirname, 'src'),
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'app.min.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
        },
      }, 'sass-loader'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
        },
      }],
      exclude: /node_modules/,
    }, {
      test: /node_modules\/.+\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.js$/,
      exclude: /node_modules\/(?!react-modal)/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['transform-runtime', 'lodash'],
        env: {
          development: {
            presets: ['react-hmre'],
          },
          production: {
            presets: ['react-optimize'],
          },
        },
      },
    }, {
      loader: 'url-loader',
      test: /\.woff\d?(\?.+)?$/,
      options: {
        limit: 10000,
        mimetype: 'application/font-woff',
      },
    }, {
      test: /\.ttf(\?.+)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/octet-stream',
      },
    }, {
      test: /\.eot(\?.+)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
      },
    }, {
      test: /\.svg(\?.+)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'image/svg+xml',
      },
    }, {
      test: /\.png$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'image/png',
      },
    }, {
      test: /\.gif$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'image/gif',
      },
    }],
  },
};
