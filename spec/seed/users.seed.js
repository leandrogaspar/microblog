const { User } = require('../../models/user')

const nonAddedUsers = [
  {
    name: {
      firstName: 'First',
      lastName: 'Lastname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'john.lastname@test.com',
    password: 'abcd1234'
  },
  {
    name: {
      firstName: 'Second',
      lastName: 'Lastname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'john.lastname@test.com',
    password: 'abcd1234'
  },
  {
    name: {
      firstName: 'Third',
      lastName: 'Lastname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'john.lastname@test.com',
    password: 'abcd1234'
  },
  {
    name: {
      firstName: 'Fourth',
      lastName: 'Lastname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'john.lastname@test.com',
    password: 'abcd1234'
  }
]

const users = [
  {
    name: {
      firstName: 'Firstname',
      lastName: 'Lasname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'firstname.lastname@test.com',
    password: 'abcd1234'
  },
  {
    name: {
      firstName: 'Another',
      lastName: 'Lastname'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'another.lastname@test.com',
    password: 'YMcd1!msfnaosafl'
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
