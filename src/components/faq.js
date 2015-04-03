var React = require('react')
var { Button } = require('react-bootstrap')

var faqPreview = require('./faq-preview.md')
var faqMore = require('./faq-more.md')

var ReadMore = React.createClass({

  getInitialState: function() {
    return {
      activated: false
    }
  },

  showMore: function() {
    this.setState({activated: true})
  },

  render: function() {
    if (this.state.activated) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else {
      return (
        <Button
          bsStyle="link"
          bsSize="large"
          onClick={this.showMore} >
          + Read More
        </Button>
      )
    }
  }

})

var Faq = React.createClass({

  render: function() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: faqPreview}} />
        <ReadMore>
          <div dangerouslySetInnerHTML={{__html: faqMore}} />
        </ReadMore>
      </div>
    )
  }

})

module.exports = Faq
