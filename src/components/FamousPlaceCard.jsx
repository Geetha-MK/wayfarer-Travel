import DestinationImage from './DestinationImage.jsx'

export default function FamousPlaceCard({ place, destinationName }) {
  return (
    <article className="group overflow-hidden rounded-sm border border-stone/15 bg-paper">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <DestinationImage
          query={`${place.name} ${destinationName}`}
          alt={place.name}
          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-pine">{place.type}</p>
        <h4 className="mt-1 font-display text-lg text-ink">{place.name}</h4>
        <p className="clamp-3 mt-1.5 text-sm text-stone">{place.note}</p>
      </div>
    </article>
  )
}
