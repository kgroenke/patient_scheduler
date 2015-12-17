var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var complaintValidator = [
  validate({
    validator: 'isLength',
    arguments: [5, 200],
    message: 'Complaint must be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [5, 20],
    message: 'Name must be between {ARGS[0]} and {ARGS[1]} characters'
  }),
];

var Schema = mongoose.Schema;
var AppointmentSchema = new mongoose.Schema({
  date: {type: Date},
  time: {type: String},
  name: {type: String, validate: nameValidator},
  complaint: {type: String, validate: complaintValidator},
  created: {type: Date, default: Date.now}
})

var Appointment = mongoose.model('Appointment', AppointmentSchema);
