import { BiCommentDetail } from 'react-icons/bi'
import { CardLink } from 'src/components/Elements'
import CardItemWithActions from 'src/components/CardItemWithActions'
import { Attributes } from 'src/lib/analytics'
import { BaseItemPropsType, Article } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { format } from 'timeago.js'
import { MdAccessTime } from 'react-icons/md'
import { MdWavingHand } from 'react-icons/md'

const ArticleItem = ({ item, index, selectedTag, analyticsTag }: BaseItemPropsType<Article>) => {
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={analyticsTag}
      index={index}
      key={index}
      item={item}
      cardItem={
        <>
          <CardLink
            link={item.url}
            analyticsAttributes={{
              [Attributes.POINTS]: item.reactions,
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.TITLE]: item.title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: analyticsTag,
              [Attributes.LANGUAGE]: selectedTag?.value,
            }}>
            {listingMode === 'compact' && (
              <div className="counterWrapper">
                <MdWavingHand />
                <span className="value">{item.reactions || 0}</span>
              </div>
            )}
            <div className="subTitle">{item.title}</div>
          </CardLink>

          {listingMode === 'normal' && (
            <p className="rowDetails">
              <span className="rowItem mediumRowItem">
                <MdWavingHand className={'rowItemIcon'} /> {item.reactions || 0} claps
              </span>
              <span className="rowItem">
                <BiCommentDetail className={'rowItemIcon'} /> {item.comments || 0} comments
              </span>
              <span className="rowItem">
                <MdAccessTime className={'rowItemIcon'} />
                {format(new Date(item.published_at))}
              </span>
            </p>
          )}
        </>
      }
    />
  )
}

export default ArticleItem
