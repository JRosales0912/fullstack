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
        let id = updatePTS()
          Services.create({name: newName, number:phone, id:id})
          .then( res => {
                id = updatePTS()
              })
          .catch(error => {
            console.log('fail')
          })
        setPersons(persons.concat({id:id, name: newName, number: phone}))
        setNewName("")
        setPhone("")
        
      }
    }
    // console.log('button clicked', event.target)
  }

  const updatePTS = () =>{
    Services.getAll()
          .then(all => {
            console.log(all)
            setPTS(all.data)
            return all.data.length + 1
          })
          .catch(error => {
            console.log('fail')
          })
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    Services.getAll()
          .then(all => {
            console.log(all)
            let p = all.data
            setPTS(p.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
            return all.data.length + 1
          })
          .catch(error => {
            console.log('fail')
          })
  }
  
  const DeleteUser = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      Services.deleteUser(id)
      .then(e => {updatePTS()})
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} phone={phone} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} DeleteUser={DeleteUser}/>
    </div>
  )
}

export default App