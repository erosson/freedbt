import React from 'react'
import * as Router from 'react-router-dom'
import * as Model from '../Model'

function reducer(state: Model.State, action: Model.Action): Model.State {
  console.log('reducer', action)
  if (state.ready) {
    switch (action.type) {
      case 'noop':
        return state
      case 'reset':
        return {...state, counter: {...state.counter, ...Model.initCounter}}
      case 'load':
        return {...state, counter: action.counter}
      case 'increment':
        return {...state, counter: {...state.counter, count: state.counter.count + 1}}
      case 'decrement':
        return {...state, counter: {...state.counter, count: state.counter.count - 1}}
    }
  }
  else {
    switch (action.type) {
      case 'reset':
        return {ready: true, counter: Model.initCounter}
      case 'load':
        return {ready: true, counter: action.counter}
      default:
        return state
    }
  }
}

function Main({routes}: {routes: Array<Model.RouteSpec>}) {
  const [state, dispatch] = React.useReducer(reducer, Model.initState)
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
