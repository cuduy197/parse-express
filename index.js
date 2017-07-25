var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var path = require("path");
var app = express();

var config = {
  databaseURI: "mongodb://lab:123456@35.185.183.70:27017/lab",
  cloud: __dirname + "/cloud",
  appId: "cunghoctot",
  masterKey: "kdkdsmile",
  serverURL: "http://localhost:1337/parse",
  liveQuery: {
    classNames: ["realtime"]
  },
  verbose: false,
  allowClientClassCreation: false,
  enableAnonymousUsers: false,
  silent: false,
  facebookAppIds: "1932164860332051"
};

app.use("/parse", new ParseServer(config));

// Serve static assets from the /public folder
app.use("/public", express.static(path.join(__dirname, "/public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/test.html"));
});

var port = process.env.PORT || 1337;
var httpServer = require("http").createServer(app);
httpServer.listen(port, function() {
  console.log("Parse running on port " + port + " ✔️");
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

exports.config = config;