import React from 'react'
import * as Model from '../../Model'
import { Localized } from '@fluent/react';

type Entry = Model.JournalEntry

function Main(p: {entry?: Entry, onSubmit: (e:Entry) => void}) {
  const [body, setBody] = React.useState(p.entry?.body || '')
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    const updatedAt = new Date()
    const entry: Entry = {
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
        <Localized id="journal-body" attrs={{placeholder: true}}>
          <textarea id="entry" value={body} onChange={(event) => setBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} />
        </Localized>
      </div>
      <button type="submit">
        <Localized id="submit" />
      </button>
    </form>
  )
}
export default Main
