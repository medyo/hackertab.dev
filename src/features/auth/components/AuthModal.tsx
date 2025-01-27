import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import ReactModal from 'react-modal'
import toast from 'react-simple-toasts'
import { auth, provider } from '../api/Config'

type AuthModalProps = {
  showAuth: boolean
  setShowAuth: (show: boolean) => void
}

export const AuthModal = ({ showAuth, setShowAuth }: AuthModalProps) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        // TODO save this token in user settings maybe!
        const token = credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log(user)
      })
      .catch((error) => {
        toast("We couldn't login to you Google account!!", { theme: 'failure' })
      })
  }
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
          <button
            type="button"
            className="extraTextWithIconBtn"
            style={{ marginLeft: 10 }}
            onClick={signInWithGoogle}>
            <FaGoogle />
            Sign in with Google
          </button>
        </div>
      </div>
    </ReactModal>
  )
}
