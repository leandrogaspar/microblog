const router = require('express').Router()
const _ = require('lodash')

const { User } = require('../models/user')

router.post('/', createUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

router.post('/login', login)
router.post('/logout', logout)

function createUser (req, res) {
  const body = _.pick(req.body, ['name.firstName', 'name.lastName', 'birthday', 'email', 'password'])
  const user = new User(body)

  user.save()
    .then(() => {
      res.status(200).send(user)
    })
    .catch((e) => {
      res.status(400).send(e)
    })
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

function login (req, res) {
  const body = _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password)
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((e) => {
      res.status(401).send()
    })
}

function logout (req, res) {
  console.log(req)
  res.send('todo')
}

module.exports = router
