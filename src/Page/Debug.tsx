import React from 'react'
import Dexie from 'dexie'
import * as C from 'purify-ts/Codec'
import * as RemoteData from '../vendor/@abraham/remotedata'

import * as Util from '../Util'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import * as DBUserbase from '../DB/Userbase'
import Layout from '../View/Layout'
import Loading from '../View/Loading'
import Fatal from '../View/Fatal'

const StateCodec = C.Codec.interface({
  ver: C.number,
  entries: C.array(Model.EntryCodec.Dexie),
})
type State = C.GetType<typeof StateCodec>

function Page(p: { entries: Model.Entry[], ver: number, dispatch: Model.Dispatch }) {
  return (
    <Layout>
      <pre>{JSON.stringify(p, null, 2)}</pre>
    </Layout>
  );
}

export function MemoryComponent({ state, dispatch }: { state: DBMemory.State, dispatch: Model.Dispatch }) {
  return <Page dispatch={dispatch} entries={state.entries} ver={0} />
}
export function DexieComponent({ db, dispatch }: { db: Dexie, dispatch: Model.Dispatch }) {
  // TODO: decoder fail
  // const state: RemoteData.RemoteData<unknown, State> = Util.decodeLiveQuery(StateCodec, async () => (
  const state: RemoteData.RemoteData<unknown, State> = Util.useLiveQuery(async () => (
    { entries: await db.table('entries').toArray(), ver: db.verno }
  ))
  return RemoteData.fold(
    () => <Loading phase="page.debug.init" />,
    () => <Loading phase="page.debug" />,
    (error: unknown) => <Fatal message={['Problem decoding debug', error + '']} />,
    (state: State) => <Page dispatch={dispatch} entries={state.entries} ver={state.ver} />,
  )(state)
}
export function UserbaseComponent({ entries, dispatch }: { entries: Array<DBUserbase.Entry>, dispatch: Model.Dispatch }) {
  return (
    <DBUserbase.Wall loading="page.debug" loggedOut={true}>
      <Page dispatch={dispatch} entries={entries.map(e => DBUserbase.toEntry(e))} ver={0} />
    </DBUserbase.Wall>
  )
}
