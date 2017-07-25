var updateRole = require("./updateRole");
var checkUserInRole = require("./checkUserInRole");
updateRole();
checkUserInRole();
Parse.Cloud.define("hello", function(req, res) {
  res.success("Hi");
});
