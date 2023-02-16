const { request, response } = require('express')
const express = require('express')
const app = express()

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})

app.get('/info', (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(` Phonebook has info for ${notes.length} people \n 
    ${(new Date(Date.now())).toUTCString()}`)
  
})

app.get('/api/persons/:id', (request, response) => {
    if(notes[request.params.id])
    {        
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(notes[request.params.id]))
    }
    else {        
        response.writeHead(404, { 'Content-Type': 'text/plain' })
        response.end(` Phonebook has  no info for id ${request.params.id} \n 
        ${(new Date(Date.now())).toUTCString()}`)
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
console.log(`Server running on port ${PORT}`)