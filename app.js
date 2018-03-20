let express = require("express");
let app = express();

app.use(express.static("public"));
app.use("vendors",express.static("public"));


module.exports = app;
