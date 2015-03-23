var React = require('react')
var ReactBootstrap = require('react-bootstrap')
var _ = require('lodash')
var Bsl = require('./bs-layout')

var TabbedArea = ReactBootstrap.TabbedArea
var TabPane = ReactBootstrap.TabPane
var Button = ReactBootstrap.Button

var SingleClass = React.createClass({

  render: function() {
    return (
      <TabPane eventKey={i} tab={file.name}>
        <pre><code className="java">{file.data}</code></pre>
      </TabPane>
    );
  }

});

var Output = React.createClass({

  nodesFromFiles: function(files) {
    var nodes = []
    
    var i = 0
    _.each(files, function(file) {
      i++
      nodes.push(
        <TabPane eventKey={i} tab={file.name}>
          <pre><code className="java">{file.data}</code></pre>
        </TabPane>
      )
    })

    return nodes
  },

  getInitialState: function() {
    var files = [
      {name: 'testFile1', data: 'lorem ipsum'},
      {name: 'testFile2', data: 'dolor sit amet'}
    ]
    return {
      files: files,
      nodes: this.nodesFromFiles(files)
    }
  },

  onDownloadAll: function() {
    console.log('Downloading all classes');
  },

  render: function() {
    return (
      <span>
        
        <Bsl.Row>
          <Button
            bsStyle="primary"
            onClick={this.onDownloadAll} >
            Download All
          </Button>
        </Bsl.Row>
        
        <Bsl.Row>
          <TabbedArea defaultActiveKey={1}>
            {this.state.nodes}
          </TabbedArea>
        </Bsl.Row>
      
      </span>
    )
  }

})

module.exports = Output
