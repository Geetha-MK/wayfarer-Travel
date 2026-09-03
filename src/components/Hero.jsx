import { Link } from 'react-router-dom'
import { useState } from 'react'

// Looping background video per the brief. Point VITE video src at any mp4 you like
// (Coverr/Mixkit are free sources) — falls back to a gradient if it can't load.
export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <section className="relative flex min-h-[86vh] items-end overflow-hidden bg-ink">
      {!videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoFailed(true)}
          poster="https://source.unsplash.com/1600x900/?landscape,travel"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}
      {videoFailed && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#3B4F72,#0D1526_65%)]" />
      )}
      <div className="absolute inset-0 bg-grain mix-blend-overlay" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

      <div className="container-page relative z-10 w-full pb-16 pt-40 sm:pb-24">
        <div className="max-w-2xl animate-reveal">
          <p className="text-xs font-medium tracking-wide text-paper/70">A field guide, not a checklist</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-paper sm:text-7xl">
            Go somewhere <span className="italic">worth</span> the trip.
          </h1>
          <p className="mt-6 max-w-md text-base text-paper/75 sm:text-lg">
            Browse real places, check the weather before you pack, and let an assistant turn a
            destination into a day-by-day plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/explore" className="btn-primary !bg-paper !text-ink hover:!bg-pine hover:!text-paper">
              Explore destinations
            </Link>
            <a href="#how-it-works" className="btn-secondary !border-paper/40 !text-paper hover:!bg-paper hover:!text-ink">
              How it works
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
