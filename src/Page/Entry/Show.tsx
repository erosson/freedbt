import React from 'react'
import { Localized, useLocalization } from '@fluent/react';
import Dexie from 'dexie'
import * as Router from 'react-router-dom'
import * as RemoteData from '@abraham/remotedata'
import { Maybe } from 'purify-ts/Maybe'

import * as L from '../../gen/localization'
import * as Util from '../../Util'
import * as Model from '../../Model'
import * as DBMemory from '../../DB/Memory'
import * as DBUserbase from '../../DB/Userbase'
import * as PageNotFound from '../NotFound'
import Form from '../../View/Form'
import Layout from '../../View/Layout'
import Loading from '../../View/Loading'
import Fatal from '../../View/Fatal'

function Page(p: { dispatch: Model.Dispatch, id: string, entry: Model.Entry }) {
  const locale = useLocalization().l10n
  const deleted = React.useRef(false)
  const onDelete = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (window.confirm(locale.getString('delete-entry-confirm'))) {
      p.dispatch({ type: 'entry.delete', id: p.id })
      deleted.current = true
    }
  }
  if (deleted.current) {
    return <Router.Redirect to="/" />
  }
  return (
    <Layout>
      <h4><Localized id={`edit-${p.entry.type}`} vars={{ id: p.id }} /></h4>
      <div>
        <Entry {...p} />
        <div><L.CreatedAt vars={{ date: p.entry.createdAt }} /></div>
        <div><L.UpdatedAt vars={{ date: p.entry.updatedAt }} /></div>
      </div>
      <button className="btn-danger" onClick={onDelete}><L.DeleteEntryButton /></button>
    </Layout>
  );
}
function Entry(p: { dispatch: Model.Dispatch, id: string, entry: Model.Entry }) {
  function onSubmit(data: Model.Entry) {
    p.dispatch({ type: 'entry.update', id: p.id, data })
  }
  return <Form entry={p.entry} onSubmit={onSubmit} />
}

export function MemoryComponent({ state, dispatch }: { state: DBMemory.State, dispatch: Model.Dispatch }) {
  const params = Router.useParams<{ id: string }>()
  const entry = state.entries[parseInt(params.id)]
  return entry
    ? <Page dispatch={dispatch} id={params.id} entry={entry} />
    : <PageNotFound.MemoryComponent state={state} dispatch={dispatch} />
}
export function DexieComponent({ db, dispatch }: { db: Dexie, dispatch: Model.Dispatch }) {
  const params = Router.useParams<{ id: string }>()
  const state: RemoteData.RemoteData<unknown, Maybe<Model.Entry>> = Util.useLiveQuery(async () => (
    Maybe.fromNullable(await db.table('entries').get(params.id))
  ), [])
  return RemoteData.fold(
    () => <Loading phase="page.show.init" />,
    () => <Loading phase="page.show" />,
    (error: unknown) => <Fatal message={['Problem decoding entry', error + '']} />,
    (entry: Maybe<Model.Entry>) =>
      entry.caseOf({
        Nothing: () => <PageNotFound.DexieComponent db={db} dispatch={dispatch} />,
        Just: entry => <Page dispatch={dispatch} id={params.id} entry={entry} />,
      })
  )(state)
}
export function UserbaseComponent({ entries, dispatch }: { entries: Array<DBUserbase.Entry>, dispatch: Model.Dispatch }) {
  const params = Router.useParams<{ id: string }>()
  const entry = entries.find(e => e.itemId === params.id)
  return (
    <DBUserbase.Wall loading="page.show" loggedOut={true}>
      {entry
        ? <Page dispatch={dispatch} id={params.id} entry={DBUserbase.toEntry(entry)} />
        : <PageNotFound.UserbaseComponent entries={entries} dispatch={dispatch} />
      }
    </DBUserbase.Wall>
  )
}
