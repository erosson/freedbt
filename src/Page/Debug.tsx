import React from 'react'
import * as Model from '../Model'
import {Link} from 'react-router-dom'

function Main({state}: Model.Props) {
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default Main
