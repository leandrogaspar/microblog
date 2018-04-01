const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

require('./config')
const db = require('./db/mongoose')

const port = process.env.PORT
const app = express()

db.connect()
  .then(() => {
    console.log(`Mongoose connected to MongoDB`)
  })
  .catch((e) => {
    console.log('Could not connect to MongoDB', e)
    process.exit(1)
  })

app.use(helmet())
app.use(bodyParser.json())
app.use(require('./routes'))

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})

module.exports = { app }
