var JSON_POJO_ENDPOINT = 'http://json-pojo-server-271bbe43-1.mplewis.cont.tutum.io:49154/'
var DEFAULT_RESPONSE_URL = 'default.json'
var USE_DEFAULT_RESPONSE = true;
var ADD_RESPONSE_DELAY = true;

var PARCEL_IMPORT = 'import org.parceler.Parcel;\n'
var CONSTRUCTOR_START = 'public class'
var PARCEL_ANNOTATION = '@Parcel\n'

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

var compileStandardButton = document.querySelector('.compile-standard')
var compileParcelableButton = document.querySelector('.compile-parcelable')
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

compileStandardButton.addEventListener('click', function() {
  processJson(jsonSource.value, function(files) {
    renderFiles(files)
  })
})

compileParcelableButton.addEventListener('click', function() {
  processJson(jsonSource.value, function(files) {
    _.each(files, function(file) {
      file.data = addParcelAnnotation(file.data)
    })
    renderFiles(files)
  })
})
