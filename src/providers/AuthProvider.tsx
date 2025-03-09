import { GithubAuthProvider, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-simple-toasts'
import { useAuth } from 'src/features/auth'
import { firebaseAuth } from 'src/lib/firebase'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { closeAuthModal, initState, setAuthError } = useAuth()

  const connectTheUser = useCallback((token?: string | null, provider?: string | null) => {
    const allowedProviders = ['google', 'github']
    if ((provider && !allowedProviders.includes(provider)) || !token) {
      return Promise.resolve()
    }

    const authProvider =
      provider === 'google'
        ? GoogleAuthProvider.credential(null, token)
        : GithubAuthProvider.credential(token)

    return signInWithCredential(firebaseAuth, authProvider).then((userCredential) => {
      const user = userCredential.user

      initState({
        user: {
          name: user.displayName || 'Anonymous',
          imageURL: user.photoURL || '',
        },
        providerId: authProvider.providerId,
      })
      if (user.displayName) {
        toast(`Welcome, ${user.displayName}`, { theme: 'successToast' })
      }
      closeAuthModal()
      navigate(window.location.pathname, { replace: true })
    })
  }, [])

  /**
   * This effect is used to connect the user when the token is received from the background script
   * on Chrome and Firefox extensions
   */
  useEffect(() => {
    const messageListener = (message: {
      action: string
      type?: string
      access_token?: string
      provider?: string
    }) => {
      if (message.type === 'TOKEN_RECEIVED') {
        const { access_token: token, provider } = message
        connectTheUser(token, provider).catch((error) => {
          if (error && error.code === 'auth/account-exists-with-different-credential') {
            setAuthError({
              message:
                'You have an account with a different provider. Please sign in with that provider to continue.',
            })
          }
        })
      }
    }

    chrome.runtime?.onMessage.addListener(messageListener)

    return () => {
      chrome.runtime?.onMessage.removeListener(messageListener)
    }
  }, [])

  /**
   * This effect is used to connect the user when the user when the token is received from the URL
   * on the web
   */
  useEffect(() => {
    const token = searchParams.get('access_token')
    const provider = searchParams.get('provider')
    connectTheUser(token, provider).catch((error) => {
      if (error && error.code === 'auth/account-exists-with-different-credential') {
        toast(
          'You have an account with a different provider. Please sign in with that provider to continue.',
          {
            theme: 'dangerToast',
          }
        )
      } else {
        console.log(error)
        toast('Error signing in, Please try again', { theme: 'dangerToast' })
      }
    })
  }, [searchParams])
  return <>{children}</>
}
