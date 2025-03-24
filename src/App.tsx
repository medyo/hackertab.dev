import { useEffect, useLayoutEffect, useState } from 'react'
import { DNDLayout } from 'src/components/Layout'
import {
  identifyAdvBlocked,
  setupAnalytics,
  setupIdentification,
  trackPageView,
} from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { AppContentLayout } from './components/Layout'
import { verifyAdvStatus } from './features/adv/utils/status'
import { isWebOrExtensionVersion } from './utils/Environment'
import { lazyImport } from './utils/lazyImport'
const { OnboardingModal } = lazyImport(() => import('src/features/onboarding'), 'OnboardingModal')

const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      document.documentElement.classList.remove('dndState')
    } else {
      document.documentElement.classList.add('dndState')
    }
  })
}

export const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const { onboardingCompleted, maxVisibleCards, isDNDModeActive, DNDDuration, setDNDDuration } =
    useUserPreferences()

  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--max-visible-cards', maxVisibleCards.toString())
  }, [maxVisibleCards])

  useEffect(() => {
    document.body.classList.remove('preload')
    setupAnalytics()
    setupIdentification()
    const adVerifier = async () => {
      const status = await verifyAdvStatus()
      identifyAdvBlocked(status)
    }
    adVerifier()
  }, [])

  useEffect(() => {
    trackPageView('home', isDNDModeActive())
    if (!isDNDModeActive() && DNDDuration !== 'never') {
      setDNDDuration('never')
    }
  }, [DNDDuration, isDNDModeActive, setDNDDuration])

  useLayoutEffect(() => {
    let dndContent = document.querySelector('.DNDContent')
    let observer = new IntersectionObserver(intersectionCallback, {
      threshold: 0.1,
    })

    if (dndContent) {
      observer.observe(dndContent)
    } else {
      document.documentElement.classList.remove('dndState')
    }

    return () => {
      observer.disconnect()
    }
  }, [DNDDuration])

  return (
    <>
      {!onboardingCompleted && isWebOrExtensionVersion() === 'extension' && (
        <OnboardingModal showOnboarding={showOnboarding} setShowOnboarding={setShowOnboarding} />
      )}

      <div className="layoutLayers hideScrollBar">
        {isDNDModeActive() && <DNDLayout />}
        <AppContentLayout />
      </div>
    </>
  )
}
