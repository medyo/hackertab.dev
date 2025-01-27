import { FaGithub, FaGoogle } from 'react-icons/fa'
import ReactModal from 'react-modal'

type AuthModalProps = {
  showAuth: boolean
  setShowAuth: (show: boolean) => void
}

export const AuthModal = ({ showAuth, setShowAuth }: AuthModalProps) => {
  return (
    <ReactModal
      isOpen={showAuth}
      ariaHideApp={false}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={false}
      onRequestClose={() => setShowAuth(false)}
      contentLabel="Auth"
      className="Modal scrollable"
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      overlayClassName="Overlay">
      <div>
        <div>
          <h1>Welcome to Hackertab</h1>
          <p>
            To enhance your experience and unlock our new rewards system, we’ve introduced a simple
            and secure way to sign in. Connect your account with GitHub or Google to start earning
            rewards, save your progress, and enjoy personalized features.
          </p>
        </div>
        <div>
          <button type="button" className="extraTextWithIconBtn">
            <FaGithub />
            Sign in with Github
          </button>
          <button type="button" className="extraTextWithIconBtn" style={{ marginLeft: 10 }}>
            <FaGoogle />
            Sign in with Google
          </button>
        </div>
      </div>
    </ReactModal>
  )
}
