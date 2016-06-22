const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {

  // For production build we want to extract CSS to stand-alone file
  // Provide `extractStyles` param and `bootstrap-loader` will handle it
  entry: [
    'font-awesome-loader!./font-awesome.prod.config.js',
    'bootstrap-loader/extractStyles',
    'tether',
    './app/App'
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js'
  },

  resolve: { extensions: [ '', '.js', '.jsx' ] },

  plugins: [
    new webpack.ProvidePlugin({
      // for bootstrap (tooltip)
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ProvidePlugin({
      'window.Tether': 'tether'
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') }}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true, mangle:true})
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]' +
          '!postcss'
        )
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]' +
          '!postcss' +
          '!sass'
        )
      },

      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: 'url?limit=10000'
        loader: 'url'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      }
    ]
  },

  postcss: [ autoprefixer ]
};
