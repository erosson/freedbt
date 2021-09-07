import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import * as PageNotFound from './NotFound'
import Dexie from 'dexie'
import {Link} from 'react-router-dom'
import {useLiveQuery} from 'dexie-react-hooks'
import * as Router from 'react-router-dom'

type State
  = {status: 'loading'}
  | {status: 'missing'}
  | {status: 'ready', entry: Model.Entry}

function Main(p: {dispatch: Model.Dispatch, id: number, entry: Model.Entry}) {
  const [body, setBody] = React.useState(p.entry.body)
  const [deleted, setDeleted] = React.useState(false)
  const onUpdate = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const data: Model.Entry = {...p.entry, updatedAt: new Date(), body}
    p.dispatch({type: 'entry.update', id: p.id, data})
  }
  const onDelete = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to delete this entry? There is no undo.')) {
      p.dispatch({type: 'entry.delete', id: p.id})
      setDeleted(true)
    }
  }
  if (deleted) {
    return <Router.Redirect to="/" />
  }
  return (
    <div className="App">
      <h3>The best journal ever</h3>
      <form onSubmit={onUpdate}>
        <div>
          <label htmlFor="entry">Edit entry #{p.id}</label>
          <div><textarea id="entry" value={body} onChange={(event) => setBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          <div>created {p.entry.createdAt+''}</div>
          <div>updated {p.entry.updatedAt+''}</div>
        </div>
        <button type="submit">Edit</button>
      </form>
      <p><button onClick={onDelete}>Delete Entry</button></p>
      <p><Link to="/">Home</Link></p>
    </div>
  );
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
