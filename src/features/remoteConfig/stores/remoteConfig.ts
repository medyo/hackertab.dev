import { create } from 'zustand'

import { persist } from 'zustand/middleware'
import { RemoteConfig, Tag } from '../types'

type RemoteConfigStore = {
  supportedTags: Tag[]
  marketingBannerConfig?: any
  adsConfig: {
    rowPosition: number
    columnPosition: number
    enabled: boolean
  }
  setRemoteConfig: (remoteConfig: RemoteConfig) => void
}

export const useRemoteConfigStore = create(
  persist<RemoteConfigStore>(
    (set) => ({
      marketingBannerConfig: undefined,
      adsConfig: {
        rowPosition: 0,
        columnPosition: 0,
        enabled: false,
      },
      supportedTags: [
        {
          value: 'javascript',
          label: 'Javascript',
        },
      ],
      setRemoteConfig: (remoteConfig: RemoteConfig) =>
        set(() => {
          const { marketingBannerConfig, ...otherConfigs } = remoteConfig
          return { ...otherConfigs }
        }),
    }),
    {
      name: 'remote_config_storage',
      version: 1,
      migrate(persistedState, version) {
        const newState = persistedState as RemoteConfigStore
        if (version === 0) {
          delete newState.marketingBannerConfig
        }
        return newState
      },
    }
  )
)
