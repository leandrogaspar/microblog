const request = require('supertest')

const { nonAddedUsers, users, populateUsers } = require('../seed/users.seed')
const server = require('../../server')

const API_URL = '/apiv0/users/login'

describe('POST /users/login', () => {
  beforeEach(populateUsers)

  it('when sucessfull returns the token on header and user on body', (done) => {
    const validUser = users[0]
    const requestBody = {
      email: validUser.email,
      password: validUser.password
    }
    request(server)
      .post(API_URL)
      .send(requestBody)
      .expect(200)
      .expect((response) => {
        const user = response.body
        expect(response.headers['x-auth']).toBeTruthy()
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

  it('login fails if user doesnt exists', (done) => {
    const validUser = nonAddedUsers[0]
    const requestBody = {
      email: validUser.email,
      password: validUser.password
    }
    request(server)
      .post(API_URL)
      .send(requestBody)
      .expect(401)
      .expect((response) => {
        expect(response.headers['x-auth']).toBeUndefined()
      })
      .end((err, res) => {
        if (err) return done.fail(err)

        // todo search the database
        done()
      })
  })

  it('login fails when using the wrong password', (done) => {
    const validUser = users[0]
    const requestBody = {
      email: validUser.email,
      password: validUser.password + ' '
    }
    request(server)
      .post(API_URL)
      .send(requestBody)
      .expect(401)
      .expect((response) => {
        expect(response.headers['x-auth']).toBeUndefined()
      })
      .end((err, res) => {
        if (err) return done.fail(err)

        // todo search the database
        done()
      })
  })

  it('login fails when using the wrong email', (done) => {
    const validUser = users[0]
    const requestBody = {
      email: validUser.email + 'abcd',
      password: validUser.password
    }
    request(server)
      .post(API_URL)
      .send(requestBody)
      .expect(401)
      .expect((response) => {
        expect(response.headers['x-auth']).toBeUndefined()
      })
      .end((err, res) => {
        if (err) return done.fail(err)

        // todo search the database
        done()
      })
  })

  it('login fails if email is not sent', (done) => {
    const requestBody = { password: 'abcd1234' }
    request(server)
      .post(API_URL)
      .send(requestBody)
      .expect(400)
      .expect((response) => {
        expect(response.headers['x-auth']).toBeUndefined()
      })
      .end((err, res) => {
        if (err) return done.fail(err)

        done()
      })
  })

  it('login fails if password is not sent', (done) => {
    const requestBody = { email: 'abcd1234' }
    request(server)
      .post(API_URL)
      .send(requestBody)
      .expect(400)
      .expect((response) => {
        expect(response.headers['x-auth']).toBeUndefined()
      })
      .end((err, res) => {
        if (err) return done.fail(err)

        done()
      })
  })
})
