import React from 'react'
import * as Model from '../Model'

function Main({state, dispatch}: Model.Props) {
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

export default Main
