import { useMemo } from 'react'
import Hero from '../components/Hero.jsx'
import DestinationCard from '../components/DestinationCard.jsx'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations.js'

const STEPS = [
  {
    n: '1',
    title: 'Explore destinations',
    body: 'Search and filter real places, each with its own page of things worth knowing.',
  },
  {
    n: '2',
    title: 'Check the moment',
    body: "See live weather for the destination, and for wherever you're planning from.",
  },
  {
    n: '3',
    title: 'Ask the assistant',
    body: 'Ask how long to stay, when to go, or what not to miss — then generate a day-by-day itinerary.',
  },
]

export default function Landing() {
  const featured = useMemo(() => destinations.slice(0, 6), [])

  return (
    <>
      <Hero />

      <section id="how-it-works" className="container-page py-20 sm:py-28">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Three steps, one page.</h2>
          <p className="mt-3 text-stone">No account, no juggling ten tabs — everything you need to go from "where should I go" to a packed itinerary.</p>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="border-t border-stone/25 pt-5">
              <span className="font-display text-sm text-pine">{s.n}</span>
              <h3 className="mt-3 font-display text-xl text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-stone">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">Where people are going</h2>
          <Link to="/explore" className="text-sm font-medium text-pine hover:underline">
            View all destinations →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {featured.map((d, i) => (
            <div key={d.slug} className={i === 0 ? 'col-span-2 sm:col-span-2' : ''}>
              <DestinationCard destination={d} size={i === 0 ? 'lg' : 'md'} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
