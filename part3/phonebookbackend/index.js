const { request, response } = require('express')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const phonebookdb = require('./models/mongo')
require('dotenv').config()
const app = express()
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.static('build'));
app.use(morgan("",':method :url :status :res[content-length] - :response-time ms - :body'));

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
    phonebookdb.find().then(res => { 
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(res))
    });
})

app.post('/api/persons', (request, response) => {
    let newPerson = request.body
    const isAlreadyThere = findValueByName(newPerson[0].name)
    if(newPerson[0] && newPerson[0].name && newPerson[0].number && !isAlreadyThere) {
        const id = Math.floor(Math.random() * 999999);

        const newP = new phonebookdb({name:newPerson[0].name, number:newPerson[0].number})
        newP.save().then(savedPhone => {
            response.json(savedPhone)
        })
    } else if(isAlreadyThere){
        const filter = { name: isAlreadyThere.name };
        isAlreadyThere.number = newPerson[0].number
        phonebookdb.findOneAndUpdate(filter, isAlreadyThere);
        response.json(isAlreadyThere)
    }
    else{
        response.writeHead(400, { 'Content-Type': 'text/plain' })
        response.end(` Invalid body ${JSON.stringify(newPerson)} or already existing name \n 
        ${(new Date(Date.now())).toUTCString()}`)
    }
})

app.get('/info', (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(` Phonebook has info for ${notes.length} people \n 
    ${(new Date(Date.now())).toUTCString()}`)
  
})

app.get('/api/persons/:id', (request, response) => {
    phonebookdb.findById(request.params.id)
    .then(phoneContanct => {
      if (phoneContanct) {
        response.json(phoneContanct)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    phonebookdb.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
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

const findValueByName = (name) => {
    phonebookdb.findOne({ name: name }).exec()
    .then(phoneContanct => {
      if (phoneContanct) {
        return phoneContanct
      } else {
        return false
      }
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
    })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
console.log(`Server running on port ${PORT}`)