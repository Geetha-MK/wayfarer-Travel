import { useMemo, useState } from 'react'
import { destinations, regions, distanceKm } from '../data/destinations.js'
import DestinationCard from '../components/DestinationCard.jsx'
import SearchFilterBar from '../components/SearchFilterBar.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useLocation } from '../context/LocationContext.jsx'

export default function Explore() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('all')
  const { location } = useLocation()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = destinations.filter((d) => {
      const matchesRegion = region === 'all' || d.region === region
      const haystack = `${d.name} ${d.country} ${d.tagline} ${d.tags.join(' ')}`.toLowerCase()
      const matchesQuery = !q || haystack.includes(q)
      return matchesRegion && matchesQuery
    })

    if (location) {
      list = [...list].sort(
        (a, b) =>
          distanceKm(location.lat, location.lon, a.lat, a.lon) -
          distanceKm(location.lat, location.lon, b.lat, b.lon)
      )
    }
    return list
  }, [query, region, location])

  return (
    <div className="container-page py-12 sm:py-16">
      <div className="max-w-xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Explore</h1>
        <p className="mt-3 text-stone">
          {location
            ? `Sorted by distance from ${location.label}.`
            : 'Search by name, or filter by region. Share your location on a destination page to see distance and local weather.'}
        </p>
      </div>

      <div className="mt-8">
        <SearchFilterBar
          query={query}
          onQueryChange={setQuery}
          region={region}
          onRegionChange={setRegion}
          regions={regions}
          resultCount={filtered.length}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No destinations match that search"
            message="Try a different keyword, or clear the region filter."
            action={
              <button
                className="btn-secondary mt-2"
                onClick={() => {
                  setQuery('')
                  setRegion('all')
                }}
              >
                Clear filters
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filtered.map((d) => (
            <DestinationCard key={d.slug} destination={d} size="sm" />
          ))}
        </div>
      )}
    </div>
  )
}
