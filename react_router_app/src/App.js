import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import routes from './routes'
import Menus from './pages/common/Menus'

class App extends Component{
  render(){
    return (
      <Router>
        <div>
          <Menus />
          <hr />
          <Switch>
            {
              routes.map((route, key) => {
                if(route.exact){
                  return <Route exact key={key} path={route.path} component={route.component} />
                }else{
                  return <Route key={key} path={route.path} component={route.component} />
                }
              })
            }
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App