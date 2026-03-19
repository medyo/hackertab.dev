import { useEffect } from 'react'
import { AdPlaceholder } from 'src/components/placeholders'
import { trackMarketingCampaignOpen } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { useGetAd } from '../api/getAd'
import { Ad } from '../types'
import './AdvBanner.css'

type AdvBannerProps = {
  feedDisplay?: boolean
  onAdLoaded?: (ad: Ad | null) => void
  loadingState?: React.ReactNode
}

export const AdvBanner = ({ loadingState, onAdLoaded }: AdvBannerProps) => {
  const { userSelectedTags } = useUserPreferences()
  const {
    isSuccess,
    data: ad,
    isLoading,
    isError,
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
    if (isSuccess && ad) {
      onAdLoaded?.(ad)
    }
  }, [ad])

  if (isLoading) {
    return loadingState || <AdPlaceholder />
  }

  if (isError || !ad) {
    return null
  }

  const onAdClick = () => {
    if (ad?.id) {
      trackMarketingCampaignOpen(ad.id, {
        source: 'card',
      })
    }
  }
  if (ad.type === 'house-ad-banner') {
    return (
      <div className="houseBanner">
        <a onClick={onAdClick} href={ad.link} target="_blank" title={ad.title}>
          <img src={ad.imageUrl} alt={ad.title} />
        </a>
      </div>
    )
  }

  return null
}
