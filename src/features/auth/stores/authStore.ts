import { User } from 'src/features/auth/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  idToken: string | null
  user: User | null
}

type AuthActions = {
  initState: (state: AuthState) => void
  clear: () => void
}

export const AuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      idToken: null,
      user: null,
      initState: (newState: AuthState) =>
        set({
          idToken: newState.idToken,
          user: newState.user,
        }),
      clear: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', // key in localStorage
    }
  )
)
