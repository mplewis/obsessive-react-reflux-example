var React = require('react')

var Actions = require('../actions/actions')

var ReactBootstrap = require('react-bootstrap')
var InputBS = ReactBootstrap.Input
var Button = ReactBootstrap.Button

var Input = React.createClass({

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
          onClick={this.onCompile} >
          Compile POJOs
        </Button>

      </div>
    )
  }

})

module.exports = Input
