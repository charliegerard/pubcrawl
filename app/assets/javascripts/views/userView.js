var app = app || {};

app.UserView = Backbone.View.extend({
  tagName: 'div',

  events: {
    'click button': 'createUser'
  },

  initialize: function () {
    if (app.currentView) {
      app.currentView.remove();
    }
    app.currentView = this;
  },

  render: function () {
    var userView = Handlebars.compile(app.templates.userView);
    this.$el.html( userView );
    this.$el.attr('id', 'user-view');
    $('#content').html(this.el);
  },

  createUser: function () {
    // stops the form from submitting params with the button.
    event.preventDefault();
    // saves to the rails database
    // console.log($('#password').val())
    var newUser = new app.User({
      first_name: $('#first_name').val(),
      last_name: $('#last_name').val(),
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      password_confirmation: $('#confirm_password').val(),
      avatar: $('#avatar').val(),
      location: $('#location').val()});
    newUser.save();
    // adds to the backbone memory (browser)
    // app.users.add(newUser);
    // Send view to a users list
    app.router.navigate("users/list", true);
  }

});
