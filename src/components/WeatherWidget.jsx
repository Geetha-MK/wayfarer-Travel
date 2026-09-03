import { useEffect, useState } from 'react'
import { fetchWeatherByCoords, iconUrl, WeatherApiError } from '../api/weather.js'

export default function WeatherWidget({ lat, lon, label }) {
  const [status, setStatus] = useState('loading')
  const [weather, setWeather] = useState(null)
  const [errorKind, setErrorKind] = useState(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    fetchWeatherByCoords(lat, lon)
      .then((w) => {
        if (!cancelled) {
          setWeather(w)
          setStatus('success')
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setErrorKind(err instanceof WeatherApiError ? err.message : 'request_failed')
          setStatus('error')
        }
      })
    return () => {
      cancelled = true
    }
  }, [lat, lon])

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-3 rounded-sm border border-stone/20 bg-paper-dim px-4 py-3" aria-busy="true">
        <div className="h-10 w-10 animate-pulseSoft rounded-full bg-stone/20" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 animate-pulseSoft rounded bg-stone/20" />
          <div className="h-3 w-16 animate-pulseSoft rounded bg-stone/20" />
        </div>
      </div>
    )
  }

  if (status === 'error') {
    const messages = {
      missing_key: 'Add an OpenWeather API key to your .env file to show live weather.',
      invalid_key: 'The OpenWeather API key looks invalid — check your .env file.',
      request_failed: "Couldn't reach the weather service right now.",
    }
    return (
      <div className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink">
        {messages[errorKind] ?? messages.request_failed}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-sm border border-stone/20 bg-paper-dim px-4 py-3">
      {weather.icon && (
        <img src={iconUrl(weather.icon)} alt="" width="44" height="44" className="-ml-1" />
      )}
      <div>
        <p className="font-display text-2xl leading-none text-ink">{weather.tempC}°C</p>
        <p className="mt-1 text-sm capitalize text-stone">
          {weather.description || weather.condition} · {label || weather.cityName}
        </p>
        {weather.isMock && (
          <p className="mt-0.5 text-[11px] font-medium text-gold">Demo data — add an OpenWeather key for live weather</p>
        )}
      </div>
      <div className="ml-auto hidden text-right text-xs text-stone sm:block">
        <p>Feels {weather.feelsLikeC}°C</p>
        <p>Wind {weather.windKph} km/h</p>
      </div>
    </div>
  )
}
