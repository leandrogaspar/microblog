const request = require('supertest')

const { nonAddedUsers, users, populateUsers } = require('../seed/users.seed')
const server = require('../../server')

const API_URL = '/apiv0/users/'

describe('GET /users/:id', () => {
  beforeEach(populateUsers)

  it('when sucessfull returns the user on the body', (done) => {
    const validUser = users[0]
    request(server)
      .get(API_URL + validUser._id)
      .set('x-auth', validUser.tokens[0])
      .send('oi')
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

        done()
      })
  })

  it('if the user is not found the status code must be 404', (done) => {
    const addedUser = users[0]
    const validUser = nonAddedUsers[0]
    request(server)
      .get(API_URL + validUser._id)
      .set('x-auth', addedUser.tokens[0])
      .send('oi')
      .expect(404)
      .expect((response) => {
        const user = response.body
        expect(user.name).toBeUndefined()
        expect(user.birthday).toBeUndefined()
        expect(user.email).toBeUndefined()
        expect(user.password).toBeUndefined()
      })
      .end((err, res) => {
        if (err) return done.fail(err)

        done()
      })
  })
})
