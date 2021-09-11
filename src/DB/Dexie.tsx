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
import './Dexie/UserbaseSyncProtocol'
import * as DBUserbase from './Userbase'

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

function DexieUserbaseSync({db}: {db: Dexie}) {
  const session = React.useContext<DBUserbase.Session>(DBUserbase.Context)
  const [syncing, setSyncing] = React.useState<boolean>(false)
  const userbaseSyncUrl = 'https://userbase.com'
  React.useEffect(() => {
    if (session.user && !syncing) {
      db.syncable.connect('userbase', userbaseSyncUrl, {user: session.user})
        .then(() => console.log('userbase.sync: connected'))
        .catch(err => console.error('userbase.sync: connect error', err))
      setSyncing(true)
    }
    else if (!session.user && syncing) {
      db.syncable.disconnect(userbaseSyncUrl).catch(err => console.error(err))
        .then(() => console.log('userbase.sync: disconnected'))
        .catch(err => console.error('userbase.sync: disconnect error', err))
      setSyncing(false)
    }
  }, [session.user, syncing, db.syncable])

  return null
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

function Dexie_({routes}: {routes: Array<RouteSpec>}) {
  const db = React.useRef(initDatabase()).current
  const userbase = React.useContext(DBUserbase.UpdateContext)

  const dispatch = Util.useSideEffect((action: Model.Action): null => {
    switch (action.type) {
      case 'reset':
        db.table('entries').clear()
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
        userbase.register(action)
        return null
      case 'auth.login':
        userbase.login(action)
        return null
      case 'auth.logout':
        userbase.logout(action)
        return null
    }
  })
  return (
    <>
      <DexieUserbaseSync db={db} />
      <DexieSettings db={db}>
        <Router.Switch>
          {routes.map((route, index) => (
            <Router.Route key={index} exact={route.exact} path={route.path}>
              <route.component.DexieComponent db={db} dispatch={dispatch} />
            </Router.Route>
          ))}
        </Router.Switch>
      </DexieSettings>
    </>
  )
}
export default Dexie_
