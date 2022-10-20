import React, { useState, useEffect, useContext, useMemo } from 'react'
import CardComponent from '../components/CardComponent'
import ListComponent from '../components/ListComponent'
import { VscRepo, VscRepoForked, VscStarFull } from 'react-icons/vsc'
import githubApi from '../services/github'
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from '../components/CardLink'
import CardItemWithActions from '../components/CardItemWithActions'
import SelectableCard from '../components/SelectableCard'
import { GLOBAL_TAG, MY_LANGUAGES_TAG, MAX_MERGED_ITEMS_PER_LANGUAGE } from '../Constants'
import { mergeMultipleDataSources } from '../utils/DataUtils'
import ColoredLanguagesBadge from '../components/ColoredLanguagesBadge'
import { trackCardLanguageSelect, trackCardDateRangeSelect, Attributes } from 'src/lib/analytics'

const sourceName = 'github'

const RepoItem = ({ item, index, selectedLanguage }) => {
  const { listingMode } = useContext(PreferencesContext)
  const title = useMemo(() => {
    return `${item.owner ? item.owner + '/' : ''}${item.name}`
  }, [item])

  return (
    <CardItemWithActions
      source={sourceName}
      key={index}
      index={index}
      item={{ ...item, title }}
      cardItem={
        <>
          <CardLink
            className="githubTitle"
            link={item.url}
            analyticsAttributes={{
              [Attributes.POINTS]: item.stars,
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.TITLE]: title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: sourceName,
              [Attributes.LANGUAGE]: selectedLanguage?.value,
            }}>
            <VscRepo className={'rowTitleIcon'} />
            {item.owner && `${item?.owner}/`}
            <b>{item.name}</b>
          </CardLink>
          <p className="rowDescription">{item.description}</p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <ColoredLanguagesBadge languages={[item.programmingLanguage]} />
              {item.stars && (
                <span className="rowItem">
                  <VscStarFull className="rowItemIcon" /> {item.stars} stars
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

const TAGS_MENU_ID = 'tags-menu'
const DATE_RANGE_MENU_ID = 'date-range-id'

function ReposCard({ analyticsTag, label, icon, withAds }) {
  const preferences = useContext(PreferencesContext)
  const { userSelectedTags = [], dispatcher, cardsSettings } = preferences
  const [selectedLanguage, setSelectedLanguage] = useState()
  const [selectedDateRange, setSelectedDateRange] = useState()
  const [refresh, setRefresh] = useState(true)
  const [cacheCardData, setCacheCardData] = useState({})

  const dateRangeMapper = {
    daily: 'the day',
    weekly: 'the week',
    monthly: 'the month',
  }

  useEffect(() => {
    if (selectedLanguage) {
      dispatcher({
        type: 'setCardSettings',
        value: { card: 'repos', language: selectedLanguage.label },
      })
      setRefresh(!refresh)
    }
  }, [selectedLanguage])

  useEffect(() => {
    if (selectedDateRange) {
      dispatcher({
        type: 'setCardSettings',
        value: { card: 'repos', dateRange: selectedDateRange.value },
      })
      setRefresh(!refresh)
    }
  }, [selectedDateRange])

  const fetchRepos = async () => {
    if (!selectedLanguage) {
      return []
    }

    if (!selectedLanguage?.githubValues) {
      throw Error(`Github Trending does not support ${selectedLanguage.label}.`)
    }

    let data = []
    const cacheKey = `${selectedLanguage.value}-${selectedDateRange.value}`

    // Cache found
    if (cacheCardData[cacheKey]) {
      return cacheCardData[cacheKey]
    }
    if (selectedLanguage.value == MY_LANGUAGES_TAG.value) {
      const selectedTagsReposPromises = userSelectedTags.map((tag) => {
        if (tag.githubValues) {
          if (cacheCardData[tag.value + `-${selectedDateRange.value}`]) {
            return cacheCardData[tag.value + `-${selectedDateRange.value}`]
          } else {
            return githubApi.getTrending(tag.githubValues[0], selectedDateRange.value)
          }
        }
        return []
      })

      data = await mergeMultipleDataSources(
        selectedTagsReposPromises,
        MAX_MERGED_ITEMS_PER_LANGUAGE
      )
    } else {
      data = await githubApi.getTrending(selectedLanguage.githubValues[0], selectedDateRange.value)
    }

    data = data.sort((a, b) => b.public_reactions_count - a.public_reactions_count)

    setCacheCardData({ ...cacheCardData, [cacheKey]: data })
    return data
  }

  function HeaderTitle() {
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <SelectableCard
          isLanguage={true}
          tagId={TAGS_MENU_ID}
          selectedTag={selectedLanguage}
          setSelectedTag={setSelectedLanguage}
          fallbackTag={GLOBAL_TAG}
          cardSettings={cardsSettings?.repos?.language}
          trackEvent={(tag) => trackCardLanguageSelect('Repos', tag.value)}
          data={userSelectedTags.map((tag) => ({
            label: tag.label,
            value: tag.value,
          }))}
        />
        <span> Repos of </span>
        {
          <SelectableCard
            tagId={DATE_RANGE_MENU_ID}
            selectedTag={selectedDateRange}
            setSelectedTag={setSelectedDateRange}
            fallbackTag={{
              value: Object.keys(dateRangeMapper)[0],
              label: Object.values(dateRangeMapper)[0],
            }}
            trackEvent={(tag) => trackCardDateRangeSelect('Repos', tag.value)}
            cardSettings={cardsSettings?.repos?.dateRange}
            data={Object.keys(dateRangeMapper).map((tag) => ({
              label: dateRangeMapper[tag],
              value: tag,
            }))}
          />
        }
      </div>
    )
  }

  const renderItem = (item, index) => (
    <RepoItem
      item={item}
      key={`rp-${index}`}
      analyticsTag={analyticsTag}
      selectedLanguage={selectedLanguage}
    />
  )

  return (
    <>
      <CardComponent
        fullBlock={true}
        icon={<span className="blockHeaderIcon">{icon}</span>}
        title={<HeaderTitle />}>
        <ListComponent
          fetchData={fetchRepos}
          renderItem={renderItem}
          refresh={refresh}
          withAds={withAds}
        />
      </CardComponent>
    </>
  )
}

export default ReposCard
