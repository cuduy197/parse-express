var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require("parse-dashboard");
var path = require("path");
var compression = require('compression');
var app = express();

app.use(compression());

var config = {
  databaseURI: "mongodb://lab:123456@35.185.183.70:27017/lab",
  cloud: __dirname + "/cloud",
  appId: "cunghoctot",
  masterKey: "kdkdsmile",
  serverURL: "http://localhost:1337/parse",
  liveQuery: {
    classNames: ["realtime"]
  },
  verbose: true,
  allowClientClassCreation: false,
  enableAnonymousUsers: false,
  silent: true,
  facebookAppIds: "1932164860332051"
};
exports.config = config;

app.use("/parse", new ParseServer(config));

var dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: "https://hosata.com/parse",
        appId: "cunghoctot",
        masterKey: "kdkdsmile",
        appName: "Cung Hoc Tot"
      }
    ]
  },
  true
);

// make the Parse Dashboard available at /dashboard
app.use("/db", dashboard);

// Serve static assets from the /public folder
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/static", express.static(path.join(__dirname, "/public/vue/static"))); 
//Index Router
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/admin.html"));
});
app.get("/role", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/role.html"));
});

var port = process.env.PORT || 1337;
var httpServer = require("http").createServer(app);
httpServer.listen(port, function() {
  console.log("Parse running on port " + port + " ✔️");
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
