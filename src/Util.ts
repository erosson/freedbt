import React from 'react'
import * as Model from './Model'
import * as DBUserbase from './DB/Userbase'

export const UserbaseContext = DBUserbase.Context
export const UserbaseUpdateContext = DBUserbase.UpdateContext
export const SettingsContext = React.createContext<Model.Settings | null>(null)

export function useSideEffect<A>(effect: (a:A) => null): ((a:A) => void) {
  type Action
    = {type: 'wrap', wrapped: A}
    | {type: 'noop'}

  const [action, dispatch]: [Action, (a:Action) => void]
    = React.useState<Action>({type: 'noop'})
  React.useEffect((): void => {
    // returning non-void detects missing switch cases
    ((): null => {
      switch(action.type) {
        case 'noop':
          return null
        case 'wrap':
          dispatch({type: 'noop'})
          return effect(action.wrapped)
      }
    })()
  }, [effect, action])
  return (a:A): void => {
    dispatch({type: 'wrap', wrapped: a})
  }
}
