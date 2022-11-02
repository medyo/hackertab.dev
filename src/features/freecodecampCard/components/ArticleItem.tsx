import CardLink from 'src/components/CardLink'
import CardItemWithActions from 'src/components/CardItemWithActions'
import { Attributes } from 'src/lib/analytics'
import { ArticleItemPropsType } from 'src/types'
import { format } from 'timeago.js'
import { MdAccessTime } from 'react-icons/md'
import ColoredLanguagesBadge from 'src/components/ColoredLanguagesBadge'

const ArticleItem = (props: ArticleItemPropsType) => {
  const { item, index, selectedTag } = props
  return (
    <CardItemWithActions
      source={'freecodecamp'}
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
              [Attributes.SOURCE]: 'freecodecamp',
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
            <p className="rowDetails">
              <ColoredLanguagesBadge languages={item.tags.slice(0, 4)} />
            </p>
          </>
        </>
      }
    />
  )
}

export default ArticleItem
