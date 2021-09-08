import React from 'react'
import * as Model from '../../Model'

type Entry = Model.DBTEmotionRegulation5Entry

function Main(p: {entry?: Entry, onSubmit: (e:Entry) => void}) {
  const [emotionName, setEmotionName] = React.useState(p.entry?.emotion.name || '')
  const [emotionIntensity, setEmotionIntensity] = React.useState(p.entry?.emotion.intensity || 0)

  const [promptingEventBody, setPromptingEventBody] = React.useState(p.entry?.promptingEvent.body || '')
  const [promptingEventFacts, setPromptingEventFacts] = React.useState(p.entry?.promptingEvent.facts || '')

  const [interpretationsBody, setInterpretationsBody] = React.useState(p.entry?.interpretations.body || '')
  const [interpretationsFacts, setInterpretationsFacts] = React.useState(p.entry?.interpretations.facts || '')
  const [interpretationsRewrite, setInterpretationsRewrite] = React.useState(p.entry?.interpretations.rewrite || '')

  const [threatBody, setThreatBody] = React.useState(p.entry?.threat.body || '')
  const [threatFacts, setThreatFacts] = React.useState(p.entry?.threat.facts || '')
  const [threatRewrite, setThreatRewrite] = React.useState(p.entry?.threat.rewrite || '')

  const [catastropheBody, setCatastropheBody] = React.useState(p.entry?.catastrophe.body || '')
  const [catastropheCope, setCatastropheCope] = React.useState(p.entry?.catastrophe.cope || '')

  const [fitRating, setFitRating] = React.useState(p.entry?.fit.rating || 0)
  const [fitAction, setFitAction] = React.useState(p.entry?.fit.action || '')

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    const updatedAt = new Date()
    const entry: Entry = {
      type: 'dbt-emotion-regulation-5',
      createdAt: p.entry?.createdAt || updatedAt,
      updatedAt,
      emotion: {name: emotionName, intensity: emotionIntensity},
      promptingEvent: {body: promptingEventBody, facts: promptingEventFacts},
      interpretations: {body: interpretationsBody, facts: interpretationsFacts, rewrite: interpretationsRewrite},
      threat: {body: threatBody, facts: threatFacts, rewrite: threatRewrite},
      catastrophe: {body: catastropheBody, cope: catastropheCope},
      fit: {rating: fitRating, action: fitAction},
    }
    p.onSubmit(entry)
  }
  const bookLink = "https://www.amazon.com/Skills-Training-Handouts-Worksheets-Second/dp/1572307811"
  return (
    <form onSubmit={onSubmit}>
      <ol>
        <li>
          <h4>What emotion do I want to change?</h4>
          <div>
            <label htmlFor="emotionName">EMOTION NAME: </label>
            <div><input id="emotionName" type="text" value={emotionName} onChange={(event) => setEmotionName(event.target.value)} /></div>
          </div>
          <div>
            <label htmlFor="emotionIntensity">Intensity: </label>
            <input id="emotionIntensityNum" type="number" min="0" max="100" step="1" value={emotionIntensity} onChange={(event) => setEmotionIntensity(parseInt(event.target.value))} />
            <div><input id="emotionIntensity" type="range" min="0" max="100" step="1" value={emotionIntensity} onChange={(event) => setEmotionIntensity(parseInt(event.target.value))} /></div>
          </div>
        </li>
        <li>
          <h4>What is the PROMPTING EVENT for my emotional reaction?</h4>
          <div>
            <label htmlFor="promptingEventBody">DESCRIBE THE PROMPTING EVENT:</label>
            <div><textarea id="promptingEventBody" value={promptingEventBody} onChange={(event) => setPromptingEventBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="promptingEventFacts">CHECK THE FACTS!</label>
            <div><textarea id="promptingEventFacts" value={promptingEventFacts} onChange={(event) => setPromptingEventFacts(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
        </li>
        <li>
          <h4>What are my INTERPRETATIONS (thoughts, beliefs, etc.) about the facts?</h4>
          <div>
            <div><textarea id="interpretationsBody" value={interpretationsBody} onChange={(event) => setInterpretationsBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="interpretationsFacts">CHECK THE FACTS!</label>
            <div><textarea id="interpretationsFacts" value={interpretationsFacts} onChange={(event) => setInterpretationsFacts(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="interpretationsRewrite">REWRITE the facts, if necessary</label>
            <div><textarea id="interpretationsRewrite" value={interpretationsRewrite} onChange={(event) => setInterpretationsRewrite(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
        </li>
        <li>
          <h4>Am I assuming a THREAT?</h4>
          <div>
            <div><textarea id="threatBody" value={threatBody} onChange={(event) => setThreatBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="threatFacts">CHECK THE FACTS!</label>
            <div><textarea id="threatFacts" value={threatFacts} onChange={(event) => setThreatFacts(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="threatRewrite">REWRITE the facts, if necessary</label>
            <div><textarea id="threatRewrite" value={threatRewrite} onChange={(event) => setThreatRewrite(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
        </li>
        <li>
          <h4>What's the CATASTROPHE, even if the outcome I am worrying about does occur?</h4>
          <div>
            <div><textarea id="catastropheBody" value={catastropheBody} onChange={(event) => setCatastropheBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="catastropheCope">DESCRIBE WAYS TO COPE if the worst does happen.</label>
            <div><textarea id="catastropheCope" value={catastropheCope} onChange={(event) => setCatastropheCope(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
        </li>
        <li>
          <h4>Does my emotion (or its intensity or duration) FIT THE FACTS?</h4>
          <div>
            <label htmlFor="fitRating">Intensity: </label>
            <input id="fitRatingNum" type="number" min="0" max="5" step="1" value={fitRating} onChange={(event) => setFitRating(parseInt(event.target.value))} />
            <div><input id="fitRating" type="range" min="0" max="5" step="1" value={fitRating} onChange={(event) => setFitRating(parseInt(event.target.value))} /></div>
          </div>
          <div>
            <label htmlFor="fitAction">Describe what you did to check the facts:</label>
            <div><textarea id="fitAction" value={fitAction} onChange={(event) => setFitAction(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
        </li>
      </ol>
      <button type="submit">Submit</button>
      <p><small>Based on <a href={bookLink} target="_blank" rel="noreferrer"><cite>DBT Skills Training Handouts and Worksheets</cite></a>, by Marsha M. Linehan</small></p>
    </form>
  )
}
export default Main
