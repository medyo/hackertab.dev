import { create } from 'zustand';

import { persist } from 'zustand/middleware';

type ChangelogVersionStore = {
  lastReadVersion: string | undefined | null;
  setVersionAsRead: (versionName: string | undefined | null) => void;
};

export const useChangelogStore = create(persist<ChangelogVersionStore>((set) => ({
    lastReadVersion: undefined,
    setVersionAsRead: (versionName: string | undefined | null) =>
    set(() => ({
        lastReadVersion: versionName,
    }))
}),{
  name: 'changelog_storage',
}));
