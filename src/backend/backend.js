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

  },

  addPackageDeclaration: function(classData) {
    var PACKAGE_DECL = 'package com.mycompany.myproject.mypackage;\n\n'
    return PACKAGE_DECL + classData
  },

  addParcelAnnotation: function(classData) {
    var PARCEL_IMPORT = 'import org.parceler.Parcel;\n'
    var CONSTRUCTOR_START = 'public class'
    var PARCEL_ANNOTATION = '@Parcel\n'
    var parts = classData.split(CONSTRUCTOR_START, 2)
    var newData = PARCEL_IMPORT + parts[0] + PARCEL_ANNOTATION + CONSTRUCTOR_START + parts[1]
    return newData
  },

  setCommonsLang3: function(classData) {
    var OLD_IMPORT = 'import org.apache.commons.lang.'
    var NEW_IMPORT = 'import org.apache.commons.lang3.'
    return classData.split(OLD_IMPORT).join(NEW_IMPORT)
  }

}
