import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import Dexie from 'dexie'
import { Localized, useLocalization } from '@fluent/react';
import Layout from '../View/Layout'

function Page(p: {settings: Model.Settings, dispatch: Model.Dispatch}) {
  const locale = useLocalization().l10n
  const onSetDarkMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    if (Model.isDarkMode(event.target.value)) {
      p.dispatch({type: 'settings.update', value: {...p.settings, darkMode: event.target.value}})
    }
  }
  const onEraseJournal = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (window.confirm(locale.getString('erase-journal-confirm'))) {
      p.dispatch({type: 'reset'})
    }
  }
  return (
    <Layout settings={p.settings}>
      <div>
        <label htmlFor="darkmode">
          <Localized id="settings-darkmode-label" />
          <select value={p.settings.darkMode} onChange={onSetDarkMode}>
          {['default', 'light', 'dark'].map(value => (
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
  return <Page settings={state.settings} dispatch={dispatch} />
}
export function DexieComponent({settings, db, dispatch}: {settings: Model.Settings, db: Dexie, dispatch: Model.Dispatch}) {
  return <Page settings={settings} dispatch={dispatch} />
}
