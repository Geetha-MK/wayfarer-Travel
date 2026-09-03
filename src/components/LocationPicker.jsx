import { useState } from 'react'
import { useLocation } from '../context/LocationContext.jsx'
import { geocodePlace, WeatherApiError } from '../api/weather.js'

// Lets a visitor either share their browser location or search for a place by
// name — the app is useful either way, per the assignment's "location awareness" spec.
export default function LocationPicker() {
  const { location, permission, requestBrowserLocation, setManualLocation } = useLocation()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searchState, setSearchState] = useState('idle') // idle | loading | success | error | empty
  const [geoLoading, setGeoLoading] = useState(false)

  async function handleUseLocation() {
    setGeoLoading(true)
    await requestBrowserLocation()
    setGeoLoading(false)
  }

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setSearchState('loading')
    try {
      const places = await geocodePlace(query.trim())
      setResults(places)
      setSearchState(places.length ? 'success' : 'empty')
    } catch (err) {
      setSearchState('error')
    }
  }

  return (
    <div className="rounded-sm border border-stone/20 bg-paper p-5">
      <h3 className="font-display text-lg text-ink">Set your location</h3>
      <p className="mt-1 text-sm text-stone">
        Used to show weather where you are, and how far this place is from home.
      </p>

      {location && (
        <p className="mt-3 rounded-sm bg-pine/10 px-3 py-2 text-sm text-pine-dark">
          Using: <span className="font-medium">{location.label}</span>
        </p>
      )}

      <button
        type="button"
        onClick={handleUseLocation}
        disabled={geoLoading}
        className="btn-secondary mt-4 w-full disabled:opacity-60"
      >
        {geoLoading ? 'Locating…' : 'Share my location'}
      </button>

      {permission === 'denied' && (
        <p className="mt-2 text-xs text-gold-light bg-ink/90 rounded-sm px-3 py-2 text-paper">
          Location permission was denied. You can still search for a place below.
        </p>
      )}
      {permission === 'unsupported' && (
        <p className="mt-2 text-xs text-stone">Your browser doesn't support geolocation. Search instead.</p>
      )}

      <div className="my-4 flex items-center gap-3 text-xs text-stone">
        <span className="h-px flex-1 bg-stone/20" />
        or search
        <span className="h-px flex-1 bg-stone/20" />
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <label htmlFor="place-search" className="sr-only">
          Search for a city
        </label>
        <input
          id="place-search"
          type="text"
          className="field"
          placeholder="e.g. Bengaluru"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn-secondary shrink-0 !px-4">
          Search
        </button>
      </form>

      {searchState === 'loading' && <p className="mt-3 text-sm text-stone">Searching…</p>}
      {searchState === 'error' && (
        <p className="mt-3 text-sm text-gold">
          Couldn't search right now — check your OpenWeather API key in .env.
        </p>
      )}
      {searchState === 'empty' && (
        <p className="mt-3 text-sm text-stone">No places matched “{query}”. Try a different spelling.</p>
      )}
      {searchState === 'success' && (
        <ul className="mt-3 space-y-1">
          {results.map((r, i) => (
            <li key={`${r.lat}-${r.lon}-${i}`}>
              <button
                type="button"
                onClick={() => {
                  setManualLocation({
                    lat: r.lat,
                    lon: r.lon,
                    label: [r.name, r.state, r.country].filter(Boolean).join(', '),
                  })
                  setResults([])
                  setSearchState('idle')
                  setQuery('')
                }}
                className="w-full rounded-sm px-3 py-2 text-left text-sm text-ink hover:bg-ink/5"
              >
                {[r.name, r.state, r.country].filter(Boolean).join(', ')}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
