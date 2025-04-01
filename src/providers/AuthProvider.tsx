import { GithubAuthProvider, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-simple-toasts'
import { useAuth } from 'src/features/auth'
import { firebaseAuth } from 'src/lib/firebase'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { closeAuthModal, initState, setAuthError, openAuthModal, setConnecting } = useAuth()

  const connectTheUser = useCallback((token?: string | null, provider?: string | null) => {
    const allowedProviders = ['google', 'github']
    if ((provider && !allowedProviders.includes(provider)) || !token) {
      return Promise.resolve()
    }

    setConnecting(true)
    const authProvider =
      provider === 'google'
        ? GoogleAuthProvider.credential(null, token)
        : GithubAuthProvider.credential(token)

    return signInWithCredential(firebaseAuth, authProvider)
      .then((userCredential) => {
        const user = userCredential.user

        initState({
          user: {
            id: user.uid,
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
      .finally(() => {
        setConnecting(false)
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

    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener(messageListener)
    }

    return () => {
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.removeListener(messageListener)
      }
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
      openAuthModal()
      console.log('error', error)
      if (error && error.code === 'auth/account-exists-with-different-credential') {
        setAuthError({
          message:
            'This account is already connected with a different provider. Please sign in with that provider to continue.',
        })
      } else {
        setAuthError({
          message: 'Error signing in, Please try again',
        })
      }
    })
  }, [searchParams])
  return <>{children}</>
}
