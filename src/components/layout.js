var React = require('react')
var Header = require('./header')
var Input = require('./input')
var Output = require('./output')
var Faq = require('./faq')
var Bsl = require('./bs-layout')
var hljs = require('highlight.js')

require('bootstrap/dist/css/bootstrap.min.css')
require('highlight.js/styles/tomorrow.css')
require('./body.styl')

hljs.initHighlightingOnLoad()

var Layout = React.createClass({
  render: function() {
    return (
      <Bsl.Container>
        
        <Bsl.Row>
          <Header />
        </Bsl.Row>
        
        <Bsl.BareRow>
          <Bsl.HalfCol>
            <Input />
          </Bsl.HalfCol>
          <Bsl.HalfCol>
            <Faq />
          </Bsl.HalfCol>
        </Bsl.BareRow>
        
        <Bsl.Row>
          <Output />
        </Bsl.Row>
        
      </Bsl.Container>
    )
  }
})

module.exports = Layout
