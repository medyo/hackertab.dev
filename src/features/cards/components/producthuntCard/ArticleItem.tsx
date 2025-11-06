import { BiCommentDetail } from 'react-icons/bi'
import { VscTriangleUp } from 'react-icons/vsc'
import { CardItemWithActions, CardLink } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, BaseItemPropsType } from 'src/types'

const ArticleItem = ({ item, analyticsTag }: BaseItemPropsType<Article>) => {
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={analyticsTag}
      item={{ ...item, title: item.title }}
      cardItem={
        <div className="phItem">
          <img className="phImage" loading="lazy" src={item.image_url} alt={item.title} />
          <div className="phContent">
            <CardLink
              link={item.url}
              appendRef={false}
              analyticsAttributes={{
                [Attributes.POINTS]: item.votes_count,
                [Attributes.TRIGERED_FROM]: 'card',
                [Attributes.TITLE]: item.title,
                [Attributes.LINK]: item.url,
                [Attributes.SOURCE]: analyticsTag,
              }}>
              {item.title}
            </CardLink>
            <p className="rowDescription">{item.tagline}</p>

            {listingMode === 'normal' && (
              <p className="rowDetails">
                <span className="rowItem">
                  <BiCommentDetail className="rowItemIcon" /> {item.comments_count || 0} comments
                </span>
                {item.tags && item.tags.length > 0 ? (
                  <span className="rowItem">{item.tags[0]}</span>
                ) : null}
              </p>
            )}
          </div>
          <div className="phVote">
            <VscTriangleUp className="rowItemIcon" />
            <span className="phVotesCount">{item.votes_count}</span>
          </div>
        </div>
      }
    />
  )
}

export default ArticleItem
