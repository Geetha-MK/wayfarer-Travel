import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-6xl text-ink/20">404</p>
      <h1 className="font-display text-2xl text-ink">This page wandered off.</h1>
      <p className="max-w-sm text-sm text-stone">
        The page you're looking for doesn't exist. It might have been moved, or the link may be off.
      </p>
      <Link to="/" className="btn-primary mt-2">
        Back to home
      </Link>
    </div>
  )
}
