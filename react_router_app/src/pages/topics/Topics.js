import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import TopicMenus from './TopicMenus'

import Topic from './Topic'

class Topics extends Component{
  render(){
    let {match} = this.props
    return (
      <div>
        <h5>Topics</h5>
        <TopicMenus match={match} />
        <hr />
        <Route path={`${match.url}/html`} component={Topic}></Route>
        <Route path={`${match.url}/css`} component={Topic}></Route>
        <Route path={`${match.url}/javascript`} component={Topic}></Route>
      </div>
    )
  }
}

export default Topics
