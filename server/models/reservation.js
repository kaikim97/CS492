const mongoose = require("mongoose");

// Define Schemes
const reservationSchema = new mongoose.Schema(
  {
    birth: { type: String, required: false, default: "" },
    phone: { type: String, required: false, default: "" },
    password: { type: String, required: false, default: "" },
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    seats: { type: [String], required: true },
    price: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

reservationSchema.statics.create = function (payload) {
  const reservation = new this(payload);
  return reservation.save();
};

// Find all : not used
reservationSchema.statics.findAll = function () {
  return this.find({});
};

// Used for Querystring
reservationSchema.statics.findQuery = function (birth, phone, password) {
  return this.find({ birth: birth, phone: phone, password: password });
};

// Find reservation by ID
reservationSchema.statics.findOneById = function (_id) {
  return this.findOne({ _id });
};

// Delete reservation
reservationSchema.statics.deleteById = function (_id) {
  return this.remove({ _id });
};

// Create Model & Export
module.exports = mongoose.model("Reservation", reservationSchema);
