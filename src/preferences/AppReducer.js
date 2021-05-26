
import { LS_PREFERENCES_KEY } from '../Constants';
import AppStorage from '../services/localStorage';


const AppReducer = (state, action) => {
  let newState = { ...state }
  const { value } = action


  switch (action.type) {
		case 'setUserSelectedTags':
			// check duplication.
			newState = {
				...newState,
				userSelectedTags: value,
			};
			break;
		case 'setCards':
			newState = { ...state, cards: value };
			break;
		case 'toggleTheme':
			let theme = value;
			if (!theme) {
				theme =
					state.theme === 'dark'
						? 'light'
						: 'dark';
			}
			newState = { ...newState, theme };
			break;
		case 'setOpenLinksNewTab':
			newState = {
				...newState,
				openLinksNewTab: value,
			};
			break;
		case 'changeListingStyle':
			newState = { ...newState, listingStyle: value };
			break;
		case 'bookmarkItem':
			const exists = newState.userBookmarks.some(
				(bm) =>
					bm.source === value.source &&
					bm.url === value.url
			);
			if (!exists) {
				newState.userBookmarks.unshift(value);
			}
			break;
		case 'unBookmarkItem':
			newState.userBookmarks =
				newState.userBookmarks.filter(
					(bm) =>
						bm.source !==
							value.source ||
						bm.url !== value.url
				);
			break;
		default:
			throw new Error();
  }

  const storageData = {
		userSelectedTags: newState.userSelectedTags.map(
			(tag) => tag.value
		),
		theme: newState.theme,
		cards: newState.cards,
		openLinksNewTab: newState.openLinksNewTab,
		listingStyle: newState.listingStyle,
		userBookmarks: newState.userBookmarks,
  };
  AppStorage.setItem(LS_PREFERENCES_KEY, storageData)
  return newState
}

export default AppReducer;