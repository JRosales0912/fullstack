const blogRouter = require('express').Router()
const blogModel = require('../models/blog')

blogRouter.get('/api/blogs', (request, response) => {
    blogModel
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/api/blogs', (request, response, next) => {
    const blog = new blogModel(request.body)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error =>  {
        next(error)})
  })

  const errorHandler = (error, request, response, next) => {    
    if (error.name === 'ValidationError') {    
      return response.status(401).json({ error: error.message })
    }
    
    next(error)
  }
  
  blogRouter.use(errorHandler)

module.exports = blogRouter