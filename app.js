const express = require('express')

const port = process.env.PORT || 3000

const app = express()

app.use(require('./routes'))

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
