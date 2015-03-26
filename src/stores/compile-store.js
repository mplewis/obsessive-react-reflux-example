var Reflux = require('reflux')

var Actions = require('../actions/actions')

var backend = require('../backend/backend')

module.exports = Reflux.createStore({

  init: function() {
    this.listenTo(Actions.requestCompile, 'onRequestCompile')
  },

  onRequestCompile: function(args) {
    console.log('Making request for JSON:', args.json);
    console.log('Will be made parcelable:', args.parcelable);
    
    this.onLoading()

    backend.compileJson(args.json, function(err, files) {
      if (err) {
        console.log('Error:', err)
        return
      }

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
