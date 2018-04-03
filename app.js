const app = require('./server')

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
