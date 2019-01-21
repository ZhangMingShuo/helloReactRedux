import {EventEmitter} from 'events'
import * as ActionTypes from '../ActionTypes'
import AppDispatcher from '../AppDispatcher'

const CHANGE_EVENT = 'changed'

const counterValues = {
  'First': 0,
  'Second': 10,
  'Third': 30
}

const CounterStore = Object.assign({},EventEmitter.prototype, {
  getCounterValues: function(){
    return counterValues
  },
  //emit->广播事件
  emitChange: function(){
    this.emit(CHANGE_EVENT)
  },
  //on->增加挂在这个emit事件上的处理函数
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },
  //removeListener->删除挂在这个emit事件上的处理函数
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  }
})

//将CounterStore注册到全局唯一的 Dispatcher 上
//当通过register函数把一个回调函数注册到Dispatcher之后,所有派发给Dispatcher的action对象都会传递到这个回调函数中来
//例如通过Dispatcher派发一个动作
// AppDispatcher.dispatch({
//   type: ActionTypes.INCREMENT,
//   counterCaption: 'First'
// })
// 此时, 在CounterStore中注册的回调函数就会被调用
// AppDispatcher.register函数返回值是一个token,用于Store之间的同步(SummaryStore中有用到)
CounterStore.dispatchToken = AppDispatcher.register(action=>{
  if(action.type===ActionTypes.INCREMENT){
    counterValues[action.counterCaption]++
    CounterStore.emitChange()
  }else if(action.type===ActionTypes.DECREMENT){
    counterValues[action.counterCaption]--
    CounterStore.emitChange()
  }
})

export default CounterStore