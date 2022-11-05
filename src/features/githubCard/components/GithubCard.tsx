import { useState, useEffect } from 'react'
import CardComponent from 'src/components/CardComponent'
import { ListComponent } from 'src/components/List'
import { useGetArticles } from '../api/getArticles'
import { ArticleType, CardPropsType } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { getCardTagsValue } from 'src/utils/DataEnhancement'
import ArticleItem from './ArticleItem'
import { Tag } from 'src/features/remoteConfig'
import { GLOBAL_TAG, MY_LANGUAGES_TAG } from 'src/config'
import { trackCardLanguageSelect, trackCardDateRangeSelect } from 'src/lib/analytics'
import SelectableCard from 'src/components/SelectableCard'

const TAGS_MENU_ID = 'tags-menu'
const DATE_RANGE_MENU_ID = 'date-range-id'

type DateRangeType = {
  value: "daily" | "monthly" | "weekly"
  label: string
}

export function GithubCard(props: CardPropsType) {
  const dateRanges: DateRangeType[] = [
    { label: 'the day', value: 'daily' },
    { label: 'the week', value: 'weekly' },
    { label: 'the month', value: 'monthly' },
  ]
  const { label, icon, withAds } = props
  const { userSelectedTags, cardsSettings, setCardSettings, listingMode } = useUserPreferences()
  const [selectedTag, setSelectedTag] = useState<Tag>()
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeType>(dateRanges[0])

  useEffect(() => {
    if (selectedTag) {
      setCardSettings(label.toLowerCase(), { language: selectedTag.label })
    }
  }, [selectedTag])

  useEffect(() => {
    if (selectedDateRange) {
      setCardSettings(label.toLowerCase(), { language: selectedDateRange.value })
    }
  }, [selectedDateRange])

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

  const results = useGetArticles({
    tags: getQueryTags(),
    dateRange: selectedDateRange.value,
    config: {
      enabled: !!selectedTag?.githubValues,
    },
  })

  const getIsLoading = () => results.some((result) => result.isLoading)

  const getData = () => {
    return results
      .reduce((acc: ArticleType[], curr) => {
        if (!curr.data) return acc
        return [...acc, ...curr.data]
      }, [])
      .sort((a, b) => b.reactions - a.reactions)
  }

  const renderItem = (item: ArticleType, index: number) => (
    <ArticleItem
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
          trackEvent={(tag: Tag) => trackCardLanguageSelect('Repos', tag.value)}
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
          trackEvent={(tag: DateRangeType) => trackCardDateRangeSelect('Repos', tag.value)}
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
    <CardComponent
      fullBlock={true}
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://github.com/"
      title={<HeaderTitle />}>
      <ListComponent
        items={getData()}
        error={getError()}
        isLoading={getIsLoading()}
        renderItem={renderItem}
        withAds={withAds}
      />
    </CardComponent>
  )
}
