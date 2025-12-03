import { RemoteConfig, Tag } from 'src/features/remoteConfig'

export const enhanceTags = (remoteConfigStore: RemoteConfig, tags: string[]): Tag[] => {
  return tags
    .map((tag) =>
      remoteConfigStore.tags.find((st) => st.value.toLowerCase() === tag.toLocaleString())
    )
    .filter(Boolean) as Tag[]
}
