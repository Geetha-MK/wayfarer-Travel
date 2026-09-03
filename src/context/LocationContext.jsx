import { createContext, useContext, useState, useCallback } from 'react'

// Shared visitor-location state: either the browser's geolocation, or a place
// the visitor searched for manually. Consumed anywhere weather/distance is shown.
const LocationContext = createContext(null)

export function LocationProvider({ children }) {
  const [location, setLocationState] = useState(null) // { lat, lon, label, source }
  const [permission, setPermission] = useState('unknown') // unknown | granted | denied | unsupported

  const requestBrowserLocation = useCallback(() => {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) {
        setPermission('unsupported')
        resolve(null)
        return
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            label: 'Your current location',
            source: 'geolocation',
          }
          setPermission('granted')
          setLocationState(loc)
          resolve(loc)
        },
        () => {
          setPermission('denied')
          resolve(null)
        },
        { timeout: 8000 }
      )
    })
  }, [])

  const setManualLocation = useCallback((loc) => {
    setLocationState({ ...loc, source: 'search' })
  }, [])

  const clearLocation = useCallback(() => setLocationState(null), [])

  return (
    <LocationContext.Provider
      value={{ location, permission, requestBrowserLocation, setManualLocation, clearLocation }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const ctx = useContext(LocationContext)
  if (!ctx) throw new Error('useLocation must be used within LocationProvider')
  return ctx
}
