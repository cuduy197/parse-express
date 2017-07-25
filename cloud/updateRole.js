var ParseIndex = require("../index");

module.exports = function updateRole(params) {
  Parse.Cloud.define("updateRole", (req, res) => {
    if (req.params.masterKey === ParseIndex.config.masterKey) {
      var userName = req.params.userName;
      var roleName = req.params.roleName;
      var mode = req.params.mode;

      var queryUser = new Parse.Query(Parse.User);
      queryUser.equalTo("username", userName);
      queryUser
        .find({ useMasterKey: true })
        .then(userResult => {
          var userId = userResult[0].id;
          var queryRole = new Parse.Query(Parse.Role);
          queryRole.equalTo("name", roleName);
          queryRole
            .find()
            .then(roleResult => {
              var roleId = roleResult[0].id;
              Parse.Cloud
                .httpRequest({
                  method: "PUT",
                  headers: {
                    "X-Parse-Application-Id": ParseIndex.config.appId,
                    "X-Parse-Master-Key": ParseIndex.config.masterKey,
                    "Content-Type": "application/json;charset=utf-8"
                  },
                  url: `${ParseIndex.config.serverURL}/roles/${roleId}`,
                  body: {
                    users: {
                      __op: `${mode === "remove"
                        ? "RemoveRelation"
                        : "AddRelation"}`,
                      objects: [
                        {
                          __type: "Pointer",
                          className: "_User",
                          objectId: `${userId}`
                        }
                      ]
                    }
                  }
                })
                .then(ok => {
                  if (mode === "remove") {
                    res.success(
                      `➖ "${userName}" đã xóa trong role: "${roleName}" ! ✅`
                    );
                  } else {
                    res.success(
                      `➕ "${userName}" đã thêm vào role: "${roleName}" ! ✅`
                    );
                  }
                })
                .catch(httpRequestError => {
                  res.error(
                    "Có lỗi khi Http Request: " + httpRequestError.message
                  );
                });
            })
            .catch(queryRoleError => {
              res.error("Có lỗi tìm Role: " + queryRoleError.message);
            });
        })
        .catch(queryUserError => {
          res.error("Có lỗi tìm User: " + queryUserError.message);
        });
    } else {
      res.error("⛔️");
    }
  }); //end define
}; //End export
