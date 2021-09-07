import React from 'react';
// import * as Automerge from 'automerge';
import Dexie from 'dexie';
import './App.css';

type State
  = {ready: false}
  | {ready: true, counter: Counter}

interface Counter {
  count: number
}

const initState: State = {ready: false}
const initCounter: Counter = {count: 0}

type Action
  = {type: 'reset'}
  | {type: 'load', counter: Counter}
  | {type: 'increment'}
  | {type: 'decrement'}
  ;

function reducer(state: State, action: Action): State {
  console.log('reducer', action)
  if (state.ready) {
    switch (action.type) {
      case 'reset':
        return {...state, counter: {...state.counter, ...initCounter}}
      case 'load':
        return {...state, counter: action.counter}
      case 'increment':
        return {...state, counter: {...state.counter, count: state.counter.count + 1}}
      case 'decrement':
        return {...state, counter: {...state.counter, count: state.counter.count - 1}}
    }
  }
  else {
    switch(action.type) {
      case 'reset':
        return {ready: true, counter: initCounter}
      case 'load':
        return {ready: true, counter: action.counter}
      default:
        return state
    }
  }
}

export function database() {
  const db = new Dexie('test')
  db.version(1).stores({
    counter: '++id',
  })
  return db
}

function Main() {
  // const [state, dispatch]: [State, React.Dispatch<Action>] = React.useReducer(reducer, init)
  const [state, dispatch] = React.useReducer(reducer, initState)
  React.useEffect(() => {(async () => {
    const db = database()
    const counter = await db.table('counter').toCollection().first()
    dispatch(
      counter
        ? {type: 'load', counter}
        : {type: 'reset'}
    )
  })()}, [])
  React.useEffect(() => {
    if (state.ready) {
      const db = database()
      console.log('put', state.counter)
      db.table('counter').put(state.counter)
    }
  }, [state])
  if (!state.ready) {
    return <div className="App">loading...</div>
  }
  return (
    <div className="App">
      count: {state.counter.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
    </div>
  );
}

export default Main;
