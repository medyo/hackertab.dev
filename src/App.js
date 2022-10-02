import React, { useState, useEffect, useContext } from 'react'
import './App.css'
import ConfigurationContext from './configuration/ConfigurationContext'
import Footer from './components/Footer'
import Header from './components/Header'
import { trackPageView } from './utils/Analytics'
import BookmarksSidebar from './bookmark/BookmarksSidebar'
import MarketingBanner from './components/MarketingBanner'
import ScrollCardsNavigator from './components/ScrollCardsNavigator'
import AppContentLayout from './components/AppContentLayout'
import 'react-contexify/dist/ReactContexify.css'
import PreferencesContext from './preferences/PreferencesContext'
import { initAnalytics } from './utils/Analytics'

function App() {
  const { marketingBannerConfig = {}, feedbackWidget } = useContext(ConfigurationContext)
  const [showSideBar, setShowSideBar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { dispatcher, ...state } = useContext(PreferencesContext)

  useEffect(() => {
    initAnalytics()
    trackPageView('home')
  }, [])

  return (
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

      <Footer feedbackWidget={feedbackWidget} />
    </div>
  )
}

export default App
