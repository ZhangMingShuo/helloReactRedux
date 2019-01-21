import React, { Component } from 'react'
import {view as Todos} from './todos/index.js'
import {view as Filter} from './filter'

const appStyle = {
  'backgroundColor': 'rgb(116,142,195)'
}

class TodoApp extends Component {
  render() {
    return (
      <div style={appStyle}>
        <Todos />
        <Filter />
      </div>
    )
  }
}

export default TodoApp
