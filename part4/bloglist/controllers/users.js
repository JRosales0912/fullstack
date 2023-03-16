const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(!username || !password){
    response.status(400).send("Ivalid body")
    return
  }
  if(username.length < 3 || password.length < 3){
    response.status(400).send("Username and password must be at least 3 chars long.")
    return
  }
  if(await User.findOne({'username': username}).exec()){
    response.status(400).send("Username already in use.")
    return
  }

  const saltRounds = 12
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    User
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

module.exports = usersRouter