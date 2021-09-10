import React from 'react'
import * as Model from '../../Model'
import * as DBMemory from '../../DB/Memory'
import Dexie from 'dexie'
import {Link} from 'react-router-dom'
import {useLiveQuery} from 'dexie-react-hooks'
import { Localized } from '@fluent/react';
import Layout from '../../View/Layout'
import Loading from '../../View/Loading'

type State
  = {ready: false}
  | {ready: true, entries: Array<[number, Model.Entry]>}

function Main(p: {dispatch: Model.Dispatch, settings: Model.Settings, entries: Array<[number, Model.Entry]>}) {
  return (
    <Layout settings={p.settings}>
      <p><Link to={`/entries/create/journal`}><Localized id="create-journal" /></Link></p>
      <p><Link to={`/entries/create/cbt`}><Localized id="create-cbt" /></Link></p>
      <p><Link to={`/entries/create/dbt-emotion-regulation-5`}><Localized id="create-dbt-emotion-regulation-5" /></Link></p>
      <ul>
      {p.entries.map(([id, entry]) => (
        <li key={id}>
          <Link to={`/entries/${id}`}><Localized id="edit-entry" vars={{id}} /></Link>
          <Entry entry={entry} />
        </li>
      )).reverse()}
      </ul>
      <p><Link to={`/settings`}><Localized id="settings-link" /></Link></p>
    </Layout>
  );
}

function Entry(p: {entry: Model.Entry}) {
  switch(p.entry.type) {
    case 'journal': return <JournalEntry entry={p.entry} />
    case 'cbt': return <CBTEntry entry={p.entry} />
    case 'dbt-emotion-regulation-5': return <DBTEmotionRegulation5Entry entry={p.entry} />
  }
}
function JournalEntry(p: {entry: Model.JournalEntry}) {
  return (
    <p style={{whiteSpace: 'pre-line'}}>{p.entry.body}</p>
  )
}
function CBTEntry(p: {entry: Model.CBTEntry}) {
  return (
    <p style={{whiteSpace: 'pre-line'}}>{p.entry.alternative}</p>
  )
}
function DBTEmotionRegulation5Entry(p: {entry: Model.DBTEmotionRegulation5Entry}) {
  return (
    <p style={{whiteSpace: 'pre-line'}}>{p.entry.emotion.name}</p>
  )
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} settings={state.settings} entries={state.entries.map((item, key) => [key, item])} />
}
export function DexieComponent({settings, db, dispatch}: {settings: Model.Settings, db: Dexie, dispatch: Model.Dispatch}) {
  const state: State = useLiveQuery<State, {ready: false}>(async () => {
    let coll = await db.table('entries').toCollection()
    let keys = await coll.primaryKeys()
    let vals: Model.Entry[] = await coll.toArray()
    let entries: Array<[number, Model.Entry]> = keys.map((k, i) => [k as number, vals[i]])
    return {ready: true, entries}
  }, [], {ready: false})

  return state.ready
    ? <Main settings={settings} dispatch={dispatch} entries={state.entries} />
    : <Loading settings={settings} />
}
