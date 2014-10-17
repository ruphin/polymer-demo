var Message,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Message = (function(_super) {
  __extends(Message, _super);

  function Message() {
    return Message.__super__.constructor.apply(this, arguments);
  }

  return Message;

})(Model);

Message.get = function(params) {
  var processor;
  processor = Api.get("http://demo2452101.mockable.io/messages.json", params);
  processor.processData((function(_this) {
    return function(messages) {
      var instance, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        instance = messages[_i];
        _results.push(new Message(instance));
      }
      return _results;
    };
  })(this));
  return processor;
};

window.Message = Message;
