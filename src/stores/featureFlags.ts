import { create } from 'zustand'

import { persist } from 'zustand/middleware'

type FlagsState = {
  flags: {
    [key: string]: {
      done: boolean
    }
  }
}

type FlagActions = {
  markDone: (flagId: string, done: boolean) => void
  isDone: (flagId: string) => boolean
}

export const useFeatureFlags = create(
  persist<FlagsState & FlagActions>(
    (set, get) => ({
      flags: {},
      markDone: (flagId: string, done: boolean) =>
        set((state) => ({
          flags: {
            ...state.flags,
            [flagId]: {
              done,
            },
          },
        })),
      isDone: (flagId: string) => {
        return get().flags[flagId]?.done ?? false
      },
    }),
    {
      name: 'flags_storage',
    }
  )
)
