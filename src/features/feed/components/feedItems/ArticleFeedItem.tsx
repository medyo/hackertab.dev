import { GoDotFill } from 'react-icons/go'
import { MdAccessTime } from 'react-icons/md'
import { CardItemWithActions } from 'src/components/Elements'
import { useUserPreferences } from 'src/stores/preferences'
import { ArticleFeedItemData, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'
import { FeedItemHeader } from '../FeedItemHeader'

export const ArticleFeedItem = (props: BaseItemPropsType<ArticleFeedItemData>) => {
  const { item, index, analyticsTag } = props
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={analyticsTag}
      index={index}
      item={item}
      key={index}
      cardItem={
        <>
          <FeedItemHeader item={item} />
          {listingMode === 'compact' && (
            <div className="rowDetails">
              <span className="rowItem capitalize">
                <GoDotFill className="rowItemIcon" /> {item.source}
              </span>
            </div>
          )}
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <span className="rowItem capitalize">
                <GoDotFill className="rowItemIcon" /> {item.source}
              </span>
              <span className="rowItem" title={new Date(item.date).toUTCString()}>
                <MdAccessTime className="rowItemIcon" /> {format(new Date(item.date))}
              </span>
            </div>
          )}
        </>
      }
    />
  )
}
