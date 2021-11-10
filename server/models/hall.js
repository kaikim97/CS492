const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    time: {type: String, required: true},
    available: {type: Number, required: true }
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

hallSchema.statics.findOneByTime = function (t) {
    return this.findOne({time:t});
}

hallSchema.statics.deleteByTime = function (t) {
    return this.remove({time:t});
}


module.exports = mongoose.model('Hall', hallSchema);