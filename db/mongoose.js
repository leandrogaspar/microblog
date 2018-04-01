var mongoose = require('mongoose')

const mongoHost = process.env.MONGODB_URI

mongoose.Promise = global.Promise

function connect () {
  return mongoose.connect(mongoHost)
}

function disconnect () {
  return mongoose.disconnect()
}

module.exports = { connect, disconnect }
