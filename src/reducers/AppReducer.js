
import { LS_PREFERENCES_KEY } from '../Constants';
import AppStorage from '../services/localStorage';


const AppReducer = (state, action) => {
  let newState = state

  switch (action.type) {
    case 'setUserSelectedTags':
      // check duplication.
      newState = { ...newState, userSelectedTags: action.value };
      break;
    case 'setCards':
      newState = { ...state, cards: action.value }
      break;
    case 'toggleTheme':
      let theme = action.value
      if (!theme) {
        theme = state.theme === 'dark' ? 'light' : 'dark'
      }
      newState = { ...newState, theme }
      break;
    case 'setOpenLinksNewTab':
      newState = { ...newState, openLinksNewTab: action.value }
      break;
    default:
      throw new Error();
  }

  const storageData = {
    userSelectedTags: newState.userSelectedTags,
    theme: newState.theme,
    cards: newState.cards,
    openLinksNewTab: newState.openLinksNewTab
  }
  AppStorage.setItem(LS_PREFERENCES_KEY, storageData)
  return newState
}

export default AppReducer;