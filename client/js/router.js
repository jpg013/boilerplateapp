var Backbone    = require('backbone');
var HomeView    = require('./views/home.view');
var $           = require("jquery");

var Router = Backbone.Router.extend({
    routes: {
        '*path': 'default'
    },

    initialize: function() {
        Backbone.history.start();
    },

    default: function() {
        var view = new HomeView();
        $("#application-context").html(view.$el)
    }
});

module.exports = Router;
