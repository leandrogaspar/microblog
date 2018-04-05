const validator = require('validator')
const _ = require('lodash')
const mongoose = require('mongoose')

const { hashPassword, comparePassword, decodeToken } = require('../util')

const UserSchema = new mongoose.Schema({
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
  },
  tokens: [
    {
      type: String,
      require: true
    }
  ]
})

UserSchema.methods.toJSON = function () {
  const user = this

  return _.pick(user, ['name', 'birthday', 'email'])
}

UserSchema.methods.addToken = function (token) {
  const user = this

  user.tokens.push(token)
  return new Promise((resolve, reject) => {
    user.save()
      .then((user) => {
        resolve(token)
      })
      .catch((e) => {
        reject(e)
      })
  }
  )
}

UserSchema.methods.removeToken = function (token) {
  const user = this

  return user.update({
    $pull: {
      tokens: { token }
    }
  })
}

UserSchema.static.findByToken = function (token) {
  const User = this

  var decodedToken

  try {
    decodedToken = decodeToken(token)
  } catch (e) {
    return Promise.reject(e)
  }

  return User.findOne({
    '_id': decodedToken._id,
    'tokens.token': token
  })
}

UserSchema.statics.findByCredentials = async function (email, password) {
  const User = this

  const user = await User.findOne({ email })
  if (!user) return null;

  const passwordMatch = await comparePassword(password, user.password)
  if (passwordMatch) {
    return user
  } else {
    return null;
  }
}

UserSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) {
    next()
  }

  hashPassword(user.password)
    .then((hash) => {
      user.password = hash
      next()
    })
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }
