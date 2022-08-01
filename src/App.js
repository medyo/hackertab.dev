import React, { useState, useEffect, useContext, useRef } from 'react'
import './App.css'
import ConfigurationContext from './configuration/ConfigurationContext'
import AppStorage from './services/localStorage'
import { LS_PREFERENCES_KEY } from './Constants'
import Footer from './components/Footer'
import Header from './components/Header'
import { trackPageView } from './utils/Analytics'
import BookmarksSidebar from './bookmark/BookmarksSidebar'
import MarketingBanner from './components/MarketingBanner'
import ScrollCardsNavigator from './components/ScrollCardsNavigator'
import AppContentLayout from './components/AppContentLayout'
import 'react-contexify/dist/ReactContexify.css'
import PreferencesContext from './preferences/PreferencesContext'

function App() {
  const { marketingBannerConfig = {}, feedbackWidget } = useContext(ConfigurationContext)
  const [showSideBar, setShowSideBar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { dispatcher, ...state } = useContext(PreferencesContext)

  let links = state.userSelectedLinks
  
  function traverseBookmarks(bookmarkTreeNodes) {
    for(var i=0; i < bookmarkTreeNodes.length; i++) {
      if (bookmarkTreeNodes[i].url) {
        links.push({
          label: bookmarkTreeNodes[i].title,
          value: bookmarkTreeNodes[i].url
        })
        dispatcher({ type: 'setUserSelectedLinks', value: links })
      }

      if(bookmarkTreeNodes[i].children) {
          traverseBookmarks(bookmarkTreeNodes[i].children);
      }
    }
  }

  useEffect(() => {
    trackPageView('home')
    let preferences = AppStorage.getItem(LS_PREFERENCES_KEY)
    if (!preferences && chrome && chrome.bookmarks) {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        traverseBookmarks(bookmarkTreeNodes)
      })
    }
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
