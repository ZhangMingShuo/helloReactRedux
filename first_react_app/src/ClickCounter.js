import React, {Component} from 'react'
//Component是所有组件的基类
//这里虽然引入的React没有直接被使用,但是却是不可缺少的,因为 JSX 最终会被转义成依赖React的表达式

class ClickCounter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  onClickButton(){
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.onClickButton.bind(this)}>Click Me</button>
        <div>Click Count: {this.state.count}</div>
      </div>
    )
  }
}

export default ClickCounter