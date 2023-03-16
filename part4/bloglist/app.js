const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


const blogRtr = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

app.use("/api/users", usersRouter)
app.use("/api/blogs" , blogRtr)

module.exports = app