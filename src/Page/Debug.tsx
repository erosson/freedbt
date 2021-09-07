import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import Dexie from 'dexie'
import {useLiveQuery} from 'dexie-react-hooks'
import {Link} from 'react-router-dom'

type State
  = {ready: false}
  | {ready: true, entries: Model.Entry[]}

function Main(p: {entries: Model.Entry[], dispatch: Model.Dispatch}) {
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <pre>{JSON.stringify(p, null, 2)}</pre>
    </div>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} entries={state.entries} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  const state: State = useLiveQuery<State, {ready: false}>(async () => (
    {ready: true, entries: await db.table('entries').toArray() || []}
  ), [], {ready: false})
  return state.ready
    ? <Main dispatch={dispatch} entries={state.entries} />
    : <div className="App">loading...</div>
}
