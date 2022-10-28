import create from 'zustand';
import { persist } from 'zustand/middleware'
import { SelectedCard, SelectedTag, Theme, ListingMode, BookmarkedPost } from "../types";

type UserPreferencesStore = {
  userSelectedTags: SelectedTag[]
  userBookmarks: BookmarkedPost[]
  theme: Theme,
  openLinksNewTab: boolean,
  listingMode: ListingMode,
  searchEngine: string,
  cards: SelectedCard[],
  setTheme: (theme: Theme) => void;
  setSearchEngine: (theme: string) => void;
  setOpenLinksNewTab: (openLinksNewTab: boolean) => void;
  setListingMode: (listingMode: ListingMode) => void;
  setCards: (selectedCards: SelectedCard[]) => void;
  setTags: (selectedTags: SelectedTag[]) => void;
  bookmarkPost: (post: BookmarkedPost) => void;
  unbookmarkPost: (post: BookmarkedPost) => void;
};

export const useUserPreferences = create(persist<UserPreferencesStore>((set) => ({
  userSelectedTags: [],
  userBookmarks: [],
  theme: "dark",
  searchEngine: "google",
  listingMode: "normal",
  openLinksNewTab: true,
  cards: [],
  setSearchEngine: (searchEngine: string) => set({ searchEngine: searchEngine }),
  setListingMode: (listingMode: ListingMode) => set({ listingMode: listingMode }),
  setTheme: (theme: Theme) => set({ theme: theme }),
  setOpenLinksNewTab: (openLinksNewTab: boolean) => set({ openLinksNewTab: openLinksNewTab }),
  setCards: (selectedCards: SelectedCard[]) => set({ cards: selectedCards }),
  setTags: (selectedTags: SelectedTag[]) => set({ userSelectedTags: selectedTags }),
  bookmarkPost: (post: BookmarkedPost) => set((state) => ({ userBookmarks: [post, ...state.userBookmarks] })),
  unbookmarkPost: (post: BookmarkedPost) => set((state) => ({ userBookmarks: state.userBookmarks.filter((bookmarkedPost) => bookmarkedPost.url !== post.url), }))
}), {
  name: 'preferences_storage',
}));
