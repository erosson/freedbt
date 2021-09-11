import Dexie from 'dexie'
import 'dexie-observable'
import 'dexie-syncable'
// https://dexie.org/docs/Syncable/Dexie.Syncable.ISyncProtocol
// https://github.com/dfahlander/Dexie.js/blob/master/addons/Dexie.Syncable/api.d.ts
import * as API from 'dexie-syncable/api'
// import {IDatabaseChange, DatabaseChangeType} from 'dexie-observable/api'
import {IDatabaseChange} from 'dexie-observable/api'

Dexie.Syncable.registerSyncProtocol('userbase', new (class implements API.ISyncProtocol {
  sync(
    context: API.IPersistedContext,
    url: string,
    options: object,
    baseRevision: string,
    syncedRevision: string,
    changes: Array<IDatabaseChange>,
    partial: boolean,
    applyRemoteChanges: API.ApplyRemoteChangesFunction,
    onChangesAccepted: () => void,
    onSuccess: (continuation: API.PollContinuation | API.ReactiveContinuation) => void,
    onError: (error: string, again: number) => void,
  ): void {
    const POLL_INTERVAL = 10000
    console.log('userbase sync', arguments)
    onError('noop', POLL_INTERVAL)
  }
})())
