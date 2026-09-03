import { useState } from 'react'
import { generateItinerary, GeminiError } from '../api/gemini.js'
import ItineraryDay from './ItineraryDay.jsx'

const PACES = ['relaxed', 'balanced', 'packed']

export default function ItineraryPlanner({ destination }) {
  const [days, setDays] = useState(3)
  const [interests, setInterests] = useState('')
  const [pace, setPace] = useState('balanced')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorKind, setErrorKind] = useState(null)
  const [itinerary, setItinerary] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorKind(null)
    try {
      const result = await generateItinerary(destination, { days, interests, pace })
      setItinerary(result)
      setStatus('success')
    } catch (err) {
      setErrorKind(err instanceof GeminiError ? err.message : 'request_failed')
      setStatus('error')
    }
  }

  const errorText = {
    missing_key: 'Add a Gemini API key to your .env file to generate itineraries.',
    invalid_key: 'The Gemini API key looks invalid — check your .env file.',
    bad_json: "The assistant's response couldn't be read — try generating again.",
    request_failed: "Couldn't reach the assistant. Check your connection and try again.",
  }[errorKind] || "Couldn't reach the assistant. Check your connection and try again."

  return (
    <div className="rounded-sm border border-stone/20 bg-paper p-6">
      <h3 className="font-display text-2xl text-ink">Plan your trip</h3>
      <p className="mt-1 text-sm text-stone">
        Tell the assistant your pace and interests — it'll build a day-by-day plan for {destination.name}.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="days" className="mb-1.5 block text-xs font-medium text-stone">
            Trip length
          </label>
          <select
            id="days"
            className="field"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'day' : 'days'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pace" className="mb-1.5 block text-xs font-medium text-stone">
            Pace
          </label>
          <select id="pace" className="field" value={pace} onChange={(e) => setPace(e.target.value)}>
            {PACES.map((p) => (
              <option key={p} value={p}>
                {p[0].toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="interests" className="mb-1.5 block text-xs font-medium text-stone">
            Interests (optional)
          </label>
          <input
            id="interests"
            className="field"
            placeholder="food, hiking, art…"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </div>

        <div className="sm:col-span-3">
          <button type="submit" className="btn-primary" disabled={status === 'loading'}>
            {status === 'loading' ? 'Building itinerary…' : 'Generate itinerary'}
          </button>
        </div>
      </form>

      {status === 'error' && (
        <p className="mt-5 rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink" role="alert">
          {errorText}
        </p>
      )}

      {status === 'loading' && (
        <div className="mt-6 space-y-4" aria-busy="true" aria-label="Generating itinerary">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulseSoft rounded-sm bg-stone/10" />
          ))}
        </div>
      )}

      {status === 'success' && itinerary && (
        <div className="mt-8 border-t border-stone/15 pt-6">
          <h4 className="font-display text-2xl text-ink">{itinerary.title}</h4>
          <p className="mt-1 text-sm text-stone">{itinerary.summary}</p>
          <div className="mt-6 space-y-8">
            {itinerary.days?.map((day) => (
              <ItineraryDay key={day.day} day={day} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
