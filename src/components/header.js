var React = require('react')

require('./header.styl')

var Header = React.createClass({

  render: function() {
    return (
      <div className="header">
          <a href="/">
            <h1 className="name">json2pojo</h1>
          </a>
          <h1 className="tagline">parse json painlessly</h1>
        <hr/>
      </div>
    )
  }

})

module.exports = Header
