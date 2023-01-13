import { useState, useEffect } from 'react'
import 'src/assets/App.css'
import { Footer, Header } from 'src/components/Layout'
import { BookmarksSidebar } from 'src/features/bookmarks'
import { MarketingBanner } from 'src/features/MarketingBanner'
import { ScrollCardsNavigator } from './components/Layout'
import { AppContentLayout } from './components/Layout'
import 'react-contexify/dist/ReactContexify.css'
import { setupAnalytics, trackPageView, setupIdentification } from 'src/lib/analytics'

function App() {
  const [showSideBar, setShowSideBar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    setupAnalytics()
    setupIdentification()
    trackPageView('home')
  }, [])

  return (
    <>
      <MarketingBanner />
      <div className="App">
        <Header
          setShowSideBar={setShowSideBar}
          showSideBar={showSideBar}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        <ScrollCardsNavigator />
        <AppContentLayout setShowSettings={setShowSettings} />
        <BookmarksSidebar showSidebar={showSideBar} onClose={() => setShowSideBar(false)} />

        <Footer />
      </div>
    </>
  )
}

export default App
