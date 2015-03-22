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
