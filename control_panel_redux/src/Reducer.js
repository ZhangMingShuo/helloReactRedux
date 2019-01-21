import * as ActionTypes from './ActionTypes'

export default (state, action)=>{
  const {counterCaption} = action

  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {...state, [counterCaption]: state[counterCaption] + 1}
      /* 相当于下面的代码
      不会修改state本身的值,因为reducer是一个纯函数,不产生副作用,
      const newState = Object.assign({}, state)
      newState[counterCaption] ++
      return newState */
    case ActionTypes.DECREMENT:
      return {...state, [counterCaption]: state[counterCaption] - 1}
    default:
      return state
  }
}