import { useState, useEffect } from 'react'
import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useGetDevtoArticles } from '../../api/getDevtoArticles'
import { Article, CardPropsType } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { getCardTagsValue } from 'src/utils/DataEnhancement'
import ArticleItem from './ArticleItem'
import { Tag } from 'src/features/remoteConfig'
import { GLOBAL_TAG, MY_LANGUAGES_TAG } from 'src/config'
import { trackCardLanguageSelect } from 'src/lib/analytics'
import SelectableCard from 'src/components/SelectableCard'

const DT_MENU_LANGUAGE_ID = 'DT_MENU_LANGUAGE_ID'

export function DevtoCard({ withAds, meta }: CardPropsType) {
  const { userSelectedTags, cardsSettings, setCardSettings } = useUserPreferences()
  const [selectedTag, setSelectedTag] = useState<Tag>()

  useEffect(() => {
    if (selectedTag) {
      setCardSettings(meta.value, { language: selectedTag.label })
    }
  }, [selectedTag, meta, setCardSettings])

  const getQueryTags = () => {
    if (!selectedTag) {
      return []
    }

    if (selectedTag.value === MY_LANGUAGES_TAG.devtoValues[0]) {
      return getCardTagsValue(userSelectedTags, 'devtoValues')
    }
    return selectedTag.devtoValues
  }

  const results = useGetDevtoArticles({ tags: getQueryTags() })

  const getIsLoading = () => results.some((result) => result.isLoading)

  const getData = () => {
    return results
      .reduce((acc: Article[], curr) => {
        if (!curr.data) return acc
        return [...acc, ...curr.data]
      }, [])
      .sort((a, b) => b.reactions - a.reactions)
  }

  const renderItem = (item: Article, index: number) => (
    <ArticleItem
      item={item}
      key={`at-${index}`}
      index={index}
      analyticsTag={meta.analyticsTag}
      selectedTag={selectedTag}
    />
  )

  const HeaderTitle = () => {
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <span> {meta.label} </span>
        <SelectableCard
          isLanguage={true}
          tagId={DT_MENU_LANGUAGE_ID}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          fallbackTag={GLOBAL_TAG}
          cardSettings={cardsSettings?.devto?.language}
          trackEvent={(tag: Tag) => trackCardLanguageSelect(meta.analyticsTag, tag.value)}
          data={userSelectedTags.map((tag) => ({
            label: tag.label,
            value: tag.value,
          }))}
        />
      </div>
    )
  }

  return (
    <Card card={meta} titleComponent={<HeaderTitle />}>
      <ListComponent
        items={getData()}
        isLoading={getIsLoading()}
        renderItem={renderItem}
        withAds={withAds}
      />
    </Card>
  )
}
