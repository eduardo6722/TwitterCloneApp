import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './components/pages/login'
import Timeline from './components/pages/timeline'

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/timeline" component={ Timeline } />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App