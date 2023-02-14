import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const [phone, setPhone] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    if(newName!==""){
      if(persons.find(e => e.name ===  newName)){
        alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat({name: newName, number: phone}))
        setNewName("")
        setPhone("")
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} 
            onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={phone} 
            onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>
              {person.name} {person.number}
          </li>)}
      </ul>
    </div>
  )
}

export default App