import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import Dexie from 'dexie'
import { Localized } from '@fluent/react';
import Layout from '../View/Layout'

export function Main() {
  return (
    <Layout>
      <p><Localized id="page-not-found" /></p>
    </Layout>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Main />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  return <Main />
}
export default Main
