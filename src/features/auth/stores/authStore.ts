import { User } from 'src/features/auth/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthModalState {
  isAuthModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
}

type AuthState = {
  idToken: string | null
  user: User | null
}

type AuthActions = {
  initState: (state: AuthState) => void
  clear: () => void
}

export const AuthModalStore = create<AuthModalState>((set) => ({
  isAuthModalOpen: false,
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
}))

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
