import { Card, FloatingFilter, InlineTextFilter } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { GLOBAL_TAG, MY_LANGUAGES_TAG } from 'src/config'
import { trackCardLanguageSelect } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, CardPropsType } from 'src/types'
import { filterUniqueEntries, getCardTagsValue } from 'src/utils/DataEnhancement'
import { useGetRedditArticles } from '../../api/getRedditArticles'
import ArticleItem from './ArticleItem'

export function RedditCard({ withAds, meta }: CardPropsType) {
  const { userSelectedTags, cardsSettings, setCardSettings } = useUserPreferences()
  const selectedTag =
    [GLOBAL_TAG, MY_LANGUAGES_TAG, ...userSelectedTags].find(
      (lang) => lang.value === cardsSettings?.[meta.value]?.language
    ) || GLOBAL_TAG

  const getQueryTags = () => {
    if (!selectedTag) {
      return []
    }

    if (selectedTag.value === MY_LANGUAGES_TAG.redditValues[0]) {
      return getCardTagsValue(userSelectedTags, 'redditValues') || []
    }
    return selectedTag.redditValues || []
  }

  const results = useGetRedditArticles({ tags: getQueryTags() })

  const getIsLoading = () => results.some((result) => result.isLoading)

  const getData = () => {
    return filterUniqueEntries(
      results
        .reduce((acc: Article[], curr) => {
          if (!curr.data) return acc
          return [...acc, ...curr.data]
        }, [])
        .sort((a, b) => b.reactions - a.reactions)
    )
  }

  const renderItem = (item: Article, index: number) => (
    <ArticleItem
      item={item}
      key={`md-${index}`}
      index={index}
      selectedTag={selectedTag}
      analyticsTag={meta.analyticsTag}
    />
  )

  const HeaderTitle = () => {
    return (
      <>
        {meta.label}
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
      </>
    )
  }

  return (
    <Card card={meta} titleComponent={<HeaderTitle />} withAds={withAds}>
      <FloatingFilter card={meta} filters={['language']} />
      <ListComponent items={getData()} isLoading={getIsLoading()} renderItem={renderItem} />
    </Card>
  )
}
