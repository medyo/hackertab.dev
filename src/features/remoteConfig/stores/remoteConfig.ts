import { create } from 'zustand'

import { persist } from 'zustand/middleware'
import { RemoteConfig, Tag } from '../types'

const DEFAULT_ADS_FETCH_DELAY_MS = 1750
type RemoteConfigStore = {
  tags: Tag[]
  adsFetchDelayMs: number
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
      adsFetchDelayMs: DEFAULT_ADS_FETCH_DELAY_MS,
      setRemoteConfig: (remoteConfig: RemoteConfig) =>
        set({
          tags: remoteConfig.tags,
          adsFetchDelayMs: remoteConfig.ads_fetch_delay_ms || DEFAULT_ADS_FETCH_DELAY_MS,
        }),
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
