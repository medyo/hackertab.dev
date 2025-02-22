import { AuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoHeartCircle } from 'react-icons/io5'
import toast from 'react-simple-toasts'
import { Button, Modal } from 'src/components/Elements'
import { useAuth } from 'src/features/auth'
import { trackUserConnect } from 'src/lib/analytics'
import { firebaseAuth, githubAuthProvider, googleAuthProvider } from 'src/lib/firebase'
import './authModal.css'

type AuthModalProps = {
  showAuth: boolean
}

export const AuthModal = ({ showAuth }: AuthModalProps) => {
  const { closeAuthModal, initState } = useAuth()

  const signIn = (provider: AuthProvider) => {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const credential = OAuthProvider.credentialFromResult(result)
        const idToken = credential?.idToken
        const email = result.user.displayName
        const name = result.user.displayName
        const imageURL = result.user.photoURL
        if (idToken && name && email && imageURL) {
          trackUserConnect(provider.providerId)
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
        toast(`We couldn't login to your ${provider.providerId} account!!`, { theme: 'failure' })
      })
  }

  return (
    <Modal
      showModal={showAuth}
      onClose={closeAuthModal}
      header={{
        className: 'header',
        title: 'Join Hackertab',
        icon: <IoHeartCircle style={{ fontSize: '1.2em' }} />,
      }}
      className="authModal">
      <div>
        <p className="description">Create an account to sync, save bookmarks, and earn rewards.</p>
        <div className="buttons">
          <Button
            startIcon={<FaGithub className="blockHeaderWhite" style={{ fontSize: '1.5em' }} />}
            onClick={() => signIn(githubAuthProvider)}
            size="medium">
            Connect with Github
          </Button>
          <Button
            startIcon={<FcGoogle style={{ fontSize: '1.5em' }} />}
            onClick={() => signIn(googleAuthProvider)}
            size="medium">
            Connect with Google
          </Button>
        </div>
      </div>
    </Modal>
  )
}
