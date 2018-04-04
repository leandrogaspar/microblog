const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function hashPassword (password) {
  const salt = await bcrypt.genSalt()
  return bcrypt.hash(password, salt)
}

function comparePassword (password, hash) {
  return bcrypt.compare(password, hash)
}

function generateToken (user) {
  const decodedToken = {
    _id: user._id.toHexString()
  }

  return jwt.sign(decodedToken, process.env.JWT_KEY).toString()
}

function decodeToken (tokenString) {
  return jwt.verify(tokenString, process.env.JWT_KEY)
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  decodeToken
}
