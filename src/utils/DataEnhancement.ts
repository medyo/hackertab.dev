import { Tag, useRemoteConfigStore, TagValuesFieldType } from 'src/features/remoteConfig'
import { BaseEntry } from 'src/types'

export const enhanceTags = (tags: string[]): Tag[] => {
  const savedTags = useRemoteConfigStore.getState().supportedTags

  return tags
    .map((tag) => savedTags.find((st) => st.value.toLowerCase() === tag.toLocaleString()))
    .filter(Boolean) as Tag[]
}


export const getCardTagsValue = (tags: Tag[], valuesField: TagValuesFieldType): string[] => {
  return tags.reduce((acc: string[], curr) => {
    if (!curr[valuesField] || curr[valuesField].length === 0) return acc
    acc = [...acc, ...curr[valuesField]]
    return acc
  }, [])
}


export const filterUniqueEntries = (entries: BaseEntry[]) => {
  const uniqueResults = new Map()
  entries.forEach((item) => uniqueResults.set(item.id, item))
  return Array.from(uniqueResults.values())
}