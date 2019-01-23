import React, {Component} from 'react'

class Topic extends Component {
  render(){
    let {match} = this.props
    return <p>{match.path}</p>
  }
}

export default Topic
