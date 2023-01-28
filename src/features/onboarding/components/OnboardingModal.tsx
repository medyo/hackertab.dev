import { useEffect } from 'react'
import ReactModal from 'react-modal'
import { Steps } from 'src/components/Elements'
import { trackOnboardingFinish, trackOnboardingSkip, trackOnboardingStart } from 'src/lib/analytics'
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
  const { markOnboardingAsCompleted } = useUserPreferences()

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
            }

            setShowOnboarding(false)
          }}
        />
      </div>
    </ReactModal>
  )
}
