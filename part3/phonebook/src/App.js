import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Services from './Services'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  
  const [phone, setPhone] = useState('')
  
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  const [personsToShow, setPTS] = useState(persons)
  

  const showNotification = (name) => {
    setNotification(`Added ${name}`)
    setTimeout(() => {setNotification(null)}, 5000)
  }

  const showError = (name) => {
    setError(`Information of ${name} has already been removed from server`)
    setTimeout(() => {setError(null)}, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    let id = -1;
    if(newName!==""){
      let found = personsToShow.find(e => e.name ===  newName)
      if(found && found !== -1){
        console.log(found)
        if(window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)){
          id = updatePTS()
          Services.update(found.name, phone, found.id)
          .then( res => {
                id = updatePTS()
                showNotification(found.name)
              })
          .catch(error => {
            console.log(error)
            showError(found.name)
          })
        }
      } else {
        let id = updatePTS()
          Services.create([{name: newName, number:phone}])
          .then( res => {
                id = updatePTS()
                showNotification(newName)
              })
          .catch(error => {
            console.log(error.response.data.error)
            showError(error.response.data.error)
          }) 
      }      
      setPersons(persons.concat({id:id, name: newName, number: phone}))
      setNewName("")
      setPhone("")
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
      <Notification message={notification}/>
      <Error message={error}/>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} phone={phone} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} DeleteUser={DeleteUser}/>
    </div>
  )
}

export default App