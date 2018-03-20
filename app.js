let express = require("express");
let app = express();

app.use(express.static("public"));
app.use(express.static("vendors"));


module.exports = app;
