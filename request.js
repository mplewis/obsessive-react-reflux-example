var JSON_POJO_ENDPOINT = 'http://json-pojo-server-271bbe43-1.mplewis.cont.tutum.io:49154/'

var JavaClassList = React.createClass({
  render: function() {
    var nodes = []
    
    _.each(_.pairs(this.props.files), function(filepair) {
      var filename = filepair[0]
      var filedata = filepair[1]
      nodes.push(
        <div className="row">
          <div className="col-md-12">
            <h1>{filename}</h1>
            <pre>{filedata}</pre>
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
      console.log(data)
      
      React.render(
        <JavaClassList files={data} />,
        document.querySelector('.output')
      )
    
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
