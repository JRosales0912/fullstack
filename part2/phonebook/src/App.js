import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Services from './Services'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  
  const [phone, setPhone] = useState('')

  const [personsToShow, setPTS] = useState(persons)
  
  const addName = (event) => {
    event.preventDefault()
    if(newName!==""){
      if(persons.find(e => e.name ===  newName)){
        alert(`${newName} is already added to phonebook`)
      } else {
        Services.create({name: newName, number:phone, id:persons.length+1})
        setPersons(persons.concat({id:persons.length+1, name: newName, number: phone}))
        setNewName("")
        setPhone("")
        Services.getAll()
          .then(all => {
            console.log(all)
            setPTS(all.data)
          })
          .catch(error => {
            console.log('fail')
          })
      }
    }
    // console.log('button clicked', event.target)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setPTS(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} phone={phone} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App