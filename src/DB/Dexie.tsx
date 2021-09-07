import React from 'react'
import Dexie from 'dexie'
import {useLiveQuery} from 'dexie-react-hooks'
import * as Router from 'react-router-dom'
import * as Model from '../Model'

function database() {
  const db = new Dexie('test')
  db.version(1).stores({
    counter: '++id',
  })
  return db
}

function Main({routes}: {routes: Array<Model.RouteSpec>}) {
  const db = React.useRef(database()).current
  const [action, dispatch] = React.useState({type: 'noop'})
  const state: Model.State = useLiveQuery(async () => (
    {ready: true, counter: await db.table('counter').toCollection().first() || Model.initCounter}
  ), [], Model.initState)
  // console.log('dexie state', state)

  React.useEffect(() => {
    console.log('dexie action', action)
    if (!state.ready) return
    switch (action.type) {
      case 'load': return
      case 'noop': return
      case 'reset':
        db.table('counter').clear()
        return
      case 'increment':
        db.table('counter').put({...state.counter, count: state.counter.count + 1})
        return
      case 'decrement':
        db.table('counter').put({...state.counter, count: state.counter.count - 1})
        return
    }
  // eslint-disable-next-line
  }, [action])

  return (
    <Router.Switch>
      {routes.map((route, index) => (
        <Router.Route key={index} exact={route.exact} path={route.path}>
          <route.component state={state} dispatch={dispatch} />
        </Router.Route>
      ))}
    </Router.Switch>
  )
}
export default Main
