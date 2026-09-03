import { useState, useEffect } from 'react'
import { fetchImage } from '../api/images.js'

// Handles the fetch → loading skeleton → error/empty fallback lifecycle for
// a single remote image, so every card/hero doesn't repeat this logic.
export default function DestinationImage({ query, alt, className = '', orientation = 'landscape' }) {
  const [state, setState] = useState('loading') // loading | success | error
  const [image, setImage] = useState(null)

  useEffect(() => {
    let cancelled = false
    setState('loading')
    fetchImage(query, { orientation })
      .then((img) => {
        if (!cancelled) {
          setImage(img)
          setState('success')
        }
      })
      .catch(() => {
        if (!cancelled) setState('error')
      })
    return () => {
      cancelled = true
    }
  }, [query, orientation])

  if (state === 'loading') {
    return <div className={`animate-pulseSoft bg-stone/15 ${className}`} aria-hidden="true" />
  }

  if (state === 'error' || !image) {
    return (
      <div
        className={`flex items-center justify-center bg-ink/5 text-center text-xs text-stone ${className}`}
        role="img"
        aria-label={`Image unavailable for ${alt}`}
      >
        Image unavailable
      </div>
    )
  }

  return (
    <img
      src={image.url}
      alt={alt}
      loading="lazy"
      className={`object-cover ${className}`}
      onError={() => setState('error')}
    />
  )
}
