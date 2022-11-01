import create from 'zustand';
import { persist } from 'zustand/middleware'
import { SelectedCard, SelectedTag, Theme, ListingMode } from "../types";

export type UserPreferencesState = {
  userSelectedTags: string[]
  theme: Theme,
  openLinksNewTab: boolean,
  listingMode: ListingMode,
  searchEngine: string,
  cards: SelectedCard[],
};

type UserPreferencesStoreActions = {
  initState: (newState: UserPreferencesState) => void;
  setTheme: (theme: Theme) => void;
  setSearchEngine: (theme: string) => void;
  setOpenLinksNewTab: (openLinksNewTab: boolean) => void;
  setListingMode: (listingMode: ListingMode) => void;
  setCards: (selectedCards: SelectedCard[]) => void;
  setTags: (selectedTags: SelectedTag[]) => void;
};

export const useUserPreferences = create(persist<UserPreferencesState & UserPreferencesStoreActions>((set) => ({
  userSelectedTags: [],
  theme: "dark",
  searchEngine: "google",
  listingMode: "normal",
  openLinksNewTab: true,
  cards: [
    { id: 0, name: 'github' },
    { id: 1, name: 'hackernews' },
    { id: 2, name: 'devto' },
    { id: 3, name: 'producthunt' },
  ],
  setSearchEngine: (searchEngine: string) => set({ searchEngine: searchEngine }),
  setListingMode: (listingMode: ListingMode) => set({ listingMode: listingMode }),
  setTheme: (theme: Theme) => set({ theme: theme }),
  setOpenLinksNewTab: (openLinksNewTab: boolean) => set({ openLinksNewTab: openLinksNewTab }),
  setCards: (selectedCards: SelectedCard[]) => set({ cards: selectedCards }),
  setTags: (selectedTags: SelectedTag[]) => set({ userSelectedTags: selectedTags.map(tag => tag.value) }),
  initState: (newState: UserPreferencesState) => set(() => ({ ...newState }))

}), {
  name: 'preferences_storage',
  onRehydrateStorage(state) {
    console.log("state", state)
  },
}));
