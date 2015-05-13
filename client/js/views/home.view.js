var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;

var HomeView = Backbone.View.extend({
  initialize: function() {
    this.template = require('../../templates/home.template.hbs');
    this.render()
  },

  render: function() {
    this.$el.html(this.template({name: 'Justin Graber'}));
  }
});

module.exports = HomeView;
