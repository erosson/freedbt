import React from 'react'
import * as Model from '../../Model'
import * as DBMemory from '../../DB/Memory'
import Dexie from 'dexie'
import {Link} from 'react-router-dom'
import {useLiveQuery} from 'dexie-react-hooks'

type State
  = {ready: false}
  | {ready: true, entries: Array<[number, Model.Entry]>}

function Main(p: {dispatch: Model.Dispatch, entries: Array<[number, Model.Entry]>}) {
  const onErase = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to erase your journal? There is no undo.')) {
      p.dispatch({type: 'reset'})
    }
  }
  return (
    <div className="App">
      <h3>FreeDBT</h3>
      <p><Link to={`/entries/create/journal`}>Write a new journal</Link></p>
      <p><Link to={`/entries/create/cbt`}>Write a new CBT</Link></p>
      <p><Link to={`/entries/create/dbt-emotion-regulation-5`}>Write a new DBT - Emotion Regulation (5)</Link></p>
      <p>count: {p.entries.length}</p>
      <ul>
      {p.entries.map(([id, entry]) => (
        <li key={id}>
          <Link to={`/entries/${id}`}>Edit entry #{id}</Link>
          <Entry entry={entry} />
        </li>
      )).reverse()}
      </ul>
      <button onClick={onErase}>Erase Journal</button>
    </div>
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
  return <Main dispatch={dispatch} entries={state.entries.map((item, key) => [key, item])} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  const state: State = useLiveQuery<State, {ready: false}>(async () => {
    let coll = await db.table('entries').toCollection()
    let keys = await coll.primaryKeys()
    let vals: Model.Entry[] = await coll.toArray()
    let entries: Array<[number, Model.Entry]> = keys.map((k, i) => [k as number, vals[i]])
    return {ready: true, entries}
  }, [], {ready: false})

  return state.ready
    ? <Main dispatch={dispatch} entries={state.entries} />
    : <div className="App">loading...</div>
}
