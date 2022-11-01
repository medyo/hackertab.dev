import { Tag, useRemoteConfigStore, TagValuesFieldType } from 'src/features/remoteConfig'

export const enhanceTags = (tags: string[]): Tag[] => {
  const savedTags = useRemoteConfigStore.getState().remoteConfig.supportedTags

  return tags
    .map((tag) => savedTags.find((st) => st.value.toLowerCase() === tag.toLocaleString()))
    .filter(Boolean) as Tag[]
}


export const getCardTagsValue = (tags: string[], valuesField: TagValuesFieldType): string[] => {
  return enhanceTags(tags).reduce((acc: string[], curr) => {
    if (!curr[valuesField] || curr[valuesField].length === 0) return acc
    acc = [...acc, ...curr[valuesField]]
    return acc
  }, [])
}
