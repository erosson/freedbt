import React from 'react'
import * as Router from 'react-router-dom'
import * as Model from '../Model'
import {RouteSpec} from '../Routes'

export type State = {entries: Array<Model.Entry>, settings: Model.Settings}
export type Action = Model.Action
const initState = {entries: [], settings: Model.initSettings}

function reducer(state: State, action: Action): State {
  console.log('reducer', action)
  switch (action.type) {
    case 'reset':
      return initState
    case 'settings.update':
      return {...state, settings: action.value}
    case 'entry.create':
      return {...state, entries: [action.data, ...state.entries]}
    case 'entry.update':
      return {...state, entries: [...state.entries.slice(parseInt(action.id)), action.data, ...state.entries.slice(parseInt(action.id)+1, state.entries.length)]}
    case 'entry.delete':
      return {...state, entries: [...state.entries.slice(parseInt(action.id)), ...state.entries.slice(parseInt(action.id)+1, state.entries.length)]}
    case 'auth.register':
    case 'auth.login':
    case 'auth.logout':
      // TODO
      return state
  }
}

function Memory({routes}: {routes: Array<RouteSpec>}) {
  const [state, dispatch]: [State, (a:Action) => void]
    = React.useReducer(reducer, initState)
  React.useEffect(() => {
    dispatch({type: 'reset'})
  }, [])
  return (
    <Router.Switch>
      {routes.map((route, index) => (
        <Router.Route key={index} exact={route.exact} path={route.path}>
          <route.component.MemoryComponent state={state} dispatch={dispatch} />
        </Router.Route>
      ))}
    </Router.Switch>
  )
}
export default Memory
