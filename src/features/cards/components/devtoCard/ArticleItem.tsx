import { AiOutlineLike } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { MdAccessTime } from 'react-icons/md'
import { CardItemWithActions, CardLink, ColoredLanguagesBadge } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'

const ArticleItem = (props: BaseItemPropsType<Article>) => {
  const { item, index, selectedTag, analyticsTag } = props
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
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.POINTS]: item.points_count,
              [Attributes.TITLE]: item.title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: analyticsTag,
              [Attributes.LANGUAGE]: selectedTag?.value,
            }}>
            {listingMode === 'compact' && (
              <div className="counterWrapper">
                <AiOutlineLike />
                <span className="value">{item.points_count}</span>
              </div>
            )}
            <div className="subTitle">{item.title}</div>
          </CardLink>

          {listingMode === 'normal' && (
            <>
              <p className="rowDescription">
                <span className="rowItem">
                  <MdAccessTime className={'rowTitleIcon'} />
                  {format(new Date(item.published_at))}
                </span>
                <span className="rowItem">
                  <BiCommentDetail className={'rowTitleIcon'} />
                  {item.comments_count} comments
                </span>
                <span className="rowItem">
                  <AiOutlineLike className={'rowTitleIcon'} />
                  {item.points_count} reactions
                </span>
              </p>
              <p className="rowDetails">
                <ColoredLanguagesBadge languages={item.tags} />
              </p>
            </>
          )}
        </>
      }
    />
  )
}

export default ArticleItem
