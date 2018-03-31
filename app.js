const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const db = require('./db/mongoose')

const port = process.env.PORT || 3000
const app = express()

db.connect()
  .then(() => {
    console.log(`Mongoose connected to MongoDB`)
  })

app.use(helmet())
app.use(bodyParser.json())
app.use(require('./routes'))

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
