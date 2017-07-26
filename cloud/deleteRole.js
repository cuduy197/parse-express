var ParseIndex = require("../index");
// Cloud with masterKey check!
module.exports = function deleteRole(params) {
  Parse.Cloud.define("deleteRole", (req, res) => {
    if (req.params.masterKey === ParseIndex.config.masterKey) {
      //add logic
      var roleName = req.params.roleName;
      if (
        roleName !== "admin" &&
        roleName !== "mod" &&
        roleName !== "creator"
      ) {
        var queryRole = new Parse.Query(Parse.Role);
        queryRole.equalTo("name", roleName);
        queryRole.find().then(
          roleResult => {
            let roleId = roleResult[0].id;

            Parse.Cloud
              .httpRequest({
                method: "DELETE",
                headers: {
                  "X-Parse-Application-Id": ParseIndex.config.appId,
                  "X-Parse-Master-Key": ParseIndex.config.masterKey,
                  "Content-Type": "application/json;charset=utf-8"
                },
                url: `${ParseIndex.config.serverURL}/roles/${roleId}`
              })
              .then(
                function(httpResponse) {
                  res.success("Đã role " + roleName + " thành công ✅");
                },
                function(httpResponse) {
                  res.error("Có lỗi khi thực hiện Http request  ⛔️");
                }
              ); // end http req
          },
          e => {
            res.error(e.massage);
          }
        ); //end find
      } else {
        res.error("⛔️ Không thể xóa role này ⛔️");
      }
    } else {
      res.error("⛔️");
    } //end check Masterkey
  }); //end define
}; //end cloud
