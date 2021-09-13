import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { LocalizationProvider } from '@fluent/react';
import l10n from './Locale'

import DBAutomerge from './DB/Automerge'
import DBMemory from './DB/Memory'
import DBDexie from './DB/Dexie'
import DBUserbase from './DB/Userbase'
import * as Routes from './Routes'

export function App() {
  if (document.location.pathname.startsWith('/db/automerge')) {
    return (
      <Router basename="/db/automerge">
        <AppRoutes>
          <DBAutomerge routes={Routes.routes} />
          db-automerge
        </AppRoutes>
      </Router>
    )
  }
  else if (document.location.pathname.startsWith('/db/memory')) {
    return (
      <Router basename="/db/memory">
        <AppRoutes>
          <DBMemory routes={Routes.routes} />
          db-memory
        </AppRoutes>
      </Router>
    )
  }
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}
export function AppRoutes(p: {children?: React.ReactNode}) {
  return (
    <LocalizationProvider l10n={l10n}>
      {p.children ? <>{p.children}</> :
        <DBUserbase>
          <DBDexie routes={Routes.routes} />
        </DBUserbase>
      }
    </LocalizationProvider>
  )
}

export default App;
