var { User } = require('./../models/user')

function authenticate (req, res, next) {
  var token = req.header('x-auth')

  User.findByToken(token)
    .then((user) => {
      if (!user) return Promise.reject(new Error('User not found'))

      req.user = user
      next()
    })
    .catch((e) => {
      res.status(401).send()
    })
}

module.exports = { authenticate }
