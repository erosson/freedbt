import React from 'react'
import Dexie from 'dexie'
import {useLiveQuery} from 'dexie-react-hooks'
import * as Router from 'react-router-dom'
import * as Model from '../Model'

type State = Model.State
type Action
  = {type: 'wrap', action: Model.Action}
  | {type: 'noop'}

function database() {
  const db = new Dexie('test')
  db.version(1).stores({
    counter: '++id',
  })
  return db
}

function Main({routes}: {routes: Array<Model.RouteSpec>}) {
  const db = React.useRef(database()).current
  const [action, dispatch]: [Action, (a:Action) => void]
    = React.useState<Action>({type: 'noop'})
  const state: State = useLiveQuery(async () => (
    {ready: true, counter: await db.table('counter').toCollection().first() || Model.initCounter}
  ), [], {ready: false})

  React.useEffect((): void => {
    // returning non-void detects missing switch cases
    ((): null => {
      if (!state.ready) {
        return null
      }
      switch (action.type) {
        case 'noop':
          return null
        case 'wrap':
          console.log('dexie action', action.action)
          dispatch({type: 'noop'})
          switch(action.action.type) {
            case 'reset':
              db.table('counter').clear()
              return null
            case 'increment':
              db.table('counter').put({...state.counter, count: state.counter.count + 1})
              return null
            case 'decrement':
              db.table('counter').put({...state.counter, count: state.counter.count - 1})
              return null
          }
      }
    })()
  }, [db, state, action])

  return (
    <Router.Switch>
      {routes.map((route, index) => (
        <Router.Route key={index} exact={route.exact} path={route.path}>
          <route.component state={state} dispatch={action => dispatch({type: 'wrap', action})} />
        </Router.Route>
      ))}
    </Router.Switch>
  )
}
export default Main
