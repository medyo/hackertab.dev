import { MdAccessTime } from 'react-icons/md'
import { CardItemWithActions, CardLink } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { Article, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'

const ArticleItem = (props: BaseItemPropsType<Article>) => {
  const { item, index, selectedTag, analyticsTag } = props
  if (!item) {
    return null
  }
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
              [Attributes.TITLE]: item.title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: analyticsTag,
              [Attributes.LANGUAGE]: selectedTag?.value,
            }}>
            <div className="subTitle">{item.title}</div>
          </CardLink>
          <>
            <p className="rowDescription">
              <span className="rowItem">
                <MdAccessTime className={'rowTitleIcon'} />
                {format(new Date(item.published_at))}
              </span>
            </p>
            {/* <p className="rowDetails">
              <ColoredLanguagesBadge languages={item.tags.slice(0, 4)} />
            </p> */}
          </>
        </>
      }
    />
  )
}

export default ArticleItem
