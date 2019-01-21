import * as ActionTypes from './ActionTypes'

//Redux中每个action构造函数都返回一个action对象
//Flux中action构造函数并不返回什么,而是把构造函数的动作函数立刻通过调用Dispatcher的dispatch函数派发出去
export const increment = (counterCaption)=>{
  return {
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  }
}

export const decrement = (counterCaption)=>{
  return {
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  }
}



