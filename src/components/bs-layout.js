var React = require('react')

module.exports = {

  Container: React.createClass({
    render: function() {
      return (
        <div className="container">
          {this.props.children}
        </div>
      )
    }
  }),

  Row: React.createClass({
    render: function() {
      return (
        <div className="row">
          <div className="col-md-12">
            {this.props.children}
          </div>
        </div>
      )
    }
  })

}