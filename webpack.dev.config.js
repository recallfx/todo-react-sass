const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {

  entry: [
    'webpack-hot-middleware/client',
    'tether',
    'font-awesome-loader!./font-awesome.dev.config.js',
    'bootstrap-loader',
    './app/App'
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
    publicPath: '/assets/'
  },

  devtool: '#cheap-module-eval-source-map',

  resolve: { extensions: ['', '.js', '.jsx'] },

  plugins: [
    new webpack.ProvidePlugin({
      // for bootstrap (tooltip)
      jQuery: 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'window.Tether': 'tether'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss',
          'sass'
        ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      }
    ]
  },

  postcss: [autoprefixer]

};
