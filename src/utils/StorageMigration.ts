import AppStorage from 'src/services/localStorage'
import { useUserPreferences } from 'src/stores/preferences'
import { useBookmarks } from 'src/stores/bookmarks'
import { enhanceTags } from './DataEnhancement'

export const migrateToNewStorage = () => {
  let preferences = AppStorage.getItem('hackerTabPrefs')
  console.error('Here')
  //userSelectedTags: supportedTags.filter((t) => t.value === 'javascript'),

  console.log('preferences', preferences)
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
