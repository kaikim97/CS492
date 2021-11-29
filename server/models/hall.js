const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
    available: {type: Number, required: true }, // Number of available seats
    occupied: {     // Map of preoccupied or reserved seats
        type: Map,      // Key: seatID
        of: {type: Boolean},     // Value: true(reserved), false(preoccupied)
        default: {},
        required: true
     }
},
{
    timestamps:true
});

hallSchema.statics.create = function (payload) {
    const hall = new this(payload);
    return hall.save();
}

hallSchema.statics.findAll = function () {
    return this.find({});
}

hallSchema.statics.findOneByInfo = function (title, date, time) {
    return this.findOne({title: title, date: date, time:time});
}

hallSchema.statics.findAvailable = function (title, date) {
    return this.find({title: title, date: date}, {time:1, available:1}).sort({time:1});
}

hallSchema.statics.deleteByInfo = function (title, date, time) {
    return this.remove({title: title, date: date, time:time});
}


module.exports = mongoose.model('Hall', hallSchema);