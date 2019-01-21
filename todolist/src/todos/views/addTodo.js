import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {addTodo} from '../actions.js'

class AddTodo extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      value: ''
    }
  }
  onSubmit(ev){
    // form表单提交的默认行为会引发网页跳转
    ev.preventDefault()
    const inputValue = this.state.value
    if(!inputValue.trim()){
      return
    }
    this.props.onAdd(inputValue)
    this.setState({value: ''})
  }
  onInputChange(ev){
    this.setState({
      value: ev.target.value
    })
  }
  render(){
    return (
      <div className="add-todo">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input className="new-todo" onChange={this.onInputChange.bind(this)} value={this.state.value}/>
          <button className="add-btn" type="submit">添加</button>
        </form>
      </div>
    )
  }
}

AddTodo.propTypes = {
  onAdd: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (text) => {
      dispatch(addTodo(text))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddTodo)