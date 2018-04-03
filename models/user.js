const validator = require('validator')
const _ = require('lodash')
const mongoose = require('mongoose')

const { hashPassword, comparePassword } = require('../util')

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

UserSchema.methods.toJSON = function () {
  var user = this

  return _.pick(user, ['name', 'birthday', 'email'])
}

UserSchema.statics.findByCredentials = async function (email, password) {
  var User = this

  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid email/password')

  const passwordMatch = await comparePassword(password, user.password)
  if (passwordMatch) {
    return user
  } else {
    throw new Error('Invalid email/password')
  }
}

UserSchema.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) {
    next()
  }

  hashPassword(user.password)
    .then((hash) => {
      user.password = hash
      next()
    })
})

var User = mongoose.model('User', UserSchema)

module.exports = { User }
