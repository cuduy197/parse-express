// Cloud normal
module.exports = function updateRole(params) {
  Parse.Cloud.define("kiemTraPhanQuyen", (req, res) => {
    let userName =
      req.params.userName !== undefined
        ? req.params.userName
        : req.user.get("username");
    let roleName = req.params.roleName || req.params.role || req.params.r;
    //Promise query USER -> ROLE
    new Parse.Query(Parse.User)
      .equalTo("username", userName)
      .find({ useMasterKey: true })
      .then(userResult => {
        return new Parse.Query(Parse.Role)
          .equalTo("name", roleName)
          .equalTo("users", userResult[0])
          .find();
      })
      .then(roleResult => {
        roleResult.length !== 0
          ? res.success(`${userName} có trong role ${roleName} ✅`)
          : res.error(`${userName} không có trong role ${roleName} ️️⛔️`);
      })
      .catch(e => {
        res.error(e.message);
      });
  }); //end define promise2
}; //end cloud
