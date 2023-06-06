import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
    addAnecdote(state, action) {
      state.push(action.payload)
    }, 
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer