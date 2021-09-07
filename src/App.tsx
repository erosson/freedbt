import './App.css'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

// import DBMemory from './DB/Memory'
import DBDexie from './DB/Dexie'
import * as Routes from './Routes'

function Main() {
  return (
      // <DBMemory routes={Routes.routes} />
    <Router>
      <DBDexie routes={Routes.routes} />
    </Router>
  )
}

export default Main;
