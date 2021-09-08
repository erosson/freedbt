import React from 'react'
import * as Model from '../../../Model'
import * as DBMemory from '../../../DB/Memory'
import Form from '../../../View/Form/CBT'
import Dexie from 'dexie'
import {Link} from 'react-router-dom'
import * as Router from 'react-router-dom'

function Main(p: {dispatch: Model.Dispatch}) {
  const created = React.useRef(false)
  const onSubmit = (data: Model.CBTEntry) => {
    p.dispatch({type: 'entry.create', data})
    created.current = true
  }
  if (created.current) {
    return <Router.Redirect to="/" />
  }
  return (
    <div className="App">
      <h3>The best journal ever</h3>
      <Form onSubmit={onSubmit} />
      <p><Link to="/">Home</Link></p>
    </div>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} />
}
