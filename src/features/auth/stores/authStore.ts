import { User } from 'src/features/auth/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  user: User | null
  providerId: string | null
}

type AuthActions = {
  initState: (state: AuthState) => void
  clear: () => void
}

export const AuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      user: null,
      providerId: null,
      initState: (newState: AuthState) =>
        set({
          user: newState.user,
          providerId: newState.providerId,
        }),
      clear: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // key in localStorage
    }
  )
)
