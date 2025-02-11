import { AuthStore } from 'src/features/auth'
import { useBookmarks } from 'src/stores/bookmarks'

export const useAuth = () => {
  const authStore = AuthStore()
  const bookmarksStore = useBookmarks()
  const { initState, accessToken, user } = authStore
  const logout = () => {
    bookmarksStore.clear()
    authStore.clear()
  }

  return { initState, logout, accessToken, user }
}
