import { BiCommentDetail } from 'react-icons/bi'
import CardLink from 'src/components/CardLink'
import CardItemWithActions from 'src/components/CardItemWithActions'
import { Attributes } from 'src/lib/analytics'
import { ArticleItemPropsType } from 'src/types'
import { format } from 'timeago.js'
import { MdAccessTime } from 'react-icons/md'
import { AiOutlineLike } from 'react-icons/ai'
import ColoredLanguagesBadge from 'src/components/ColoredLanguagesBadge'

const ArticleItem = (props: ArticleItemPropsType) => {
  const { item, index, listingMode, selectedTag } = props
  
  return (
    <CardItemWithActions
      source={'devto'}
      index={index}
      key={index}
      item={item}
      cardItem={
        <>
          <CardLink
            link={item.url}
            analyticsAttributes={{
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.POINTS]: item.reactions,
              [Attributes.TITLE]: item.title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: 'devto',
              [Attributes.LANGUAGE]: selectedTag?.value,
            }}>
            {listingMode === 'compact' && (
              <div className="counterWrapper">
                <AiOutlineLike />
                <span className="value">{item.reactions}</span>
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
                  {item.comments} comments
                </span>
                <span className="rowItem">
                  <AiOutlineLike className={'rowTitleIcon'} />
                  {item.reactions} reactions
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
