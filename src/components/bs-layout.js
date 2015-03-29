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
  }),

  BareRow: React.createClass({
  
    render: function() {
      return (
        <div className="row">
          {this.props.children}
        </div>
      );
    }
  
  }),
  
  HalfCol: React.createClass({
  
    render: function() {
      return (
        <div className="col-md-6">
          {this.props.children}
        </div>
      );
    }
  
  })

}