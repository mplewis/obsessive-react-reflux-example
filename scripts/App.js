import React from 'react'
import ReactBootstrap from 'react-bootstrap'
import _ from 'lodash'
import hljs from 'highlight.js'

require('bootstrap/dist/css/bootstrap.min.css')
require('highlight.js/styles/tomorrow.css')
require('../styles/style.css')

var JSON_POJO_ENDPOINT = 'http://json-pojo-server-271bbe43-1.mplewis.cont.tutum.io:49154/'
var DEFAULT_RESPONSE_URL = 'default.json'
var USE_DEFAULT_RESPONSE = true;
var ADD_RESPONSE_DELAY = true;

var PARCEL_IMPORT = 'import org.parceler.Parcel;\n'
var CONSTRUCTOR_START = 'public class'
var PARCEL_ANNOTATION = '@Parcel\n'

var TabbedArea = ReactBootstrap.TabbedArea
var TabPane = ReactBootstrap.TabPane

var BootstrapRow = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          {this.props.children}
        </div>
      </div>
    )
  }
})

var SourceJsonTextArea = React.createClass({
  render: function() {
    return (
      <textarea className="form-control" cols="30" rows="10" placeholder="Your JSON goes here" />
    )
  }
})

var CompileStandardButton = React.createClass({
  onClick: function() {
    console.log('Compile standard clicked');
  },

  render: function() {
    return (
      <button
        type="button"
        className="btn btn-default"
        onClick={this.onClick}>
        Standard Java POJO
      </button>
    )
  }
})

var CompileParcelableButton = React.createClass({
  onClick: function() {
    console.log('Compile parcelable clicked');
  },
  render: function() {
    return (
      <button
        type="button"
        className="btn btn-default"
        onClick={this.onClick}>
        Parcelable Android POJO
      </button>
    )
  }
})

var Header = React.createClass({
  render: function() {
    return (
      <BootstrapRow>
        <h1>JSON POJO Frontend</h1>
      </BootstrapRow>
    )
  }
})

var Input = React.createClass({
  render: function() {
    return (
      <div>
        <BootstrapRow>
          <SourceJsonTextArea />
        </BootstrapRow>
        <BootstrapRow>
          <CompileStandardButton />
          <CompileParcelableButton />
        </BootstrapRow>
      </div>
    )
  }
})

var Output = React.createClass({
  render: function() {
    return (
      <BootstrapRow>
        <h1>Output goes here.</h1>
      </BootstrapRow>
    )
  }
})

var JavaClassList = React.createClass({
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

  render: function() {
    var nodes;
    if (this.props.files) {
      nodes = this.nodesFromFiles(this.props.files)
    } else {
      nodes = [
        <TabPane eventKey={1} tab={"Loading..."}>
          Loading...
        </TabPane>
      ]
    }

    console.log(nodes);

    return (
      <span>
        <BootstrapRow>
          <button type="button" className="btn btn-primary download-all">Download all</button>
        </BootstrapRow>
        <TabbedArea defaultActiveKey={1}>
          {nodes}
        </TabbedArea>
      </span>
    )
  }
})

function processJson(jsonString, callback) {

  console.log('Compiling:', jsonString);

  var request = new XMLHttpRequest()
  if (USE_DEFAULT_RESPONSE) {
    request.open('GET', DEFAULT_RESPONSE_URL, true)
  } else {
    request.open('POST', JSON_POJO_ENDPOINT, true)
    request.setRequestHeader('Content-Type', 'application/json charset=UTF-8')
  }
  
  React.render(
    <JavaClassList />,
    document.querySelector('.output')
  )

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      
      var data = JSON.parse(this.response)    
      var files = []
      _.each(_.pairs(data), function(filepair) {
        files.push({name: filepair[0], data: filepair[1]})
      })

      if (ADD_RESPONSE_DELAY) {
        window.setTimeout(function() {
          callback(files)
        }, 1000)
      } else {
        callback(files)
      }
    
    } else {
      console.log('Server returned error', this.status)
    }
  }

  request.onerror = function() {
    console.log('Connection error')
  }
  
  request.send(jsonString)

}

function renderFiles(files) {
  React.render(
    <JavaClassList files={files} />,
    document.querySelector('.output')
  )

  var downloadButton = document.querySelector('.download-all')
  downloadButton.addEventListener('click', function() {
    zip = new JSZip();
    _.each(files, function(file) {
      zip.file(file.name, file.data)
    })
    generatedZip = zip.generate({type: 'blob'})
    saveAs(generatedZip, 'JavaClasses.zip')
  })

  _.each(document.querySelectorAll('pre code'), function(block) {
    hljs.highlightBlock(block)
  })
}

function addParcelAnnotation(classData) {
  var parts = classData.split(CONSTRUCTOR_START, 2)
  var newData = PARCEL_IMPORT + parts[0] + PARCEL_ANNOTATION + CONSTRUCTOR_START + parts[1]
  return newData
}

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Input />
        <Output />
      </div>
    );
  }
}
