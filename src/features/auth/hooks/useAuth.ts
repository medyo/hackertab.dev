import { signOut } from 'firebase/auth'
import { AuthModalStore, AuthStore } from 'src/features/auth'
import { trackUserDisconnect } from 'src/lib/analytics'
import { firebaseAuth } from 'src/lib/firebase'

export const useAuth = () => {
  const authModalStore = AuthModalStore()
  const authStore = AuthStore()
  const { user, providerId, initState, clear } = authStore

  const isConnected = user != null

  const logout = async () => {
    trackUserDisconnect()
    signOut(firebaseAuth)
    clear()
    return await firebaseAuth.signOut()
  }

  return {
    ...authModalStore,
    initState,
    isConnected,
    logout,
    user,
    providerId,
  }
}
