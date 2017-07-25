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

//
