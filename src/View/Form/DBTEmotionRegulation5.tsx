import React from 'react'

import * as Model from '../../Model'
import { main as L, dbtEmotionRegulation5 as LP } from '../../gen/localization'

type Entry = Model.DBTEmotionRegulation5Entry

function DBTForm(p: { entry?: Entry, onSubmit: (e: Entry) => void }) {
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
      type: Model.EntryType.DBT_EMOTION_REGULATION_5,
      createdAt: p.entry?.createdAt || updatedAt,
      updatedAt,
      emotion: { name: emotionName, intensity: emotionIntensity },
      promptingEvent: { body: promptingEventBody, facts: promptingEventFacts },
      interpretations: { body: interpretationsBody, facts: interpretationsFacts, rewrite: interpretationsRewrite },
      threat: { body: threatBody, facts: threatFacts, rewrite: threatRewrite },
      catastrophe: { body: catastropheBody, cope: catastropheCope },
      fit: { rating: fitRating, action: fitAction },
    }
    p.onSubmit(entry)
  }
  const bookLink = "https://www.amazon.com/Skills-Training-Handouts-Worksheets-Second/dp/1572307811"
  return (
    <form onSubmit={onSubmit}>
      <h4><LP.Title /></h4>
      <p><LP.Desc /></p>
      <ol>
        <li>
          <h4><LP.Emotion /></h4>
          <div>
            <label htmlFor="emotionName"><LP.EmotionName /></label>
            <div><input id="emotionName" type="text" value={emotionName} onChange={(event) => setEmotionName(event.target.value)} /></div>
          </div>
          <div>
            <label htmlFor="emotionIntensity"><LP.EmotionIntensity /></label>
            <input id="emotionIntensityNum" type="number" min="0" max="100" step="1" value={emotionIntensity} onChange={(event) => setEmotionIntensity(parseInt(event.target.value))} />
            <div><input id="emotionIntensity" type="range" min="0" max="100" step="1" value={emotionIntensity} onChange={(event) => setEmotionIntensity(parseInt(event.target.value))} /></div>
          </div>
        </li>
        <li>
          <h4><LP.Prompting /></h4>
          <div>
            <label htmlFor="promptingEventBody">
              <b><LP.PromptingBody /></b>
              <p><LP.PromptingBodyDesc /></p>
            </label>
            <div><textarea id="promptingEventBody" value={promptingEventBody} onChange={(event) => setPromptingEventBody(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="promptingEventFacts">
              <b><LP.PromptingFacts /></b>
              <p><LP.PromptingFactsDesc /></p>
            </label>
            <div><textarea id="promptingEventFacts" value={promptingEventFacts} onChange={(event) => setPromptingEventFacts(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
        </li>
        <li>
          <h4><LP.Interpretations /></h4>
          <p><LP.InterpretationsDesc /></p>
          <div>
            <div><textarea id="interpretationsBody" value={interpretationsBody} onChange={(event) => setInterpretationsBody(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="interpretationsFacts">
              <b><LP.InterpretationsFacts /></b>
              <p><LP.InterpretationsFactsDesc /></p>
            </label>
            <div><textarea id="interpretationsFacts" value={interpretationsFacts} onChange={(event) => setInterpretationsFacts(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="interpretationsRewrite"><LP.InterpretationsRewrite /></label>
            <div><textarea id="interpretationsRewrite" value={interpretationsRewrite} onChange={(event) => setInterpretationsRewrite(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
        </li>
        <li>
          <h4><LP.Threat /></h4>
          <p><LP.ThreatDesc /></p>
          <div>
            <div><textarea id="threatBody" value={threatBody} onChange={(event) => setThreatBody(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="threatFacts">
              <b><LP.ThreatFacts /></b>
              <p><LP.ThreatFactsDesc /></p>
            </label>
            <div><textarea id="threatFacts" value={threatFacts} onChange={(event) => setThreatFacts(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="threatRewrite"><LP.ThreatRewrite /></label>
            <div><textarea id="threatRewrite" value={threatRewrite} onChange={(event) => setThreatRewrite(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
        </li>
        <li>
          <h4><LP.Catastrophe /></h4>
          <p><LP.CatastropheDesc /></p>
          <div>
            <div><textarea id="catastropheBody" value={catastropheBody} onChange={(event) => setCatastropheBody(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="catastropheCope"><LP.CatastropheCope /></label>
            <div><textarea id="catastropheCope" value={catastropheCope} onChange={(event) => setCatastropheCope(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
        </li>
        <li>
          <h4><LP.Fit /></h4>
          <div>
            <label htmlFor="fitRating"><LP.FitRating /></label>
            <input id="fitRatingNum" type="number" min="0" max="5" step="1" value={fitRating} onChange={(event) => setFitRating(parseInt(event.target.value))} />
            <div><input id="fitRating" type="range" min="0" max="5" step="1" value={fitRating} onChange={(event) => setFitRating(parseInt(event.target.value))} /></div>
            <p><LP.FitRatingDesc /></p>
          </div>
          <div>
            <label htmlFor="fitAction"><LP.FitAction /></label>
            <div><textarea id="fitAction" value={fitAction} onChange={(event) => setFitAction(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
        </li>
      </ol>
      <button type="submit"><L.Submit /></button>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <p><small><LP.Cite elems={{ a: <a href={bookLink} target="_blank" rel="noreferrer" style={{ fontStyle: 'italic' }} /> }}><span /></LP.Cite></small></p>
    </form>
  )
}
export default DBTForm
