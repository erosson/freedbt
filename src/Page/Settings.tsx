import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import * as DBUserbase from '../DB/Userbase'
import * as Util from '../Util'
import Dexie from 'dexie'
import { Localized, useLocalization } from '@fluent/react';
import Layout from '../View/Layout'
import Loading from '../View/Loading'

function Page(p: {dispatch: Model.Dispatch}) {
  const settings: null | Model.Settings = React.useContext(Util.SettingsContext)
  const locale = useLocalization().l10n
  if (!settings) {
    return <Loading phase="page.settings" />
  }

  const onSetDarkMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    Model.DarkModeCodec
    .decode(event.target.value)
    .ifRight((darkMode: Model.DarkMode) => {
      p.dispatch({type: 'settings.update', value: {...settings, darkMode}})
    })
    // discard impossible non-DarkMode values
  }
  const onEraseJournal = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (window.confirm(locale.getString('erase-journal-confirm'))) {
      p.dispatch({type: 'reset'})
    }
  }
  return (
    <Layout>
      <div>
        <label htmlFor="darkmode">
          <Localized id="settings-darkmode-label" />
          <select value={settings.darkMode} onChange={onSetDarkMode}>
          {Object.values(Model.DarkMode).map(value => (
            // <Localized> doesn't seem to work in an <option>
            <option key={value} value={value}>{locale.getString(`settings-darkmode-${value}`)}</option>
          ))}
          </select>
        </label>
      </div>
      <div>
        <button className="btn-danger" onClick={onEraseJournal}><Localized id="erase-journal-button" /></button>
      </div>
    </Layout>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Page dispatch={dispatch} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  return <Page dispatch={dispatch} />
}
export function UserbaseComponent({entries, dispatch}: {entries: Array<DBUserbase.Entry>, dispatch: Model.Dispatch}) {
  return (
    <DBUserbase.Wall loading="page.settings" loggedOut={true}>
      <Page dispatch={dispatch} />
    </DBUserbase.Wall>
  )
}
