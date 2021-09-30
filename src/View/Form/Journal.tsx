import React from 'react'
import * as Model from '../../Model'
import { main as L } from '../../gen/localization'

type Entry = Model.JournalEntry

function JournalForm(p: { entry?: Entry, onSubmit: (e: Entry) => void }) {
  const [body, setBody] = React.useState(p.entry?.body || '')
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    const updatedAt = new Date()
    const entry: Entry = {
      type: Model.EntryType.JOURNAL,
      createdAt: p.entry?.createdAt || updatedAt,
      updatedAt,
      body,
    }
    p.onSubmit(entry)
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <L.JournalBody attrs={{ placeholder: true }}>
          <textarea id="entry" value={body} onChange={(event) => setBody(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} />
        </L.JournalBody>
      </div>
      <button type="submit">
        <L.Submit />
      </button>
    </form>
  )
}
export default JournalForm
