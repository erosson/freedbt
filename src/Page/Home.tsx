import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import Dexie from 'dexie'
import {Link} from 'react-router-dom'
import {useLiveQuery} from 'dexie-react-hooks'

type State
  = {ready: false}
  | {ready: true, entries: Array<[number, Model.Entry]>}

function Main(p: {dispatch: Model.Dispatch, entries: Array<[number, Model.Entry]>}) {
  const [body, setBody] = React.useState('')
  const onCreate = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const createdAt = new Date()
    const data: Model.Entry = {type: 'journal', createdAt, updatedAt: createdAt, body}
    p.dispatch({type: 'entry.create', data})
    setBody('')
  }
  const onErase = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to erase your journal? There is no undo.')) {
      p.dispatch({type: 'reset'})
    }
  }
  return (
    <div className="App">
      <h3>The best journal ever</h3>
      <form onSubmit={onCreate}>
        <div>
          <label htmlFor="entry">Write your entry...</label>
          <div><textarea id="entry" value={body} onChange={(event) => setBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>count: {p.entries.length}</p>
      {p.entries.map(([id, entry]) => (
        <div key={id}>
          <Link to={`/entry/${id}`}>Edit entry #{id}</Link>
          <p style={{whiteSpace: 'pre-line'}}>{entry.body}</p>
        </div>
      )).reverse()}
      <button onClick={onErase}>Erase Journal</button>
    </div>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} entries={state.entries.map((item, key) => [key, item])} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  const state: State = useLiveQuery<State, {ready: false}>(async () => {
    let coll = await db.table('entries').toCollection()
    let keys = await coll.primaryKeys()
    let vals: Model.Entry[] = await coll.toArray()
    let entries: Array<[number, Model.Entry]> = keys.map((k, i) => [k as number, vals[i]])
    return {ready: true, entries}
  }, [], {ready: false})

  return state.ready
    ? <Main dispatch={dispatch} entries={state.entries} />
    : <div className="App">loading...</div>
}
