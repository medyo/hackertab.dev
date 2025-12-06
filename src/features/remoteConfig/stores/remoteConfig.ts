import { create } from 'zustand'

import { persist } from 'zustand/middleware'
import { RemoteConfig, Tag } from '../types'

type RemoteConfigStore = {
  tags: Tag[]
  setRemoteConfig: (remoteConfig: RemoteConfig) => void
}

export const useRemoteConfigStore = create(
  persist<RemoteConfigStore>(
    (set) => ({
      tags: [
        {
          value: 'javascript',
          label: 'Javascript',
        },
      ],
      setRemoteConfig: (remoteConfig: RemoteConfig) => set({ tags: remoteConfig.tags }),
    }),
    {
      name: 'remote_config_storage',
      version: 2,
      migrate: (state) => {
        return state as RemoteConfigStore
      },
    }
  )
)
