var webpack = require('webpack')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=8192' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
