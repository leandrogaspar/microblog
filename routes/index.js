const router = require('express').Router()

router.use('/users', require('./users'))

router.get('/', function (req, res) {
  res.send('Hello world!')
})

module.exports = router
