import { BiCommentDetail } from 'react-icons/bi'
import { GoDotFill } from 'react-icons/go'
import { MdAccessTime } from 'react-icons/md'
import { CardItemWithActions, CardLink, ClickableItem } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'

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
              className="titleWithCover"
              analyticsAttributes={{
                [Attributes.POINTS]: item.reactions,
                [Attributes.TRIGERED_FROM]: 'card',
                [Attributes.TITLE]: item.title,
                [Attributes.LINK]: item.url,
                [Attributes.SOURCE]: analyticsTag,
              }}>
              {item.image_url && listingMode === 'normal' && (
                <img src={item.image_url} className="rowCover" alt="" />
              )}
              <span className="subTitle">{item.title}</span>
            </CardLink>
          </p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <span className="rowItem capitalize">
                <GoDotFill className="rowItemIcon" /> {item.source}
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
