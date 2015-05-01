var React = require('react')
var Header = require('./header')
var Input = require('./input')
var Output = require('./output')
var Faq = require('./faq')
var Bsl = require('./bs-layout')

/* These lines import CSS styles from files and inject them into the JS bundle,
 * which injects them into the HTML on page load. It's serious black magic and
 * it's why I love Webpack.
 * 
 * The Webpack loader line responsible is here in webpack.config.common.js:
 *     { test: /\.css$/, loader: "style!css" }
 *
 * See faq-more.md and webpack.config.common.js for more examples and more info
 * on Webpack loaders.
 */
require('bootstrap/dist/css/bootstrap.min.css')
require('highlight.js/styles/tomorrow.css')
/* Stylus is a styling language that compiles to CSS. Webpack loads Stylus,
 * parses it, compiles it to CSS, then injects it into the page on load just
 * like the CSS above.
 *
 * The Webpack loader line responsible is here in webpack.config.common.js:
 *     { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
 */ 
require('./body.styl')

// This is just a declarative layout. I love how React lets me make everything
// into little modular components and nest them together however I want. I'm
// taking advantage of that to write this super-readable layout.
var Layout = React.createClass({

  render: function() {
    return (
      <Bsl.Container>       // Everything in the app:
        
        <Bsl.Row>
          <Header />        // Header
        </Bsl.Row>
        
        <Bsl.BareRow>       // Two columns:
          <Bsl.HalfCol>
            <Input />       // Input
          </Bsl.HalfCol>
          <Bsl.HalfCol>
            <Faq />         // FAQ
          </Bsl.HalfCol>
        </Bsl.BareRow>
        
        <Bsl.Row>
          <Output />        // Output
        </Bsl.Row>
        
      </Bsl.Container>      // And that's it! ^_^
    )
  }

})

module.exports = Layout
