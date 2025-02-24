import { AuthModalStore, AuthStore } from 'src/features/auth'
import { trackUserDisconnect } from 'src/lib/analytics'

export const useAuth = () => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = AuthModalStore()
  const authStore = AuthStore()
  const { user, initState, clear } = authStore

  const isConnected = () => user != null

  const logout = () => {
    trackUserDisconnect()
    clear()
  }

  return {
    openAuthModal,
    closeAuthModal,
    initState,
    isConnected,
    logout,
    isAuthModalOpen,
    user,
  }
}
