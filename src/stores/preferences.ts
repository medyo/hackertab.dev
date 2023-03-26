import arrayMove from 'array-move'
import { Occupation } from 'src/features/onboarding/types'
import { Tag } from 'src/features/remoteConfig'
import { enhanceTags } from 'src/utils/DataEnhancement'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CardSettingsType, ListingMode, SelectedCard, SupportedCardType, Theme } from '../types'

export type UserPreferencesState = {
  userSelectedTags: Tag[]
  theme: Theme
  openLinksNewTab: boolean
  onboardingCompleted: boolean
  onboardingResult: Omit<Occupation, 'icon'> | null
  listingMode: ListingMode
  searchEngine: string
  maxVisibleCards: number
  cards: SelectedCard[]
  cardsSettings: Record<string, CardSettingsType>
  firstSeenDate: number
  userCustomCards: SupportedCardType[]
  pauseTo: number | "always"
}

type UserPreferencesStoreActions = {
  initState: (newState: UserPreferencesState) => void
  setTheme: (theme: Theme) => void
  setSearchEngine: (theme: string) => void
  setOpenLinksNewTab: (openLinksNewTab: boolean) => void
  setListingMode: (listingMode: ListingMode) => void
  setCards: (selectedCards: SelectedCard[]) => void
  setTags: (selectedTags: Tag[]) => void
  setMaxVisibleCards: (maxVisibleCards: number) => void
  setCardSettings: (card: string, settings: CardSettingsType) => void
  markOnboardingAsCompleted: (occupation: Omit<Occupation, 'icon'> | null) => void
  setUserCustomCards: (cards: SupportedCardType[]) => void
  updateCardOrder: (prevIndex: number, newIndex: number) => void
  setPauseTo: (value: number | "always") => void
  isPauseModeActive: () => boolean;
}

export const useUserPreferences = create(
  persist<UserPreferencesState & UserPreferencesStoreActions>(
    (set, get) => ({
      userSelectedTags: [],
      cardsSettings: {},
      maxVisibleCards: 4,
      theme: 'dark',
      onboardingCompleted: false,
      onboardingResult: null,
      searchEngine: 'google',
      listingMode: 'normal',
      openLinksNewTab: true,
      firstSeenDate: Date.now(),
      cards: [
        { id: 0, name: 'github', type: 'supported' },
        { id: 1, name: 'hackernews', type: 'supported' },
        { id: 2, name: 'devto', type: 'supported' },
        { id: 3, name: 'producthunt', type: 'supported' },
      ],
      userCustomCards: [],
      pauseTo: 0,
      setSearchEngine: (searchEngine: string) => set({ searchEngine: searchEngine }),
      setListingMode: (listingMode: ListingMode) => set({ listingMode: listingMode }),
      setTheme: (theme: Theme) => set({ theme: theme }),
      setOpenLinksNewTab: (openLinksNewTab: boolean) => set({ openLinksNewTab: openLinksNewTab }),
      setCards: (selectedCards: SelectedCard[]) => set({ cards: selectedCards }),
      setTags: (selectedTags: Tag[]) => set({ userSelectedTags: selectedTags }),
      setMaxVisibleCards: (maxVisibleCards: number) => set({ maxVisibleCards: maxVisibleCards }),
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
      markOnboardingAsCompleted: (occupation: Omit<Occupation, 'icon'> | null) =>
        set(() => ({
          onboardingCompleted: true,
          onboardingResult: occupation,
        })),
      setUserCustomCards: (cards: SupportedCardType[]) => set({ userCustomCards: cards }),
      updateCardOrder: (prevIndex: number, newIndex: number) =>
        set((state) => {
          const newState = arrayMove(state.cards, prevIndex, newIndex).map((card, index) => {
            return {
              ...card,
              id: index,
            }
          })

          return { cards: newState }
        }),
      setPauseTo: (value) => set({ pauseTo: value }),
      isPauseModeActive: () => {
        const pauseTo = get().pauseTo
        if (pauseTo === "always") {
          return true;
        }
        return Boolean(pauseTo && pauseTo - new Date().getTime() > 0)
      }
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
