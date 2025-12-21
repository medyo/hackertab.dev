import { useMemo } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { BsArrowReturnRight } from 'react-icons/bs'
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

  const subReddit = useMemo(() => {
    const parts = item.url.split('/')
    const rIndex = parts.findIndex((part) => part.toLowerCase() === 'r')
    if (rIndex !== -1 && parts.length > rIndex + 1) {
      return parts[rIndex + 1]
    }
    return null
  }, [item.url])

  return (
    <CardItemWithActions
      source={analyticsTag}
      item={item}
      cardItem={
        <>
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

            <div className="subTitle">{item.title}</div>
          </CardLink>

          <div className="rowDetails">
            {listingMode === 'normal' && (
              <>
                <span className="rowItem redditRowItem">
                  <GoDotFill className="rowItemIcon" /> {item.points_count} upvotes
                </span>
                <span className="rowItem">
                  <MdAccessTime className="rowItemIcon" /> {format(new Date(item.published_at))}
                </span>
                <ClickableItem
                  link={item.canonical_url || item.url}
                  className="rowItem rowItemClickable"
                  analyticsAttributes={{
                    [Attributes.POINTS]: item.points_count,
                    [Attributes.TRIGERED_FROM]: 'card',
                    [Attributes.TITLE]: `${item.title} comments`,
                    [Attributes.LINK]: item.canonical_url,
                    [Attributes.SOURCE]: analyticsTag,
                  }}>
                  <BiCommentDetail className="rowItemIcon" /> {item.comments_count} comments
                </ClickableItem>
                {subReddit && (
                  <span className="rowItem">
                    <BsArrowReturnRight className="rowItemIcon" /> {`r/${subReddit}`}
                  </span>
                )}
              </>
            )}
          </div>
        </>
      }
    />
  )
}

export default ArticleItem
