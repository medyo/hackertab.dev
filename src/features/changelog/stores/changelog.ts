import { create } from 'zustand'

import { persist } from 'zustand/middleware'

type ChangelogVersionStore = {
  lastReadVersion: string | undefined | null
  markVersionAsRead: (versionName: string | undefined | null) => void
}

export const useChangelogStore = create(
  persist<ChangelogVersionStore>(
    (set) => ({
      lastReadVersion: undefined,
      markVersionAsRead: (versionName: string | undefined | null) =>
        set(() => ({
          lastReadVersion: versionName,
        })),
    }),
    {
      name: 'changelog_storage',
    }
  )
)
