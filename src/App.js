import React, { useState, useReducer, useEffect, useContext, useRef } from 'react'
import './App.css'
import { PreferencesProvider } from './preferences/PreferencesContext'
import AppReducer from './preferences/AppReducer'
import ConfigurationContext from './configuration/ConfigurationContext'
import { APP, LS_PREFERENCES_KEY, SUPPORTED_CARDS } from './Constants'
import { getOSMode } from './services/os'
import AppStorage from './services/localStorage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import DataSourcePage from './pages/DataSourcePage'
import Footer from './components/Footer'
import Header from './components/Header'
import { trackPageView } from './utils/Analytics'
import BookmarksSidebar from './bookmark/BookmarksSidebar'
import MarketingBanner from './components/MarketingBanner'
import ScrollCardsNavigator from './components/ScrollCardsNavigator'
import BottomNavigation from './components/BottomNavigation'
import AppContentLayout from './components/AppContentLayout'

function App() {
  const {
    supportedTags,
    marketingBannerConfig = {},
    feedbackWidget,
  } = useContext(ConfigurationContext)
  const [showSideBar, setShowSideBar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [state, dispatcher] = useReducer(
    AppReducer,
    {
      userSelectedTags: supportedTags.filter((t) => t.value === 'javascript'),
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
      try {
        let preferences = AppStorage.getItem(LS_PREFERENCES_KEY)
        if (preferences) {
          preferences = JSON.parse(preferences)
          preferences = {
            ...preferences,
            userSelectedTags: supportedTags.filter((tag) =>
              preferences.userSelectedTags.includes(tag.value)
            ),
          }
          return {
            ...initialState,
            ...preferences,
          }
        }
      } catch (e) {}
      return initialState
    }
  )
  useEffect(() => {
    trackPageView(currentPage)
  }, [currentPage])

  const renderHomePage = () => {
    return (
      <PreferencesProvider value={{ ...state, dispatcher: dispatcher }}>
        <div className="App">
          <Header
            setShowSideBar={setShowSideBar}
            state={state}
            dispatcher={dispatcher}
            showSideBar={showSideBar}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
          />
          <ScrollCardsNavigator />
          <MarketingBanner {...marketingBannerConfig} />
          <AppContentLayout setShowSettings={setShowSettings} />
          <BookmarksSidebar showSidebar={showSideBar} onClose={() => setShowSideBar(false)} />

          <Footer setCurrentPage={setCurrentPage} feedbackWidget={feedbackWidget} />
        </div>
      </PreferencesProvider>
    )
  }

  const autoRouteContent = () => {
    let content = null
    switch (currentPage) {
      case 'terms':
        content = <TermsPage goToPage={setCurrentPage} />
        break
      case 'privacy':
        content = <PrivacyPage goToPage={setCurrentPage} />
        break
      case 'dataSource':
        content = <DataSourcePage goToPage={setCurrentPage} />
        break
      default:
        content = renderHomePage()
    }
    return content
  }

  return autoRouteContent()
}

export default App
