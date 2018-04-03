const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

require('./config')
require('./db/mongoose')

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(require('./routes'))

module.exports = app
