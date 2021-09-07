import * as Model from './Model'
import * as DBMemory from './DB/Memory'
import Dexie from 'dexie'

import * as PageNotFound from './Page/NotFound'
import * as PageDebug from './Page/Debug'
import * as PageHome from './Page/Home'
import * as PageEntry from './Page/Entry'

export type RouteSpec = {path: string, exact?: boolean, component: {
  MemoryComponent: (p:{state: DBMemory.State, dispatch: Model.Dispatch}) => JSX.Element,
  DexieComponent: (p:{db: Dexie, dispatch: Model.Dispatch}) => JSX.Element,
}}

export const routes: Array<RouteSpec> = [
  {exact: true, path: '/', component: PageHome},
  {exact: true, path: '/debug', component: PageDebug},
  {exact: true, path: '/entry/:id', component: PageEntry},
  {path: '*', component: PageNotFound},
]
