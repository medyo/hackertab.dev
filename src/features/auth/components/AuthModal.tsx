import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth/web-extension'
import { useCallback, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoHeartCircle } from 'react-icons/io5'
import { Button, Modal } from 'src/components/Elements'
import { BUILD_TARGET, privacyPolicyLink, termsAndConditionsLink } from 'src/config'
import { useAuth } from 'src/features/auth'
import { getBrowserName } from 'src/utils/Environment'
import { checkHostPermissions, requestHostPermissions } from 'src/utils/Permissions'
import { useGetOauthLink } from '../api/getOauthLink'
import './authModal.css'

type AuthModalProps = {
  showAuth: boolean
}

const googleAuthProvider = new GoogleAuthProvider()
const githubAuthProvider = new GithubAuthProvider()

type AuthProvider = GoogleAuthProvider | GithubAuthProvider
export const AuthModal = ({ showAuth }: AuthModalProps) => {
  const { closeAuthModal, authError, setAuthError, providerId } = useAuth()
  const [selectedProvider, setSelectedProvider] = useState<AuthProvider>(googleAuthProvider)
  const getOauthLink = useGetOauthLink()

  const requestOauthLink = useCallback(
    async (provider: AuthProvider) => {
      getOauthLink
        .mutateAsync({
          data: {
            provider: provider.providerId,
            state: BUILD_TARGET === 'web' ? window.location.origin : getBrowserName(),
          },
        })
        .then(({ authLink }) => {
          window.open(authLink, BUILD_TARGET === 'web' ? '_self' : '_blank')
        })
        .catch(() => {
          setAuthError({
            message: 'Something went wrong, Please try again',
          })
        })
    },
    [getOauthLink]
  )

  const signIn = useCallback(async (provider: AuthProvider) => {
    setSelectedProvider(provider)
    setAuthError(null)

    if (BUILD_TARGET === 'web') {
      requestOauthLink(provider)
    } else {
      const permissionCheck = await checkHostPermissions()

      if (!permissionCheck) {
        setAuthError({
          message: 'Hackertab needs permission to Sign in, Please request it and try again',
        })
      } else {
        requestOauthLink(provider)
      }
    }
  }, [])

  const requestMissingPermission = useCallback(async () => {
    const permissionRequest = await requestHostPermissions()

    if (!permissionRequest) {
      setAuthError({
        message: 'Permission not granted, Request it again',
      })
    } else {
      setAuthError(null)
      requestOauthLink(selectedProvider)
    }
  }, [])

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
            isLoading={getOauthLink.isLoading && getOauthLink.data?.['provider'] === 'github.com'}
            onClick={() => {
              signIn(githubAuthProvider)
            }}
            className="relative"
            size="medium">
            {providerId === 'github.com' && <span className="lastFlag">Last</span>}
            Connect with Github
          </Button>
          <Button
            isLoading={getOauthLink.isLoading && getOauthLink.data?.['provider'] === 'google.com'}
            startIcon={<FcGoogle style={{ fontSize: '1.5em' }} />}
            onClick={() => signIn(googleAuthProvider)}
            className="relative"
            size="medium">
            {providerId === 'google.com' && <span className="lastFlag">Last</span>}
            Connect with Google
          </Button>
        </div>
        {authError && (
          <div className="errors">
            <p>{authError.message}</p>
            {authError.retry && (
              <Button onClick={() => requestMissingPermission()} size="small" className="cta">
                {authError.retry.label}
              </Button>
            )}
          </div>
        )}
        <div className="footer">
          <p>
            By signing in, you agree to our{' '}
            <a href={termsAndConditionsLink} target="_blank" rel="noreferrer">
              terms of Service
            </a>{' '}
            and{' '}
            <a href={privacyPolicyLink} target="_blank" rel="noreferrer">
              privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </Modal>
  )
}
