import { create } from 'zustand'

import { persist } from 'zustand/middleware'
import { RemoteConfig, Tag } from '../types'

const DEFAULT_ADS_FETCH_DELAY_MS = 1750
type RemoteConfigStore = {
  tags: Tag[]
  adsFetchDelayMs: number
  paywall?: {
    id: string
    enabled: boolean
    headerCta: string
    ctaUrl: string
    cta: string
    leadDescription: string
    caption: string
    headerImage: string
    features: string[]
  }
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
      paywall: undefined,
      setRemoteConfig: (remoteConfig: RemoteConfig) =>
        set({
          tags: remoteConfig.tags,
          adsFetchDelayMs: remoteConfig.ads_fetch_delay_ms || DEFAULT_ADS_FETCH_DELAY_MS,
          paywall: remoteConfig.paywall
            ? {
                ...remoteConfig.paywall,
                headerCta: remoteConfig.paywall.header_cta,
                ctaUrl: remoteConfig.paywall.cta_url,
                leadDescription: remoteConfig.paywall.lead_description,
                headerImage: remoteConfig.paywall.header_image,
              }
            : undefined,
        }),
    }),
    {
      name: 'remote_config_storage',
      version: 3,
      migrate: (state: unknown) => {
        return { ...(state as RemoteConfigStore), paywall: undefined } as RemoteConfigStore
      },
    }
  )
)
