// These config options are common to both development and production builds.

module.exports = {

  // Start at src/index.js. If it's in the app, it has to be in the dependency
  // graph stemming from this entry point file.
  entry: "./src/index.js",

  // Output the entire app's code to bundle.js.
  output: {
    path: __dirname,
    filename: "bundle.js"
  },

  module: {
    loaders: [

      // Load .js and .jsx files with Babel, a transpiler which supports
      // compiling JSX and ECMAScript 6 to vanilla JS (ECMAScript 5).
      // There's no need to compile every node_modules to vanilla, we assume
      // npm modules are already vanilla JS.
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },

      // Load .css files and apply their styles to the HTML. This lets us use
      // require('./my-styles.css') to import and use individual style files on
      // the fly, rather than compiling them into a blob of style mud.
      { test: /\.css$/, loader: "style!css" },

      // I much prefer writing my web styles as Stylus over CSS
      // (https://learnboost.github.io/stylus/). This lets me require(...) my
      // .styl files, load them as Stylus, compile to CSS and apply to the page.
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }

      // Bootstrap has font and icon asset files. If these assets are <8kb,
      // they are loaded as data URLs. Otherwise they are output to their own
      // separate resource files.
      { test: /\.(otf|eot|svg|ttf|woff)/, loader: 'url-loader?limit=8192' },

      // Sometimes (most of the time) it's more fun to write web content as
      // Markdown and compile it to HTML. This does that automatically:
      // require('./my-faq.md') -> a bunch of HTML I can embed directly.
      { test: /\.md$/, loader: "html!markdown" },

    ]
  }
}
