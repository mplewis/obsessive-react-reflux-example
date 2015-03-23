var React = require('react')
var Header = require('./header')
var Input = require('./input')
var Output = require('./output')
var Bsl = require('./bs-layout')

require('bootstrap/dist/css/bootstrap.min.css')

var Layout = React.createClass({
  render: function() {
    return (
      <Bsl.Container>
        
        <Bsl.Row>
          <Header />
        </Bsl.Row>
        
        <Bsl.Row>
          <Input />
        </Bsl.Row>
        
        <Bsl.Row>
          <Output />
        </Bsl.Row>
        
      </Bsl.Container>
    )
  }
})

module.exports = Layout
