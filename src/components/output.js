var _ = require('lodash')
var React = require('react')
var Reflux = require('reflux')
var Loader = require('react-loader')
var JSZip = require('jszip')
var saveAs = require('filesaver.js')

var CompileStore = require('../stores/compile-store.js')
var Bsl = require('./bs-layout')

var ReactBootstrap = require('react-bootstrap')
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

  mixins: [
    Reflux.listenTo(CompileStore, 'onCompileUpdate')
  ],

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
    return {
      files: [],
      visible: false,
      loaded: false
    }
  },

  onDownloadAll: function() {
    var zip = new JSZip();
    _.each(this.state.files, function(file) {
      zip.file(file.name, file.data)
    })
    var generatedZip = zip.generate({type: 'blob'})
    saveAs(generatedZip, 'JavaClasses.zip')
  },

  onCompileUpdate: function(args) {
    this.setState({
      files: args.files,
      visible: true,
      loaded: args.loaded
    })
  },

  render: function() {
    if (!this.state.visible) return null
    
    var nodes = this.nodesFromFiles(this.state.files)
    return (
      <Loader loaded={this.state.loaded}>
        
        <Bsl.Row>
          <Button
            bsStyle="success"
            onClick={this.onDownloadAll} >
            Download All
          </Button>
        </Bsl.Row>
        
        <Bsl.Row>
          <TabbedArea defaultActiveKey={1}>
            {nodes}
          </TabbedArea>
        </Bsl.Row>
      
      </Loader>
    )
  }

})

module.exports = Output
