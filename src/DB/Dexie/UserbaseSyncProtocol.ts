import Dexie from 'dexie'
import 'dexie-observable'
import 'dexie-syncable'
import Userbase from 'userbase-js'
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
    (async () => {
      const POLL_INTERVAL = 10000
      try {
        await Userbase.openDatabase({databaseName: 'dexie-syncable-changes', changeHandler: items => {
          // pull remote changes into local
          const changes = items.map(item => item.item)
          console.log('userbase sync: pull', changes)
          applyRemoteChanges(changes, 0)
        }})

        // push local changes into remote
        for (let change of changes) {
          console.log('userbase sync: push', change)
          await Userbase.insertItem({databaseName: 'dexie-syncable-changes', item: change})
        }
        onChangesAccepted()
        onSuccess({again: POLL_INTERVAL})
      }
      catch (e) {
        onError(e+'', POLL_INTERVAL)
      }
    })()
    console.log('userbase sync: start', arguments)
  }
})())
