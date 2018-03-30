const mongoose = require('mongoose')
const validator = require('validator')

var UserSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    }
  },
  birthday: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 8
  }
})

var User = mongoose.model('User', UserSchema)

module.exports = {User}
