import { Component } from 'react'
import PropTypes from 'prop-types'

class Provider extends Component {
  //getChildContext函数返回的就是代表Context的对象
  getChildContext(){
    return {
      store: this.props.store
    }
  }
  render(){
    // this.props.children代表的就是两个Provider标签之间的子组件
    return this.props.children
  }
}

Provider.propTypes = {
  store: PropTypes.object.isRequired
}

//让React认可Provider为一个Context的提供者
Provider.childContextTypes = {
  store: PropTypes.object
}

export default Provider