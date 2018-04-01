const axios = require('axios')

const { User } = require('../models/user')

require('../app')

const API_URL = 'http://localhost:3000/apiv0/users'

var validUser
const seed = [
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

beforeEach(() => {
  validUser = {
    name: {
      firstName: 'User',
      lastName: 'Valid'
    },
    birthday: new Date(1990, 1, 9).getTime(),
    email: 'testabcd123@test.com',
    password: 'abcd1234'
  }
})

describe('POST /users', () => {
  it('POST /users returns statusCode 200 with user on body witouth password field', (done) => {
    axios.post(API_URL, validUser)
      .then((response) => {
        const user = response.data
        expect(user.name).toEqual(validUser.name)
        expect(user.birthday).toBe(validUser.birthday)
        expect(user.email).toBe(validUser.email)
        expect(user.password).toBeUndefined()
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

  it('POST /users fails with statusCode 400 if email is invalid', (done) => {
    validUser.email = 'nfainofina-f,sa'.birthday = 'nfainofina-f,sa'
    axios.post(API_URL, validUser)
      .then((response) => {
        done().fail(response)
      })
      .catch((e) => {
        expect(e.response.status).toBe(400)
        done()
      })
  })

  it('POST /users fails with statusCode 400 if birthday is invalid', (done) => {
    validUser.birthday = 'nfainofina-f,sa'
    axios.post(API_URL, validUser)
      .then((response) => {
        done().fail(response)
      })
      .catch((e) => {
        expect(e.response.status).toBe(400)
        done()
      })
  })

  it('POST /users fails with statusCode 400 if password is smaller then 8,', (done) => {
    validUser.password = '1234567'
    axios.post(API_URL, validUser)
      .then((response) => {
        done().fail(response)
      })
      .catch((e) => {
        expect(e.response.status).toBe(400)
        done()
      })
  })
})
