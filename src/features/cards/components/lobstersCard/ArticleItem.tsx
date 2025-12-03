import { BiCommentDetail } from 'react-icons/bi'
import { GoDotFill } from 'react-icons/go'
import { MdAccessTime } from 'react-icons/md'
import { VscTriangleUp } from 'react-icons/vsc'
import { CardItemWithActions, CardLink, ClickableItem } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'

const ArticleItem = ({ item, analyticsTag }: BaseItemPropsType<Article>) => {
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={analyticsTag}
      item={item}
      cardItem={
        <>
          <p className="rowTitle">
            <CardLink
              link={item.url}
              analyticsAttributes={{
                [Attributes.POINTS]: item.points_count,
                [Attributes.TRIGERED_FROM]: 'card',
                [Attributes.TITLE]: item.title,
                [Attributes.LINK]: item.url,
                [Attributes.SOURCE]: analyticsTag,
              }}>
              {listingMode === 'compact' && (
                <div className="counterWrapper">
                  <VscTriangleUp />
                  <span className="value">{item.points_count}</span>
                </div>
              )}

              <span className="subTitle">{item.title}</span>
            </CardLink>
          </p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <span className="rowItem lobstersRowItem">
                <GoDotFill className="rowItemIcon" /> {item.points_count} points
              </span>
              <span className="rowItem" title={new Date(item.published_at).toUTCString()}>
                <MdAccessTime className="rowItemIcon" /> {format(new Date(item.published_at))}
              </span>
              <ClickableItem
                link={item.comments_url as string}
                className="rowItem rowItemClickable"
                analyticsAttributes={{
                  [Attributes.POINTS]: item.points_count,
                  [Attributes.TRIGERED_FROM]: 'card',
                  [Attributes.TITLE]: `${item.title} comments`,
                  [Attributes.LINK]: item.comments_url,
                  [Attributes.SOURCE]: analyticsTag,
                }}>
                <BiCommentDetail className="rowItemIcon" /> {item.comments_count} comments
              </ClickableItem>
            </div>
          )}
        </>
      }
    />
  )
}

export default ArticleItem
