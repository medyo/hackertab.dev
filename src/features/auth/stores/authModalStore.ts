import { create } from 'zustand'

type AuthError = {
  message: string
  retry?: {
    label: string
  } | null
}
interface AuthModalState {
  isAuthModalOpen: boolean
  isConnecting: boolean
  authError: AuthError | null
  openAuthModal: () => void
  closeAuthModal: () => void
  setAuthError: (error: AuthError | null) => void
  setConnecting: (isConnecting: boolean) => void
}

export const AuthModalStore = create<AuthModalState>((set) => ({
  isAuthModalOpen: false,
  authError: null,
  isConnecting: false,
  setAuthError: (error) => set({ authError: error }),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setConnecting: (isConnecting) => set({ isConnecting }),
}))
