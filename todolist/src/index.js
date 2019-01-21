import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import TodoApp from './TodoApp'
import store from './Store.js'

import './index.css'

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>, 
  document.getElementById('root')
)
