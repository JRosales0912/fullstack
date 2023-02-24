
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {    
    console.log('connected to MongoDB')  
  })  
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message)
  })


const phSchema = new mongoose.Schema({ 
  name: {    type: String,    minLength: 3,    required: true  },
  number: {
    type: String,
    minLength: 3,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{7}/.test(v) || /\d{3}-\d{6}/.test(v);
      },
      message: props => `The phone ${props.value} is not in the correct format.`
    },
    required: [true, 'User phone number required']
  },
})

phSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('phonebookcollections', phSchema)