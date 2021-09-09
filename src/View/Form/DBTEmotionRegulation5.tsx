import React from 'react'
import * as Model from '../../Model'
import { Localized } from '@fluent/react';

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
  const prefix = 'dbt-emotion-regulation-5'
  return (
    <form onSubmit={onSubmit}>
      <h4><Localized id={`${prefix}-title`} /></h4>
      <p><Localized id={`${prefix}-desc`} /></p>
      <ol>
        <li>
          <h4><Localized id={`${prefix}-emotion`} /></h4>
          <div>
            <label htmlFor="emotionName"><Localized id={`${prefix}-emotion-name`} /></label>
            <div><input id="emotionName" type="text" value={emotionName} onChange={(event) => setEmotionName(event.target.value)} /></div>
          </div>
          <div>
            <label htmlFor="emotionIntensity"><Localized id={`${prefix}-emotion-intensity`} /></label>
            <input id="emotionIntensityNum" type="number" min="0" max="100" step="1" value={emotionIntensity} onChange={(event) => setEmotionIntensity(parseInt(event.target.value))} />
            <div><input id="emotionIntensity" type="range" min="0" max="100" step="1" value={emotionIntensity} onChange={(event) => setEmotionIntensity(parseInt(event.target.value))} /></div>
          </div>
        </li>
        <li>
          <h4><Localized id={`${prefix}-prompting`} /></h4>
          <div>
            <label htmlFor="promptingEventBody">
              <b><Localized id={`${prefix}-prompting-body`} /></b>
              <p><Localized id={`${prefix}-prompting-body-desc`} /></p>
            </label>
            <div><textarea id="promptingEventBody" value={promptingEventBody} onChange={(event) => setPromptingEventBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="promptingEventFacts">
              <b><Localized id={`${prefix}-prompting-facts`} /></b>
              <p><Localized id={`${prefix}-prompting-facts-desc`} /></p>
            </label>
            <div><textarea id="promptingEventFacts" value={promptingEventFacts} onChange={(event) => setPromptingEventFacts(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
        </li>
        <li>
          <h4><Localized id={`${prefix}-interpretations`} /></h4>
          <p><Localized id={`${prefix}-interpretations-desc`} /></p>
          <div>
            <div><textarea id="interpretationsBody" value={interpretationsBody} onChange={(event) => setInterpretationsBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="interpretationsFacts">
              <b><Localized id={`${prefix}-interpretations-facts`} /></b>
              <p><Localized id={`${prefix}-interpretations-facts-desc`} /></p>
            </label>
            <div><textarea id="interpretationsFacts" value={interpretationsFacts} onChange={(event) => setInterpretationsFacts(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="interpretationsRewrite"><Localized id={`${prefix}-interpretations-rewrite`} /></label>
            <div><textarea id="interpretationsRewrite" value={interpretationsRewrite} onChange={(event) => setInterpretationsRewrite(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
        </li>
        <li>
          <h4><Localized id={`${prefix}-threat`} /></h4>
          <p><Localized id={`${prefix}-threat-desc`} /></p>
          <div>
            <div><textarea id="threatBody" value={threatBody} onChange={(event) => setThreatBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="threatFacts">
              <b><Localized id={`${prefix}-threat-facts`} /></b>
              <p><Localized id={`${prefix}-threat-facts-desc`} /></p>
            </label>
            <div><textarea id="threatFacts" value={threatFacts} onChange={(event) => setThreatFacts(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="threatRewrite"><Localized id={`${prefix}-threat-rewrite`} /></label>
            <div><textarea id="threatRewrite" value={threatRewrite} onChange={(event) => setThreatRewrite(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
        </li>
        <li>
          <h4><Localized id={`${prefix}-catastrophe`} /></h4>
          <p><Localized id={`${prefix}-catastrophe-desc`} /></p>
          <div>
            <div><textarea id="catastropheBody" value={catastropheBody} onChange={(event) => setCatastropheBody(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
          <div>
            <label htmlFor="catastropheCope"><Localized id={`${prefix}-catastrophe-cope`} /></label>
            <div><textarea id="catastropheCope" value={catastropheCope} onChange={(event) => setCatastropheCope(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
        </li>
        <li>
          <h4><Localized id={`${prefix}-fit`} /></h4>
          <div>
            <label htmlFor="fitRating"><Localized id={`${prefix}-fit-rating`} /></label>
            <input id="fitRatingNum" type="number" min="0" max="5" step="1" value={fitRating} onChange={(event) => setFitRating(parseInt(event.target.value))} />
            <div><input id="fitRating" type="range" min="0" max="5" step="1" value={fitRating} onChange={(event) => setFitRating(parseInt(event.target.value))} /></div>
            <p><Localized id={`${prefix}-fit-rating-desc`} /></p>
          </div>
          <div>
            <label htmlFor="fitAction"><Localized id={`${prefix}-fit-action`} /></label>
            <div><textarea id="fitAction" value={fitAction} onChange={(event) => setFitAction(event.target.value)} style={{width: '100%', maxWidth: '80em', height: '10em'}} /></div>
          </div>
        </li>
      </ol>
      <button type="submit"><Localized id={`submit`} /></button>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <p><small><Localized id={`${prefix}-cite`} elems={{a: <a href={bookLink} target="_blank" rel="noreferrer" style={{fontStyle: 'italic'}} />}}><span /></Localized></small></p>
    </form>
  )
}
export default Main
