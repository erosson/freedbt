import React from 'react'
import * as Model from '../../Model'
import * as DBMemory from '../../DB/Memory'
import * as PageNotFound from '../NotFound'
import Dexie from 'dexie'
import {Link} from 'react-router-dom'
import {useLiveQuery} from 'dexie-react-hooks'
import * as Router from 'react-router-dom'
import Form from '../../View/Form'

type State
  = {status: 'loading'}
  | {status: 'missing'}
  | {status: 'ready', entry: Model.Entry}

function Main(p: {dispatch: Model.Dispatch, id: number, entry: Model.Entry}) {
  const deleted = React.useRef(false)
  const onDelete = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to delete this entry? There is no undo.')) {
      p.dispatch({type: 'entry.delete', id: p.id})
      deleted.current = true
    }
  }
  if (deleted.current) {
    return <Router.Redirect to="/" />
  }
  return (
    <div className="App">
      <h3>The best journal ever</h3>
      <div>
        <label htmlFor="entry">Edit entry #{p.id}</label>
        <Entry {...p} />
        <div>created {p.entry.createdAt+''}</div>
        <div>updated {p.entry.updatedAt+''}</div>
      </div>
      <p><button onClick={onDelete}>Delete Entry</button></p>
      <p><Link to="/">Home</Link></p>
    </div>
  );
}
function Entry(p: {dispatch: Model.Dispatch, id: number, entry: Model.Entry}) {
  function onSubmit(data: Model.Entry) {
    p.dispatch({type: 'entry.update', id: p.id, data})
  }
  return <Form entry={p.entry} onSubmit={onSubmit} />
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  const params = Router.useParams<{id: string}>()
  const id = parseInt(params.id)
  const entry = state.entries[id]
  return entry
    ? <Main dispatch={dispatch} id={id} entry={entry} />
    : <PageNotFound.MemoryComponent state={state} dispatch={dispatch} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  const params = Router.useParams<{id: string}>()
  const id = parseInt(params.id)
  const state: State = useLiveQuery<State, State>(async () => {
    const entry = await db.table('entries').get(id)
    return entry
      ? {status: 'ready', entry}
      : {status: 'missing'}
  }, [], {status: 'loading'})
  switch(state.status) {
    case 'ready':
      return <Main dispatch={dispatch} id={id} entry={state.entry} />
    case 'missing':
      return <PageNotFound.DexieComponent db={db} dispatch={dispatch} />
    case 'loading':
      return <div className="App">loading...</div>
  }
}
