const request = require('supertest')

const { nonAddedUsers, users, populateUsers } = require('../seed/users.seed')
const server = require('../../server')

const API_URL = '/apiv0/users'

describe('POST /users', () => {
  beforeEach(populateUsers)

  it('returns statusCode 200 with body obj without password field', (done) => {
    const validUser = nonAddedUsers[0]
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
      .send(users[0])
      .expect(400)
      .end((err, res) => {
        if (err) return done.fail(err)

        // todo search the database
        done()
      })
  })

  it('fails with statusCode 400 if email is invalid', (done) => {
    const validUser = nonAddedUsers[1]
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
    const validUser = nonAddedUsers[2]
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
    const validUser = nonAddedUsers[3]
    validUser.password = '1234567'
    validUser.email = 'test@test.com'
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
