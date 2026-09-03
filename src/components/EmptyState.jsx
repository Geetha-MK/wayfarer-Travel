export default function EmptyState({ title, message, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-sm border border-dashed border-stone/30 px-6 py-16 text-center">
      <h3 className="font-display text-xl text-ink">{title}</h3>
      {message && <p className="max-w-sm text-sm text-stone">{message}</p>}
      {action}
    </div>
  )
}
