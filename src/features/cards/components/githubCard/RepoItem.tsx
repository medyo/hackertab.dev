import { CardItemWithActions, CardLink } from 'src/components/Elements'

import { VscRepoForked, VscStarFull } from 'react-icons/vsc'
import { ColoredLanguagesBadge } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { BaseItemPropsType, Repository } from 'src/types'

function numberWithCommas(x: number | string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const RepoItem = ({ item, selectedTag, analyticsTag }: BaseItemPropsType<Repository>) => {
  const { listingMode } = useUserPreferences()

  return (
    <CardItemWithActions
      source={analyticsTag}
      item={item}
      cardItem={
        <>
          <CardLink
            className="githubTitle"
            link={item.url}
            analyticsAttributes={{
              [Attributes.POINTS]: item.stars_count,
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.TITLE]: item.name,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: analyticsTag,
              [Attributes.LANGUAGE]: selectedTag?.value,
            }}>
            <img
              src={`https://github.com/${item.owner}.png?size=64`}
              className="rowTitleGithubIcon"
            />
            {item.owner}/{item.name}
          </CardLink>
          <p className="rowDescription">{item.description}</p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <ColoredLanguagesBadge languages={[item.technology]} />
              {numberWithCommas(item.stars_count) && (
                <span className="rowItem">
                  <VscStarFull className="rowItemIcon" /> {numberWithCommas(item.stars_count)} stars
                </span>
              )}
              {item.stars_in_range && (
                <span className="rowItem">
                  <VscStarFull className="rowItemIcon" />{' '}
                  {numberWithCommas(item.stars_in_range || 0)} stars today
                </span>
              )}
              {item.forks_count && (
                <span className="rowItem">
                  <VscRepoForked className="rowItemIcon" /> {numberWithCommas(item.forks_count)}{' '}
                  forks
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
