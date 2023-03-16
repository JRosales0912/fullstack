const mongoose = require('mongoose')
const supertest = require('supertest')
const { options } = require('../app')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)

const blogs  = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: "6412f48568e495d385294956",
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      user: "6412f48568e495d385294956",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      user: "6412f48568e495d385294956",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      user: "6412f48568e495d385294956",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      user: "6412f48568e495d385294956",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      user: "6412f48568e495d385294956",
      likes: 2,
      __v: 0
    }  
]

beforeEach(async () => {  
    await blog.deleteMany({})  
    let blogObject = new blog(blogs[0])  
    await blogObject.save()
    blogObject = new blog(blogs[1])
    await blogObject.save()
})

describe('First tests ', () =>{ 
  test('blogs are returned as json', async () => {
      const response = await api.get('/api/blogs')
      
      expect(response.body.length).toEqual(2)
  })


  test('blogs have id', async () => {
    const response = await api.get('/api/blogs')
    
    expect(response.body[0].id).toBeDefined()
  })

  test('post a new blog', async () => {
    await api.post('/api/blogs')
    .send(blogs[2])
    .auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2NDEyZjQ4NTY4ZTQ5NWQzODUyOTQ5NTYiLCJpYXQiOjE2Nzg5NjY1NjR9.vTP1NIDFULbsFNErtIqJq_ECWw2Q51qckJ6QzIV0xtU", 
    {type: "bearer"}
    )
                  
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(3)
  })

  test('post a new blogwithout token', async () => {
    await api.post('/api/blogs')
    .send(blogs[2])
    .expect(401)
  })
  test('post a new blog without likes', async () => {
    await api.post('/api/blogs').send({
      title: "Without likes",
      author: "no likes",
      url: "https://reactpatterns.com/"
    }).auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2NDEyZjQ4NTY4ZTQ5NWQzODUyOTQ5NTYiLCJpYXQiOjE2Nzg5NjY1NjR9.vTP1NIDFULbsFNErtIqJq_ECWw2Q51qckJ6QzIV0xtU", 
    {type: "bearer"}
    )
    .expect(201)
    .expect('Content-Type', /application\/json/)
      
    const response = await api.get('/api/blogs')
    const blogentry = response.body.find(element => element.author === 'no likes')
    expect(blogentry.likes).toEqual(0)
  }, 10000)

  test('post a new blog without url', async () => {
    await api.post('/api/blogs').send({
      title: "Without url",
      author: "no url",
      likes: 100
    }).auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2NDEyZjQ4NTY4ZTQ5NWQzODUyOTQ5NTYiLCJpYXQiOjE2Nzg5NjY1NjR9.vTP1NIDFULbsFNErtIqJq_ECWw2Q51qckJ6QzIV0xtU", 
    {type: "bearer"}
    )
    .expect(401)

  }, 10000)


  test('post a new blog without title', async () => {
    await api.post('/api/blogs').send({
      author: "no title",
      url: "https://reactpatterns.com/",
      likes: 100
    }).auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2NDEyZjQ4NTY4ZTQ5NWQzODUyOTQ5NTYiLCJpYXQiOjE2Nzg5NjY1NjR9.vTP1NIDFULbsFNErtIqJq_ECWw2Q51qckJ6QzIV0xtU", 
    {type: "bearer"}
    )  
    .expect(401)

  }, 10000)
})


describe('Delete tests ', () =>{
  test('delte blog', async () => {
    const beforeresp = await api.get('/api/blogs')
    await api.delete('/api/blogs/'+blogs[0]._id)
    .auth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2NDEyZjQ4NTY4ZTQ5NWQzODUyOTQ5NTYiLCJpYXQiOjE2Nzg5NjY1NjR9.vTP1NIDFULbsFNErtIqJq_ECWw2Q51qckJ6QzIV0xtU", 
    {type: "bearer"}
    )
    .expect(204)
    const afterrespo = await api.get('/api/blogs')
    expect(beforeresp.body.length).toBeGreaterThan(afterrespo.body.length)
  })
 }, 10000)


describe('Update tests ', () =>{
test('update blog', async () => {
  const newlikes = 149
  await api.put('/api/blogs/'+blogs[0]._id)
  .send({
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: newlikes,
    __v: 0
  },)
  const afterrespo = await api.get('/api/blogs')
  expect(afterrespo.body[0].id).toEqual(blogs[0]._id)
  expect(afterrespo.body[0].likes).toEqual(newlikes)
})
}, 10000)

afterAll(async () => {
  await mongoose.connection.close()
})