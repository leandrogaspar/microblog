var mongoose = require('mongoose')

mongoose.Promise = global.Promise

function connect () {
  console.log(`Connecting to db URL ${process.env.MONGODB_URI}`)
  return mongoose.connect(process.env.MONGODB_URI)
}

function disconnect () {
  return mongoose.disconnect()
}

module.exports = { connect, disconnect }
