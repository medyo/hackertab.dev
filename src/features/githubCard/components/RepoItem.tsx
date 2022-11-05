import CardLink from 'src/components/CardLink'
import CardItemWithActions from 'src/components/CardItemWithActions'
import { Attributes } from 'src/lib/analytics'
import { RepoItemPropsType } from 'src/types'
import { ColoredLanguagesBadge } from 'src/components/Elements'
import { VscRepo, VscRepoForked, VscStarFull } from 'react-icons/vsc'

const sourceName = 'github'

function numberWithCommas(x:number|string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const RepoItem = (props: RepoItemPropsType) => {
  const { item, index, listingMode, selectedTag } = props
  
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
              [Attributes.POINTS]: numberWithCommas(item.stars),
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.TITLE]: item.title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: sourceName,
              [Attributes.LANGUAGE]: selectedTag?.value,
            }}>
            <VscRepo className={'rowTitleIcon'} />
            {item.title}
          </CardLink>
          <p className="rowDescription">{item.description}</p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <ColoredLanguagesBadge languages={[item.programmingLanguage]} />
              {numberWithCommas(item.stars) && (
                <span className="rowItem">
                  <VscStarFull className="rowItemIcon" /> {numberWithCommas(item.stars)} stars
                </span>
              )}
              {item.forks && (
                <span className="rowItem">
                  <VscRepoForked className="rowItemIcon" /> {numberWithCommas(item.forks)} forks
                </span>
              )}
            </div>
          )}
        </>
      }
    />
  )
}

export default RepoItem