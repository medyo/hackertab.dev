import { CardItemWithActions, CardLink } from 'src/components/Elements'

import { VscRepo, VscRepoForked, VscStarFull } from 'react-icons/vsc'
import { ColoredLanguagesBadge } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { BaseItemPropsType, Repository } from 'src/types'

function numberWithCommas(x: number | string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const RepoItem = ({ item, index, selectedTag, analyticsTag }: BaseItemPropsType<Repository>) => {
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={analyticsTag}
      key={index}
      index={index}
      item={item}
      cardItem={
        <>
          <CardLink
            className="githubTitle"
            link={item.url}
            analyticsAttributes={{
              [Attributes.POINTS]: item.stars,
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.TITLE]: item.title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: analyticsTag,
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
