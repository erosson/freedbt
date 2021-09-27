import * as C from 'purify-ts/Codec'
import * as Util from '../Util'

export enum EntryType {
  JOURNAL = 'journal',
  CBT = 'cbt',
  DBT_EMOTION_REGULATION_5 = 'dbt-emotion-regulation-5',
}
export const EntryTypeCodec = C.enumeration(EntryType)

const JournalEntryCodec = Util.dexieJsonCodec(p => C.Codec.interface({
  type: C.exactly(EntryType.JOURNAL),
  createdAt: p.date,
  updatedAt: p.date,
  body: C.string,
}))
export type JournalEntry = C.GetType<typeof JournalEntryCodec.Json>

export enum Distortion {
  ALL_OR_NOTHING = 'all-or-nothing',
  CATASTROPHIZING = 'catastrophizing',
  EMOTIONAL_REASONING = 'emotional-reasoning',
  FORTUNE_TELLING = 'fortune-telling',
  LABELING = 'labeling',
  MAGNIFICATION_OF_THE_NEGATIVE = 'magnification-of-the-negative',
  MIND_READING = 'mind-reading',
  MINIMIZATION_OF_THE_POSITIVE = 'minimization-of-the-positive',
  OTHER_BLAMING = 'other-blaming',
  OVERGENERALIZATION = 'overgeneralization',
  SELF_BLAMING = 'self-blaming',
  SHOULD_STATEMENTS = 'should-statements',
}
export const DistortionCodec = C.enumeration(Distortion)
const CBTEntryCodec = Util.dexieJsonCodec(p => C.Codec.interface({
  type: C.exactly(EntryType.CBT),
  createdAt: p.date,
  updatedAt: p.date,
  problem: C.string,
  distortions: Util.SetCodec(DistortionCodec),
  challenge: C.string,
  alternative: C.string,
}))
export type CBTEntry = C.GetType<typeof CBTEntryCodec.Json>

const DBTEmotionRegulation5EntryCodec = Util.dexieJsonCodec(p => C.Codec.interface({
  type: C.exactly(EntryType.DBT_EMOTION_REGULATION_5),
  createdAt: p.date,
  updatedAt: p.date,
  emotion: C.Codec.interface({
    name: C.string,
    intensity: C.number,
  }),
  promptingEvent: C.Codec.interface({
    body: C.string,
    facts: C.string,
  }),
  interpretations: C.Codec.interface({
    body: C.string,
    facts: C.string,
    rewrite: C.string,
  }),
  threat: C.Codec.interface({
    body: C.string,
    facts: C.string,
    rewrite: C.string,
  }),
  catastrophe: C.Codec.interface({
    body: C.string,
    cope: C.string,
  }),
  fit: C.Codec.interface({
    rating: C.number,
    action: C.string,
  }),
}))
export type DBTEmotionRegulation5Entry = C.GetType<typeof DBTEmotionRegulation5EntryCodec.Json>

export const EntryCodec = {
  Json: C.oneOf([
    JournalEntryCodec.Json,
    CBTEntryCodec.Json,
    DBTEmotionRegulation5EntryCodec.Json,
  ]),
  Dexie: C.oneOf([
    JournalEntryCodec.Dexie,
    CBTEntryCodec.Dexie,
    DBTEmotionRegulation5EntryCodec.Dexie,
  ])
}
export type Entry = C.GetType<typeof EntryCodec.Json>

export type EntryId = string
