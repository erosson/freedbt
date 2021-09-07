import React from 'react'
import * as Model from '../Model'
import {Link} from 'react-router-dom'

function Main({state}: Model.Props) {
  return (
    <div className="App">
      <p>Page not found</p>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Main
