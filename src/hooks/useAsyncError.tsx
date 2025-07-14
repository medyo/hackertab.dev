import { useCallback, useState } from 'react'

export const useAsyncError = () => {
  const [, setError] = useState<never>()

  return useCallback((err: unknown) => {
    setError(() => {
      if (err instanceof Error) {
        throw err
      }
      throw new Error(typeof err === 'string' ? err : JSON.stringify(err))
    })
  }, [])
}
