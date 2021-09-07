import React from 'react'
import * as Model from '../../Model'
import * as DBMemory from '../../DB/Memory'
import Dexie from 'dexie'
import {Link} from 'react-router-dom'
import * as Router from 'react-router-dom'

function Main(p: {dispatch: Model.Dispatch}) {
  const [problem, setProblem] = React.useState('')
  const [challenge, setChallenge] = React.useState('')
  const [distortions, setDistortions] = React.useState(new Set<Model.Distortion>([]))
  const [alternative, setAlternative] = React.useState('')
  const created = React.useRef(false)
  const onCreate = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const createdAt = new Date()
    const data: Model.CBTEntry = {type: 'cbt', createdAt, updatedAt: createdAt, problem, challenge, alternative, distortions: new Set([])}
    p.dispatch({type: 'entry.create', data})
    created.current = true
  }
  const onDistortionChecked = (distortion: Model.Distortion) => (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? distortions.add(distortion)
      : distortions.delete(distortion)
    setDistortions(new Set(distortions))
  }
  if (created.current) {
    return <Router.Redirect to="/" />
  }
  return (
    <div className="App">
      <h3>The best journal ever</h3>
      <form onSubmit={onCreate}>
        <div>
          <label htmlFor="problem">Automatic thought</label>
          <div><textarea id="problem" value={problem} onChange={(event) => setProblem(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
        </div>
        <div>
          <label>Cognitive distortions</label>
          {Model.distortions.map(distortion => (
            <div key={distortion}>
              <input type="checkbox" id={`distortion-${distortion}`} checked={distortions.has(distortion)} onChange={onDistortionChecked(distortion)} />
              <label htmlFor={`distortion-${distortion}`}>{distortion}</label>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="challenge">Challenge the thought</label>
          <div><textarea id="challenge" value={challenge} onChange={(event) => setChallenge(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
        </div>
        <div>
          <label htmlFor="alternative">Write an alternative thought</label>
          <div><textarea id="alternative" value={alternative} onChange={(event) => setAlternative(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <p><Link to="/">Home</Link></p>
    </div>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  return <Main dispatch={dispatch} />
}
