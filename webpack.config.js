module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devServer: {
    contentBase: './src'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=8192' }
    ]
  }
}
