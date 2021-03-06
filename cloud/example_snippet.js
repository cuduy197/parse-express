var ParseServer = require("../index");
// Cloud with masterKey check!
module.exports = function updateRole(params) {
  Parse.Cloud.define("updateRole", (req, res) => {
    if (req.params.masterKey === ParseServer.config.masterKey) {
      //add logic ✅
      var userName = req.params.userName;
      var roleName = req.params.roleName;
    } else {
      res.error("⛔️ Sai mật khẩu quản trị (masterKey) 🔑");
    } //end check Masterkey
  }); //end define
}; //end cloud

// Cloud normal
module.exports = function updateRole(params) {
  Parse.Cloud.define("updateRole", (req, res) => {
    //add logic
  }); //end define
}; //end cloud

Parse.Cloud
  .httpRequest({
    method: "DELETE",
    headers: {
      "X-Parse-Application-Id": ParseServer.config.appId,
      "X-Parse-Master-Key": ParseServer.config.masterKey,
      "Content-Type": "application/json;charset=utf-8"
    },
    url: `http://${ParseServer.config.serverURL}/roles/${roleId}`
  })
  .then(
    function(httpResponse) {
      res.succeed("Đã xóa thành công");
    },
    function(httpResponse) {
      res.err("Có lỗi" + httpResponse.status);
    }
  );
