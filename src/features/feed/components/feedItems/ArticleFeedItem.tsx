import { MdAccessTime } from 'react-icons/md'
import { CardItemWithActions } from 'src/components/Elements'
import { useUserPreferences } from 'src/stores/preferences'
import { ArticleFeedItemData, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'
import { FeedItemHeader } from '../FeedItemHeader'
import { FeedItemSource } from '../FeedItemSource'

export const ArticleFeedItem = (props: BaseItemPropsType<ArticleFeedItemData>) => {
  const { item, analyticsTag, className } = props
  const { listingMode } = useUserPreferences()

  return (
    <div className={className}>
      <CardItemWithActions
        source={analyticsTag}
        item={item}
        cardItem={
          <>
            <FeedItemHeader {...item} />
            {listingMode === 'compact' && (
              <div className="rowDetails">
                <span className="rowItem feedSource verticalAligned">
                  <FeedItemSource source={item.source} />
                </span>
              </div>
            )}
            {listingMode === 'normal' && (
              <div className="rowDetails">
                <span className="rowItem feedSource verticalAligned">
                  <FeedItemSource source={item.source} />
                </span>
                <span className="rowItem" title={new Date(item.date).toUTCString()}>
                  <MdAccessTime className="rowItemIcon" /> {format(new Date(item.date))}
                </span>
              </div>
            )}
          </>
        }
      />
    </div>
  )
}
