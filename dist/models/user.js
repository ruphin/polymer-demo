var User,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

User = (function(_super) {
  __extends(User, _super);

  function User(data) {
    data.gravatar = "http://www.gravatar.com/avatar/" + (md5(data.email)) + "?s=96";
    User.__super__.constructor.call(this, data);
  }

  return User;

})(Model);
