import { BiCommentDetail } from 'react-icons/bi'
import { FaChevronUp } from 'react-icons/fa'
import { MdAccessTime } from 'react-icons/md'
import { VscTriangleUp } from 'react-icons/vsc'
import { CardItemWithActions, CardLink } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'

export const ArticleItem = (props: BaseItemPropsType<Article>) => {
  const { item, index, analyticsTag } = props
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={analyticsTag}
      index={index}
      item={item}
      key={item.id}
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
                <span className="counterWrapper">
                  <VscTriangleUp />
                  <span className="value">{item.points_count}</span>
                </span>
              )}

              <span className="subTitle">{item.title}</span>
            </CardLink>
          </p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <span className="rowItem inRowItem">
                <FaChevronUp className="rowItemIcon" /> {item.points_count} points
              </span>
              <span className="rowItem">
                <MdAccessTime className="rowItemIcon" /> {format(new Date(item.published_at))}
              </span>
              <span className="rowItem">
                <BiCommentDetail className="rowItemIcon" /> {item.comments_count} comments
              </span>
            </div>
          )}
        </>
      }
    />
  )
}
