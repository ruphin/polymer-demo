var Board,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Board = (function(_super) {
  __extends(Board, _super);

  function Board(data) {
    data.url = "#/boards/" + data.id + "/";
    Board.__super__.constructor.call(this, data);
  }

  return Board;

})(Model);

Board.get = function(params) {
  var processor;
  processor = Api.get("http://demo2452101.mockable.io/boards.json", params);
  processor.processData((function(_this) {
    return function(boards) {
      var instance, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = boards.length; _i < _len; _i++) {
        instance = boards[_i];
        _results.push(new Board(instance));
      }
      return _results;
    };
  })(this));
  return processor;
};

window.Board = Board;
