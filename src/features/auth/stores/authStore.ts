import { User } from 'src/features/auth/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  isAuthShowing: boolean
  accessToken: string | null
  user: User | null
}

type AuthActions = {
  setIsAuthShowing: (showing: boolean) => void
  initState: (state: AuthState) => void
  clear: () => void
}

export const AuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      isAuthShowing: true,
      accessToken: null,
      user: null,
      setIsAuthShowing: (showing: boolean) => set({ isAuthShowing: showing }),
      initState: (newState: AuthState) =>
        set({
          accessToken: newState.accessToken,
          user: newState.user,
        }),
      clear: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // key in localStorage
    }
  )
)
