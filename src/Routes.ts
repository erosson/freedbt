import * as Model from './Model'
import * as DBMemory from './DB/Memory'
import Dexie from 'dexie'

import * as PageNotFound from './Page/NotFound'
import * as PageDebug from './Page/Debug'
import * as PageSettings from './Page/Settings'
import * as PageEntryList from './Page/Entry/List'
import * as PageEntryShow from './Page/Entry/Show'
import * as PageEntryCreate from './Page/Entry/Create'
import * as PageUserbase from './Page/Userbase'

export type RouteSpec = {path: string, exact?: boolean, component: {
  MemoryComponent: (p:{state: DBMemory.State, dispatch: Model.Dispatch}) => JSX.Element,
  DexieComponent: (p:{settings: Model.Settings, db: Dexie, dispatch: Model.Dispatch}) => JSX.Element,
}}

export const routes: Array<RouteSpec> = [
  {exact: true, path: '/', component: PageEntryList},
  {exact: true, path: '/entries', component: PageEntryList},
  {exact: true, path: '/entries/create/:type', component: PageEntryCreate},
  {exact: true, path: '/entries/:id', component: PageEntryShow},
  {exact: true, path: '/debug', component: PageDebug},
  {exact: true, path: '/settings', component: PageSettings},
  {exact: true, path: '/userbase', component: PageUserbase},
  {path: '*', component: PageNotFound},
]
