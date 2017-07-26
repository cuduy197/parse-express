var updateRole = require("./updateRole");
var checkUserInRole = require("./checkUserInRole");
var addRole = require("./addRole");
var deleteRole = require("./deleteRole");

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
