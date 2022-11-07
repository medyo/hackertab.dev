import { useCallback, useState } from 'react'

export const useAsyncError = () => {
  const [, setError] = useState()
  return useCallback(
    (e: string) => {
      setError(() => {
        throw e
      })
    },
    [setError]
  )
}
