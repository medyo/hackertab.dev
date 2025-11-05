import { useMemo } from 'react'
import { useUserPreferences } from 'src/stores/preferences'
import { MY_LANGUAGES_OPTION } from '../config'

type useSelectedTagsProps = {
  source: string
  fallbackTag: {
    label: string
    value: string
  }
}
export const useSelectedTags = ({ source, fallbackTag }: useSelectedTagsProps) => {
  const cardSettings = useUserPreferences((state) => state.cardsSettings?.[source])
  const { userSelectedTags } = useUserPreferences()

  const selectedTags = useMemo(() => {
    if (!cardSettings?.language) {
      return [fallbackTag]
    }

    if (cardSettings.language === MY_LANGUAGES_OPTION.value) {
      return userSelectedTags
    }
    return [userSelectedTags.find((lang) => lang.value === cardSettings?.language) || fallbackTag]
  }, [userSelectedTags, cardSettings])

  return {
    queryTags: selectedTags,
    selectedTag: cardSettings?.language
      ? [MY_LANGUAGES_OPTION, ...userSelectedTags].find(
          (lang) => lang.value === cardSettings.language
        ) || fallbackTag
      : fallbackTag,
    cardSettings,
  }
}
