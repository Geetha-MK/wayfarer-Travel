// Thin wrapper around the OpenWeather "Current Weather" + "Geocoding" endpoints.
// Docs: https://openweathermap.org/current  https://openweathermap.org/api/geocoding-api

const KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export class WeatherApiError extends Error {}

// Deterministic mock weather used only when no API key is configured, so the
// app is fully explorable before you add real keys. Real requests always win
// once VITE_OPENWEATHER_API_KEY is set.
const MOCK_CONDITIONS = [
  { condition: 'Clear', description: 'clear sky', icon: '01d' },
  { condition: 'Clouds', description: 'scattered clouds', icon: '03d' },
  { condition: 'Rain', description: 'light rain', icon: '10d' },
]
function mockWeather(lat, lon, cityName) {
  const seed = Math.abs(Math.round((lat + lon) * 10)) % MOCK_CONDITIONS.length
  const base = MOCK_CONDITIONS[seed]
  const temp = 12 + (Math.abs(Math.round(lat)) % 20)
  return {
    tempC: temp,
    feelsLikeC: temp - 1,
    condition: base.condition,
    description: base.description,
    icon: base.icon,
    humidity: 55,
    windKph: 14,
    cityName: cityName || 'Demo location',
    isMock: true,
  }
}

export async function fetchWeatherByCoords(lat, lon, cityName) {
  if (!KEY) {
    return mockWeather(lat, lon, cityName)
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`
  const res = await fetch(url)
  if (!res.ok) {
    if (res.status === 401) throw new WeatherApiError('invalid_key')
    throw new WeatherApiError('request_failed')
  }
  const data = await res.json()
  return normaliseWeather(data)
}

// Free-text place search, e.g. what LocationPicker uses when the user types a city.
export async function geocodePlace(query) {
  if (!KEY) {
    // Demo mode: fabricate one plausible-looking result so location search
    // is still explorable without a key.
    return [{ name: query, country: '', state: '', lat: 20 + Math.random() * 20, lon: 10 + Math.random() * 40, isMock: true }]
  }
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new WeatherApiError('request_failed')
  const data = await res.json()
  return data.map((d) => ({
    name: d.name,
    country: d.country,
    state: d.state,
    lat: d.lat,
    lon: d.lon,
  }))
}

function normaliseWeather(data) {
  return {
    tempC: Math.round(data.main?.temp),
    feelsLikeC: Math.round(data.main?.feels_like),
    condition: data.weather?.[0]?.main ?? 'Unknown',
    description: data.weather?.[0]?.description ?? '',
    icon: data.weather?.[0]?.icon,
    humidity: data.main?.humidity,
    windKph: data.wind?.speed != null ? Math.round(data.wind.speed * 3.6) : null,
    cityName: data.name,
  }
}

export function iconUrl(icon) {
  return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null
}
