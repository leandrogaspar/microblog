const mongoose = require('mongoose')

require('../../config')
const { User } = require('../../models/user')
const { generateToken } = require('../../util')

const ids = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId()
]

const nonAddedUsers = [
  {
    _id: ids[0],
    name: {
      firstName: 'First',
      lastName: 'Lastname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'john.lastname@test.com',
    password: 'abcd1234',
    tokens: [generateToken({ _id: ids[0] })]
  },
  {
    _id: ids[1],
    name: {
      firstName: 'Second',
      lastName: 'Lastname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'john.lastname@test.com',
    password: 'abcd1234',
    tokens: [generateToken({ _id: ids[1] })]
  },
  {
    _id: ids[2],
    name: {
      firstName: 'Third',
      lastName: 'Lastname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'john.lastname@test.com',
    password: 'abcd1234',
    tokens: [generateToken({ _id: ids[2] })]
  },
  {
    _id: ids[3],
    name: {
      firstName: 'Fourth',
      lastName: 'Lastname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'john.lastname@test.com',
    password: 'abcd1234',
    tokens: [generateToken({ _id: ids[3] })]
  }
]

const users = [
  {
    _id: ids[4],
    name: {
      firstName: 'Firstname',
      lastName: 'Lasname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'firstname.lastname@test.com',
    password: 'abcd1234',
    tokens: [generateToken({ _id: ids[4] })]
  },
  {
    _id: ids[5],
    name: {
      firstName: 'Another',
      lastName: 'Lastname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'another.lastname@test.com',
    password: 'YMcd1!msfnaosafl',
    tokens: [generateToken({ _id: ids[5] })]
  }
]

function populateUsers (done) {
  // TODO: this is failing in test-watch. Investigate it!
  User.remove({})
    .then((res) => {
      const userOne = new User(users[0]).save()
      const userTwo = new User(users[1]).save()
      return Promise.all([userOne, userTwo])
    })
    .then(() => done())
    .catch((e) => {
      console.log(e)
      // E11000 duplicate key error collection:
      // TestDB.users index: email_1 dup key
      done.fail('Could not prepare DB')
    })
}

module.exports = {
  nonAddedUsers,
  users,
  populateUsers
}
