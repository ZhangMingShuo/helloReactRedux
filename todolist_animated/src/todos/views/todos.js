import React from 'react'
import AddTodo from './addTodo.js'
import TodoList from './todoList.js'

import './style.css'

// 函数可以用来表示无状态组件
export default () => {
  return (
    <div className="todos">
      <AddTodo />
      <TodoList />
    </div>
  )
}