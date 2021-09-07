import React from 'react'
import * as Router from 'react-router-dom'
import * as Model from '../Model'

type State = Model.State
type Action = Model.Action
const initState = {ready: true, counter: Model.initCounter}

function reducer(state: State, action: Action): State {
  console.log('reducer', action)
  if (!state.ready) return state
  switch (action.type) {
    case 'reset':
      return initState
    case 'increment':
      return {...state, counter: {...state.counter, count: state.counter.count + 1}}
    case 'decrement':
      return {...state, counter: {...state.counter, count: state.counter.count - 1}}
  }
}

function Main({routes}: {routes: Array<Model.RouteSpec>}) {
  const [state, dispatch]: [State, (a:Action) => void]
    = React.useReducer(reducer, initState)
  React.useEffect(() => {
    dispatch({type: 'reset'})
  }, [])
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
