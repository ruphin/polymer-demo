Polymer("phusion-greeter", {
  audience: 'developers',
  emphasize: function() {
    return this.$['polymer'].classList.add("emphasis");
  }
});
