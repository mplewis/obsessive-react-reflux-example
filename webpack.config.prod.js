var webpack = require('webpack')
var config = require('./webpack.config.common.js')

config.plugins = [
  // When building for production, run UglifyJS to minify our code.
  // This takes a long time and isn't necessary when you're developing locally,
  // because you don't care about file size.
  new webpack.optimize.UglifyJsPlugin()
]

module.exports = config
