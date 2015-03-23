var React = require('react');
var HelloWorld = require('../hello-world/hello-world')

require('bootstrap/dist/css/bootstrap.min.css')

var BootstrapContainer = React.createClass({
  render: function() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
});

var BootstrapRow = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          {this.props.children}
        </div>
      </div>
    );
  }
});

var Layout = React.createClass({
  render: function() {
    return (
      <BootstrapContainer>
        <BootstrapRow>
          <HelloWorld />
        </BootstrapRow>
      </BootstrapContainer>
    );
  }
});

module.exports = Layout;
