var updateRole = require("./role/updateRole");
var checkUserInRole = require("./role/checkUserInRole");
var addRole = require("./role/addRole");
var deleteRole = require("./role/deleteRole");

//var test = require("./test");

//Run
updateRole();
checkUserInRole();
addRole();
deleteRole();

//Hello 😄👋
Parse.Cloud.define("hello", function(req, res) {
  res.success("Hi");
});
