const router = require('express').Router()
const _ = require('lodash')
const mongoose = require('mongoose')

const { User } = require('../models/user')
const { generateToken } = require('../util')
const { authenticate } = require('../middleware/authenticate')

router.post('/', createUser)
router.get('/:id', authenticate, getUser)
router.put('/:id', authenticate, updateUser)
router.delete('/:id', authenticate, deleteUser)

router.post('/login', login)
router.post('/logout', authenticate, logout)

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

async function getUser (req, res) {
  try {
    const id = req.params.id

    // Common user, at least send an valid id :)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send()

    const user = await User.findById(id)
    // Todo: define if 404 will be really send in this case
    if (!user) return res.status(404).send()

    res.status(200).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
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
    if (!body.email) return res.status(400).send('Missing email field')
    if (!body.password) return res.status(400).send('Missing password field')

    const user = await User.findByCredentials(body.email, body.password)
    if (!user) throw new Error('Invalid user email/password')

    // Generate a new token and save to db
    let token = generateToken(user)
    token = await user.addToken(token)

    // Send the user and token back
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
