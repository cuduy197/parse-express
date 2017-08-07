Parse.initialize("cunghoctot");
Parse.serverURL = "http://" + window.location.host + "/parse";

var vm = new Vue({
  el: "#app",
  data: {
    hello: "Xin chào !!!",
    isLogin: null,
    input: {
      name: "test",
      pass: "123456"
    }
  },
  beforeMount() {
    if (Parse.User.current() === null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
      this.hello = Parse.User.current().get("username");
    }
  },
  methods: {
    cloud_isInRole(roleName) {
      Parse.Cloud
        .run("isInRole", { r: roleName })
        .then(result => console.log(result))
        .catch(e => console.error(e.message));
    },

    //Auth
    LOGIN() {
      Parse.User
        .logIn(this.input.name, this.input.pass)
        .then(ok => history.go(0))
        .catch(e => alert(e.message));
    },
    LOGOUT() {
      Parse.User
        .logOut()
        .then(ok => history.go(0))
        .catch(e => alert(e.message));
    }
  }
});
