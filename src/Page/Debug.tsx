import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import Dexie from 'dexie'
import {useLiveQuery} from 'dexie-react-hooks'
import {Link} from 'react-router-dom'
import { Localized } from '@fluent/react';

type State
  = {ready: false}
  | {ready: true, ver: number, entries: Model.Entry[]}

function Main(p: {entries: Model.Entry[], ver: number, dispatch: Model.Dispatch}) {
  return (
    <div className="App">
      <h3><Link to="/"><Localized id="title" /></Link></h3>
      <pre>{JSON.stringify(p, null, 2)}</pre>
    </div>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} entries={state.entries} ver={0} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  const state: State = useLiveQuery<State, {ready: false}>(async () => (
    {ready: true, entries: await db.table('entries').toArray(), ver: db.verno}
  ), [], {ready: false})
  return state.ready
    ? <Main dispatch={dispatch} entries={state.entries} ver={state.ver} />
    : <div className="App"><Localized id="loading" /></div>
}
