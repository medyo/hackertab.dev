import { useMemo } from 'react'
import CardLink from 'src/components/CardLink'
import CardItemWithActions from 'src/components/CardItemWithActions'
import { Attributes } from 'src/lib/analytics'
import { ArticleItemPropsType } from 'src/types'
import ColoredLanguagesBadge from 'src/components/ColoredLanguagesBadge'
import { VscRepo, VscRepoForked, VscStarFull } from 'react-icons/vsc'

const sourceName = 'github'

const ArticleItem = (props: ArticleItemPropsType) => {
  const { item, index, listingMode, selectedTag } = props

  const title = useMemo(() => {
    return `${item.owner ? item.owner + '/' : ''}${item.title}`
  }, [item])

  return (
    <CardItemWithActions
      source={sourceName}
      key={index}
      index={index}
      item={item}
      cardItem={
        <>
          <CardLink
            className="githubTitle"
            link={item.url}
            analyticsAttributes={{
              [Attributes.POINTS]: item.reactions,
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.TITLE]: item.title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: sourceName,
              [Attributes.LANGUAGE]: selectedTag?.value,
            }}>
            <VscRepo className={'rowTitleIcon'} />
            {item.owner && `${item?.owner}/`}
            <b>{item.name}</b>
          </CardLink>
          <p className="rowDescription">{item.description}</p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <ColoredLanguagesBadge languages={item.tags} />
              {item.reactions && (
                <span className="rowItem">
                  <VscStarFull className="rowItemIcon" /> {item.reactions} stars
                </span>
              )}
              {item.forks && (
                <span className="rowItem">
                  <VscRepoForked className="rowItemIcon" /> {item.forks} forks
                </span>
              )}
            </div>
          )}
        </>
      }
    />
  )
}

export default ArticleItem
