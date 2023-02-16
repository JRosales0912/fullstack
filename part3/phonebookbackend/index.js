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
    if(findValue(request.params.id))
    {        
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(findValue(id)))
    }
    else {        
        response.writeHead(404, { 'Content-Type': 'text/plain' })
        response.end(` Phonebook has  no info for id ${request.params.id} \n 
        ${(new Date(Date.now())).toUTCString()}`)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    if(findValue(request.params.id))
    {
        delete notes[notes.indexOf(findValue(request.params.id))]  
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end('Contanct delted new phonebook: '+JSON.stringify(notes))
        
    }
    else {        
        response.writeHead(404, { 'Content-Type': 'text/plain' })
        response.end(` Phonebook has  no info for id ${request.params.id} \n 
        ${(new Date(Date.now())).toUTCString()}`)
    }
})

const findValue = (id) => {
    console.log(id)
    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element.id == id){
            return element
        }
    }
    return false
}
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
console.log(`Server running on port ${PORT}`)