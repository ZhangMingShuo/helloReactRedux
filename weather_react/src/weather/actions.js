import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes'
import { isPromise } from 'q';

/* 
redux-thunk会检查action对象是不是函数,如果不是函数就放行
如果是函数,就执行函数,并把Store的dispatch函数和getState函数作为参数传递到函数中去
此时对函数的结果再dispatch派发action对象,此时就是普通派发不会被redux-thunk拦截,改变Redux Store状态改变
*/

export const fetchWeatherStarted = () => ({
  type: FETCH_STARTED
})
export const fetchWeatherSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})
export const fetchWeatherFailure = (error) => ({
  type: FETCH_FAILURE,
  error
})
export const fetchWeather = (cityCode) => {
  return (dispatch) => {
    const apiUrl = `/data/cityCode/${cityCode}.html`
    dispatch(fetchWeatherStarted())
    fetch(apiUrl).then(res=>{
      if(res.status!==200){
        throw new Error(`Fail to get response with status ${res.status}`)
      }
      res.json().then(resData=>{
        dispatch(fetchWeatherSuccess(resData.weatherinfo))
      }).catch(err=>{
        console.log(err)
        throw new Error(`Invalid json response ${err}`)
      })
    }).catch(err=>{
      dispatch(fetchWeatherFailure(err))
    })
  }
}

// export default function promiseMiddleware({dispatch}){
//   return (next)=>(action)=>{
//     const {types, promise, ...rest} = action
//     if(!isPromise(promise)||!(action.types&&action.types.length===3)){
//       return next(action)
//     }
//     const [PENDING, DONE, FAIL] = types
//     dispatch({...rest, type: PENDING})
//     return action.promise.then(
//       (result)=>dispatch({...rest, result, type: DONE}),
//       (error)=>dispatch({...rest, error, type: FAIL})
//     )
//   }
// }