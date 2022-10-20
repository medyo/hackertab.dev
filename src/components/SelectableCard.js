import React, { useContext, useLayoutEffect } from 'react'
import DropDownMenu from './DropDownMenu'
import { GLOBAL_TAG, MY_LANGUAGES_TAG } from '../constants'
import PreferencesContext from '../preferences/PreferencesContext'

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
  const preferences = useContext(PreferencesContext)
  const { userSelectedTags } = preferences

  let mergedTags = data
  if (isLanguage) {
    mergedTags = [...userSelectedTags, GLOBAL_TAG, MY_LANGUAGES_TAG]
  }

  const getInitialSelectedTagValue = () => {
    if (isLanguage) {
      return findTagByLabel(cardSettings) ?? fallbackTag
    } else {
      return findTagByValue(cardSettings) ?? fallbackTag
    }
  }

  const findTagByValue = (value) => {
    if (!value) {
      return null
    }

    return mergedTags.find((t) => t.value == value)
  }

  const findTagByLabel = (name) => {
    if (!name) {
      return null
    }

    return mergedTags.find((t) => t.label == name)
  }

  useLayoutEffect(() => {
    if (selectedTag == null) {
      setSelectedTag(getInitialSelectedTagValue())
    }
  }, [])

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
