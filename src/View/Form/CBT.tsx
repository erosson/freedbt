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
        <div><textarea id="problem" value={problem} onChange={(event) => setProblem(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
      </div>
      <div>
        <label><Localized id="cbt-distortions" /></label>
        {Model.distortions.map(distortion => (
          <div key={distortion}>
            <input type="checkbox" id={`distortion-${distortion}`} checked={distortions.has(distortion)} onChange={onDistortionChecked(distortion)} />
            <label htmlFor={`distortion-${distortion}`}><Localized id={`cbt-distortion-${distortion}`} /></label>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="challenge"><Localized id="cbt-challenge" /></label>
        <div><textarea id="challenge" value={challenge} onChange={(event) => setChallenge(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
      </div>
      <div>
        <label htmlFor="alternative"><Localized id="cbt-alternative" /></label>
        <div><textarea id="alternative" value={alternative} onChange={(event) => setAlternative(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
      </div>
      <button type="submit"><Localized id="submit" /></button>
    </form>
  )
}
export default Main
