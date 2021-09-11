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

function database() {
  // Dexie.delete('test')
  // Dexie.delete('test3')
  // Dexie.delete('test4')
  const db = new Dexie('FreeDBT')
  db.version(1).stores({
    entries: '$$,type,createdAt,updatedAt',
    settings: '',
  })
  //db.syncable.connect("userbase", "https://userbase.com")
  //db.syncable.on('statusChanged', function (newStatus, url) {
  //  console.log ("Sync Status changed: " + Dexie.Syncable.StatusTexts[newStatus]);
  //});
  //console.log('db.syncable connected?')
  return db
}

function Dexie_({routes}: {routes: Array<RouteSpec>}) {
  const db = React.useRef(database()).current
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

  const settings: null | Model.Settings = useLiveQuery<Model.Settings, null>(async () => {
    return (await db.table('settings').toCollection().first()) || Model.initSettings
  }, [], null)

  if (!settings) {
    return <Loading settings={Model.initSettings} phase="dexie.settings" />
  }
  return (
    <Router.Switch>
      {routes.map((route, index) => (
        <Router.Route key={index} exact={route.exact} path={route.path}>
          <route.component.DexieComponent db={db} dispatch={dispatch} settings={settings} />
        </Router.Route>
      ))}
    </Router.Switch>
  )
}
export default Dexie_
