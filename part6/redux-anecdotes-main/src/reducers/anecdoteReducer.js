import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const changed = state.find(anecdote => anecdote.id === id)
      const newAnecdote = {
        ...changed,
        votes: changed.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    }, 
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer