import { GoDotFill } from 'react-icons/go'
import { MdAccessTime } from 'react-icons/md'
import { CardItemWithActions, CardLink } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { BaseItemPropsType, FeedItem } from 'src/types'
import { format } from 'timeago.js'

export const ArticleItem = (props: BaseItemPropsType<FeedItem>) => {
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
          <div className="rowTitle">
            <CardLink
              link={item.url}
              className="titleWithCover"
              analyticsAttributes={{
                [Attributes.TRIGERED_FROM]: 'card',
                [Attributes.TITLE]: item.title,
                [Attributes.LINK]: item.url,
                [Attributes.SOURCE]: analyticsTag,
              }}>
              {item.image && listingMode === 'normal' && (
                <img src={item.image} className="rowCover" alt="" />
              )}
              <span className="subTitle">{item.title}</span>
            </CardLink>
          </div>
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

export default ArticleItem
