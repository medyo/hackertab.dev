import { format } from 'timeago.js'
import { VscTriangleUp } from 'react-icons/vsc'
import { BiCommentDetail } from 'react-icons/bi'
import { MdAccessTime } from 'react-icons/md'
import { GoPrimitiveDot } from 'react-icons/go'
import { CardLink, CardItemWithActions, ClickableItem } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { BaseItemPropsType, Article } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'

const ArticleItem = (props: BaseItemPropsType<Article>) => {
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
          <p className="rowTitle">
            <CardLink
              link={item.url}
              analyticsAttributes={{
                [Attributes.POINTS]: item.reactions,
                [Attributes.TRIGERED_FROM]: 'card',
                [Attributes.TITLE]: item.title,
                [Attributes.LINK]: item.url,
                [Attributes.SOURCE]: analyticsTag,
              }}>
              {listingMode === 'compact' && (
                <span className="counterWrapper">
                  <VscTriangleUp />
                  <span className="value">{item.reactions}</span>
                </span>
              )}

              <span className="subTitle">{item.title}</span>
            </CardLink>
          </p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <span className="rowItem hnRowItem">
                <GoPrimitiveDot className="rowItemIcon" /> {item.reactions} points
              </span>
              <span className="rowItem" title={new Date(item.published_at).toUTCString()}>
                <MdAccessTime className="rowItemIcon" /> {format(new Date(item.published_at))}
              </span>
              <ClickableItem
                link={`https://news.ycombinator.com/item?id=${item.id}`}
                className="rowItem rowItemClickable"
                analyticsAttributes={{
                  [Attributes.POINTS]: item.reactions,
                  [Attributes.TRIGERED_FROM]: 'card',
                  [Attributes.TITLE]: `${item.title} comments`,
                  [Attributes.LINK]: `https://news.ycombinator.com/item?id=${item.id}`,
                  [Attributes.SOURCE]: analyticsTag,
                }}>
                <BiCommentDetail className="rowItemIcon" /> {item.comments} comments
              </ClickableItem>
            </div>
          )}
        </>
      }
    />
  )
}

export default ArticleItem
