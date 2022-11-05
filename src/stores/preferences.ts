import { enhanceTags } from 'src/utils/DataEnhancement'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { SelectedCard, SelectedTag, Theme, ListingMode, CardSettingsType } from '../types'
import { Tag } from 'src/features/remoteConfig'

export type UserPreferencesState = {
  userSelectedTags: Tag[]
  theme: Theme
  openLinksNewTab: boolean
  listingMode: ListingMode
  searchEngine: string
  cards: SelectedCard[]
  cardsSettings: Record<string, CardSettingsType>
}

type UserPreferencesStoreActions = {
  initState: (newState: UserPreferencesState) => void
  setTheme: (theme: Theme) => void
  setSearchEngine: (theme: string) => void
  setOpenLinksNewTab: (openLinksNewTab: boolean) => void
  setListingMode: (listingMode: ListingMode) => void
  setCards: (selectedCards: SelectedCard[]) => void
  setTags: (selectedTags: Tag[]) => void
  setCardSettings: (card: string, settings: CardSettingsType) => void
}

export const useUserPreferences = create(
  persist<UserPreferencesState & UserPreferencesStoreActions>(
    (set) => ({
      userSelectedTags: [],
      cardsSettings: {},
      theme: 'dark',
      searchEngine: 'google',
      listingMode: 'normal',
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
      setTags: (selectedTags: Tag[]) => set({ userSelectedTags: selectedTags }),
      initState: (newState: UserPreferencesState) =>
        set(() => {
          return { ...newState }
        }),
      setCardSettings: (card: string, settings: CardSettingsType) =>
        set((state) => ({
          cardsSettings: {
            ...state.cardsSettings,
            [card]: { ...state.cardsSettings[card], ...settings },
          },
        })),
    }),
    {
      name: 'preferences_storage',
      serialize: ({ state, version }) => {
        const newState = {
          ...state,
          userSelectedTags: state.userSelectedTags.map((tag) => tag.value),
        }
        return JSON.stringify({ state: newState, version })
      },
      deserialize: (stateStr) => {
        let { state, version } = JSON.parse(stateStr)
        state = {
          ...state,
          userSelectedTags: enhanceTags(state.userSelectedTags),
        }
        return { state, version }
      },
    }
  )
)
