const blogRouter = require('express').Router()
const blogModel = require('../models/blog')

blogRouter.get('/', (request, response) => {
    blogModel
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogRouter.post('/', (request, response, next) => {
    const blog = new blogModel(request.body)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error =>  {
        next(error)})
  })

  blogRouter.delete('/:id', (request, response, next) => {
    blogModel.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })


  blogRouter.put('/:id', (request, response) => {
    blogModel.findById(request.params.id).then(found =>{
      let newBlog = request.body
      found.likes = newBlog.likes
      blogModel.findByIdAndUpdate(request.params.id, found).then(savedBlog => {
        console.log(savedBlog)
        response.json(savedBlog)
      })
        .catch(error => {
          console.log(error)
          response.status(400).send({ error: 'malformatted id' })
        })
    })
      
  })

  const errorHandler = (error, request, response, next) => {    
    if (error.name === 'ValidationError') {    
      return response.status(401).json({ error: error.message })
    }
    next(error)
  }
  
  blogRouter.use(errorHandler)

module.exports = blogRouter