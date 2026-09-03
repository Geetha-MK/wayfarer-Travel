import { useState, useEffect, useCallback, useRef } from 'react'

// Generic async-fetch hook: tracks loading/error/data and guards against
// setting state after unmount or after a newer call has superseded it.
export function useAsync(asyncFn, deps, { immediate = true } = {}) {
  const [status, setStatus] = useState(immediate ? 'loading' : 'idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const callId = useRef(0)

  const run = useCallback((...args) => {
    const id = ++callId.current
    setStatus('loading')
    setError(null)
    return asyncFn(...args)
      .then((result) => {
        if (id === callId.current) {
          setData(result)
          setStatus('success')
        }
        return result
      })
      .catch((err) => {
        if (id === callId.current) {
          setError(err)
          setStatus('error')
        }
        throw err
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    if (immediate) {
      run().catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { status, data, error, run, isLoading: status === 'loading', isError: status === 'error' }
}
