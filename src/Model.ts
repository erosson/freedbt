export type Entry = JournalEntry | CBTEntry
export type JournalEntry = {type: 'journal', createdAt: Date, updatedAt: Date, body: string}
export type CBTEntry = {type: 'cbt', createdAt: Date, updatedAt: Date, problem: string, distortions: Set<Challenge>, challenge: string, alternative: string}

export type Challenge
  = 'all-or-nothing'
  | 'catastrophizing'
  | 'emotional-reasoning'
  | 'fortune-telling'
  | 'labeling'
  | 'magnification-of-the-negative'
  | 'mind-reading'
  | 'minimization-of-the-positive'
  | 'other-blaming'
  | 'overgeneralization'
  | 'self-blaming'
  | 'should-statements'

export type Action
  = {type: 'reset'}
  | {type: 'entry.create', data: Entry}
  | {type: 'entry.update', id: number, data: Entry}
  | {type: 'entry.delete', id: number}

export type Dispatch = (a:Action) => void;
