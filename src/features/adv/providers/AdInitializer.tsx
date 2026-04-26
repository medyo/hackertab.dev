import { useEffect } from 'react'
import { useGetAd } from 'src/features/adv'
import { useUserPreferences } from 'src/stores/preferences'
import { useAdStore } from '../stores/AdStore'

export const AdInitializer = () => {
  const { userSelectedTags } = useUserPreferences()
  const { setAds, setIsLoading } = useAdStore()
  const {
    isSuccess,
    data: ad,
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
    if (isSuccess && ad) {
      setAds([
        /*{
          type: 'large-img',
          id: '1',
          title: 'Hackertab Pro',
          description: 'Upgrade to Hackertab Pro for an ad-free experience and exclusive features.',
          link: 'https://hackertab.dev/pro',
          imageUrl: 'https://cdn.hackertab.dev/assets/house-ad-banner.jpg',
        },*/
        {
          type: 'small-img',
          id: '1',
          title: 'Hackertab Pro',
          cta_text: 'Try for free',
          logoUrl: 'https://www.coderabbit.ai/images/logo-dark.svg',
          style: {
            bg_color: '#000',
            text_color: '#FFFFFF',
            cta_bg_color: '#FFFFFF',
            cta_text_color: '#000000',
          },
          description: 'Cut code review time & bugs in half, instantly.',
          link: 'https://www.coderabbit.ai/',
          imageUrl: 'https://cdn.hackertab.dev/assets/house-ad-banner.jpg',
        },
        {
          type: 'sticky-ad',
          id: '1',
          title: 'Cut code review time & bugs in half, instantly.',
          cta_text: 'Try for free',
          style: {
            bg_color: '#000',
            text_color: '#FFFFFF',
            cta_bg_color: '#FFFFFF',
            cta_text_color: '#000000',
          },
          condition: '$[?(@.platform=="extension")]',
          link: 'https://www.coderabbit.ai/',
          imageUrl:
            'https://www.coderabbit.ai/images/logo-dark.svg?dpl=dpl_4EGaXfdbadu5Dvw7KvvswknjNbQ6',
        },
      ])
    }
  }, [ad])

  return null
}
