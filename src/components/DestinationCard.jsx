import { Link } from 'react-router-dom'
import DestinationImage from './DestinationImage.jsx'

// `size` varies the card proportions so the grid isn't a uniform SaaS-card wall.
export default function DestinationCard({ destination, size = 'md' }) {
  const heights = {
    sm: 'aspect-[4/5]',
    md: 'aspect-[3/4]',
    lg: 'aspect-[4/3]',
  }

  return (
    <Link
      to={`/destination/${destination.slug}`}
      className="group relative block overflow-hidden rounded-sm border border-stone/15 bg-ink"
    >
      <div className={`relative w-full ${heights[size]}`}>
        <DestinationImage
          query={`${destination.name} ${destination.country} landmark`}
          alt={`${destination.name}, ${destination.country}`}
          className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[11px] font-medium tracking-wide text-paper/70">{destination.region}</p>
        <h3 className="mt-1 font-display text-2xl leading-tight text-paper">{destination.name}</h3>
        <p className="mt-1 text-sm text-paper/75">{destination.country}</p>
        <p className="clamp-2 mt-2 text-sm text-paper/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {destination.tagline}
        </p>
      </div>
    </Link>
  )
}
