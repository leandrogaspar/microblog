const { User } = require('./../models/user')

async function authenticate (req, res, next) {
  try {
    const token = req.header('x-auth')
    if (!token) throw new Error('No auth header')

    const user = await User.findByToken(token)
    if (!user) throw new Error('Not authenticated')

    req.user = user
    next()
  } catch (e) {
    res.status(401).send()
  }
}

module.exports = { authenticate }
