export default function ItineraryDay({ day }) {
  return (
    <div className="relative border-l border-stone/25 pl-6">
      <div className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-pine bg-paper" />
      <p className="text-xs font-medium uppercase tracking-wide text-pine">Day {day.day}</p>
      <h4 className="mt-0.5 font-display text-xl text-ink">{day.theme}</h4>
      <ul className="mt-3 space-y-3">
        {day.items?.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="w-16 shrink-0 pt-0.5 text-xs font-medium text-stone">{item.time}</span>
            <div>
              <p className="font-medium text-ink">{item.activity}</p>
              {item.detail && <p className="mt-0.5 text-stone">{item.detail}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
