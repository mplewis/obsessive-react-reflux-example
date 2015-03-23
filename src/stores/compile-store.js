var Reflux = require('reflux')

var Actions = require('../actions/actions')

module.exports = Reflux.createStore({

  init: function() {
    this.listenTo(Actions.requestCompile, 'onRequestCompile')
  },

  onRequestCompile: function(args) {
    console.log('Making request for JSON:', args.json);
    console.log('Will be made parcelable:', args.parcelable);
    
    this.onLoading()
   
    setTimeout(function() {
      this.onCompileSuccess([
        {name: 'testFile1', data: 'lorem ipsum'},
        {name: 'testFile2', data: 'dolor sit amet'}
      ])
    }.bind(this), 1000)
  },

  onLoading: function() {
    this.trigger({loaded: false, files: []})
  },

  onCompileSuccess: function(files) {
    this.trigger({loaded: true, files: files})
  }

})
