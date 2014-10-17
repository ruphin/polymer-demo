Polymer("phusion-board", {
  loadData: function(params) {
    var loader;
    this.clearData();
    loader = Message.get({
      board: params['board']
    });
    return loader.on('data', (function(_this) {
      return function(messages) {
        return _this.messages = messages;
      };
    })(this));
  },
  unloadData: function() {
    return this.clearData();
  },
  clearData: function() {
    return this.messages = null;
  }
});
