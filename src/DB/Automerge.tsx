import React from 'react'
import * as Router from 'react-router-dom'
import * as Model from '../Model'
import * as Util from '../Util'
import {RouteSpec} from '../Routes'
import Automerge from 'automerge'

export type State = {entries: Array<Model.Entry>, settings: Model.Settings}
export type Action = Model.Action

function reset(obj: State): void {
  obj.entries = []
  obj.settings = Object.assign({}, Model.initSettings)
}
function reducer(state0: State, action: Action): State {
  console.log('reducer', action)
  return Automerge.change(state0, action.type, state => {
    switch (action.type) {
      case 'reset':
        reset(state)
        return
      case 'settings.update':
        state.settings = action.value
        return
      case 'entry.create':
        state.entries.push(action.data)
        return
      case 'entry.update':
        state.entries.splice(parseInt(action.id), 1, action.data)
        return
      case 'entry.delete':
        state.entries.splice(parseInt(action.id), 1)
        return
      case 'auth.register':
      case 'auth.login':
      case 'auth.logout':
        // TODO
        return
    }
  })
}

function Memory({routes}: {routes: Array<RouteSpec>}) {
  const [state, dispatch]: [State, (a:Action) => void]
    = React.useReducer(reducer, Automerge.from({entries: [], settings: Model.initSettings}))
  React.useEffect(() => {
    dispatch({type: 'reset'})
  }, [])
  return (
    <Util.SettingsContext.Provider value={state.settings}>
      <Router.Switch>
        {routes.map((route, index) => (
          <Router.Route key={index} exact={route.exact} path={route.path}>
            <route.component.MemoryComponent state={state} dispatch={dispatch} />
          </Router.Route>
        ))}
      </Router.Switch>
    </Util.SettingsContext.Provider>
  )
}
export default Memory
