/* 
reducer函数往往就是一个以action.type为条件的switch语句构成
这里使用es6的...操作符来更新数组,不能使用push和unshift,这两个方法会改变原来的数组
reducer是个纯函数,不能有任何副作用,不能修改参数对象
*/

import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO} from './actionTypes.js'

export default (state=[], action) => {
  switch (action.type) {
    case ADD_TODO: {
      return [
        {
          id: action.id,
          text: action.text,
          completed: false
        },
        ...state
      ]
    }
    case TOGGLE_TODO: {
      return state.map(todoItem => {
        if(todoItem.id===action.id){
          return {...todoItem, completed: !todoItem.completed}
        }else {
          return todoItem
        }
      })
    }
    case REMOVE_TODO: {
      return state.filter(todoItem=>{
        return todoItem.id !== action.id
      })
    }
    default: {
      return state
    }
  }
}