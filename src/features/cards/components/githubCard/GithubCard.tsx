import { Card, FloatingFilter, InlineTextFilter } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { GLOBAL_TAG, MY_LANGUAGES_TAG, dateRanges } from 'src/config'
import { trackCardDateRangeSelect, trackCardLanguageSelect } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { CardPropsType, Repository } from 'src/types'
import { filterUniqueEntries, getCardTagsValue } from 'src/utils/DataEnhancement'
import { useGetGithubRepos } from '../../api/getGithubRepos'
import RepoItem from './RepoItem'

export function GithubCard(props: CardPropsType) {
  const { meta, withAds, knob } = props
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
      results.reduce((acc: Repository[], curr) => {
        if (!curr.data) return acc
        return [...acc, ...curr.data]
      }, [])
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
      <>
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
        Repos of
        <InlineTextFilter
          options={dateRanges}
          onChange={(item) => {
            setCardSettings(meta.value, { ...cardsSettings[meta.value], dateRange: item.value })
            trackCardDateRangeSelect(meta.analyticsTag, item.value)
          }}
          value={cardsSettings?.[meta.value]?.dateRange}
        />
      </>
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
    <Card fullBlock={true} titleComponent={<HeaderTitle />} {...props}>
      <FloatingFilter card={meta} filters={['datesRange', 'language']} />
      <ListComponent
        items={getData()}
        error={getError()}
        isLoading={getIsLoading()}
        renderItem={renderItem}
      />
    </Card>
  )
}
