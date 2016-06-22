module.exports = {
  styleLoader: require('extract-text-webpack-plugin').extract('style-loader', 'css-loader!sass-loader'),
  styles: {
    'mixins': true,
    'bordered-pulled': true,
    'core': true,
    'fixed-width': true,
    'icons': true,
    'larger': true,
    'list': false,
    'path': true,
    'rotated-flipped': false,
    'animated': false,
    'stacked': true
  }
};
