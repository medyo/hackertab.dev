import { useEffect } from 'react'
import { useGetAd } from 'src/features/adv'
import { useUserPreferences } from 'src/stores/preferences'
import { useAdStore } from '../stores/AdStore'

export const AdInitializer = () => {
  const { userSelectedTags } = useUserPreferences()
  const { setAds, setIsLoading } = useAdStore()
  const {
    isSuccess,
    data: advs,
    isLoading,
  } = useGetAd({
    keywords: userSelectedTags.map((tag) => tag.label.toLocaleLowerCase()),
    feed: true,
    config: {
      cacheTime: 0,
      staleTime: 0,
      useErrorBoundary: false,
    },
  })

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    if (isSuccess && advs) {
      setAds(advs)
    }
  }, [advs, isSuccess])

  return null
}
