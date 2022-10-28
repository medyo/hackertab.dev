import React, { useState, useEffect, useContext } from 'react'
import './App.css'
import { Footer } from 'src/components/Layout'
import Header from 'src/components/Header'
import BookmarksSidebar from './bookmark/BookmarksSidebar'
import { MarketingBanner } from 'src/components/Elements/MarketingBanner'
import ScrollCardsNavigator from './components/ScrollCardsNavigator'
import AppContentLayout from './components/AppContentLayout'
import 'react-contexify/dist/ReactContexify.css'
import PreferencesContext from './preferences/PreferencesContext'
import { setupAnalytics, trackPageView, setupIdentification } from 'src/lib/analytics'
import { useRemoteConfigStore } from 'src/features/remoteConfig'

function App() {
  const [showSideBar, setShowSideBar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { dispatcher, ...state } = useContext(PreferencesContext)
  const {
    remoteConfig: { marketingBannerConfig },
  } = useRemoteConfigStore()

  useEffect(() => {
    setupAnalytics()
    setupIdentification(state)
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

      <Footer />
    </div>
  )
}

export default App
