import React from 'react'
import Dexie from 'dexie'
import 'dexie-observable'
import 'dexie-syncable' // required for uuid primary keys (`$$`)
import * as Router from 'react-router-dom'
import * as Model from '../Model'
import * as Util from '../Util'
import {RouteSpec} from '../Routes'
import {useLiveQuery} from 'dexie-react-hooks'
import Loading from '../View/Loading'

function initDatabase(): Dexie {
  // Dexie.delete('test')
  // Dexie.delete('test3')
  // Dexie.delete('test4')
  const db = new Dexie('FreeDBT')
  db.version(1).stores({
    entries: '$$,type,createdAt,updatedAt',
    settings: '',
  })
  return db
}

function DexieSettings(p: {db: Dexie, children: React.ReactNode}) {
  const settings: null | Model.Settings = useLiveQuery<Model.Settings, null>(async () => {
    return (await p.db.table('settings').toCollection().first()) || Model.initSettings
  }, [], null)

  if (!settings) {
    return <Loading phase="dexie.settings" />
  }

  return (
    <Util.SettingsContext.Provider value={settings}>
      {p.children}
    </Util.SettingsContext.Provider>
  )
}

export function update(db: Dexie, action: Model.Action): null {
  switch (action.type) {
    case 'reset':
      db.table('entries').clear()
      db.table('settings').clear()
      return null
    case 'settings.update':
      db.table('settings').put(action.value, 1)
      return null
    case 'entry.create':
      db.table('entries').put(action.data)
      return null
    case 'entry.update':
      db.table('entries').update(action.id, action.data)
      return null
    case 'entry.delete':
      db.table('entries').delete(action.id)
      return null
    case 'auth.register':
    case 'auth.login':
    case 'auth.logout':
      return null
  }
}

function Dexie_({routes}: {routes: Array<RouteSpec>}) {
  const db = React.useRef<Dexie>(initDatabase()).current
  const dispatch = Util.useSideEffect<Model.Action>(a => update(db, a))
  return (
    <DexieSettings db={db}>
      <Router.Switch>
        {routes.map((route, index) => (
          <Router.Route key={index} exact={route.exact} path={route.path}>
            <route.component.DexieComponent db={db} dispatch={dispatch} />
          </Router.Route>
        ))}
      </Router.Switch>
    </DexieSettings>
  )
}
export default Dexie_
