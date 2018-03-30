const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db/mongoose')

const port = process.env.PORT || 3000
const app = express()

db.connect()
  .then(() => {
    console.log(`Mongoose connected to MongoDB`)
  })

app.use(bodyParser.json())
app.use(require('./routes'))

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
