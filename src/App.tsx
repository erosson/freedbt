import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { LocalizationProvider, ReactLocalization } from '@fluent/react';
import l10n from './Locale'

// import DBAutomerge from './DB/Automerge'
import DBMemory from './DB/Memory'
import DBDexie from './DB/Dexie'
import DBUserbase from './DB/Userbase'
import DBOfflineFirstDexieUserbase from './DB/OfflineFirstDexieUserbase'
import DBOfflineFirstDexieUserbase2 from './DB/OfflineFirstDexieUserbase2'
import * as Routes from './Routes'

export function App() {
  if (document.location.pathname.startsWith('/db/automerge')) {
    return (
      <Router basename="/db/automerge">
        <AppRoutes>
          {/* <DBAutomerge routes={Routes.routes} /> */}
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
  else if (document.location.pathname.startsWith('/db/userbase')) {
    return (
      <Router basename="/db/userbase">
        <AppRoutes>
          <DBUserbase routes={Routes.routes} />
          db-userbase
        </AppRoutes>
      </Router>
    )
  }
  else if (document.location.pathname.startsWith('/db/dexie')) {
    return (
      <Router basename="/db/dexie">
        <AppRoutes>
          <DBDexie routes={Routes.routes} />
          db-dexie
        </AppRoutes>
      </Router>
    )
  }
  else if (document.location.pathname.startsWith('/db/offlinefirstdexieuserbase')) {
    return (
      <Router basename="/db/offlinefirstdexieuserbase">
        <AppRoutes>
          <DBOfflineFirstDexieUserbase routes={Routes.routes} />
          db-offlinefirstdexieuserbase
        </AppRoutes>
      </Router>
    )
  }
  else if (document.location.pathname.startsWith('/db/offlinefirstdexieuserbase2')) {
    return (
      <Router basename="/db/offlinefirstdexieuserbase2">
        <AppRoutes>
          <DBOfflineFirstDexieUserbase2 routes={Routes.routes} />
          db-offlinefirstdexieuserbase2
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
export function AppRoutes(p: { children?: React.ReactNode, l10n?: ReactLocalization }) {
  // <DBDexie routes={Routes.routes} />
  return (
    <LocalizationProvider l10n={p.l10n || l10n}>
      {p.children ? <>{p.children}</> :
        <DBDexie routes={Routes.routes} />
      }
    </LocalizationProvider>
  )
}

export default App;
