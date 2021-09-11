import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import Dexie from 'dexie'
import { Localized } from '@fluent/react';
import Layout from '../View/Layout'

export function Page(p: {settings: Model.Settings}) {
  return (
    <Layout settings={p.settings}>
      <p><Localized id="page-not-found" /></p>
    </Layout>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Page settings={state.settings} />
}
export function DexieComponent({settings, db, dispatch}: {settings: Model.Settings, db: Dexie, dispatch: Model.Dispatch}) {
  return <Page settings={settings} />
}
export default Page
