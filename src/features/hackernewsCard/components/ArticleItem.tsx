import { format } from 'timeago.js'
import { VscTriangleUp } from 'react-icons/vsc'
import { BiCommentDetail } from 'react-icons/bi'
import { MdAccessTime } from 'react-icons/md'
import { GoPrimitiveDot } from 'react-icons/go'
import { CardLink } from 'src/components/Elements'
import CardItemWithActions from '../../../components/CardItemWithActions'
import ClickableItem from '../../../components/ClickableItem'
import { Attributes } from 'src/lib/analytics'
import { ArticleItemPropsType } from 'src/types'

const ArticleItem = (props: ArticleItemPropsType) => {
  const { item, index, listingMode } = props

  return (
    <CardItemWithActions
      source={'hackernews'}
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
                [Attributes.SOURCE]: 'hackernews',
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
                  [Attributes.SOURCE]: 'hackernews',
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
