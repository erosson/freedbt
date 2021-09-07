export type Entry
  = {type: 'journal', createdAt: Date, updatedAt: Date, body: string}

export type Action
  = {type: 'reset'}
  | {type: 'entry.create', data: Entry}
  | {type: 'entry.update', id: number, data: Entry}
  | {type: 'entry.delete', id: number}

export type Dispatch = (a:Action) => void;
