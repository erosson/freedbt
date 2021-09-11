import React from 'react'
import * as Model from '../../Model'
import * as DBMemory from '../../DB/Memory'
import * as PageNotFound from '../NotFound'
import Dexie from 'dexie'
import {useLiveQuery} from 'dexie-react-hooks'
import * as Router from 'react-router-dom'
import Form from '../../View/Form'
import { Localized, useLocalization } from '@fluent/react';
import Layout from '../../View/Layout'
import Loading from '../../View/Loading'

type State
  = {status: 'loading'}
  | {status: 'missing'}
  | {status: 'ready', entry: Model.Entry}

function Page(p: {dispatch: Model.Dispatch, id: string, entry: Model.Entry}) {
  const locale = useLocalization().l10n
  const deleted = React.useRef(false)
  const onDelete = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (window.confirm(locale.getString('delete-entry-confirm'))) {
      p.dispatch({type: 'entry.delete', id: p.id})
      deleted.current = true
    }
  }
  if (deleted.current) {
    return <Router.Redirect to="/" />
  }
  return (
    <Layout>
      <h4><Localized id={`edit-${p.entry.type}`} vars={{id: p.id}} /></h4>
      <div>
        <Entry {...p} />
        <div><Localized id="created-at" vars={{date: p.entry.createdAt}} /></div>
        <div><Localized id="updated-at" vars={{date: p.entry.updatedAt}} /></div>
      </div>
      <button className="btn-danger" onClick={onDelete}><Localized id="delete-entry-button" /></button>
    </Layout>
  );
}
function Entry(p: {dispatch: Model.Dispatch, id: string, entry: Model.Entry}) {
  function onSubmit(data: Model.Entry) {
    p.dispatch({type: 'entry.update', id: p.id, data})
  }
  return <Form entry={p.entry} onSubmit={onSubmit} />
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  const params = Router.useParams<{id: string}>()
  const entry = state.entries[parseInt(params.id)]
  return entry
    ? <Page dispatch={dispatch} id={params.id} entry={entry} />
    : <PageNotFound.MemoryComponent state={state} dispatch={dispatch} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  const params = Router.useParams<{id: string}>()
  const state: State = useLiveQuery<State, State>(async () => {
    const entry = await db.table('entries').get(params.id)
    return entry
      ? {status: 'ready', entry}
      : {status: 'missing'}
  }, [], {status: 'loading'})
  switch(state.status) {
    case 'ready':
      return <Page dispatch={dispatch} id={params.id} entry={state.entry} />
    case 'missing':
      return <PageNotFound.DexieComponent db={db} dispatch={dispatch} />
    case 'loading':
      return <Loading phase="page.show" />
  }
}
