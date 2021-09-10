import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import Dexie from 'dexie'
import {useLiveQuery} from 'dexie-react-hooks'
import Layout from '../View/Layout'
import Loading from '../View/Loading'

type State
  = {ready: false}
  | {ready: true, ver: number, entries: Model.Entry[]}

function Main(p: {entries: Model.Entry[], ver: number, dispatch: Model.Dispatch}) {
  return (
    <Layout>
      <pre>{JSON.stringify(p, null, 2)}</pre>
    </Layout>
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
    : <Loading />
}
