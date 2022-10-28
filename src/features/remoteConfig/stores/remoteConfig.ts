import create from 'zustand';
import { persist } from 'zustand/middleware'
import { RemoteConfig } from "../types";

type ChangelogVersionStore = {
  remoteConfig: RemoteConfig;
  setRemoteConfig: (remoteConfig: RemoteConfig) => void;
};

export const useRemoteConfigStore = create(persist<ChangelogVersionStore>((set) => ({
  remoteConfig: {
    marketingBannerConfig: undefined,
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
  },
  setRemoteConfig: (remoteConfig: RemoteConfig) =>
    set(() => ({
      remoteConfig: remoteConfig,
    }))
}), {
  name: 'remote_config_storage',
}));
