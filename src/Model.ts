export type Entry = JournalEntry | CBTEntry | DBTEmotionRegulation5Entry
export type JournalEntry = {type: 'journal', createdAt: Date, updatedAt: Date, body: string}
export type CBTEntry = {type: 'cbt', createdAt: Date, updatedAt: Date, problem: string, distortions: Set<Distortion>, challenge: string, alternative: string}
export type DBTEmotionRegulation5Entry = {
  type: 'dbt-emotion-regulation-5', createdAt: Date, updatedAt: Date,
  emotion: {name: string, intensity: number},
  promptingEvent: {body: string, facts: string},
  interpretations: {body: string, facts: string, rewrite: string},
  threat: {body: string, facts: string, rewrite: string},
  catastrophe: {body: string, cope: string},
  fit: {rating: number, action: string},
}

export function isEntryType(t: string): t is Entry['type'] {
  return (
    t === 'journal'
    || t === 'cbt'
    || t === 'dbt-emotion-regulation-5'
  )
}

export type Distortion
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

export const distortions: Array<Distortion> = [
  'all-or-nothing',
  'catastrophizing',
  'emotional-reasoning',
  'fortune-telling',
  'labeling',
  'magnification-of-the-negative',
  'mind-reading',
  'minimization-of-the-positive',
  'other-blaming',
  'overgeneralization',
  'self-blaming',
  'should-statements',
]

export type Settings = {
  darkMode: DarkMode,
}
export type DarkMode = 'default' | 'light' | 'dark'
export function isDarkMode(t: string): t is DarkMode {
  return (
    t === 'default'
    || t === 'dark'
    || t === 'light'
  )
}
export const initSettings: Settings = {darkMode: 'default'}

export type Action
  = {type: 'reset'}
  | {type: 'settings.update', value: Settings}
  | {type: 'entry.create', data: Entry}
  | {type: 'entry.update', id: number, data: Entry}
  | {type: 'entry.delete', id: number}

export type Dispatch = (a:Action) => void;
