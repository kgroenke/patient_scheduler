var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

var uristring =
   process.env.MONGOLAB_URI ||
   process.env.MONGOHQ_URL ||
   'mongodb://localhost/patient_scheduler';

// var theport = process.env.PORT || 5000;
mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

// mongoose.connect('mongodb://localhost/new_black_belt_exam');

var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})
