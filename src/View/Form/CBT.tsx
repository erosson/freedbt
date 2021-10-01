import React from 'react'
import { Localized } from '@fluent/react';

import { main as L, cbt as LP } from '../../gen/localization'
import * as Model from '../../Model'

type Entry = Model.CBTEntry

function CBTForm(p: { entry?: Entry, onSubmit: (e: Entry) => void }) {
  const [problem, setProblem] = React.useState(p.entry?.problem || '')
  const [distortions, setDistortions] = React.useState(p.entry?.distortions || new Set<Model.Distortion>([]))
  const [challenge, setChallenge] = React.useState(p.entry?.challenge || '')
  const [alternative, setAlternative] = React.useState(p.entry?.alternative || '')

  const onDistortionChecked = (distortion: Model.Distortion) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const ds = new Set(distortions)
    event.target.checked
      ? ds.add(distortion)
      : ds.delete(distortion)
    setDistortions(ds)
  }
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    const updatedAt = new Date()
    const entry: Entry = {
      type: Model.EntryType.CBT,
      createdAt: p.entry?.createdAt || updatedAt,
      updatedAt,
      problem,
      distortions,
      challenge,
      alternative,
    }
    p.onSubmit(entry)
  }
  return (
    <form onSubmit={onSubmit}>
      <ul>
        <li>
          <label htmlFor="problem"><LP.Problem /></label>
          <div>
            <LP.ProblemBody attrs={{ placeholder: true }}>
              <textarea id="problem" value={problem} onChange={(event) => setProblem(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} />
            </LP.ProblemBody>
          </div>
        </li>
        <li>
          <label><LP.Distortions /></label>
          {Object.values(Model.Distortion).map(distortion => (
            <div key={distortion}>
              <label htmlFor={`distortion-${distortion}`}>
                <div>
                  <input type="checkbox" id={`distortion-${distortion}`} checked={distortions.has(distortion)} onChange={onDistortionChecked(distortion)} />
                  {cbtIcon(distortion)}
                  <Localized id={`distortion-${distortion}`} />
                </div>
                <div><i><Localized id={`distortion-example-${distortion}`} /></i></div>
              </label>
            </div>
          ))}
        </li>
        <li>
          <label htmlFor="challenge"><LP.Challenge /></label>
          <div>
            <LP.ChallengeBody attrs={{ placeholder: true }}>
              <textarea id="challenge" value={challenge} onChange={(event) => setChallenge(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} />
            </LP.ChallengeBody>
          </div>
        </li>
        <li>
          <label htmlFor="alternative"><LP.Alternative /></label>
          <div>
            <LP.AlternativeBody attrs={{ placeholder: true }}>
              <textarea id="alternative" value={alternative} onChange={(event) => setAlternative(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} />
            </LP.AlternativeBody>
          </div>
        </li>
      </ul>
      <button type="submit"><L.Submit /></button>
    </form>
  )
}

function cbtIcon(distortion: Model.Distortion): string {
  switch (distortion) {
    case Model.Distortion.ALL_OR_NOTHING: return '🌓'
    case Model.Distortion.CATASTROPHIZING: return '🤯'
    case Model.Distortion.EMOTIONAL_REASONING: return '🎭'
    case Model.Distortion.FORTUNE_TELLING: return '🔮'
    case Model.Distortion.LABELING: return '🏷'
    case Model.Distortion.MAGNIFICATION_OF_THE_NEGATIVE: return '👎'
    case Model.Distortion.MIND_READING: return '🧠'
    case Model.Distortion.MINIMIZATION_OF_THE_POSITIVE: return '👍'
    case Model.Distortion.OTHER_BLAMING: return '🧛'
    case Model.Distortion.OVERGENERALIZATION: return '👯'
    case Model.Distortion.SELF_BLAMING: return '👁'
    case Model.Distortion.SHOULD_STATEMENTS: return '✨'
  }
}
export default CBTForm
