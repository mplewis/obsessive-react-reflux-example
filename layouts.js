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

    nodes.push(
      <BootstrapRow>
        <button type="button" className="btn btn-primary download-all">Download all</button>
      </BootstrapRow>
    )
    
    _.each(this.props.files, function(file) {
      nodes.push(
        <BootstrapRow>
          <h1>{file.name}</h1>
          <pre>{file.data}</pre>
        </BootstrapRow>
      )
    })

    return (
      <div className="tab-content">
        {nodes}
      </div>
    )
  }
})
