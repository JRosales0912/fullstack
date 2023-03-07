const blogRouter = require('express').Router()
const blogModel = require('../models/blog')

blogRouter.get('/api/blogs', (request, response) => {
    blogModel
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/api/blogs', (request, response) => {
    const blog = new blogModel(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })


module.exports = blogRouter