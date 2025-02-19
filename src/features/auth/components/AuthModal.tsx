import { AuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth'
import { FaGithub, FaHeart } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoMdClose } from 'react-icons/io'
import ReactModal from 'react-modal'
import toast from 'react-simple-toasts'
import { useAuth } from 'src/features/auth'
import { trackUserConnect } from 'src/lib/analytics'
import { firebaseAuth, githubAuthProvider, googleAuthProvider } from 'src/lib/firebase'
import './authModal.css'

type AuthModalProps = {
  showAuth: boolean
}

export const AuthModal = ({ showAuth }: AuthModalProps) => {
  const { closeAuthModal, initState } = useAuth()

  const signIn = (provider: AuthProvider, providerName: string) => {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const credential = OAuthProvider.credentialFromResult(result)
        const idToken = credential?.idToken
        const email = result.user.displayName
        const name = result.user.displayName
        const imageURL = result.user.photoURL
        if (idToken && name && email && imageURL) {
          trackUserConnect(providerName)
          closeAuthModal()
          initState({
            idToken: idToken,
            user: {
              name: name,
              email: email,
              imageURL: imageURL,
            },
          })
        }
      })
      .catch((error) => {
        console.log(error)
        toast(`We couldn't login to your ${providerName} account!!`, { theme: 'failure' })
      })
  }

  return (
    <ReactModal
      isOpen={showAuth}
      ariaHideApp={false}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={false}
      onRequestClose={closeAuthModal}
      contentLabel="Auth"
      className="Modal authModal"
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      overlayClassName="Overlay">
      <div className="titleAndCloseBtn">
        <h3>
          <FaHeart /> Join the community
        </h3>
        <button className="extraBtn" onClick={closeAuthModal}>
          <IoMdClose />
        </button>
      </div>
      <div className="buttons">
        <button
          className="extraTextWithIconBtn"
          onClick={() => signIn(githubAuthProvider, 'Github')}>
          <FaGithub />
          Connect with Github
        </button>
        <button
          className="extraTextWithIconBtn"
          onClick={() => signIn(googleAuthProvider, 'Google')}>
          <FcGoogle />
          Connect with Google
        </button>
      </div>
      <p className="description">
        We use your account to save your settings and track streaks for rowards 🎁 ... or risk
        losing them like unusaved code!
      </p>
    </ReactModal>
  )
}
