import { useCallback, useLayoutEffect } from 'react'
import DropDownMenu from './DropDownMenu'
import { GLOBAL_TAG, MY_LANGUAGES_TAG } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'

function SelectableCard({
  tagId,
  data,
  cardSettings,
  fallbackTag,
  selectedTag,
  setSelectedTag,
  trackEvent,
  isLanguage = false,
}) {
  const { userSelectedTags } = useUserPreferences()

  let mergedTags = data
  if (isLanguage) {
    mergedTags = [...userSelectedTags, GLOBAL_TAG, MY_LANGUAGES_TAG]
  }

  const findTagByValue = useCallback(
    (value) => {
      if (!value) {
        return null
      }

      return mergedTags.find((t) => t.value === value)
    },
    [mergedTags]
  )

  const findTagByLabel = useCallback(
    (name) => {
      if (!name) {
        return null
      }

      return mergedTags.find((t) => t.label === name)
    },
    [mergedTags]
  )
  const getInitialSelectedTagValue = useCallback(() => {
    if (isLanguage) {
      return findTagByLabel(cardSettings) ?? fallbackTag
    } else {
      return findTagByValue(cardSettings) ?? fallbackTag
    }
  }, [cardSettings, fallbackTag, findTagByLabel, findTagByValue, isLanguage])

  useLayoutEffect(() => {
    if (selectedTag == null) {
      setSelectedTag(getInitialSelectedTagValue())
    }
  }, [getInitialSelectedTagValue, selectedTag, setSelectedTag])

  return (
    <DropDownMenu
      data={mergedTags}
      tagId={tagId}
      label={selectedTag?.label ?? '--'}
      setSelectedDropDownItem={(item) => {
        const tag = findTagByValue(item.value)
        if (tag) {
          if (trackEvent) {
            trackEvent(tag)
          }
          setSelectedTag(tag)
        }
      }}
    />
  )
}

export default SelectableCard
