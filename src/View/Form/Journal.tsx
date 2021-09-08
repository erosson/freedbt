import React from 'react'
import * as Model from '../../Model'

function Main(p: {entry?: Model.JournalEntry, onSubmit: (e:Model.JournalEntry) => void}) {
  const [body, setBody] = React.useState(p.entry?.body || '')
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    const updatedAt = new Date()
    const entry: Model.JournalEntry = {
      type: 'journal',
      createdAt: p.entry?.createdAt || updatedAt,
      updatedAt,
      body,
    }
    p.onSubmit(entry)
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <textarea id="entry" value={body} onChange={(event) => setBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
export default Main
