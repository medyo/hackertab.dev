import create from 'zustand';
import { persist } from 'zustand/middleware'
import { RemoteConfig, Tag, MarketingBannerConfig } from "../types";

type ChangelogVersionStore = {
  supportedTags: Tag[];
  refresh_rate: number | false;
  marketingBannerConfig?: MarketingBannerConfig;
  setRemoteConfig: (remoteConfig: RemoteConfig) => void;
};

export const useRemoteConfigStore = create(persist<ChangelogVersionStore>((set) => ({
  marketingBannerConfig: undefined,
  refresh_rate: false,
  supportedTags: [
    {
      value: 'javascript',
      label: 'Javascript',
      githubValues: ['javascript'],
      confsValues: ['javascript'],
      devtoValues: ['javascript'],
      hashnodeValues: ['javascript'],
      mediumValues: ['javascript'],
      redditValues: ['javascript'],
      freecodecampValues: ['javascript']
    },
  ],
  setRemoteConfig: (remoteConfig: RemoteConfig) =>
    set(() => {
      return { ...remoteConfig }
    }),
}), {
  name: 'remote_config_storage',
}));
