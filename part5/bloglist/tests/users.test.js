const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const user = require('../models/user')
const api = supertest(app)


beforeEach(async () => {  
    await user.deleteMany({}) 
})

describe('First tests ', () =>{
  test('save a new user', async () => {
    await api.post('/api/users').send({
      name:"blog1",
      password:"jhonn",
      username:"user1"
    })
    const response = await api.get('/api/users')

    expect(response.body.length).toBe(1)
  })

  test('post a new user without username', async () => {
    await api.post('/api/users').send({
      name:"blog1",
      password:"jhonn"
    })  
    .expect(400)
    .expect("Ivalid body")
  }, 10000)

  test('post a new user without password', async () => {
    await api.post('/api/users').send({
      name:"blog1",
      username:"jhonn"
    })  
    .expect(400)
    .expect("Ivalid body")
  }, 10000)

  test('username too short', async () => {
    await api.post('/api/users').send({
      name:"blog1",
      password:"jhonn",
      username:"us"
    })
    .expect(400)
    .expect("Username and password must be at least 3 chars long.")
  }, 10000)

  test('password too short', async () => {
    await api.post('/api/users').send({
      name:"blog1",
      password:"jh",
      username:"userrva"
    })
    .expect(400)
    .expect("Username and password must be at least 3 chars long.")
  }, 10000)
  
})

afterAll(async () => {
  await mongoose.connection.close()
})