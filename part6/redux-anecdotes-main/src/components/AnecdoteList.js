import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from "../reducers/notificationReducer"


const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => {    
        if (state.filter === '' ) {
            return state.anecdotes
        }
        else{
            return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }   
    })
    const anecdotesArray = [...anecdotes]
    const dispatch = useDispatch()
  
    const voteAnecdote = (anecdote) => {
      dispatch(incrementVote(anecdote))
      dispatch(showNotification(`you voted '${anecdote.content}'`))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    }
  
    const cmpVotes = (a, b) => {
      return b.votes - a.votes
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotesArray.sort(cmpVotes) && anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => voteAnecdote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList