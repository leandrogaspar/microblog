const router = require('express').Router()
const _ = require('lodash')

const { User } = require('../models/user')
const { generateToken } = require('../util')

router.post('/', createUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

router.post('/login', login)
router.post('/logout', logout)

async function createUser (req, res) {
  try {
    const body = _.pick(req.body, [
      'name.firstName',
      'name.lastName',
      'birthday',
      'email',
      'password'])

    let user = new User(body)
    user = await user.save()
    res.status(200).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
}

function getUser (req, res) {
  console.log(req)
  res.send('todo')
}

function updateUser (req, res) {
  console.log(req)
  res.send('todo')
}

function deleteUser (req, res) {
  console.log(req)
  res.send('todo')
}

async function login (req, res) {
  try {
    // We only use email and password to auth
    const body = _.pick(req.body, ['email', 'password'])

    const user = await User.findByCredentials(body.email, body.password)

    // Generate a new token for the login and send back to user
    let token = generateToken(user)
    token = await user.addToken(token)

    res.header('x-auth', token).status(200).send(user)
  } catch (e) {
    res.status(401).send()
  }
}

function logout (req, res) {
  console.log(req)
  res.send('todo')
}

module.exports = router
