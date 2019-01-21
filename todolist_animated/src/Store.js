import {createStore, combineReducers} from 'redux'
import todoReducer from './todos/reducer.js'
import filterReducer from './filter/reducer.js'

const reducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer
})

export default createStore(reducer, {})