import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import Dexie from 'dexie'
import { Localized, useLocalization } from '@fluent/react';
import Layout from '../View/Layout'

function Main(p: {dispatch: Model.Dispatch}) {
  const locale = useLocalization().l10n
  const onErase = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (window.confirm(locale.getString('erase-journal-confirm'))) {
      p.dispatch({type: 'reset'})
    }
  }
  return (
    <Layout>
      <button className="btn-danger" onClick={onErase}><Localized id="erase-journal-button" /></button>
    </Layout>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} />
}
