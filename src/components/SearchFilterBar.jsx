export default function SearchFilterBar({ query, onQueryChange, region, onRegionChange, regions, resultCount }) {
  return (
    <div className="flex flex-col gap-4 border-b border-stone/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 sm:max-w-sm">
          <label htmlFor="destination-search" className="mb-1.5 block text-xs font-medium text-stone">
            Search destinations
          </label>
          <input
            id="destination-search"
            type="search"
            className="field"
            placeholder="Try “Kyoto” or “mountains”"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>

        <div className="sm:w-56">
          <label htmlFor="region-filter" className="mb-1.5 block text-xs font-medium text-stone">
            Region
          </label>
          <select
            id="region-filter"
            className="field"
            value={region}
            onChange={(e) => onRegionChange(e.target.value)}
          >
            <option value="all">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-stone" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'destination' : 'destinations'}
      </p>
    </div>
  )
}
