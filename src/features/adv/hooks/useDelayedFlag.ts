import { useEffect, useState, useTransition } from 'react'

export const useDelayedFlag = (ms: number | undefined) => {
  const [ready, setReady] = useState(false)
  const [, startTransition] = useTransition()
  useEffect(() => {
    if (ms === undefined || ms <= 0) {
      setReady(true)
      return
    }
    const t = setTimeout(() => startTransition(() => setReady(true)), ms)
    return () => clearTimeout(t)
  }, [ms])

  return ready
}
