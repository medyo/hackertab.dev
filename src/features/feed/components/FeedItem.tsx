import { GoDotFill } from 'react-icons/go'
import { MdAccessTime } from 'react-icons/md'
import { CardItemWithActions } from 'src/components/Elements'
import { useUserPreferences } from 'src/stores/preferences'
import { BaseItemPropsType, FeedItem as FeedItemType } from 'src/types'
import { format } from 'timeago.js'
import { FeedItemHeader } from './FeedItemHeader'
import { RepoFeedItem } from './feedItems/RepoFeedItem'

export const FeedItem = (props: BaseItemPropsType<FeedItemType>) => {
  const { item, index, analyticsTag } = props
  const { listingMode } = useUserPreferences()

  if (item.type === 'github') {
    return <RepoFeedItem item={item} index={index} analyticsTag={analyticsTag} />
  }

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
