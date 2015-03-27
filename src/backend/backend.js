var config = require('../config.js')

module.exports = {

  compileJson: function(jsonString, callback) {

    var request = new XMLHttpRequest()
    request.open('POST', config.JSON_POJO_ENDPOINT, true)
    request.setRequestHeader('Content-Type', 'application/json charset=UTF-8')
    
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        
        var data = JSON.parse(this.response)    
        var files = []
        _.each(_.pairs(data), function(filepair) {
          files.push({name: filepair[0], data: filepair[1]})
        })

        callback(null, files)
      
      } else {
        console.log('Server returned error', this.status)
        callback(this.response, null)
      }
    }

    request.onerror = function() {
      console.log('Connection error')
      callback(this.response, null)
    }
    
    request.send(jsonString)

  }

}
