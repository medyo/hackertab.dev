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
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { ThemeProvider } from 'styled-components'
import { trackPageView } from './utils/Analytics'
import BookmarksSidebar from './bookmark/BookmarksSidebar'
import MarketingBanner from './components/MarketingBanner'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'
import MobileLayout from './components/MobileLayout'
import ScrollCardsNavigator from './components/ScrollCardsNavigator'

function App() {
  const {
    supportedTags,
    marketingBannerConfig = {},
    feedbackWidget,
  } = useContext(ConfigurationContext)
  const [showSideBar, setShowSideBar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const scrollbarRef = React.useRef(null)
  const [state, dispatcher] = useReducer(
    AppReducer,
    {
      userSelectedTags: supportedTags.filter((t) => t.value === 'javascript'),
      userBookmarks: [],
      theme: getOSMode(),
      openLinksNewTab: true,
      listingMode: 'normal',
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
          <BrowserView>
            <MarketingBanner {...marketingBannerConfig} />

            <main className="AppContent scrollable" ref={scrollbarRef}>
              {state.cards.map((card, index) => {
                const constantCard = SUPPORTED_CARDS.find((c) => c.value === card.name)
                return React.createElement(constantCard.component, {
                  key: card.name,
                  label: constantCard.label,
                  icon: constantCard.icon,
                  analyticsTag: constantCard.analyticsTag,
                  withAds: index == 0,
                })
              })}
            </main>
            <BookmarksSidebar showSidebar={showSideBar} onClose={() => setShowSideBar(false)} />

            <Footer setCurrentPage={setCurrentPage} feedbackWidget={feedbackWidget} />
          </BrowserView>

          <MobileView>
            <MobileLayout showSettings={showSettings} setShowSettings={setShowSettings} />
          </MobileView>
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
