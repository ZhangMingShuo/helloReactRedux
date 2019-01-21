import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CounterStore from '../stores/CounterStore'
import * as Actions from '../Actions'

const buttonStyle = {
  margin: '10px'
}

class Counter extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: CounterStore.getCounterValues()[props.caption]
    }
  }
  onClickIncrementButton(){
    Actions.increment(this.props.caption)
  }
  onClickDecrementButton(){
    Actions.decrement(this.props.caption)
  }
  componentDidMount(){
    CounterStore.addChangeListener(this.onChange.bind(this))
  }
  componentWillUnmount(){
    CounterStore.removeChangeListener(this.onChange.bind(this))
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   return (nextProps.caption !== this.props.caption) || (nextState.count !== this.state.count)
  // }
  onChange(){
    const newCount = CounterStore.getCounterValues()[this.props.caption]
    this.setState({count: newCount})
  }
  render(){
    const {caption} = this.props
    return(
      <div>
        <button style={buttonStyle} onClick={this.onClickIncrementButton.bind(this)}>+</button>
        <button style={buttonStyle} onClick={this.onClickDecrementButton.bind(this)}>-</button>
        <span>{caption} count: {this.state.count}</span>
      </div>
    )
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired
}

export default Counter