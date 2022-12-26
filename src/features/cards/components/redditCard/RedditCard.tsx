import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useGetRedditArticles } from '../../api/getRedditArticles'
import { Article, CardPropsType } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { getCardTagsValue } from 'src/utils/DataEnhancement'
import ArticleItem from './ArticleItem'
import { GLOBAL_TAG, MY_LANGUAGES_TAG } from 'src/config'
import { trackCardLanguageSelect } from 'src/lib/analytics'
import { FloatingFilter, InlineTextFilter } from 'src/components/Elements'
import { filterUniqueEntries } from 'src/utils/DataEnhancement'

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
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <FloatingFilter card={meta} filters={['language']} />
        <span> {meta.label} </span>
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
      </div>
    )
  }

  return (
    <Card card={meta} titleComponent={<HeaderTitle />}>
      <FloatingFilter card={meta} />
      <ListComponent
        items={getData()}
        isLoading={getIsLoading()}
        renderItem={renderItem}
        withAds={withAds}
      />
    </Card>
  )
}
