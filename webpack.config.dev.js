module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=8192' }
    ]
  }
}
