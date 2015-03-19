var JSON_POJO_ENDPOINT = 'http://json-pojo-server-271bbe43-1.mplewis.cont.tutum.io:49154/'

function processJson(jsonString) {

  console.log('Compiling:', jsonString);

  var request = new XMLHttpRequest()
  request.open('POST', JSON_POJO_ENDPOINT, true)
  request.setRequestHeader('Content-Type', 'application/json charset=UTF-8')

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response)
      console.log(data)
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
