import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import axios from 'axios'

const App = () => {
 
  const result = useQuery(    
    'notes',    
    () => axios.get('http://localhost:3001/notes')
    .then(res => res.data)
    .catch(er => false))  
  console.log(result)
  if ( result.isLoading ) {
    return <div>loading data...</div> 
  }
  const notes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]

  if(!notes){
    return (
      <div>
        <h3>Anecdote service not available due to problems in the server</h3>
      </div>
    )
  }
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
    
      {result.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
