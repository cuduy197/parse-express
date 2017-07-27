Parse.initialize("cunghoctot");

Parse.serverURL = "http://" + window.location.host + "/parse";

Vue.config.productionTip = false;
Vue.config.devtools = false;

var vm = new Vue({
  el: "#app",
  data: {
    hello: "Trang dành cho nhà quản trị 😎",
    activeName: "first",
    loggedIn: null,
    userInfo: {
      id: "",
      username: "",
      role: []
    },
    userInput: {
      masterKey: "",
      name: "test",
      pass: "123456"
    },
    roleInput: {
      userName: "test",
      roleSelect: "",
      roleList: []
    },
    loading: {
      login: false,
      role: false,
      checkRole: false
    }
  },
  beforeMount() {
    console.log("Before Mount ⛅️");
    setTimeout(() => {
      var CurrentParseUser = Parse.User.current();
      if (CurrentParseUser === null) {
        this.loggedIn = false;
        alert("Bạn chưa đăng nhập!");
      } else {
        this.userInfo.id = CurrentParseUser.id;
        this.userInfo.username = CurrentParseUser.get("username");
        alert(
          ` ✨ <b> Chào mừng <u>${this.userInfo.username}</u> trở lại </b> ✨`,
          2
        );
        this.checkUserAllRole();
        this.getRoleList();
        this.loggedIn = true;
      }
    }, 500);
  },
  methods: {
    deleteRole_Cloud() {
      console.log("addRole_Cloud");
      var xacNhan = confirm("Bạn muốn xóa role?");
      if (xacNhan) {
        this.loading.checkRole = true;
        Parse.Cloud
          .run("deleteRole", {
            masterKey: this.userInput.masterKey,
            roleName: this.roleInput.roleSelect
          })
          .then(
            res => {
              console.log(res);
              alert(res);
              this.checkUserAllRole();
              this.getRoleList();
            },
            e => {
              console.log(e);
              alert(e.message);
            }
          )
          .then(() => {
            this.loading.checkRole = false;
          });
      }
    },
    addRole_Cloud() {
      console.log("addRole_Cloud");
      var xacNhan = confirm("Bạn muốn tạo role?");
      if (xacNhan) {
        this.loading.checkRole = true;
        Parse.Cloud
          .run("addRole", {
            masterKey: this.userInput.masterKey,
            roleName: prompt("Tên role", "")
          })
          .then(
            res => {
              console.log(res);
              alert(res);
              this.checkUserAllRole();
              this.getRoleList();
            },
            e => {
              console.log(e);
              alert(e.message);
            }
          )
          .then(() => {
            this.loading.checkRole = false;
          });
      }
    },

    editUserInRole_Cloud(mode) {
      var xacNhan = confirm(
        ` Bạn muốn ${mode === "remove" ? "xóa" : "thêm"} "${this.roleInput
          .userName}" trong role "${this.roleInput.roleSelect}" `
      );
      if (xacNhan) {
        this.loading.checkRole = true;
        console.log("editUserInRole_Cloud");
        Parse.Cloud
          .run("updateRole", {
            masterKey: this.userInput.masterKey,
            userName: this.roleInput.userName,
            roleName: this.roleInput.roleSelect,
            mode: mode === "remove" ? "remove" : "add"
          })
          .then(
            res => {
              console.log(res);
              alert(res);
              this.checkUserAllRole();
            },
            e => {
              console.log(e);
              alert(e.message);
            }
          )
          .then(() => {
            this.loading.checkRole = false;
          });
      }
    },
    checkUserInRole_Cloud() {
      this.loading.checkRole = true;
      console.log("checkUserInAllRole");
      Parse.Cloud
        .run("checkUserInAllRole", {
          userName: this.roleInput.userName,
          roleName: this.roleInput.roleSelect
        })
        .then(
          res => {
            console.log(res);
            alert(res);
          },
          e => {
            console.error(e.message);
            alert(e.message);
          }
        )
        .then(() => {
          this.loading.checkRole = false;
        });
    },
    getRoleList() {
      console.log("getRoleList");
      this.roleInput.roleList = [];
      var roleListQuery = new Parse.Query(Parse.Role);
      roleListQuery
        .find()
        .then(
          r => {
            r.forEach(i => {
              this.roleInput.roleList.push(i.get("name"));
            });
          },
          e => {
            alert(e.message);
          }
        )
        .then(() => {
          this.roleInput.roleSelect = this.roleInput.roleList[0];
        });
    },
    checkUserAllRole() {
      console.log("checkUserAllRole");
      this.loading.role = true;
      this.userInfo.role = [];
      var queryRole = new Parse.Query(Parse.Role);
      queryRole.equalTo("users", Parse.User.current());
      queryRole
        .find()
        .then(
          r => {
            if (r.length > 0) {
              r.forEach(role => {
                this.userInfo.role.push(role.get("name"));
                console.log(role.get("name"));
              });
            } else {
              alert("Người dùng chưa được phân quyền!");
            }
          },
          e => {
            alert(e.message);
          }
        )
        .then(() => {
          this.loading.role = false;
        });
    },
    logIn() {
      this.loading.login = true;
      Parse.User
        .logIn(this.userInput.name, this.userInput.pass)
        .then(
          userLogin => {
            console.log(userLogin);

            //user
            this.userInfo.id = userLogin.id;
            this.userInfo.username = userLogin.get("username");
            this.loggedIn = true;
            document.body.innerHTML =
              "<br> <h3 style='color: white'>🚀 Đang tải thông tin ... </h3>";
            document.body.className = "animated fadeIn";
            setTimeout(function() {
              history.go(0);
            }, 777);
          },
          e => {
            alert(e);
          }
        )
        .then(() => {
          this.loading.login = false;
        });
    },
    logOut() {
      console.log("logout");
      Parse.User.logOut().then(
        ok => {
          this.loggedIn = false;
          document.body.innerHTML =
            "<br> <h3 style='color: white'>🚀 Tải lại trang ... </h3>";
          document.body.className = "animated fadeIn";
          setTimeout(function() {
            history.go(0);
          }, 777);
        },
        e => {
          alert(e);
        }
      );
    }
  }
});
