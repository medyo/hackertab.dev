import { useState, useEffect } from 'react'
import CardComponent from 'src/components/CardComponent'
import { ListComponent } from 'src/components/List'
import { useGetArticles } from '../api/getArticles'
import { ArticleType, CardPropsType } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { getCardTagsValue } from 'src/utils/DataEnhancement'
import ArticleItem from './ArticleItem'
import { Tag } from 'src/features/remoteConfig'
import { GLOBAL_TAG, MY_LANGUAGES_TAG } from 'src/Constants'
import { trackCardLanguageSelect } from 'src/lib/analytics'
import SelectableCard from 'src/components/SelectableCard'

const FCC_MENU_LANGUAGE_ID = 'FCC_MENU_LANGUAGE_ID'

export function FreecodecampCard(props: CardPropsType) {
  const { label, icon, withAds } = props
  const { userSelectedTags, cardsSettings, setCardSettings, listingMode } = useUserPreferences()
  const [selectedTag, setSelectedTag] = useState<Tag>()

  useEffect(() => {
    if (selectedTag) {
      setCardSettings(label.toLowerCase(), { language: selectedTag.label })
    }
  }, [selectedTag])

  const getQueryTags = () => {
    if (!selectedTag) {
      return []
    }

    if (selectedTag.value === MY_LANGUAGES_TAG.freecodecampValues[0]) {
      return getCardTagsValue(userSelectedTags, 'freecodecampValues')
    }
    return selectedTag.freecodecampValues
  }

  const results = useGetArticles({ tags: getQueryTags() })

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
      key={`fcc-${index}`}
      index={index}
      selectedTag={selectedTag}
      listingMode={listingMode}
    />
  )

  const HeaderTitle = () => {
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <span> {label} </span>
        <SelectableCard
          isLanguage={true}
          tagId={FCC_MENU_LANGUAGE_ID}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          fallbackTag={GLOBAL_TAG}
          cardSettings={cardsSettings?.devto?.language}
          trackEvent={(tag: Tag) => trackCardLanguageSelect('Devto', tag.value)}
          data={userSelectedTags.map((tag) => ({
            label: tag.label,
            value: tag.value,
          }))}
        />
      </div>
    )
  }

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://freecodecamp.com/news"
      title={<HeaderTitle />}>
      <ListComponent
        items={getData()}
        isLoading={getIsLoading()}
        renderItem={renderItem}
        withAds={withAds}
      />
    </CardComponent>
  )
}