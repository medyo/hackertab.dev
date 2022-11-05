import { useState, useEffect } from 'react'
import { Card } from 'src/components/Elements/Card'
import { ListComponent } from 'src/components/List'
import { useGetRepos } from '../api/getRepos'
import { RepoType, CardPropsType } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { getCardTagsValue } from 'src/utils/DataEnhancement'
import RepoItem from './RepoItem'
import { Tag } from 'src/features/remoteConfig'
import { GLOBAL_TAG, MY_LANGUAGES_TAG } from 'src/config'
import { trackCardLanguageSelect, trackCardDateRangeSelect } from 'src/lib/analytics'
import SelectableCard from 'src/components/SelectableCard'

const TAGS_MENU_ID = 'tags-menu'
const DATE_RANGE_MENU_ID = 'date-range-id'

type DateRangeType = {
  value: 'daily' | 'monthly' | 'weekly'
  label: string
}
const dateRanges: DateRangeType[] = [
  { label: 'the day', value: 'daily' },
  { label: 'the week', value: 'weekly' },
  { label: 'the month', value: 'monthly' },
]

export function GithubCard({ meta, withAds }: CardPropsType) {
  const { userSelectedTags, cardsSettings, setCardSettings, listingMode } = useUserPreferences()
  const [selectedTag, setSelectedTag] = useState<Tag>()
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeType>(dateRanges[0])

  useEffect(() => {
    if (selectedTag) {
      setCardSettings(meta.label.toLowerCase(), { language: selectedTag.label })
    }
  }, [meta.label, selectedTag, setCardSettings])

  useEffect(() => {
    if (selectedDateRange) {
      setCardSettings(meta.label.toLowerCase(), { language: selectedDateRange.value })
    }
  }, [meta.label, selectedDateRange, setCardSettings])

  const getQueryTags = () => {
    if (!selectedTag) {
      return []
    }
    if (!selectedTag?.githubValues) {
      return []
    }

    if (selectedTag.value === MY_LANGUAGES_TAG.githubValues[0]) {
      return getCardTagsValue(userSelectedTags, 'githubValues')
    }
    return selectedTag.githubValues
  }

  const results = useGetRepos({
    tags: getQueryTags(),
    dateRange: selectedDateRange.value,
    config: {
      enabled: !!selectedTag?.githubValues,
    },
  })

  const getIsLoading = () => results.some((result) => result.isLoading)

  const getData = () => {
    return results
      .reduce((acc: RepoType[], curr) => {
        if (!curr.data) return acc
        return [...acc, ...curr.data]
      }, [])
      .sort((a, b) => b.stars - a.stars)
  }

  const renderItem = (item: RepoType, index: number) => (
    <RepoItem
      item={item}
      key={`rp-${index}`}
      index={index}
      selectedTag={selectedTag}
      listingMode={listingMode}
    />
  )

  const HeaderTitle = () => {
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <SelectableCard
          isLanguage={true}
          tagId={TAGS_MENU_ID}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          fallbackTag={GLOBAL_TAG}
          cardSettings={cardsSettings?.repos?.language}
          trackEvent={(tag: Tag) => trackCardLanguageSelect('Github', tag.value)}
          data={userSelectedTags.map((tag) => ({
            label: tag.label,
            value: tag.value,
          }))}
        />
        <span> Repos of </span>
        <SelectableCard
          tagId={DATE_RANGE_MENU_ID}
          selectedTag={selectedDateRange}
          setSelectedTag={setSelectedDateRange}
          fallbackTag={dateRanges[0]}
          trackEvent={(tag: DateRangeType) => trackCardDateRangeSelect('Github', tag.value)}
          cardSettings={cardsSettings?.repos?.dateRange}
          data={dateRanges}
        />
      </div>
    )
  }

  const getError = () => {
    if (!selectedTag?.githubValues) {
      return `Github Trending does not support ${selectedTag?.label || 'the selected tag'}.`
    } else if (results.every((result) => result.isError)) {
      return 'Failed to load Github trending repositories'
    } else {
      return undefined
    }
  }
  return (
    <Card fullBlock={true} card={meta} titleComponent={<HeaderTitle />}>
      <ListComponent
        items={getData()}
        error={getError()}
        isLoading={getIsLoading()}
        renderItem={renderItem}
        withAds={withAds}
      />
    </Card>
  )
}
