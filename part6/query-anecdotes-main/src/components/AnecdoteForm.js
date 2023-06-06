import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const AnecdoteForm = () => {

  const createAnecdote = newAnecdote =>  
    axios.post(baseUrl, newAnecdote).then(res => res.data)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createAnecdote(content)
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, important: true })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
