import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { LocalizationProvider } from '@fluent/react';
import l10n from './Locale'

// import DBMemory from './DB/Memory'
import DBDexie from './DB/Dexie'
import DBUserbase from './DB/Userbase'
import * as Routes from './Routes'

export function App() {
  return (
      // <DBMemory routes={Routes.routes} />
    <Router>
      <AppRoutes />
    </Router>
  )
}
export function AppRoutes() {
  return (
    <LocalizationProvider l10n={l10n}>
      <DBUserbase>
        <DBDexie routes={Routes.routes} />
      </DBUserbase>
    </LocalizationProvider>
  )
}

export default App;
