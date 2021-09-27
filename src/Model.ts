import {UserProfile, RememberMeOption} from 'userbase-js/types'
import {Entry, EntryId} from './Model/Entry'
import {Settings} from './Model/Settings'
export * from './Model/Entry'
export * from './Model/Settings'

export type Action
  = {type: 'reset'}
  | {type: 'settings.update', value: Settings}
  | {type: 'entry.create', data: Entry}
  | {type: 'entry.update', id: EntryId, data: Entry}
  | {type: 'entry.delete', id: EntryId}
  | {type: 'auth.register', username: string, password: string, email?: string, profile?: UserProfile, rememberMe: RememberMeOption}
  | {type: 'auth.login', username: string, password: string, rememberMe: RememberMeOption}
  | {type: 'auth.logout'}

export type Dispatch = (a:Action) => void;
