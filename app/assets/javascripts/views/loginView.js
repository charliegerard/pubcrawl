var app = app || {};

app.LoginView = Backbone.View.extend({
  tagName: 'div',

  events: {
    'click button': 'login'
  },

  initialize: function () {
    if (app.currentView) {
      app.currentView.remove();
    }
    app.currentView = this;
  },

  render: function () {
    var loginView = Handlebars.compile(app.templates.loginView);
    this.$el.html( loginView );
    this.$el.attr('id', 'login-view');
    $('#content').html(this.el);
  },

  login: function () {
    // stops the form from submitting params with the button.
    event.preventDefault();
    // saves to the rails database
    $.ajax('/session', {
      type: 'post',
      dataType: 'json',
      data: {
        username: $('#username').val(),
        password: $('#password').val()
      }
    }).done(function(response){
      console.log('login got', response);
      if (response.type == 'pub') {
        console.log('this might be working')
        app.currentUser = response.user;
        app.currentUser.type = 'pub'
        var pubNavBar = Handlebars.compile(app.templates.pubNavBar);
        $('#site-navigation-bar').html( pubNavBar() );
      } else if (response.type == 'user') {
        console.log('why is this working')
        app.currentUser = response.user;
        app.currentUser.type = 'user'
        var userNavBar = Handlebars.compile(app.templates.userNavBar);
      $('#site-navigation-bar').html( userNavBar() );
      } else {
        alert('Invalid login');
        return;
      }
      var loggedInBar = Handlebars.compile(app.templates.loggedInBar);
      $('#login-functions').html( loggedInBar );

      // var pubNavBar = Handlebars.compile(app.templates.pubNavBar);
      // $('#site-navigation-bar').html( pubNavBar() );
      app.router.navigate("users/list", true);
    //   console.log('working?')
    })
    // if (sign in is right){
    //   app.router.navigate("users/list", true);
    // }else{
    //   alert('your a fucking idiot')
    // }
    // var userLogin = new app.Session({
    //   username: $('#username').val(),
    //   password: $('#password').val()});
    // userLogin.save();
    // // adds to the backbone memory (browser)
    // //i dont know what should actually go here!
    // // app.users.add(newUser);
    // // Send view to a users list
    // app.router.navigate("users/list", true);
  }

});