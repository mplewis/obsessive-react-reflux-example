var React = require('react')

var faqHtml = require('./faq.md')

var Faq = React.createClass({

  render: function() {
    return (
      <div>
        <span dangerouslySetInnerHTML={{__html: faqHtml}} />
      </div>
    );
  }

});

module.exports = Faq;
