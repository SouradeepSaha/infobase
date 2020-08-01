const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  active: Boolean,
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: [true, "Name cannot be empty"]
  },
  username: {
    required: [true, "username cannot be empty"],
    type: String,
    unique: [true, "username must be unique"]
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Email cannot be empty"],
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    index: true,
    unique: [true, "Email already in use"]
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    } 
  },
  password: {type: String, required: [true, "Password Cannot be empty"]},
  location: { type: String },

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);