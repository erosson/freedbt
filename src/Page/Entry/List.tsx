import React from 'react'
import { Localized } from '@fluent/react';
import Dexie from 'dexie'
import { Link } from 'react-router-dom'
import * as RemoteData from '@abraham/remotedata'

import * as Util from '../../Util'
import * as Model from '../../Model'
import * as DBMemory from '../../DB/Memory'
import * as DBUserbase from '../../DB/Userbase'
import Layout from '../../View/Layout'
import Loading from '../../View/Loading'
import Fatal from '../../View/Fatal'

function Page(p: { dispatch: Model.Dispatch, entries: Array<[string, Model.Entry]> }) {
  return (
    <Layout>
      <p><Link to={`/entries/create/journal`}><Localized id="create-journal" /></Link></p>
      <p><Link to={`/entries/create/cbt`}><Localized id="create-cbt" /></Link></p>
      <p><Link to={`/entries/create/dbt-emotion-regulation-5`}><Localized id="create-dbt-emotion-regulation-5" /></Link></p>
      <ul>
        {p.entries.map(([id, entry]) => (
          <li key={id}>
            <Link to={`/entries/${id}`}><Localized id="edit-entry" vars={{ id }} /></Link>
            <Entry entry={entry} />
          </li>
        )).reverse()}
      </ul>
      <p><Link to={`/settings`}><Localized id="settings-link" /></Link></p>
    </Layout>
  );
}

function Entry(p: { entry: Model.Entry }) {
  switch (p.entry.type) {
    case Model.EntryType.JOURNAL: return <JournalEntry entry={p.entry} />
    case Model.EntryType.CBT: return <CBTEntry entry={p.entry} />
    case Model.EntryType.DBT_EMOTION_REGULATION_5: return <DBTEmotionRegulation5Entry entry={p.entry} />
  }
}
function JournalEntry(p: { entry: Model.JournalEntry }) {
  return (
    <p style={{ whiteSpace: 'pre-line' }}>{p.entry.body}</p>
  )
}
function CBTEntry(p: { entry: Model.CBTEntry }) {
  return (
    <p style={{ whiteSpace: 'pre-line' }}>{p.entry.alternative}</p>
  )
}
function DBTEmotionRegulation5Entry(p: { entry: Model.DBTEmotionRegulation5Entry }) {
  return (
    <p style={{ whiteSpace: 'pre-line' }}>{p.entry.emotion.name}</p>
  )
}

export function MemoryComponent({ state, dispatch }: { state: DBMemory.State, dispatch: Model.Dispatch }) {
  return <Page dispatch={dispatch} entries={state.entries.map((item, key) => [key + '', item])} />
}
export function DexieComponent({ db, dispatch }: { db: Dexie, dispatch: Model.Dispatch }) {
  const state: RemoteData.RemoteData<unknown, Array<[string, Model.Entry]>> = Util.useLiveQuery(async () => {
    let coll = await db.table('entries').orderBy('createdAt')
    let keys = await coll.primaryKeys()
    let vals: Model.Entry[] = await coll.toArray()
    return keys.map((k, i) => [k as string, vals[i]])
  }, [])
  console.log('list', state)

  return RemoteData.fold(
    () => <Loading phase="page.list.init" />,
    () => <Loading phase="page.list" />,
    (error: unknown) => <Fatal message={['Problem decoding list', error + '']} />,
    (entries: Array<[string, Model.Entry]>) => <Page dispatch={dispatch} entries={entries} />,
  )(state)
}
export function UserbaseComponent({ entries, dispatch }: { entries: Array<DBUserbase.Entry>, dispatch: Model.Dispatch }) {
  return (
    <DBUserbase.Wall loading="page.list" loggedOut={true}>
      <Page dispatch={dispatch} entries={entries.map(e => [e.itemId, DBUserbase.toEntry(e)])} />
    </DBUserbase.Wall>
  )
}
