var updateRole = require("./role/updateRole");
var checkUserInRole = require("./role/checkUserInRole");
var addRole = require("./role/addRole");
var deleteRole = require("./role/deleteRole");

dev = require("./dev");

//Run
updateRole();
checkUserInRole();
addRole();
deleteRole();
dev();

//Hello 😄👋
Parse.Cloud.define("cool", function(req, res) {
  res.success("Hi");
});
