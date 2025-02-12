import { AuthStore } from 'src/features/auth'
import { useBookmarks } from 'src/stores/bookmarks'

export const useAuth = () => {
  const authStore = AuthStore()
  const bookmarksStore = useBookmarks()
  const { isAuthShowing, accessToken, user, setIsAuthShowing, initState } = authStore
  const isConnected = () => user != null
  const logout = () => {
    bookmarksStore.clear()
    authStore.clear()
  }

  return { setIsAuthShowing, initState, isConnected, logout, isAuthShowing, accessToken, user }
}
