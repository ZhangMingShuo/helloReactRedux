import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Actions from '../Actions'

const buttonStyle = {
  margin: '10px'
}

class Counter extends Component {
  render(){
    const {caption, onIncrement, onDecrement, value} = this.props

    return (
      <div>
        <button style={buttonStyle} onClick={onIncrement}>+</button>
        <button style={buttonStyle} onClick={onDecrement}>-</button>
        <span>{caption} count: {value}</span>
      </div>
    )
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

class CounterContainer extends Component {
  constructor(props, context){
    super(props, context)

    this.onIncrement = this.onIncrement.bind(this)
    this.onDecrement = this.onDecrement.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getOwnState = this.getOwnState.bind(this)

    this.state = this.getOwnState()
  }

  getOwnState(){
    return {
      value: this.context.store.getState()[this.props.caption]
    }
  }

  onIncrement(){
    //派发事件,导致state tree发生改变,会触发注册的事件
    this.context.store.dispatch(Actions.increment(this.props.caption))
  }
  onDecrement(){
    this.context.store.dispatch(Actions.decrement(this.props.caption))
  }

  componentDidMount(){
    //注册store tree发生改变的监听事件
    this.context.store.subscribe(this.onChange)
  }
  componentWillUnmount(){
    this.context.store.unsubscribe(this.onChange)
  }
  onChange(){
    this.setState(this.getOwnState())
  }

  render(){
    return <Counter caption={this.props.caption}
                    onIncrement={this.onIncrement}
                    onDecrement={this.onDecrement}
                    value={this.state.value}/>
  }
}

CounterContainer.propTypes = {
  caption: PropTypes.string.isRequired
}

CounterContainer.contextTypes = {
  store: PropTypes.object
}

export default CounterContainer