import React from 'react'
import Dexie from 'dexie'
import * as Router from 'react-router-dom'

import './Dexie/UserbaseSyncProtocol'
import * as DBDexie from './Dexie'
import * as DBUserbase from './Userbase'
import * as Model from '../Model'
import * as Util from '../Util'
import {RouteSpec} from '../Routes'

function Dexie_({routes}: {routes: Array<RouteSpec>}) {
  // open dexie stuff
  const [dexie, setDexie] = React.useState<Dexie>(DBDexie.initDatabase('FreeDBT.DBOfflineFirstDexieUserbase.2'))
  // open userbase stuff
  const [session, setSession] = React.useState<DBUserbase.Session>({status: 'loading'})
  React.useEffect(() => {
    DBUserbase.init(setSession)
  }, [])
  React.useEffect(() => {
    (async () => {
      console.log('dexie sync status', session.status)
      if (session.status === 'ready') {
        // there's some kind of race condition while loading, and setTimeout seems to dodge it.
        // TODO: wish I could find and solve this properly...
        window.setTimeout(() => {
          dexie.syncable.connect("userbase", "https://userbase.com")
          dexie.syncable.on('statusChanged', function (newStatus, url) {
            console.log ("Sync Status changed: " + Dexie.Syncable.StatusTexts[newStatus]);
          });
        }, 1000)
      }
      else {
        dexie.syncable.disconnect("https://userbase.com")
      }
    })()
  }, [dexie, session.status])

  // finally, create an updater that pushes to both
  const dispatch = Util.useSideEffect<Model.Action>(action => DBDexie.update({dexie, setDexie, action}))

  return (
    <DBDexie.DexieSettings db={dexie}>
      <Router.Switch>
        {routes.map((route, index) => (
          <Router.Route key={index} exact={route.exact} path={route.path}>
            <route.component.DexieComponent db={dexie} dispatch={dispatch} />
          </Router.Route>
        ))}
      </Router.Switch>
    </DBDexie.DexieSettings>
  )
}
export default Dexie_
