import { signOut } from 'firebase/auth'
import { AuthModalStore, AuthStore } from 'src/features/auth'
import { trackUserDisconnect } from 'src/lib/analytics'
import { firebaseAuth } from 'src/lib/firebase'

export const useAuth = () => {
  const authModalStore = AuthModalStore()
  const authStore = AuthStore()

  const isConnected = () => authStore.user != null

  const logout = async () => {
    trackUserDisconnect()
    signOut(firebaseAuth)
    authStore.clear()
    return await firebaseAuth.signOut()
  }

  return {
    ...authModalStore,
    ...authStore,
    isConnected,
    logout,
  }
}
