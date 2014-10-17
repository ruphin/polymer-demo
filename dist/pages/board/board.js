Polymer("phusion-board", {
  loadData: function(params) {
    var loader;
    loader = Message.get({
      board: params['board']
    });
    return loader.onData((function(_this) {
      return function(messages) {
        return _this.messages = messages;
      };
    })(this));
  }
});
