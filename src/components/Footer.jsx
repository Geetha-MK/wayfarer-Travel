export default function Footer() {
  return (
    <footer className="border-t border-stone/15 bg-ink text-paper/80">
      <div className="container-page flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-paper">Wayfarer</p>
          <p className="mt-1 max-w-sm text-sm text-paper/60">
            A field guide for wherever you're headed next. Weather, places, and a planning
            assistant, in one page.
          </p>
        </div>
        <p className="text-xs text-paper/50">
          Weather by OpenWeather · Images by Pexels/Unsplash · Assistant by Gemini
        </p>
      </div>
    </footer>
  )
}
