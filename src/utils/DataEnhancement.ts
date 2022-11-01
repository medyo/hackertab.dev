import { Tag, useRemoteConfigStore } from "src/features/remoteConfig";

export const enhanceTags = (tags: string[]): Tag[] => {
  const savedTags = useRemoteConfigStore.getState().remoteConfig.supportedTags;

  return tags.map(tag => savedTags.find(st => st.value.toLowerCase() === tag.toLocaleString())).filter(Boolean) as Tag[]
}