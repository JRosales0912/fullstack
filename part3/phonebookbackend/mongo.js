
const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =`mongodb+srv://javier:${password}@cluster0.swu7qsd.mongodb.net/phonebookdb?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


const phSchema = new mongoose.Schema({ 
  name: String,
  number: String,
})

const Phonebook = mongoose.model('phonebookcollection', phSchema)

if(!name){
    Phonebook.find().then(res => { 
        console.log(res)
        mongoose.connection.close()
        process.exit(1)
    });
  }

const ph = new Phonebook({
  name: name,
  number: number,
})

ph.save().then(result => {
  console.log('phone contact saved!')
  mongoose.connection.close()
})