import { useMemo } from 'react'
import { useUserPreferences } from 'src/stores/preferences'
import { useShallow } from 'zustand/shallow'
import { MY_LANGUAGES_OPTION } from '../config'

type useSelectedTagsProps = {
  source: string
  fallbackTag: {
    label: string
    value: string
  }
}
export const useSelectedTags = ({ source, fallbackTag }: useSelectedTagsProps) => {
  const { cardSettings, userSelectedTags } = useUserPreferences(
    useShallow((state) => {
      return {
        cardSettings: state.cardsSettings?.[source],
        userSelectedTags: state.userSelectedTags,
      }
    })
  )
  const { language } = cardSettings || {}
  const selectedTags = useMemo(() => {
    if (!language || (language === MY_LANGUAGES_OPTION.value && userSelectedTags.length === 0)) {
      return [fallbackTag]
    }

    if (language === MY_LANGUAGES_OPTION.value) {
      return userSelectedTags
    }
    return [userSelectedTags.find((lang) => lang.value === language) || fallbackTag]
  }, [userSelectedTags, language])

  const selectedTag = useMemo(() => {
    return language
      ? [MY_LANGUAGES_OPTION, ...userSelectedTags].find((lang) => lang.value === language) ||
          fallbackTag
      : fallbackTag
  }, [language, userSelectedTags])

  const queryTags = useMemo(() => {
    return selectedTags.map((tag) => tag.value)
  }, [selectedTags])

  return {
    selectedTags,
    queryTags,
    selectedTag,
    cardSettings,
  }
}
