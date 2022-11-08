import { BiCommentDetail } from 'react-icons/bi'
import { VscTriangleUp } from 'react-icons/vsc'
import { CardLink, CardItemWithActions } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { BaseItemPropsType, Article } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'

const ArticleItem = ({ item, index, analyticsTag }: BaseItemPropsType<Article>) => {
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={analyticsTag}
      index={index}
      key={index}
      item={{ ...item, title: item.title }}
      cardItem={
        <div className="phItem">
          <img className="phImage" src={item.image_url} alt={item.title} />
          <div className="phContent">
            <CardLink
              link={item.url}
              appendRef={false}
              analyticsAttributes={{
                [Attributes.POINTS]: item.reactions,
                [Attributes.TRIGERED_FROM]: 'card',
                [Attributes.TITLE]: item.title,
                [Attributes.LINK]: item.url,
                [Attributes.SOURCE]: analyticsTag,
              }}>
              {item.title}
            </CardLink>
            <p className="rowDescription">{item.description}</p>

            {listingMode === 'normal' && (
              <p className="rowDetails">
                <span className="rowItem">
                  <BiCommentDetail className="rowItemIcon" /> {item.comments || 0} comments
                </span>
                {item.tags && item.tags.length > 0 ? (
                  <span className="rowItem">{item.tags[0]}</span>
                ) : null}
              </p>
            )}
          </div>
          <div className="phVote">
            <VscTriangleUp className="rowItemIcon" />
            <span className="phVotesCount">{item.reactions}</span>
          </div>
        </div>
      }
    />
  )
}

export default ArticleItem
