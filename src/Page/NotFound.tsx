import React from 'react'
import Dexie from 'dexie'

import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import * as DBUserbase from '../DB/Userbase'
import * as L from '../gen/localization'
import Layout from '../View/Layout'

export function Page(p: {}) {
  return (
    <Layout>
      <p><L.PageNotFound /></p>
    </Layout>
  );
}

export function MemoryComponent({ state, dispatch }: { state: DBMemory.State, dispatch: Model.Dispatch }) {
  return <Page />
}
export function DexieComponent({ db, dispatch }: { db: Dexie, dispatch: Model.Dispatch }) {
  return <Page />
}
export function UserbaseComponent({ entries, dispatch }: { entries: Array<DBUserbase.Entry>, dispatch: Model.Dispatch }) {
  return <Page />
}
export default Page
