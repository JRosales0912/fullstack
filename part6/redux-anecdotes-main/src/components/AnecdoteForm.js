import { useDispatch } from "react-redux"
import { createAnecdote as create } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from "../reducers/notificationReducer"


const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create(content))
        dispatch(showNotification(`you created a new anecdote '${content}'`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new: </h2>
            <form onSubmit={add}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
