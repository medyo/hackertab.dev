import clsx from 'clsx'
import { useAdStore } from 'src/features/adv/stores/AdStore'
import { trackAdvOpen } from 'src/lib/analytics'
import { BaseItemPropsType } from 'src/types'
import { FeedItemHeader } from '../FeedItemHeader'

export const AdvFeedItem = ({ className }: BaseItemPropsType<any>) => {
  const { ads, isLoading } = useAdStore()
  const ad = ads.length > 0 ? ads.find((ad) => ad.type !== 'sticky-ad') : null

  const onAdClick = () => {
    if (ad?.id) {
      trackAdvOpen(ad.id, {
        source: 'card',
      })
    }
  }

  if (isLoading) {
    return (
      <div className="placeholder">
        <div className="image"></div>
        <div className="line"></div>
        <div className="smallLine"></div>
      </div>
    )
  }

  if (!ad) {
    return null
  }

  if (ad.type === 'large-img') {
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

  return null
}
