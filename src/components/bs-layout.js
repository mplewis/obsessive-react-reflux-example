var React = require('react')

/* This is a Bootstrap helper class I built for this app alone. They're little
 * app-specific layout helpers. If I decide to change my column sizing, I don't
 * have to change the entire app's col-md-12 classes, just this file.
 * 
 * Something cool about React is that you can use dot notation directly in the
 * names of JSX elements to reference specific objects. You can see this in
 * layout.js and output.js, where I use <Bsl.Row> directly.
 */

module.exports = {

  // Bootstrap's standard layout: container -> rows -> columns. Don't fight it
  // or your margins get all screwed up.
  Container: React.createClass({
    render: function() {
      return (
        <div className="container">
          {this.props.children}
        </div>
      )
    }
  }),

  // Standard Bootstrap row -> full-width column
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

  // I use this in layout.js to build two-column layouts with HalfCol below
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