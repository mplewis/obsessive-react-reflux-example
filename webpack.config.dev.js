var config = require('./webpack.config.common.js')

// devtool is used to add source maps to the compiled code. This helps us debug
// our code live in the browser even though it's been uglified and minified by
// linking our compiled code to lines of source code.
// See http://webpack.github.io/docs/configuration.html#devtool for more info.
config.devtool = 'eval'

module.exports = config
