import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import 'react-contexify/dist/ReactContexify.css'
import 'src/assets/App.css'
import { Header } from 'src/components/Layout'
import { BookmarksSidebar } from 'src/features/bookmarks'
import { MarketingBanner } from 'src/features/MarketingBanner'
import { setupAnalytics, setupIdentification, trackPageView } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { diffBetweenTwoDatesInDays } from 'src/utils/DateUtils'
import { AppContentLayout, ScrollCardsNavigator } from './components/Layout'
import { isWebOrExtensionVersion } from './utils/Environment'
import { getAppVersion } from './utils/Os'

const OnboardingModal = React.lazy(() =>
  import('src/features/onboarding').then((module) => ({ default: module.OnboardingModal }))
)

function App() {
  const [showSideBar, setShowSideBar] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const { onboardingCompleted, firstSeenDate, markOnboardingAsCompleted, maxVisibleCards } =
    useUserPreferences()

  useLayoutEffect(() => {
    if (!onboardingCompleted && getAppVersion() <= '1.15.9') {
      const usageDays = diffBetweenTwoDatesInDays(firstSeenDate, Date.now())
      if (usageDays > 0) {
        markOnboardingAsCompleted(null)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onboardingCompleted, firstSeenDate])

  useEffect(() => {
    document.documentElement.style.setProperty('--max-visible-cards', maxVisibleCards)
  }, [maxVisibleCards])

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
      </div>
    </>
  )
}

export default App
