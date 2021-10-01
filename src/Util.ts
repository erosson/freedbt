import React from 'react'
import * as C from 'purify-ts/Codec'
import { Either, Left, Right } from 'purify-ts/Either'
import { EitherAsync } from 'purify-ts/EitherAsync'
import { useLiveQuery as _useLiveQuery } from 'dexie-react-hooks'
import * as RemoteData from './vendor/@abraham/remotedata'

import * as Model from './Model'
import * as DBUserbase from './DB/Userbase'

export const UserbaseContext = DBUserbase.Context
export const SettingsContext = React.createContext<Model.Settings | null>(null)

export function useSideEffect<A>(effect: (a: A) => null | Promise<null>): ((a: A) => void) {
  type Action
    = { type: 'wrap', wrapped: A }
    | { type: 'noop' }

  const [action, dispatch]: [Action, (a: Action) => void]
    = React.useState<Action>({ type: 'noop' })
  React.useEffect((): void => {
    // returning non-void detects missing switch cases
    ((): null => {
      switch (action.type) {
        case 'noop':
          return null
        case 'wrap':
          dispatch({ type: 'noop' })
          effect(action.wrapped)
          return null
      }
    })()
  }, [effect, action])
  return (a: A): void => {
    dispatch({ type: 'wrap', wrapped: a })
  }
}

// Dexie i/o isn't quite json - dates are actually dates
export const DexieDateCodec: C.Codec<Date> = C.Codec.custom<Date>({
  decode: input => input instanceof Date ? Right(input) : Left('not a Date'),
  encode: input => input,
})

export type dexieJsonInputCodecs = { date: C.Codec<Date> }
export type DexieJsonCodec<T> = { Json: C.Codec<T>, Dexie: C.Codec<T> }
export function dexieJsonCodec<T>(fn: (p: dexieJsonInputCodecs) => C.Codec<T>): DexieJsonCodec<T> {
  return {
    Json: fn({ date: C.date }),
    Dexie: fn({ date: DexieDateCodec }),
  }
}

export function SetCodec<T>(codec: C.Codec<T>): C.Codec<Set<T>> {
  const ArrayCodec: C.Codec<Array<T>> = C.array(codec)
  return C.Codec.custom<Set<T>>({
    decode: ((json): Either<string, Set<T>> =>
      ArrayCodec.decode(json).map(a => new Set(a))
    ),
    encode: (set: Set<T>) =>
      ArrayCodec.encode(Array.from(set.values())),
  })
}

// https://stackoverflow.com/questions/61855787/strongest-way-to-do-nominal-types-in-typescript
// usage: ```
// const TestT: unique symbol = Symbol()
// type Test = Newtype<number, typeof TestT>
// ```
const NewtypeT: unique symbol = Symbol()
export type Newtype<A, B extends symbol> = A & { readonly [NewtypeT]: B }

export function remoteDataFromEither<E, T>(e: Either<E, T>): RemoteData.RemoteData<E, T> {
  return e.caseOf<RemoteData.RemoteData<E, T>>({
    Left: (s: E) => new RemoteData.Failure(s),
    Right: (s: T) => new RemoteData.Success(s),
  })
}

// https://dexie.org/docs/dexie-react-hooks/useLiveQuery()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLiveQuery<T>(querier: () => Promise<T>, deps?: any[]): RemoteData.RemoteData<unknown, T> {
  return _useLiveQuery(async () => remoteDataFromEither(await EitherAsync(querier)), deps || [], new RemoteData.Pending())
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function decodeLiveQuery<T>(codec: C.Codec<T>, querier: () => Promise<object>, deps?: any[]): RemoteData.RemoteData<unknown, T> {
  return _useLiveQuery(async () => remoteDataFromEither((await EitherAsync(querier)).chain(r => codec.decode(r))), deps || [], new RemoteData.Pending())
}