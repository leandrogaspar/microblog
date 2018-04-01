const axios = require('axios')

const {User} = require('../models/user')

require('../app')

const API_URL = 'http://localhost:3000/apiv0/users'

const seed = [
  {
    name: {
      firstName: 'Firstname',
      lastName: 'Lasname'
    },
    birthday: new Date('06/03/1989').getUTCMilliseconds(),
    email: 'firstname.lastname@test.com',
    password: 'abcd1234'
  },
  {
    name: {
      firstName: 'Another',
      lastName: 'Lastname'
    },
    birthday: new Date('06/03/1993').getUTCMilliseconds(),
    email: 'another.lastname@test.com',
    password: 'YMcd1!msfnaosafl'
  }
]

const validUser = {
  name: {
    firstName: 'Leandro',
    lastName: 'Gaspar'
  },
  birthday: new Date('06/03/1993').getUTCMilliseconds(),
  email: 'testabcd123@test.com',
  password: 'abcd1234'
}

async function seedUsers () {
  await User.remove({})
  await User.insertMany(seed)
}

beforeEach((done) => {
  seedUsers()
    .then(() => {
      done()
    })
    .catch((e) => {
      done.fail(e)
    })
})

describe('users route', () => {
  it('POST /users', (done) => {
    axios.post(API_URL, validUser)
      .then((response) => {
        const user = response.data
        expect(user.name).toEqual(validUser.name)
        expect(user.birthday).toBe(validUser.birthday)
        expect(user.email).toBe(validUser.email)
        done()
      })
      .catch((e) => {
        done.fail(e)
      })
  })

  it('POST /users fails with statusCode 400 if email is already in use', (done) => {
    axios.post(API_URL, seed[0])
      .then((response) => {
        done().fail(response)
      })
      .catch((e) => {
        expect(e.response.status).toBe(400)
        done()
      })
  })
})
