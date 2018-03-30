const bcrypt = require('bcrypt')

async function hashPassword (password) {
  const salt = await bcrypt.genSalt()
  return bcrypt.hash(password, salt)
}

function comparePassword (password, hash) {
  return bcrypt.compare(password, hash)
}

module.exports = { hashPassword, comparePassword }
