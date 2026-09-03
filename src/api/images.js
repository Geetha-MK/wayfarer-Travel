// Image lookup via Pexels. Falls back to Unsplash Source if no Pexels key is present
// so the app still renders something reasonable without configuration.
// Pexels docs: https://www.pexels.com/api/documentation/

const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY
const cache = new Map()

export async function fetchImage(query, { orientation = 'landscape' } = {}) {
  const cacheKey = `${query}|${orientation}`
  if (cache.has(cacheKey)) return cache.get(cacheKey)

  const promise = PEXELS_KEY ? fetchFromPexels(query, orientation) : fetchFromUnsplashSource(query)
  cache.set(cacheKey, promise)
  return promise
}

async function fetchFromPexels(query, orientation) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&per_page=1&orientation=${orientation}`
  const res = await fetch(url, { headers: { Authorization: PEXELS_KEY } })
  if (!res.ok) throw new Error('pexels_request_failed')
  const data = await res.json()
  const photo = data.photos?.[0]
  if (!photo) throw new Error('no_image_found')
  return {
    url: orientation === 'portrait' ? photo.src.portrait : photo.src.large,
    alt: photo.alt || query,
    credit: photo.photographer,
    creditUrl: photo.photographer_url,
    source: 'Pexels',
  }
}

// Unsplash Source requires no API key, used only as a graceful fallback.
async function fetchFromUnsplashSource(query) {
  return {
    url: `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`,
    alt: query,
    credit: 'Unsplash',
    creditUrl: 'https://unsplash.com',
    source: 'Unsplash',
  }
}
