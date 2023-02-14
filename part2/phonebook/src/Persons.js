const Persons = (props) => {
  return (
    <ul> 
    {props.personsToShow.map(person =>
      <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.DeleteUser(person.id, person.name)}>Delete</button>
      </li>)}
    </ul>
   )
}

export default Persons