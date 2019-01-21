import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import TodoItem from './todoItem.js'
import {selectVisibleTodos} from '../selector.js'

const TodoList = ({todos})=>{
  return (
    <ul className="todo-list">
    {
      todos.map(item=>(
        <TodoItem 
          key={item.id}
          id={item.id}
          text={item.text}
          completed={item.completed}
        />
      ))
    }
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
}

const mapStateToProps = (state)=>{
  //根据Store上的filter状态决定todos状态上取哪些元素来显示
  // console.log(state)->{todos: [xxx], filter: xxx}
  return {
    todos: selectVisibleTodos(state)
  }
}

export default connect(mapStateToProps)(TodoList)