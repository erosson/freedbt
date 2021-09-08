import React from 'react'
import Dexie from 'dexie'
import * as Router from 'react-router-dom'
import * as Model from '../Model'
import * as Util from '../Util'
import {RouteSpec} from '../Routes'

function database() {
  const db = new Dexie('test3')
  db.version(1).stores({
    entries: '++,type',
    settings: '',
  })
  db.version(2).stores({
    entries: '++,type,createdAt,updatedAt',
  }).upgrade(tx => {
    const createdAt = new Date()
    return tx.table('entries').toCollection().modify(row => {
      Object.assign(row, {createdAt, updatedAt: createdAt})
    })
  })
  return db
}

function Main({routes}: {routes: Array<RouteSpec>}) {
  const db = React.useRef(database()).current

  const dispatch = Util.useSideEffect((action: Model.Action): null => {
    switch (action.type) {
      case 'reset':
        db.table('entries').clear()
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
    }
  })

  return (
    <Router.Switch>
      {routes.map((route, index) => (
        <Router.Route key={index} exact={route.exact} path={route.path}>
          <route.component.DexieComponent db={db} dispatch={dispatch} />
        </Router.Route>
      ))}
    </Router.Switch>
  )
}
export default Main
