import React from 'react'
import * as Router from 'react-router-dom'
import * as Model from '../Model'
import {RouteSpec} from '../Routes'

export type State = {entries: Array<Model.Entry>}
export type Action = Model.Action
const initState = {entries: []}

function reducer(state: State, action: Action): State {
  console.log('reducer', action)
  switch (action.type) {
    case 'reset':
      return initState
    case 'entry.create':
      return {entries: [action.data, ...state.entries]}
    case 'entry.update':
      return {entries: [...state.entries.slice(action.id), action.data, ...state.entries.slice(action.id+1, state.entries.length)]}
    case 'entry.delete':
      return {entries: [...state.entries.slice(action.id), ...state.entries.slice(action.id+1, state.entries.length)]}
  }
}

function Main({routes}: {routes: Array<RouteSpec>}) {
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
export default Main
