var updateRole = require("./updateRole");
updateRole();
Parse.Cloud.define("hello", function(req, res) {
  res.success("Hi");
});
