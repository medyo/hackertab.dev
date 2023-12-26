import arrayMove from 'array-move'
import { Occupation } from 'src/features/onboarding/types'
import { Tag } from 'src/features/remoteConfig'
import { enhanceTags } from 'src/utils/DataEnhancement'
import { create } from 'zustand'
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware'
import {
  CardSettingsType,
  DNDDuration,
  ListingMode,
  SelectedCard,
  SupportedCardType,
  Theme,
} from '../types'

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
  DNDDuration: DNDDuration
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
  setDNDDuration: (value: DNDDuration) => void
  isDNDModeActive: () => boolean
}

const defaultStorage: StateStorage = {
  getItem: (name: string) => {
    const item = window.localStorage.getItem(name)

    if (item) {
      let {
        version,
        state,
      }: {
        version: number
        state: UserPreferencesState
      } = JSON.parse(item)

      const newState = {
        ...state,
        userSelectedTags: enhanceTags(state.userSelectedTags as unknown as string[]),
      }
      return JSON.stringify({ state: newState, version })
    }

    return null
  },
  setItem: (name: string, value: string) => {
    try {
      let {
        state,
        version,
      }: {
        version: number
        state: UserPreferencesState
      } = JSON.parse(value)

      const newState = {
        ...state,
        userSelectedTags: state.userSelectedTags.map((tag) => tag.value),
      }

      const newValue = JSON.stringify({ state: newState, version })
      window.localStorage.setItem(name, newValue)
    } catch (e) {
      console.log('Prefs, SetItem', e)
      window.localStorage.setItem(name, '')
    }
  },
  removeItem: (name: string) => {
    window.localStorage.removeItem(name)
  },
}

export const useUserPreferences = create(
  persist<UserPreferencesState & UserPreferencesStoreActions>(
    (set, get) => ({
      userSelectedTags: [
        {
          value: 'javascript',
          label: 'Javascript',
          githubValues: ['javascript'],
          confsValues: ['javascript'],
          devtoValues: ['javascript'],
          hashnodeValues: ['javascript'],
          mediumValues: ['javascript'],
          redditValues: ['javascript'],
          freecodecampValues: ['javascript'],
        },
      ],
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
        { id: 2, name: 'ai', type: 'supported' },
        { id: 3, name: 'producthunt', type: 'supported' },
      ],
      userCustomCards: [],
      DNDDuration: 'never',
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
      setDNDDuration: (value: DNDDuration) => set({ DNDDuration: value }),
      isDNDModeActive: () => {
        const duration = get().DNDDuration
        if (duration === 'always') {
          return true
        } else if (typeof duration === 'object') {
          const dndValue = duration as {
            value: number
            countdown: number
          }
          return Boolean(dndValue.value && dndValue.countdown - new Date().getTime() > 0)
        } else {
          return false
        }
      },
    }),
    {
      name: 'preferences_storage',
      storage: createJSONStorage(() => defaultStorage),
    }
  )
)
