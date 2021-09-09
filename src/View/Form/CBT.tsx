import React from 'react'
import * as Model from '../../Model'
import { Localized } from '@fluent/react';

type Entry = Model.CBTEntry

function Main(p: {entry?: Entry, onSubmit: (e:Entry) => void}) {
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
      type: 'cbt',
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
      <div>
        <label htmlFor="problem"><Localized id="cbt-problem" /></label>
        <div><Localized id="cbt-problem-body" attrs={{placeholder: true}}>
          <textarea id="problem" value={problem} onChange={(event) => setProblem(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} />
        </Localized></div>
      </div>
      <div>
        <label><Localized id="cbt-distortions" /></label>
        {Model.distortions.map(distortion => (
          <div key={distortion}>
            <input type="checkbox" id={`distortion-${distortion}`} checked={distortions.has(distortion)} onChange={onDistortionChecked(distortion)} />
            <label htmlFor={`distortion-${distortion}`}>
              {cbtIcon({distortion: distortion})}
              <Localized id={`cbt-distortion-${distortion}`} />
              <div><i><Localized id={`cbt-distortion-example-${distortion}`} /></i></div>
            </label>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="challenge"><Localized id="cbt-challenge" /></label>
        <div><Localized id="cbt-challenge-body" attrs={{placeholder: true}}>
          <textarea id="challenge" value={challenge} onChange={(event) => setChallenge(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} />
        </Localized></div>
      </div>
      <div>
        <label htmlFor="alternative"><Localized id="cbt-alternative" /></label>
        <div><Localized id="cbt-alternative-body" attrs={{placeholder: true}}>
          <textarea id="alternative" value={alternative} onChange={(event) => setAlternative(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} />
        </Localized></div>
      </div>
      <button type="submit"><Localized id="submit" /></button>
    </form>
  )
}
function cbtIcon(p: {distortion: Model.Distortion}):string {
  switch (p.distortion) {
    case 'all-or-nothing': return '🌓'
    case 'catastrophizing': return '🤯'
    case 'emotional-reasoning': return '🎭'
    case 'fortune-telling': return '🔮'
    case 'labeling': return '🏷'
    case 'magnification-of-the-negative': return '👎'
    case 'mind-reading': return '🧠'
    case 'minimization-of-the-positive': return '👍'
    case 'other-blaming': return '🧛'
    case 'overgeneralization': return '👯'
    case 'self-blaming': return '👁'
    case 'should-statements': return '✨'
  }
}
export default Main
