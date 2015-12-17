var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

module.exports = function(){
  return{
    patient: function(req, res){
      var name = req.body.patient_name
      if(name.length < 2){
        res.json("error")
      }
      else{
        res.json("No errors")
      }
    },
    add: function(req, res){
      var error_messages = []
      if( !req.body.date){
        error_messages.push("Must enter a date")
      }
      else if (req.body.date < Date.now()){
        error_messages.push("Must enter a future date")
      }
      if (!req.body.time){
        error_messages.push("Must enter a time")
      }
      if (!req.body.complaint){
        error_messages.push("Must enter a reason for appointment")
      }
      else if (req.body.complaint.length < 3){
        error_messages.push("Reason for appointment must be at least 3 characters")
      }

      Appointment.find({date: req.body.date}, function(err, results){
        if(err){
          console.log("Something went wrong adding appointment")
        }
        else if(results){
          if(results.length >= 3){
            error_messages.push("We are full for that date, please select another")
          }
        }
      })

      if (error_messages.length === 0){
        var appointment = new Appointment({date: req.body.date, time:req.body.time, name: req.body.name, complaint: req.body.complaint});
        appointment.save(function(err){
          if(err){
            console.log("error in save function", err)
            res.json(err)
          }
          else{
            res.json(error_messages)
          }
        })
      }
      else {
        res.json(error_messages)
      }
    },






    show: function(req, res){
      Appointment.find({date: {$gte: Date.now()}}, function(err, results){
        if(err){
          console.log("error in finding appts")
        }
        else if(results){
          res.json(results)
        }
      })
    },
    cancel: function(req, res){
      Appointment.remove({_id: req.body.id}, function(err){
        if(err){
          console.log('something went wrong deleting your appointment')
        }
        else{
          res.redirect('/')
        }
      })
    }
  }
}()
