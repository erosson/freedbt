export type State
  = {ready: false}
  | {ready: true, counter: Counter}

export interface Counter {
  count: number
}
export const initState: State = {ready: false}
export const initCounter: Counter = {count: 0}

export type Action
  = {type: 'noop'}
  | {type: 'reset'}
  | {type: 'load', counter: Counter}
  | {type: 'increment'}
  | {type: 'decrement'}
  ;

export type Dispatch = (a:Action) => void;
export type Props = {state: State, dispatch: Dispatch}
export type RouteSpec = {path: string, exact?: boolean, component: (p:Props) => JSX.Element}
