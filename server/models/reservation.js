const mongoose = require('mongoose');

// Define Schemes
const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
},
{
  timestamps: true
});

reservationSchema.statics.create = function (payload) {
  const reservation = new this(payload);
  return reservation.save();
}

// Find all : not used
reservationSchema.statics.findAll = function () {
  return this.find({});
}
 
// Find reservation by ID
reservationSchema.statics.findOneById = function(_id) {
  return this.findOne({_id});
}
  
// Delete reservation 
reservationSchema.statics.deleteById = function (_id) {
  return this.remove({_id});
}

// Create Model & Export
module.exports = mongoose.model('Reservation', reservationSchema);