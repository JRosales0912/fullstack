const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use((request, response, next)=>{
    const authorization = request.get('authorization')  
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')  
        request.user = jwt.verify(request.token, process.env.SECRET)
    } else{
        request.token = null
        request.user = false
    }
    next()
})

const blogRtr = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use('/api/login', loginRouter)
app.use("/api/users", usersRouter)
app.use("/api/blogs" , blogRtr)

module.exports = app