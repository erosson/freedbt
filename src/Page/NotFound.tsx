import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import Dexie from 'dexie'
import {Link} from 'react-router-dom'
import { Localized } from '@fluent/react';

export function Main() {
  return (
    <div className="App">
      <h3><Link to="/"><Localized id="title" /></Link></h3>
      <p><Localized id="page-not-found" /></p>
    </div>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Main />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  return <Main />
}
export default Main
