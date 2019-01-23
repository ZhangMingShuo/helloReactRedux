import {createStore, combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

const reducer = combineReducers({
  routing: routerReducer
})
const initialState = {}
export default createStore(reducer, initialState)