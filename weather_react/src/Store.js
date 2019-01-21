import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {reducer as weatherReducer} from './weather/index'

const reducer = combineReducers({
  weather: weatherReducer
})

const middlewares = [thunkMiddleware]

/* 开发环境下还可以引入其他辅助开发的中间件 */
// if(process.env.NODE_ENV !== 'production'){
//   // middlewares.push(require('xxxx'))
// }

const storeEnhancers = compose(applyMiddleware(...middlewares))

export default createStore(reducer, {}, storeEnhancers)