const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


const blogRtr = require('./controllers/blogs')
app.use('/' , blogRtr)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})