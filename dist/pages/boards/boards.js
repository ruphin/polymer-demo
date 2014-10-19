Polymer("phusion-boards", {
  loadData: function() {
    var loader;
    this.clearData();
    loader = Board.get();
    return loader.on('data', (function(_this) {
      return function(data) {
        return _this.boards = data;
      };
    })(this));
  },
  clearData: function() {
    return this.boards = null;
  }
});
