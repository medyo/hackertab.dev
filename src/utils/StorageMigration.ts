import AppStorage from 'src/lib/localStorage'
import { useUserPreferences } from 'src/stores/preferences'
import { useBookmarks } from 'src/stores/bookmarks'
import { enhanceTags } from './DataEnhancement'

export const migrateToNewStorage = () => {
  let preferences = AppStorage.getItem('hackerTabPrefs')

  // Remove legacy cached requests
  const legacyStorageKeys = AppStorage.getKeys()
  for (let key of legacyStorageKeys) {
    if (key.startsWith("/data/") || key.startsWith("/devto/")) {
      AppStorage.removeItem(key)
    }
  }
  if (!preferences) {
    return
  }

  let { userBookmarks, changelogMeta, ...parsedPreferences } = JSON.parse(preferences)

  // Migrate Bookmarkds
  if (userBookmarks && !!userBookmarks.length) {
    useBookmarks.getState().initState({ userBookmarks })
  }

  // Migrate preferences
  if (parsedPreferences) {
    parsedPreferences = {
      ...parsedPreferences,
      userSelectedTags: enhanceTags(parsedPreferences.userSelectedTags),
    }
    useUserPreferences.getState().initState(parsedPreferences)
  }

  // Remove old LocalStorage item
  AppStorage.removeItem('hackerTabPrefs')

}
