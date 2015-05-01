var React = require('react')

// Get the app's common Reflux actions. The input components are the ones that
// run actions. Actions do stuff to update the data stores.
var Actions = require('../actions/actions')

/* Using ReactBootstrap elements makes my Bootstrap elements in React more
 * declarative. Without ReactBootstrap, I would have to specify all the element
 * attributes as inline classes. Now I just pick the element - for example, a
 * Bootstrap button - and specify its attributes - such as size and style -
 * directly as XML attributes.
 */
var ReactBootstrap = require('react-bootstrap')
// I had to rename ReactBootstrap's Input component to InputBS because this
// component is called Input.
var InputBS = ReactBootstrap.Input
var Button = ReactBootstrap.Button  // Exactly what it says on the tin.

var Input = React.createClass({

  /* This class has two bits of state:
   *   - json: holds the JSON entered into the input box
   *   - parcelable: the Boolean value of the "Parcelable for Android" checkbox
   * 
   * Each of these bits of state are updated whenever that component's state
   * changes, i.e. the user types in the JSON box or clicks the checkbox.
   */
  getInitialState: function() {
    return {
      json: '',
      parcelable: false
    }
  },

  handleValue: function(event) {
    var nextState = {}
    nextState[event.target.name] = event.target.value
    this.setState(nextState)
  },

  handleChecked: function(event) {
    var nextState = {}
    nextState[event.target.name] = event.target.checked
    this.setState(nextState)
  },

  onCompile: function() {
    Actions.requestCompile(this.state)
  },

  render: function() {
    return (
      <div>
        
        <InputBS
          name="json"
          type="textarea"
          label="Source JSON"
          placeholder="Paste your JSON here."
          rows="10"
          onChange={this.handleValue} />
        
        <InputBS
          name="parcelable"
          type="checkbox"
          label="Make Parcelable for Android apps"
          onChange={this.handleChecked} />
        
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.onCompile} >
          Compile POJOs
        </Button>

      </div>
    )
  }

})

module.exports = Input
