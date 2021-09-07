import React from 'react'
import * as Model from '../../Model'
import * as DBMemory from '../../DB/Memory'
import Dexie from 'dexie'
import {Link} from 'react-router-dom'
import * as Router from 'react-router-dom'

function Main(p: {dispatch: Model.Dispatch}) {
  const [body, setBody] = React.useState('')
  const created = React.useRef(false)
  const onCreate = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const createdAt = new Date()
    const data: Model.JournalEntry = {type: 'journal', createdAt, updatedAt: createdAt, body}
    p.dispatch({type: 'entry.create', data})
    created.current = true
  }
  if (created.current) {
    return <Router.Redirect to="/" />
  }
  return (
    <div className="App">
      <h3>The best journal ever</h3>
      <form onSubmit={onCreate}>
        <div>
          <label htmlFor="entry">Write your entry...</label>
          <div><textarea id="entry" value={body} onChange={(event) => setBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p><Link to="/">Home</Link></p>
    </div>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} />
}
