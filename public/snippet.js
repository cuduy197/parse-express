Parse.Cloud
  .run("updateRole", {
    masterKey: "kdkdsmile",
    userName: "test",
    roleName: "admin",
    mode: "remove"
  })
  .then(
    res => {
      console.log(res);
    },
    e => {
      console.log(e);
    }
  );

//
Parse.Cloud
  .run("checkUserInRole", {
    userName: "test",
    roleName: "admin"
  })
  .then(
    res => {
      console.log(res);
    },
    e => {
      console.error(e.message);
    }
  );

var query = new Parse.Query(Parse.User);
query.contains("username", "test");
var qRole = query
  .find()
  .then(qRoleResult => qRoleResult, qRoleError => qRoleError);
qRole
  .then(ok => {
    console.log(ok);
  })
  .then(ok2 => {
    console.log(ok2);
  });

function queryAll(x) {
  var query = new Parse.Query(Parse.Role);
  query.contains("name", "admin");
  var qRole = query.find().then(r => r, e => e);
}

//User-> Role -> HttpRequest
