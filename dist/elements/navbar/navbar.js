Polymer("phusion-navbar", {
  cache: {
    initialized: false,
    boards: {}
  },
  ready: function() {
    return this.asyncFire('registerDataLoader', this);
  },
  loadData: function() {
    var loader;
    if (!this.cache.initialized) {
      this.cache.initialized = true;
      loader = Board.get();
      return loader.on('data', (function(_this) {
        return function(boards) {
          return boards.forEach(function(board) {
            return _this.cache.boards[board.id] = board;
          });
        };
      })(this));
    }
  }
});
