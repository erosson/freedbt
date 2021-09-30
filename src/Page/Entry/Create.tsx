import React from 'react'
import * as Model from '../../Model'
import * as DBMemory from '../../DB/Memory'
import * as DBUserbase from '../../DB/Userbase'
import Dexie from 'dexie'
import * as Router from 'react-router-dom'
import Form from '../../View/Form'
import PageNotFound from '../NotFound'
import { Localized } from '@fluent/react';
import Layout from '../../View/Layout'

function Page(p: { dispatch: Model.Dispatch }) {
  const params = Router.useParams<{ type: string }>()
  const created = React.useRef(false)
  const onSubmit = (data: Model.Entry) => {
    p.dispatch({ type: 'entry.create', data })
    created.current = true
  }

  if (created.current) {
    return <Router.Redirect to="/" />
  }
  return Model.EntryTypeCodec.decode(params.type)
    .caseOf({
      Right: (t: Model.EntryType) => (
        <Layout>
          <h4><Localized id={`create-${t}`} /></h4>
          <Form type={t} onSubmit={onSubmit} />
        </Layout>
      ),
      Left: () => <PageNotFound />,
    })
}

export function MemoryComponent({ state, dispatch }: { state: DBMemory.State, dispatch: Model.Dispatch }) {
  return <Page dispatch={dispatch} />
}
export function DexieComponent({ db, dispatch }: { db: Dexie, dispatch: Model.Dispatch }) {
  return <Page dispatch={dispatch} />
}
export function UserbaseComponent({ entries, dispatch }: { entries: Array<DBUserbase.Entry>, dispatch: Model.Dispatch }) {
  return (
    <DBUserbase.Wall loading="page.create" loggedOut={true}>
      <Page dispatch={dispatch} />
    </DBUserbase.Wall>
  )
}
