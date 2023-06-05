import { useDispatch } from "react-redux"
import { createAnecdote as create } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create(content))
    }

    return (
        <form onSubmit={add}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm
