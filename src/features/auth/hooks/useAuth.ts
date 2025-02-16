import { AuthModalStore, AuthStore } from 'src/features/auth'
import { useBookmarks } from 'src/stores/bookmarks'

export const useAuth = () => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = AuthModalStore()
  const authStore = AuthStore()
  const bookmarksStore = useBookmarks()
  const { accessToken, user, initState } = authStore
  const isConnected = () => user != null
  const logout = () => {
    bookmarksStore.clear()
    authStore.clear()
  }

  return {
    openAuthModal,
    closeAuthModal,
    initState,
    isConnected,
    logout,
    isAuthModalOpen,
    accessToken,
    user,
  }
}
