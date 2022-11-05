import { format } from 'timeago.js'
import { VscTriangleUp } from 'react-icons/vsc'
import { BiCommentDetail } from 'react-icons/bi'
import { MdAccessTime } from 'react-icons/md'
import CardLink from '../../../components/CardLink'
import CardItemWithActions from '../../../components/CardItemWithActions'
import { Attributes } from 'src/lib/analytics'
import { ArticleItemPropsType } from 'src/types'
import { FaChevronUp } from 'react-icons/fa'
import { useUserPreferences } from 'src/stores/preferences'

const ArticleItem = (props: ArticleItemPropsType) => {
  const { item, index } = props
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={'indiehackers'}
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
                [Attributes.SOURCE]: 'indiehackers',
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
              <span className="rowItem inRowItem">
                <FaChevronUp className="rowItemIcon" /> {item.reactions} points
              </span>
              <span className="rowItem">
                <MdAccessTime className="rowItemIcon" /> {format(new Date(item.published_at))}
              </span>
              <span className="rowItem">
                <BiCommentDetail className="rowItemIcon" /> {item.comments} comments
              </span>
            </div>
          )}
        </>
      }
    />
  )
}

export default ArticleItem
