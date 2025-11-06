import { BiCommentDetail } from 'react-icons/bi'
import { MdAccessTime, MdWavingHand } from 'react-icons/md'
import { CardItemWithActions, CardLink } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'

const ArticleItem = ({ item, selectedTag, analyticsTag }: BaseItemPropsType<Article>) => {
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={analyticsTag}
      key={index}
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
              [Attributes.LANGUAGE]: selectedTag?.value,
            }}>
            {listingMode === 'compact' && (
              <div className="counterWrapper">
                <MdWavingHand />
                <span className="value">{item.points_count || 0}</span>
              </div>
            )}
            <div className="subTitle">{item.title}</div>
          </CardLink>

          {listingMode === 'normal' && (
            <p className="rowDetails">
              <span className="rowItem mediumRowItem">
                <MdWavingHand className={'rowItemIcon'} /> {item.points_count || 0} claps
              </span>
              <span className="rowItem">
                <BiCommentDetail className={'rowItemIcon'} /> {item.comments_count || 0} comments
              </span>
              <span className="rowItem">
                <MdAccessTime className={'rowItemIcon'} /> {format(new Date(item.published_at))}
              </span>
            </p>
          )}
        </>
      }
    />
  )
}

export default ArticleItem
