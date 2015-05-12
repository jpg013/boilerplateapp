(function() {
  var ViewManager;

  Backbone.View.prototype.render = function() {
    if (this.model) {
      this.$el.html(this.template(this.model.attributes));
    } else {
      this.$el.html(this.template());
    }
    return this;
  };

  Backbone.View.prototype.close = function() {
    this.stopListening();
    if (typeof this.onClose === "function") {
      this.onClose();
    }
    this.remove();
    return this.unbind();
  };

  ViewManager = (function() {
    function ViewManager() {}

    ViewManager.prototype.showView = function(view) {
      if (this.currentView) {
        this.currentView.close();
      }
      this.currentView = view;
      this.currentView.render();
      window.scrollTo(0, 0);
      $('#application-context').html(this.currentView.el);
      if (this.currentView.onReady) {
        return this.currentView.onReady();
      }
    };

    return ViewManager;

  })();

}).call(this);
