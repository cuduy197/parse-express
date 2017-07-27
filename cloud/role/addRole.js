var ParseIndex = require("../../index");

module.exports = function addRole(params) {
  Parse.Cloud.define("addRole", (req, res) => {
    if (req.params.masterKey === ParseIndex.config.masterKey) {
      var roleName = req.params.roleName;
      if (roleName.length > 2) {
        var roleACL = new Parse.ACL();
        roleACL.setPublicReadAccess(true);
        var roleName = req.params.roleName;
        var role = new Parse.Role(roleName, roleACL);
        role.save().then(
          ok => {
            res.success(`Đã tạo thành công role :  ${roleName} ! ✅`);
          },
          e => {
            res.error(e.message);
          }
        );
      } else {
        res.error("⛔️ Tên role quá ngắn, yêu cần tối thiểu 3 ký tự ⛔️");
      }
    } else {
      res.error("⛔️ Sai mật khẩu quản trị (masterKey) 🔑");
    } //end check Masterkey
  }); //end define
}; //end cloud
