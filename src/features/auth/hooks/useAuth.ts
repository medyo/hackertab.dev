import { AuthModalStore, AuthStore } from 'src/features/auth'

export const useAuth = () => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = AuthModalStore()
  const authStore = AuthStore()
  const { idToken, user, initState, clear } = authStore
  const isConnected = () => user != null
  const logout = () => {
    clear()
  }

  return {
    openAuthModal,
    closeAuthModal,
    initState,
    isConnected,
    logout,
    isAuthModalOpen,
    idToken,
    user,
  }
}
