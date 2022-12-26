import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useGetGithubRepos } from '../../api/getGithubRepos'
import { Repository, CardPropsType } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { getCardTagsValue } from 'src/utils/DataEnhancement'
import RepoItem from './RepoItem'
import { GLOBAL_TAG, MY_LANGUAGES_TAG, dateRanges } from 'src/config'
import { trackCardLanguageSelect, trackCardDateRangeSelect } from 'src/lib/analytics'
import { FloatingFilter, InlineTextFilter } from 'src/components/Elements'
import { filterUniqueEntries } from 'src/utils/DataEnhancement'

export function GithubCard({ meta, withAds }: CardPropsType) {
  const { userSelectedTags, cardsSettings, setCardSettings } = useUserPreferences()

  const selectedTag =
    [GLOBAL_TAG, MY_LANGUAGES_TAG, ...userSelectedTags].find(
      (lang) => lang.value === cardsSettings?.[meta.value]?.language
    ) || GLOBAL_TAG

  const selectedDateRange =
    dateRanges.find((date) => date.value === cardsSettings?.[meta.value]?.dateRange) ||
    dateRanges[0]

  const getQueryTags = () => {
    if (!selectedTag?.githubValues) {
      return []
    }

    if (selectedTag.value === MY_LANGUAGES_TAG.githubValues[0]) {
      return getCardTagsValue(userSelectedTags, 'githubValues')
    }
    return selectedTag.githubValues
  }

  const results = useGetGithubRepos({
    tags: getQueryTags(),
    dateRange: selectedDateRange.value,
    config: {
      enabled: !!selectedTag?.githubValues,
    },
  })

  const getIsLoading = () => results.some((result) => result.isLoading)

  const getData = () => {
    return filterUniqueEntries(
      results
        .reduce((acc: Repository[], curr) => {
          if (!curr.data) return acc
          return [...acc, ...curr.data]
        }, [])
        .sort((a, b) => b.stars - a.stars)
    )
  }

  const renderItem = (item: Repository, index: number) => (
    <RepoItem
      item={item}
      key={`rp-${index}`}
      index={index}
      selectedTag={selectedTag}
      analyticsTag={meta.analyticsTag}
    />
  )

  const HeaderTitle = () => {
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <InlineTextFilter
          options={[GLOBAL_TAG, ...userSelectedTags, MY_LANGUAGES_TAG].map((tag) => ({
            label: tag.label,
            value: tag.value,
          }))}
          onChange={(item) => {
            setCardSettings(meta.value, { ...cardsSettings[meta.value], language: item.value })
            trackCardLanguageSelect(meta.analyticsTag, item.value)
          }}
          value={cardsSettings?.[meta.value]?.language}
        />
        <span> Repos of </span>
        <InlineTextFilter
          options={dateRanges}
          onChange={(item) => {
            console.log(item)
            setCardSettings(meta.value, { ...cardsSettings[meta.value], dateRange: item.value })
            trackCardDateRangeSelect(meta.analyticsTag, item.value)
          }}
          value={cardsSettings?.[meta.value]?.dateRange}
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
      <FloatingFilter card={meta} filters={['datesRange', 'language']} />
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
