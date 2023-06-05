import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'


const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
  
    const voteAnecdote = (id) => {
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
                <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList