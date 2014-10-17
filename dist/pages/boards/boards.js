Polymer("phusion-boards", {
  loadData: function() {
    var loader;
    loader = Board.get();
    return loader.onData((function(_this) {
      return function(data) {
        return _this.boards = data;
      };
    })(this));
  }
});
