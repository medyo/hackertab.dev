
import { LS_PREFERENCES_KEY } from '../Constants';
import AppStorage from '../services/localStorage';


const AppReducer = (state, action) => {
  let newState = { ...state }
  const { value } = action


  switch (action.type) {
    case 'setUserSelectedLinks':
      // check duplication.
      newState = {
        ...newState,
        userSelectedLinks: value,
      }
      break
    case 'setUserSelectedTags':
      // check duplication.
      newState = {
        ...newState,
        userSelectedTags: value,
      }
      break
    case 'setCards':
      newState = { ...state, cards: value }
      break
    case 'setChangelogMeta':
      newState = { ...state, changelogMeta: value }
      break
    case 'toggleTheme':
      let theme = value
      if (!theme) {
        theme = state.theme === 'dark' ? 'light' : 'dark'
      }
      newState = { ...newState, theme }
      break
    case 'setOpenLinksNewTab':
      newState = {
        ...newState,
        openLinksNewTab: value,
      }
      break
    case 'changelistingMode':
      newState = { ...newState, listingMode: value }
      break
    case 'bookmarkItem':
      const exists = newState.userBookmarks.some(
        (bm) => bm.source === value.source && bm.url === value.url
      )
      if (!exists) {
        newState.userBookmarks.unshift(value)
      }
      break
    case 'unBookmarkItem':
      newState.userBookmarks = newState.userBookmarks.filter(
        (bm) => bm.source !== value.source || bm.url !== value.url
      )
      break
    case 'setSearchEngine':
      newState = { ...newState, searchEngine: value.label }
      break
    case 'setCardSettings':
      newState = {
        ...newState,
        cardsSettings: {
          ...newState?.cardsSettings,
          [value.card]: { ...newState?.cardsSettings?.[value.card], ...value },
        },
      }
      break
    default:
      throw new Error()
  }

  const storageData = {
    userSelectedTags: newState.userSelectedTags.map((tag) => tag.value),
    userSelectedLinks: newState.userSelectedLinks,
    theme: newState.theme,
    cards: newState.cards,
    openLinksNewTab: newState.openLinksNewTab,
    listingMode: newState.listingMode,
    changelogMeta: newState.changelogMeta,
    userBookmarks: newState.userBookmarks,
    searchEngine: newState.searchEngine,
    cardsSettings: newState.cardsSettings,
  }
  AppStorage.setItem(LS_PREFERENCES_KEY, storageData)
  return newState
}

export default AppReducer;