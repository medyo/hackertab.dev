import { User } from 'src/features/auth/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  accessToken: string | null
  user: User | null
}

type AuthActions = {
  initState: (state: AuthState) => void
  logout: () => void
}

export const useAuth = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      accessToken: null,
      user: null,
      initState: (newState: AuthState) =>
        set({
          accessToken: newState.accessToken,
          user: newState.user,
        }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // key in localStorage
    }
  )
)
