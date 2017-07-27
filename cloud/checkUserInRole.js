var ParseIndex = require("../index");

module.exports = function checkUserInRole() {
  //💡 checkUserInRole
  Parse.Cloud.define("checkUserInRole", (req, res) => {
    const userName = req.params.userName;
    const roleName = req.params.roleName;

    const queryUser = new Parse.Query(Parse.User); // 👁‍🗨
    queryUser.equalTo("username", userName);
    queryUser
      .find({ useMasterKey: true }) //🔍
      .then(userResult => {
        var user = userResult[0];

        var queryRole = new Parse.Query(Parse.Role); // 👁‍🗨
        queryRole.equalTo("name", roleName);
        queryRole
          .find({ useMasterKey: true }) //🔍
          .then(roleResult => {
            var role = roleResult[0];
            var queryUserRole = new Parse.Query(role);
            queryUserRole.equalTo("users", user);
            queryUserRole.find().then(userRoleResult => {
              userRoleResult.forEach(roleUserResult => {
                if (roleUserResult.get("name") === roleName) {
                  res.success(`${userName} có trong role "${roleName}"! ✅`);
                } else {
                  res.error(
                    `${userName} không có trong role "${roleName}"! ⛔️`
                  );
                }
              });
            });
          })
          .catch(queryRoleError => {
            res.error("Có lỗi tìm Role: " + queryRoleError.message);
          });
      })
      .catch(queryUserError => {
        res.error("Có lỗi khi tìm người dùng: " + queryUserError.message);
      });
  }); //end function

  //💡 checkUserInAllRole
  Parse.Cloud.define("checkUserInAllRole", (req, res) => {
    const userName = req.params.userName;
    const queryUser = new Parse.Query(Parse.User); // 👁‍🗨
    queryUser.equalTo("username", userName);
    queryUser
      .find({ useMasterKey: true }) //🔍
      .then(userResult => {
        var user = userResult[0];

        var queryRole = new Parse.Query(Parse.Role); // 👁‍🗨
        queryRole.equalTo("users", user);
        queryRole
          .find({ useMasterKey: true }) //🔍
          .then(roleResult => {
            if (roleResult.length > 0) {
              let roleList = "";
              roleResult.forEach(role => {
                roleList =
                  roleList.length !== 1
                    ? `${roleList}<li>👉 ${role.get("name")}</li>`
                    : role.get("name");
              });
              res.success(
                `😃 "${userName}" ✅ thuộc ${roleResult.length} role :<br>${roleList}<br>`
              );
            } else {
              res.error(`😃 "${userName}" chưa được thêm vào role nào ⛔️ `);
            }
          })
          .catch(queryRoleError => {
            res.error("Có lỗi tìm Role: " + queryRoleError.message);
          });
      })
      .catch(queryUserError => {
        res.error("Có lỗi khi tìm người dùng: " + queryUserError.message);
      });
  }); //end function
}; //End export

//Find user in all roles
/* 
var ParseIndex = require("../index");

module.exports = function checkUserInRole() {
  Parse.Cloud.define("checkUserInRole", (req, res) => {
    //🔑
    if (req.params.masterKey === ParseIndex.config.masterKey) {
      //📝
      const userName = req.params.userName;
      const roleName = req.params.roleName;

      const queryUser = new Parse.Query(Parse.User); // 👁‍🗨
      queryUser.equalTo("username", userName);
      queryUser
        .find({ useMasterKey: true }) //🔍
        .then(userResult => {
          var user = userResult[0];

          var queryRole = new Parse.Query(Parse.Role); // 👁‍🗨
          queryRole.equalTo("users", user);
          queryRole
            .find({ useMasterKey: true }) //🔍
            .then(roleResult => {
              if (roleResult.length > 0) {
                res.success(roleResult);
              } else {
                res.error("Người dùng chưa thêm vào role nào ⛔️ ");
              }
            })
            .catch(queryRoleError => {
              res.error("Có lỗi tìm Role: " + queryRoleError.message);
            });
        })
        .catch(queryUserError => {
          res.error("Có lỗi khi tìm người dùng: " + queryUserError.message);
        });
    } else {
      res.error("⛔️");
    }
  }); //end function
}; //End export


*/
