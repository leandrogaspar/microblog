const router = require('express').Router()

const apiVersion = 'v0'

router.use(`/api${apiVersion}/users`, require('./users'))

module.exports = router
