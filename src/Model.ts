export type State
  = {ready: false}
  | {ready: true, counter: Counter}

export interface Counter {
  count: number
}
export const initCounter: Counter = {count: 0}

export type Action
  = {type: 'reset'}
  | {type: 'increment'}
  | {type: 'decrement'}

export type Dispatch = (a:Action) => void;
export type Props = {state: State, dispatch: Dispatch}
export type RouteSpec = {path: string, exact?: boolean, component: (p:Props) => JSX.Element}
