import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { LocalizationProvider } from '@fluent/react';
import l10n from './Locale'

// import DBMemory from './DB/Memory'
import DBDexie from './DB/Dexie'
import * as Routes from './Routes'

export function Main() {
  return (
      // <DBMemory routes={Routes.routes} />
    <Router>
      <MainRoutes />
    </Router>
  )
}
export function MainRoutes() {
  return (
    <LocalizationProvider l10n={l10n}>
      <DBDexie routes={Routes.routes} />
    </LocalizationProvider>
  )
}

export default Main;
