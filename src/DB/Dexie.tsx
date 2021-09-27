import React from 'react'
import Dexie from 'dexie'
import 'dexie-observable'
import 'dexie-syncable' // required for uuid primary keys (`$$`)
import * as Router from 'react-router-dom'
import * as RemoteData from '@abraham/remotedata'

import * as Model from '../Model'
import * as Util from '../Util'
import { RouteSpec } from '../Routes'
import Loading from '../View/Loading'
import Fatal from '../View/Fatal'

export function initDatabase(name?: string): Dexie {
  // Dexie.delete('test')
  // Dexie.delete('test3')
  // Dexie.delete('test4')
  const db = new Dexie(name || 'FreeDBT')
  db.version(1).stores({
    entries: '$$,type,createdAt,updatedAt',
    settings: '',
  })
  db.version(2).stores({
    // TODO get sync working properly and delete this. it was for the fatally flawed OfflineFirstDexieUserbase
    pendingCommands: '++,createdAt',
  })
  return db
}

export function DexieSettings(p: { db: Dexie, children: React.ReactNode }) {
  const settings: RemoteData.RemoteData<unknown, Model.Settings> = Util.decodeLiveQuery(Model.SettingsCodec.Dexie, async () => {
    return await p.db.table('settings').toCollection().first() || Model.initSettings()
  }, [])
  console.log('settings', settings)

  return RemoteData.fold(
    () => <Loading phase="dexie.settings.init" />,
    () => <Loading phase="dexie.settings" />,
    (error: unknown) => <Fatal message={['Problem decoding settings', error + '']} />,
    (value: Model.Settings) => (
      <Util.SettingsContext.Provider value={value}>
        {p.children}
      </Util.SettingsContext.Provider>
    ),
  )(settings)
}

export async function update({ dexie, setDexie, action }: { dexie: Dexie, setDexie: (d: Dexie) => void, action: Model.Action }): Promise<null> {
  switch (action.type) {
    case 'reset':
      Dexie.delete(dexie.name)
      setDexie(initDatabase(dexie.name))
      return null
    case 'settings.update':
      await dexie.table('settings').put(Model.SettingsCodec.Dexie.encode({ ...action.value, updatedAt: new Date() }), 1)
      return null
    case 'entry.create':
      await dexie.table('entries').put(Model.EntryCodec.Dexie.encode(action.data))
      return null
    case 'entry.update':
      await dexie.table('entries').update(action.id, Model.EntryCodec.Dexie.encode(action.data))
      return null
    case 'entry.delete':
      await dexie.table('entries').delete(action.id)
      return null
    case 'auth.register':
    case 'auth.login':
    case 'auth.logout':
      return null
  }
}

function Dexie_({ routes }: { routes: Array<RouteSpec> }) {
  const [dexie, setDexie] = React.useState<Dexie>(initDatabase())
  const dispatch = Util.useSideEffect<Model.Action>(action => update({ dexie, setDexie, action }))
  return (
    <DexieSettings db={dexie}>
      <Router.Switch>
        {routes.map((route, index) => (
          <Router.Route key={index} exact={route.exact} path={route.path}>
            <route.component.DexieComponent db={dexie} dispatch={dispatch} />
          </Router.Route>
        ))}
      </Router.Switch>
    </DexieSettings>
  )
}
export default Dexie_
