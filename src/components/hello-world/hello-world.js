var React = require('react');

require('./hello-world.css')

var HelloWorld = React.createClass({

	render: function() {
		return (
			<h1 className="hello-world">Hello, world!</h1>
		);
	}

});

module.exports = HelloWorld;
