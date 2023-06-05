import { configureStore, combineReducers} from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const rootReducer = combineReducers({  
    anecdotes: anecdoteReducer,  
    notifications: notificationReducer,
    filter: filterReducer
})

const store = configureStore({
    reducer: rootReducer,
  });

export default store  