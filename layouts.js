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
  render: function() {
    var nodes = []
    
    var i = 0
    _.each(this.props.files, function(file) {
      i++
      nodes.push(
        <TabPane eventKey={i} tab={file.name}>
          <pre>{file.data}</pre>
        </TabPane>
      )
    })

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
