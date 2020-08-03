const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const missleSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Location cannot be empty"]
  },
  time: {
    type: String,
    required: [true, "Time cannot be empty"]
  }
});

module.exports = mongoose.model('Missle', missleSchema);