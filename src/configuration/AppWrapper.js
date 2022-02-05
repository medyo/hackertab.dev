import React, { useReducer, useContext } from 'react'
import { LS_PREFERENCES_KEY } from '../Constants'
import AppStorage from '../services/localStorage'
import { PreferencesProvider } from '../preferences/PreferencesContext'
import { getOSMode } from '../services/os'
import AppReducer from '../preferences/AppReducer'
import ConfigurationContext from './ConfigurationContext'

export default function AppWrapper({ children }) {
  const configuration = useContext(ConfigurationContext)

  const [state, dispatcher] = useReducer(
    AppReducer,
    {
      userSelectedTags: configuration.supportedTags.filter((t) => t.value === 'javascript'),
      userBookmarks: [],
      theme: getOSMode(),
      openLinksNewTab: true,
      listingMode: 'normal',
      searchEngine: 'Google',
      cards: [
        { id: 0, name: 'github' },
        { id: 1, name: 'hackernews' },
        { id: 2, name: 'devto' },
        { id: 3, name: 'producthunt' },
      ],
    },
    (initialState) => {
      let preferences = AppStorage.getItem(LS_PREFERENCES_KEY)
      if (preferences) {
        preferences = JSON.parse(preferences)
        preferences = {
          ...preferences,
          userSelectedTags: configuration.supportedTags.filter((tag) =>
            preferences.userSelectedTags.includes(tag.value)
          ),
        }
        return {
          ...initialState,
          ...preferences,
        }
      }

      return initialState
    }
  )

  return (
    <PreferencesProvider value={{ ...state, dispatcher: dispatcher }}>
      {children}
    </PreferencesProvider>
  )
}
