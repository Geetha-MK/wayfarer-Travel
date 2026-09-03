import { useParams, Link } from 'react-router-dom'
import { getDestinationBySlug, distanceKm } from '../data/destinations.js'
import DestinationImage from '../components/DestinationImage.jsx'
import FamousPlaceCard from '../components/FamousPlaceCard.jsx'
import WeatherWidget from '../components/WeatherWidget.jsx'
import LocationPicker from '../components/LocationPicker.jsx'
import ChatWidget from '../components/ChatWidget.jsx'
import ItineraryPlanner from '../components/ItineraryPlanner.jsx'
import NotFound from './NotFound.jsx'
import { useLocation } from '../context/LocationContext.jsx'

export default function DestinationDetail() {
  const { slug } = useParams()
  const destination = getDestinationBySlug(slug)
  const { location: visitorLocation } = useLocation()

  if (!destination) return <NotFound />

  const km = visitorLocation
    ? Math.round(distanceKm(visitorLocation.lat, visitorLocation.lon, destination.lat, destination.lon))
    : null

  return (
    <article>
      <header className="relative h-[52vh] min-h-[380px] w-full overflow-hidden bg-ink">
        <DestinationImage
          query={`${destination.name} ${destination.country} skyline`}
          alt={`${destination.name}, ${destination.country}`}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-10">
          <Link to="/explore" className="text-xs font-medium text-paper/70 hover:text-paper">
            ← All destinations
          </Link>
          <p className="mt-3 text-xs font-medium tracking-wide text-paper/70">{destination.region}</p>
          <h1 className="mt-1 font-display text-4xl text-paper sm:text-6xl">{destination.name}</h1>
          <p className="mt-1 text-paper/80">{destination.country}</p>
        </div>
      </header>

      <div className="container-page grid gap-12 py-12 sm:py-16 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <section>
            <h2 className="font-display text-2xl text-ink">About {destination.name}</h2>
            <p className="mt-3 max-w-2xl text-stone">{destination.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-medium text-stone">Best time to visit</dt>
                <dd className="mt-1 text-sm text-ink">{destination.bestTime}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-stone">Ideal stay</dt>
                <dd className="mt-1 text-sm text-ink">{destination.idealStay}</dd>
              </div>
              {km != null && (
                <div>
                  <dt className="text-xs font-medium text-stone">Distance from you</dt>
                  <dd className="mt-1 text-sm text-ink">{km.toLocaleString()} km</dd>
                </div>
              )}
            </dl>
          </section>

          <section aria-labelledby="weather-heading">
            <h2 id="weather-heading" className="font-display text-2xl text-ink">
              Weather right now
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1.5 text-xs font-medium text-stone">In {destination.name}</p>
                <WeatherWidget lat={destination.lat} lon={destination.lon} label={destination.name} />
              </div>
              {visitorLocation && (
                <div>
                  <p className="mb-1.5 text-xs font-medium text-stone">Where you are</p>
                  <WeatherWidget lat={visitorLocation.lat} lon={visitorLocation.lon} label={visitorLocation.label} />
                </div>
              )}
            </div>
          </section>

          <section aria-labelledby="places-heading">
            <h2 id="places-heading" className="font-display text-2xl text-ink">
              Famous places
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {destination.famousPlaces.map((place) => (
                <FamousPlaceCard key={place.name} place={place} destinationName={destination.name} />
              ))}
            </div>
          </section>

          <section aria-labelledby="itinerary-heading">
            <h2 id="itinerary-heading" className="sr-only">
              Itinerary planner
            </h2>
            <ItineraryPlanner destination={destination} />
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <LocationPicker />
          <div style={{ height: 460 }}>
            <ChatWidget destination={destination} />
          </div>
        </aside>
      </div>
    </article>
  )
}
