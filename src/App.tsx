import './App.css'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import * as Model from './Model'

import DBMemory from './DB/Memory'
import DBDexie from './DB/Dexie'

import PageNotFound from './Page/NotFound'
import PageHome from './Page/Home'
import PageDebug from './Page/Debug'

function Main() {
  const routes: Array<Model.RouteSpec> = [
    {exact: true, path: '/', component: PageHome},
    {exact: true, path: '/debug', component: PageDebug},
    {path: '*', component: PageNotFound},
  ]
  return (
    <Router>
      <DBMemory routes={routes} />
      <DBDexie routes={routes} />
    </Router>
  )
}

export default Main;
