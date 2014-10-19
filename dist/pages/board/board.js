Polymer("phusion-board", {
  loadData: function(params) {
    var loader;
    this.clearData();
    this.board = params.board;
    loader = Message.get({
      board: this.board
    });
    return loader.on('data', (function(_this) {
      return function(messages) {
        return _this.messages = messages;
      };
    })(this));
  },
  clearData: function() {
    return this.messages = null;
  }
});
