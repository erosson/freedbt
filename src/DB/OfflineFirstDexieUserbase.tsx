import React from 'react'
import Dexie from 'dexie'
import Userbase from 'userbase-js'
import * as U from 'userbase-js/types'
import * as Router from 'react-router-dom'

import * as DBDexie from './Dexie'
import * as DBUserbase from './Userbase'
import * as Model from '../Model'
import * as Util from '../Util'
import {RouteSpec} from '../Routes'

type PendingCommand = {action: Model.Action, createdAt: Date, failures: number}

// TODO: this fails miserably because userbase-add() assigns different PKs than dexie-add()
async function pushPendingCommands(p: {dexie: Dexie, session: DBUserbase.Session, setSession: (s:DBUserbase.Session) => void}): Promise<null> {
  p.dexie.table('pendingCommands').orderBy('createdAt').each(async function(pending: PendingCommand, cursor) {
    try {
      console.log('pendingCommands: pushing...', pending)
      await DBUserbase.update(p.setSession, pending.action)
      await p.dexie.table('pendingCommands').delete(cursor.primaryKey)
      // TODO handle failed pending-command-delete differently?
      console.log('pendingCommands: pushed', pending)
    }
    catch (e) {
      // TODO count failures, and skip commands that fail too much?
      console.log('pendingCommands: failed to push', pending)
      await p.dexie.table('pendingCommands').update(cursor.primaryKey, {failures: pending.failures + 1})
      return null
    }
  })
  return null
}
async function update(p: {dexie: Dexie, setDexie: (d:Dexie) => void, session: DBUserbase.Session, setSession: (s:DBUserbase.Session) => void, action: Model.Action}): Promise<null> {
  // update the offline database and the UI
  DBDexie.update({dexie: p.dexie, setDexie: p.setDexie, action: p.action})

  // update the pending-userbase-commands queue
  const cmd: PendingCommand = {action: p.action, createdAt: new Date(), failures: 0}
  await p.dexie.table('pendingCommands').add(cmd)

  // attempt to update userbase and clear the command queue
  // TODO should this be uselivequery instead? probably not, no need to push from every tab
  await pushPendingCommands({dexie: p.dexie, session: p.session, setSession: p.setSession})
  return null
}

function Dexie_({routes}: {routes: Array<RouteSpec>}) {
  // open dexie stuff
  const [dexie, setDexie] = React.useState<Dexie>(DBDexie.initDatabase('FreeDBT.DBOfflineFirstDexieUserbase.0'))
  // open userbase stuff
  const [session, setSession] = React.useState<DBUserbase.Session>({status: 'loading'})
  React.useEffect(() => {
    DBUserbase.init(setSession)
  }, [])
  React.useEffect(() => {
    (async () => {
      console.log('session status change', session)
      if (session.status === 'ready') {
        await Userbase.openDatabase({
          databaseName: 'entries',
          changeHandler(items: Array<U.Item>) {
            // TODO pull changes from the server
            // TODO detect conflicts
          },
        })
        await Userbase.openDatabase({
          databaseName: 'settings',
          changeHandler(items: Array<U.Item>) {
            // TODO pull changes from the server
            // TODO detect conflicts
          },
        })

        // TODO push pending commands after logging in
        // await pushPendingCommands({dexie, session, setSession})
      }
    })()
  }, [session, session.status, dexie])

  // finally, create an updater that pushes to both
  const dispatch = Util.useSideEffect<Model.Action>(action => update({dexie, setDexie, session, setSession, action}))

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
