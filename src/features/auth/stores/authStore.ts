import { User } from 'src/features/auth/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  user: User | null
  lastStreakUpdate?: number
  providerId: string | null
}

type AuthActions = {
  initState: (state: AuthState) => void
  setStreak: (streak: number) => void
  setLastStreakUpdate: (timestamp: number) => void
  clear: () => void
}

type AuthStoreType = AuthState & AuthActions
export const AuthStore = create(
  persist<AuthStoreType>(
    (set) => ({
      user: null,
      providerId: null,
      lastStreakUpdate: undefined,
      setLastStreakUpdate: (timestamp: number) => set({ lastStreakUpdate: timestamp }),
      initState: (newState: AuthState) =>
        set({
          user: newState.user,
          providerId: newState.providerId,
        }),
      setStreak: (streak: number) =>
        set((state) => ({
          lastStreakUpdate: Date.now(),
          user: {
            ...state.user!,
            streak,
          },
        })),
      clear: () => set({ user: null, lastStreakUpdate: undefined }),
    }),
    {
      version: 1,
      name: 'auth-storage',
      migrate: (persistedState, version) => {
        const typedPersistedState = persistedState as unknown as AuthStoreType
        if (version === 0) {
          return {
            ...typedPersistedState,
            lastStreakUpdate: undefined,
          }
        }
        return typedPersistedState
      },
    }
  )
)
