import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote as create, vote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(create(content))
  }
  const vote = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
  }

  const cmpVotes = (a, b) => {
    return b.votes - a.votes
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(cmpVotes) && anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}
export default App