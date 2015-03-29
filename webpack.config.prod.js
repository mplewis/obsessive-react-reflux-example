var webpack = require('webpack')
var config = require('./webpack.config.common.js')

config.plugins = [
  new webpack.optimize.UglifyJsPlugin()
]

module.exports = config
