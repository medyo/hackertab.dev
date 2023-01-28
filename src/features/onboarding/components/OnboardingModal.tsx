import { useEffect } from 'react'
import ReactModal from 'react-modal'
import { Steps } from 'src/components/Elements'
import { SUPPORTED_CARDS } from 'src/config'
import { Tag, useRemoteConfigStore } from 'src/features/remoteConfig'
import {
  identifyUserCards,
  identifyUserLanguages,
  identifyUserOccupation,
  trackOnboardingFinish,
  trackOnboardingSkip,
  trackOnboardingStart,
} from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { HelloTab } from './steps/HelloTab'
import { LanguagesTab } from './steps/LanguagesTab'
import { SourcesTab } from './steps/SourcesTab'
import './steps/tabs.css'

type OnboardingModalProps = {
  showOnboarding: boolean
  setShowOnboarding: (show: boolean) => void
}

export const OnboardingModal = ({ showOnboarding, setShowOnboarding }: OnboardingModalProps) => {
  const { markOnboardingAsCompleted, setTags, setCards } = useUserPreferences()
  const { supportedTags } = useRemoteConfigStore()

  useEffect(() => {
    trackOnboardingStart()
  }, [])
  return (
    <ReactModal
      isOpen={showOnboarding}
      ariaHideApp={false}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      shouldFocusAfterRender={false}
      onRequestClose={() => setShowOnboarding(false)}
      contentLabel="Onboarding"
      className="Modal"
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      overlayClassName="Overlay">
      <div className="onboardingModal">
        <Steps
          steps={[
            { title: 'Hello', element: HelloTab },
            { title: 'Sources', element: SourcesTab },
            { title: 'Languages', element: LanguagesTab },
          ]}
          onSkip={() => {
            trackOnboardingSkip()
            markOnboardingAsCompleted(null)
            setShowOnboarding(false)
          }}
          onFinish={(tabsData) => {
            trackOnboardingFinish()
            if (tabsData) {
              const { icon, ...occupation } = tabsData
              markOnboardingAsCompleted(occupation)
              identifyUserOccupation(occupation.title)

              const tags =
                (occupation.tags
                  .map((tag) => supportedTags.find((st) => st.value === tag))
                  .filter(Boolean) as Tag[]) || []

              setTags(tags)
              identifyUserLanguages(tags.map((tag) => tag.value))

              const cards =
                occupation.sources
                  .map((source) => SUPPORTED_CARDS.find((sc) => sc.value === source))
                  .filter(Boolean)
                  .map((source, index) => {
                    return {
                      id: index,
                      name: source?.value || '',
                    }
                  }) || []

              setCards(cards)
              identifyUserCards(cards.map((card) => card.name))
            }

            setShowOnboarding(false)
          }}
        />
      </div>
    </ReactModal>
  )
}
