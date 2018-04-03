const request = require('supertest')

const { User } = require('../../models/user')
const server = require('../../server')

const API_URL = '/apiv0/users'

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

describe('POST /users', () => {
  beforeEach((done) => {
    validUser = {
      name: {
        firstName: 'User',
        lastName: 'Valid'
      },
      birthday: new Date(1990, 1, 9).getTime(),
      email: 'testabcd123@test.com',
      password: 'abcd1234'
    }

    // TODO: this is failing in test-watch. Investigate it!
    User.remove({})
      .then((res) => {
        const userOne = new User(seed[0]).save()
        const userTwo = new User(seed[1]).save()
        return Promise.all([userOne, userTwo])
      })
      .then(() => done())
      .catch((e) => {
        console.log(e)
        // E11000 duplicate key error collection:
        // TestDB.users index: email_1 dup key
        done.fail('Could not prepare DB')
      })
  })

  it('returns statusCode 200 with body obj without password field', (done) => {
    request(server)
      .post(API_URL)
      .send(validUser)
      .expect(200)
      .expect((response) => {
        const user = response.body
        expect(user).toBeDefined()
        expect(user.name).toEqual(validUser.name)
        expect(user.birthday).toBe(validUser.birthday)
        expect(user.email).toBe(validUser.email)
        expect(user.password).toBeUndefined()
      })
      .end((err, res) => {
        if (err) return done.fail(err)

        // todo search the database
        done()
      })
  })

  it('fails with statusCode 400 if email is already in use', (done) => {
    request(server)
      .post(API_URL)
      .set('Accept', 'application/json')
      .send(seed[0])
      .expect(400)
      .end((err, res) => {
        if (err) return done.fail(err)

        // todo search the database
        done()
      })
  })

  it('fails with statusCode 400 if email is invalid', (done) => {
    validUser.email = 'nfainofina-f,sa'
    request(server)
      .post(API_URL)
      .send(validUser)
      .expect(400)
      .end((err, res) => {
        if (err) return done.fail(err)

        // todo search the database
        done()
      })
  })

  it('fails with statusCode 400 if birthday is invalid', (done) => {
    validUser.birthday = 'nfainofina-f,sa'
    request(server)
      .post(API_URL)
      .send(validUser)
      .expect(400)
      .end((err, res) => {
        if (err) return done.fail(err)

        // todo search the database
        done()
      })
  })

  it('fails with statusCode 400 if password < 8,', (done) => {
    validUser.password = '1234567'
    request(server)
      .post(API_URL)
      .send(validUser)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)

        // todo search the database
        done()
      })
  })
})
