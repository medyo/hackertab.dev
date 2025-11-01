import { useEffect } from 'react'
import ReactModal from 'react-modal'
import { trackOnboardingStart } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { HelloTab } from './steps/HelloTab'
import './steps/tabs.css'

export const OnboardingModal = () => {
  const { onboardingCompleted } = useUserPreferences()

  useEffect(() => {
    trackOnboardingStart()
  }, [])
  return (
    <ReactModal
      isOpen={!onboardingCompleted}
      ariaHideApp={false}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      shouldFocusAfterRender={false}
      contentLabel="Onboarding"
      className="Modal scrollable"
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      overlayClassName="Overlay">
      <div className="onboardingModal">
        <HelloTab />
      </div>
    </ReactModal>
  )
}
