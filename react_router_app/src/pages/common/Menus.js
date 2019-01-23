import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Menus extends Component{
  render(){
    return (
      <header>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
          <li><Link to="*">404</Link></li>
        </ul>
      </header>
    )
  }
}

export default Menus