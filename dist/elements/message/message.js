Polymer("phusion-message", {
  ready: function() {
    console.log(this.message);
    if (this.message != null) {
      return this['data-avatar'] = "http://www.gravatar.com/avatar/" + (md5(this.message.author.email)) + "?s=48";
    }
  }
});
