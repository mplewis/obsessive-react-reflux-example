var React = require('react')

/* This is fancy destructuring syntax used in ES6. It's sort of like tuple 
 * unpacking in Python. The equivalent ES5 might look something like this:
 *
 *     var Button = require('react-bootstrap').Button
 *
 * Learn more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 */
var { Button } = require('react-bootstrap')

/* We can require Markdown files thanks to the magic of Webpack's loaders. The
 * variables faqPreview and faqMore contain HTML rendered from the two Markdown
 * files. For more info, see faq-more.md.
 */
var faqPreview = require('./faq-preview.md')
var faqMore = require('./faq-more.md')

// The ReadMore button starts in a collapsed state with a "+ Read More" button.
// When that's clicked, it replaces its content with its child nodes.
var ReadMore = React.createClass({

  // There's only one state variable, and it starts deactivated
  getInitialState: function() {
    return {
      activated: false
    }
  },

  // showMore is a function only called by the button. This is the only way that
  // the ReadMore component's state changes after the initial render.
  showMore: function() {
    this.setState({activated: true})
  },

  // Render is called on initial render and when the component's state
  // (this.state) changes.
  render: function() {
    if (this.state.activated) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else {
      return (
        // The button calls this component's method with {this.showMore}
        // when clicked.
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

// The FAQ is made up of a short preview and a Read More button that expands
// to show the rest of the content.
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
