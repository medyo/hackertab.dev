import { AuthModalStore, AuthStore } from 'src/features/auth'
import { trackUserDisconnect } from 'src/lib/analytics'
import { firebaseAuth } from 'src/lib/firebase'

export const useAuth = () => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = AuthModalStore()
  const authStore = AuthStore()
  const { user, providerId, initState, clear } = authStore

  const isConnected = () => user != null

  const logout = async () => {
    trackUserDisconnect()
    clear()
    return await firebaseAuth.signOut()
  }

  return {
    openAuthModal,
    closeAuthModal,
    initState,
    isConnected,
    logout,
    isAuthModalOpen,
    user,
    providerId,
  }
}
