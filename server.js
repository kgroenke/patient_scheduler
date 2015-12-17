var express = require("express");
var app = express ();
var path = require("path");

var bodyParser = require("body-Parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./client/static")));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.listen(process.env.PORT || 8000, function(){
  console.log("listening on port 8000")
})
