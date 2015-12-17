var default_controller = require('./../controllers/default_controller.js');

var appointments = require('./../controllers/appointments.js')

module.exports = function(app){
  app.post('/appointment/add', function(req, res){
    appointments.add(req, res);
  })

  app.get('/appointments', function(req, res){
    appointments.show(req, res);
  })

  app.post('/cancel', function(req, res){
    appointments.cancel(req, res);
  })

  app.post('/patient', function(req, res){
    appointments.patient(req, res);
  })
}
