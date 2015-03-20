var JSON_POJO_ENDPOINT = 'http://json-pojo-server-271bbe43-1.mplewis.cont.tutum.io:49154/'

var JavaClassList = React.createClass({
  render: function() {
    var nodes = []

    nodes.push(
      <div className="row">
        <div className="col-md-12">
          <button type="button" className="btn btn-primary download-all">Download all</button>
        </div>
      </div>
    )
    
    _.each(this.props.files, function(file) {
      nodes.push(
        <div className="row">
          <div className="col-md-12">
            <h1>{file.name}</h1>
            <pre>{file.data}</pre>
          </div>
        </div>
      )
    })

    return (
      <div className="java-classes">
        {nodes}
      </div>
    )
  }
})

function processJson(jsonString) {

  console.log('Compiling:', jsonString);

  var request = new XMLHttpRequest()
  request.open('POST', JSON_POJO_ENDPOINT, true)
  request.setRequestHeader('Content-Type', 'application/json charset=UTF-8')

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response)    
      var files = []
      _.each(_.pairs(data), function(filepair) {
        files.push({name: filepair[0], data: filepair[1]})
      })
      
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
    
    } else {
      console.log('Server returned error', this.status)
    }
  }

  request.onerror = function() {
    console.log('Connection error')
  }
  
  request.send(jsonString)

}

var compileButton = document.querySelector('.compile-button')
var jsonSource = document.querySelector('.json-source')

jsonSource.value =
'{' + '\n' +
'  "name": "myTestObject",' + '\n' +
'  "containers": [' + '\n' +
'    {"name": "alpha", "running": true},' + '\n' +
'    {"name": "bravo", "running": true},' + '\n' +
'    {"name": "charlie", "running": false}' + '\n' +
'  ]' + '\n' +
'}'

compileButton.addEventListener('click', function() {
  console.log('onCompileClick')
  processJson(jsonSource.value)
})
