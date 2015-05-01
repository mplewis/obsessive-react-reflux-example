var React = require('react')

require('./header.styl')

// This is the page's header. It's pretty boring and straightforward, just
// static HTML. I made it a component to make the layout.js file super modular
// and clean.
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

/* Most JS files built to house a single React component look like this:
 *     require dependencies, like React
 *     other stuff, like styles
 *     var MyThing = React.createClass({...})
 *     module.exports = myThing
 *
 * When modules look like this, you can use them like this:
 *     var Header = require('./header.js')
 */
module.exports = Header
