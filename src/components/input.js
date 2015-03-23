var React = require('react')

var Actions = require('../actions/actions')

var ReactBootstrap = require('react-bootstrap')
var InputBS = ReactBootstrap.Input
var Button = ReactBootstrap.Button

var Input = React.createClass({

  onCompile: function() {
    console.log('Compiling JSON');
    Actions.requestCompile({json: 'abcd1234', parcelable: true})
  },

  render: function() {
    return (
      <div>
        
        <InputBS
          type="textarea"
          label="Source JSON"
          placeholder="Paste your JSON here."
          rows="10" />
        
        <InputBS
          type="checkbox"
          label="Make Parcelable for Android apps" />
        
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
