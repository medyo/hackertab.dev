// Removed CardItemWithActions for ad block
import clsx from 'clsx'
import { useGetAd } from 'src/features/adv'
import { trackMarketingCampaignOpen } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { BaseItemPropsType } from 'src/types'
import { FeedItemHeader } from '../FeedItemHeader'

export const AdvFeedItem = ({ className }: BaseItemPropsType<any>) => {
  const { userSelectedTags } = useUserPreferences()
  const {
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

  if (isLoading) {
    return (
      <div className="placeholder">
        <div className="image"></div>
        <div className="line"></div>
        <div className="smallLine"></div>
      </div>
    )
  }

  if (isError || !ad) {
    return null
  }

  const onAdClick = () => {
    if (ad?.id) {
      trackMarketingCampaignOpen(ad.id, {
        source: 'feed',
      })
    }
  }

  if (ad.type !== 'house-ad-banner') {
    return null
  }

  return (
    <div className={clsx(className, 'adv')}>
      <div className="blockRow">
        <div onClick={onAdClick}>
          <FeedItemHeader title={ad.title || ''} image={ad.imageUrl} source="ad" url={ad.link} />
          <div className="rowDetails">
            <span className="rowItem feedSource verticalAligned">{ad.description}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
