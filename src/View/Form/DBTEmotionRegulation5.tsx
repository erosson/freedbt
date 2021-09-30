import React from 'react'

import * as Model from '../../Model'
import { main as L } from '../../gen/localization'

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
      <h4><L.DbtEmotionRegulation5Title /></h4>
      <p><L.DbtEmotionRegulation5Desc /></p>
      <ol>
        <li>
          <h4><L.DbtEmotionRegulation5Emotion /></h4>
          <div>
            <label htmlFor="emotionName"><L.DbtEmotionRegulation5EmotionName /></label>
            <div><input id="emotionName" type="text" value={emotionName} onChange={(event) => setEmotionName(event.target.value)} /></div>
          </div>
          <div>
            <label htmlFor="emotionIntensity"><L.DbtEmotionRegulation5EmotionIntensity /></label>
            <input id="emotionIntensityNum" type="number" min="0" max="100" step="1" value={emotionIntensity} onChange={(event) => setEmotionIntensity(parseInt(event.target.value))} />
            <div><input id="emotionIntensity" type="range" min="0" max="100" step="1" value={emotionIntensity} onChange={(event) => setEmotionIntensity(parseInt(event.target.value))} /></div>
          </div>
        </li>
        <li>
          <h4><L.DbtEmotionRegulation5Prompting /></h4>
          <div>
            <label htmlFor="promptingEventBody">
              <b><L.DbtEmotionRegulation5PromptingBody /></b>
              <p><L.DbtEmotionRegulation5PromptingBodyDesc /></p>
            </label>
            <div><textarea id="promptingEventBody" value={promptingEventBody} onChange={(event) => setPromptingEventBody(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="promptingEventFacts">
              <b><L.DbtEmotionRegulation5PromptingFacts /></b>
              <p><L.DbtEmotionRegulation5PromptingFactsDesc /></p>
            </label>
            <div><textarea id="promptingEventFacts" value={promptingEventFacts} onChange={(event) => setPromptingEventFacts(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
        </li>
        <li>
          <h4><L.DbtEmotionRegulation5Interpretations /></h4>
          <p><L.DbtEmotionRegulation5InterpretationsDesc /></p>
          <div>
            <div><textarea id="interpretationsBody" value={interpretationsBody} onChange={(event) => setInterpretationsBody(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="interpretationsFacts">
              <b><L.DbtEmotionRegulation5InterpretationsFacts /></b>
              <p><L.DbtEmotionRegulation5InterpretationsFactsDesc /></p>
            </label>
            <div><textarea id="interpretationsFacts" value={interpretationsFacts} onChange={(event) => setInterpretationsFacts(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="interpretationsRewrite"><L.DbtEmotionRegulation5InterpretationsRewrite /></label>
            <div><textarea id="interpretationsRewrite" value={interpretationsRewrite} onChange={(event) => setInterpretationsRewrite(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
        </li>
        <li>
          <h4><L.DbtEmotionRegulation5Threat /></h4>
          <p><L.DbtEmotionRegulation5ThreatDesc /></p>
          <div>
            <div><textarea id="threatBody" value={threatBody} onChange={(event) => setThreatBody(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="threatFacts">
              <b><L.DbtEmotionRegulation5ThreatFacts /></b>
              <p><L.DbtEmotionRegulation5ThreatFactsDesc /></p>
            </label>
            <div><textarea id="threatFacts" value={threatFacts} onChange={(event) => setThreatFacts(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="threatRewrite"><L.DbtEmotionRegulation5ThreatRewrite /></label>
            <div><textarea id="threatRewrite" value={threatRewrite} onChange={(event) => setThreatRewrite(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
        </li>
        <li>
          <h4><L.DbtEmotionRegulation5Catastrophe /></h4>
          <p><L.DbtEmotionRegulation5CatastropheDesc /></p>
          <div>
            <div><textarea id="catastropheBody" value={catastropheBody} onChange={(event) => setCatastropheBody(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
          <div>
            <label htmlFor="catastropheCope"><L.DbtEmotionRegulation5CatastropheCope /></label>
            <div><textarea id="catastropheCope" value={catastropheCope} onChange={(event) => setCatastropheCope(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
        </li>
        <li>
          <h4><L.DbtEmotionRegulation5Fit /></h4>
          <div>
            <label htmlFor="fitRating"><L.DbtEmotionRegulation5FitRating /></label>
            <input id="fitRatingNum" type="number" min="0" max="5" step="1" value={fitRating} onChange={(event) => setFitRating(parseInt(event.target.value))} />
            <div><input id="fitRating" type="range" min="0" max="5" step="1" value={fitRating} onChange={(event) => setFitRating(parseInt(event.target.value))} /></div>
            <p><L.DbtEmotionRegulation5FitRatingDesc /></p>
          </div>
          <div>
            <label htmlFor="fitAction"><L.DbtEmotionRegulation5FitAction /></label>
            <div><textarea id="fitAction" value={fitAction} onChange={(event) => setFitAction(event.target.value)} style={{ width: '100%', maxWidth: '80em', height: '10em' }} /></div>
          </div>
        </li>
      </ol>
      <button type="submit"><L.Submit /></button>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <p><small><L.DbtEmotionRegulation5Cite elems={{ a: <a href={bookLink} target="_blank" rel="noreferrer" style={{ fontStyle: 'italic' }} /> }}><span /></L.DbtEmotionRegulation5Cite></small></p>
    </form>
  )
}
export default DBTForm
