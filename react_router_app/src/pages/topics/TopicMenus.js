import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class TopicMenus extends Component {
  render(){
    let {match} = this.props
    return (
      <ul>
        <li><Link to={`${match.url}/html`}>Base of HTML</Link></li>
        <li><Link to={`${match.url}/css`}>Base of CSS</Link></li>
        <li><Link to={`${match.url}/javascript`}>Base of JavaScript</Link></li>
      </ul>
    )
  }
}

export default TopicMenus