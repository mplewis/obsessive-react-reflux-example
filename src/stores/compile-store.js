var Reflux = require('reflux')

var Actions = require('../actions/actions')

var Backend = require('../backend/backend')
var PostProcess = require('../backend/post-process.js')

module.exports = Reflux.createStore({

  init: function() {
    this.listenTo(Actions.requestCompile, 'onRequestCompile')
  },

  onRequestCompile: function(args) {
    console.log('Making request for JSON:', args.json);
    console.log('Will be made parcelable:', args.parcelable);
    
    this.onLoading()

    Backend.compileJson(args.json, function(err, files) {
      if (err) {
        console.log('Error:', err)
        return
      }

      files.forEach(file => {
        file.data = PostProcess.processClass(file.data, args.parcelable)
      })

      this.onCompileSuccess(files)
    }.bind(this))
  },

  onLoading: function() {
    this.trigger({loaded: false, files: []})
  },

  onCompileSuccess: function(files) {
    this.trigger({loaded: true, files: files})
  }

})
