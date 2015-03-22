var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './scripts/index'
  ],
  output: {
    path: __dirname + '/scripts/',
    filename: 'bundle.js',
    publicPath: '/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    )
  ],
  resolve: {
    root: [
      path.join(__dirname, 'bower_components'),
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
      {
          test: /\.(otf|eot|svg|ttf|woff)/,
          loader: 'url-loader?limit=8192'
      }
    ]
  }
}
