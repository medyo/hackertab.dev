import React, { Suspense, useEffect, useState } from 'react'
import 'react-contexify/dist/ReactContexify.css'
import 'src/assets/App.css'
import { Footer, Header } from 'src/components/Layout'
import { BookmarksSidebar } from 'src/features/bookmarks'
import { MarketingBanner } from 'src/features/MarketingBanner'
import { setupAnalytics, setupIdentification, trackPageView } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { AppContentLayout, ScrollCardsNavigator } from './components/Layout'
import { isWebOrExtensionVersion } from './utils/Environment'

const OnboardingModal = React.lazy(() =>
  import('src/features/onboarding').then((module) => ({ default: module.OnboardingModal }))
)

function App() {
  const [showSideBar, setShowSideBar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const { onboardingCompleted } = useUserPreferences()

  useEffect(() => {
    setupAnalytics()
    setupIdentification()
    trackPageView('home')
  }, [])

  return (
    <>
      <MarketingBanner />

      <div className="App">
        {!onboardingCompleted && isWebOrExtensionVersion() === 'extension' && (
          <Suspense fallback={null}>
            <OnboardingModal
              showOnboarding={showOnboarding}
              setShowOnboarding={setShowOnboarding}
            />
          </Suspense>
        )}
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
