import React, { Component } from 'react'

import {view as CitySelector} from './city-selector/index'
import {view as Weather} from './weather/index'

class App extends Component {
  render () {
    return (
      <div>
        <CitySelector />
        <Weather />
      </div>
    )
  }
}

export default App